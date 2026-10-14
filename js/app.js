/* =========================================================
   Motor de Libro Web™ — lógica de la aplicación
   ---------------------------------------------------------
   Lee data/content.json y renderiza todo dinámicamente: portada,
   índice, capítulos (con su imagen hero) y bloques (incluido el
   diagnóstico interactivo).
   Casi nunca hace falta tocar este archivo para hacer un libro
   nuevo: el contenido vive en data/content.json y el estilo en
   css/styles.css. Ver references/content-schema.md para el
   formato completo de bloques soportados.
   ========================================================= */
(() => {
  'use strict';

  // Cambia este prefijo por libro (evita choques si publicas más de un
  // Libro Web bajo el mismo dominio, ya que todos comparten localStorage).
  const STORAGE_PREFIX = 'entrecomp_plus_';

  // Textos de la interfaz. Cualquiera se puede reemplazar desde
  // content.json → meta.ui (misma clave), sin tocar este archivo.
  const UI_DEFAULTS = {
    start: 'Comenzar la experiencia',
    startOver: 'Empezar desde el principio',
    resume: 'Continuar donde quedaste',
    readingTime: '{n} min de lectura',
    chapterCount: '{n} capítulos',
    offlineHint: 'Puedes leerlo sin conexión después de abrirlo por primera vez.',
    next: 'Siguiente →',
    end: 'Volver a la portada',
    install: 'Descargar la app',
    installIos: 'En iPhone o iPad: toca el botón Compartir y luego «Agregar a inicio».',
    installAndroid: 'En Android: abre el menú ⋮ del navegador y elige «Instalar app» o «Agregar a pantalla principal».',
    installDesktop: 'En computadora: usa el ícono de instalar al final de la barra de direcciones, o el menú del navegador → «Instalar» (Chrome, Edge). En Safari: Archivo → «Agregar al Dock».',
    installDone: 'La app ya está instalada en este dispositivo.',
    sending: 'Enviando…',
    consentRequired: 'Marca la casilla para continuar.',
    imagePending: 'Imagen pendiente',
    imageNoFile: '(sin archivo asignado todavía)',
    reflectionPlaceholder: 'Escribe tu respuesta aquí...',
    reflectionSaved: 'Tu respuesta se guarda automáticamente en este dispositivo.',
    quizFeedback: 'Gracias por responder.',
    ctaPlaceholder: 'tu@email.com',
    ctaButton: 'Enviar',
    ctaSuccess: '¡Listo! Te escribiremos pronto.',
    ctaToast: '¡Gracias! Quedó registrado.',
    diagEyebrow: 'Diagnóstico',
    diagScale: ['Nunca', 'Rara vez', 'Algunas veces', 'Frecuentemente', 'Siempre'],
    diagDimension: 'Dimensión {current} de {total} · {label}',
    diagAnswered: '{done}/{total} respondidas',
    diagPrev: '← Anterior',
    diagNext: 'Siguiente →',
    diagSeeResult: 'Ver mi resultado',
    diagReview: '← Revisar mis respuestas',
    diagGateHeading: 'Tu resultado está listo.',
    diagNamePlaceholder: 'Tu nombre',
    diagEmailPlaceholder: 'tu@email.com',
    diagUnlocked: '¡Gracias! Ya puedes ver tu resultado.',
    diagEmailSent: '¡Gracias! También enviamos tu resultado a {email}.',
    diagPriorityEyebrow: 'Prioridad',
    diagPriorityLevel: 'Nivel',
    diagPriorityOf: '{score} de {max}',
    diagAdvice: 'Primera orientación',
    diagStrength: 'Tu fortaleza',
    diagRisk: 'Tu riesgo',
    diagNextStep: 'Tu siguiente paso',
    diagStage: 'Nivel de preparación',
    blockError: 'Este bloque no se pudo mostrar. Revisa su formato en data/content.json.',
    loadErrorTitle: 'No se pudo cargar el contenido',
    loadErrorText: 'Revisa que data/content.json exista y tenga un formato válido.',
  };

  const FONT_SCALES = [1, 1.12, 1.25];

  const els = {
    app: document.getElementById('app'),
    topbarTitle: document.getElementById('topbarTitle'),
    menuToggle: document.getElementById('menuToggle'),
    sidebar: document.getElementById('sidebar'),
    sidebarClose: document.getElementById('sidebarClose'),
    sidebarOverlay: document.getElementById('sidebarOverlay'),
    chapterList: document.getElementById('chapterList'),
    progressBar: document.getElementById('progressBar'),
    cover: document.getElementById('cover'),
    coverHero: document.getElementById('coverHero'), // se crea solo si meta.coverImage existe
    coverKicker: document.getElementById('coverKicker'),
    coverTitle: document.getElementById('coverTitle'),
    coverSubtitle: document.getElementById('coverSubtitle'),
    coverMeta: document.getElementById('coverMeta'),
    coverHint: document.getElementById('coverHint'),
    startBtn: document.getElementById('startBtn'),
    resumeBtn: document.getElementById('resumeBtn'),
    reader: document.getElementById('reader'),
    chapterHero: document.getElementById('chapterHero'),
    chapterKicker: document.getElementById('chapterKicker'),
    chapterTitle: document.getElementById('chapterTitle'),
    chapterBody: document.getElementById('chapterBody'),
    chapterPosition: document.getElementById('chapterPosition'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    fontSizeBtn: document.getElementById('fontSizeBtn'), // puede no existir
    themeToggle: document.getElementById('themeToggle'), // puede no existir en libros de tema fijo
    installBtn: document.getElementById('installBtn'),
    sidebarInstall: document.getElementById('sidebarInstall'), // puede no existir
    installHelp: document.getElementById('installHelp'),
    toast: document.getElementById('toast'),
    offlineBadge: document.getElementById('offlineBadge'),
  };

  let book = null;      // contenido completo del JSON
  let chapters = [];    // atajo a book.chapters
  let currentIndex = -1;
  let ui = UI_DEFAULTS;

  // Texto de interfaz con reemplazo de {variables}.
  function t(key, vars) {
    const str = ui[key] == null ? UI_DEFAULTS[key] : ui[key];
    if (typeof str !== 'string' || !vars) return str;
    return str.replace(/\{(\w+)\}/g, (m, name) => (vars[name] == null ? m : vars[name]));
  }

  /* ---------------- Utilidades de almacenamiento local ---------------- */
  function lsGet(key, fallback) {
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) { return fallback; }
  }
  function lsSet(key, value) {
    try { localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value)); }
    catch (e) { /* almacenamiento no disponible: seguimos sin persistir */ }
  }

  function getVisited() { return new Set(lsGet('visited', [])); }
  function saveVisited(set) { lsSet('visited', Array.from(set)); }

  /* ---------------- Carga de contenido ---------------- */
  async function loadContent() {
    const res = await fetch('data/content.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error('No se pudo cargar data/content.json');
    return res.json();
  }

  /* ---------------- Texto: escape + negritas **así** ---------------- */
  function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str == null ? '' : String(str);
    return d.innerHTML;
  }
  // Sintaxis en línea que admite cualquier texto de content.json:
  //   **texto**            → resaltado en el color de acento
  //   [texto](https://…)   → enlace (también mailto:, tel: y #id-de-capitulo)
  const LINK_RE = /\[([^\]]+)\]\(((?:https?:\/\/|mailto:|tel:|#)[^\s)]+)\)/g;
  function mdInline(str) {
    return escapeHtml(str)
      .replace(LINK_RE, (m, text, url) => (url.charAt(0) === '#'
        ? `<a href="${url}">${text}</a>`
        : `<a href="${url}" target="_blank" rel="noopener">${text}</a>`))
      .replace(/\*\*(.+?)\*\*/g, '<strong class="accent-term">$1</strong>');
  }
  // El mismo texto sin marcas (para títulos de pestaña, correos, etc.).
  function plain(str) {
    return String(str == null ? '' : str).replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*/g, '');
  }
  // Ruta del proyecto → URL absoluta (los correos necesitan URLs completas).
  function absUrl(path) {
    if (!path) return '';
    const meta = book.meta || {};
    const base = meta.url || (meta.leads || {}).publicUrl || location.href.split('#')[0];
    try { return new URL(path, base).href; } catch (e) { return path; }
  }

  function renderCover() {
    const meta = book.meta || {};
    document.title = meta.htmlTitle || plain(meta.title);
    els.topbarTitle.textContent = meta.shortTitle || plain(meta.title);
    els.coverKicker.textContent = meta.coverKicker || '';
    els.coverTitle.innerHTML = mdInline(meta.title);
    els.coverSubtitle.innerHTML = mdInline(meta.subtitle || '');

    // Imagen de portada: basta con meta.coverImage, el motor arma el HTML.
    // Si el archivo todavía no existe, la portada queda solo con texto.
    if (meta.coverImage) {
      if (!els.coverHero) {
        const wrap = document.createElement('div');
        wrap.className = 'cover-hero-wrap';
        const img = document.createElement('img');
        img.id = 'coverHero';
        img.className = 'cover-hero';
        const fade = document.createElement('div');
        fade.className = 'cover-hero-fade';
        wrap.appendChild(img);
        wrap.appendChild(fade);
        els.cover.insertBefore(wrap, els.cover.firstChild);
        els.coverHero = img;
      }
      const heroWrap = els.coverHero.closest('.cover-hero-wrap') || els.coverHero;
      els.coverHero.addEventListener('error', () => { heroWrap.hidden = true; });
      els.coverHero.alt = meta.coverImageAlt || '';
      // "poster": la imagen es la portada diseñada del libro, con su título
      // y subtítulo incluidos. Se muestra entera y el título en texto queda
      // solo para lectores de pantalla y buscadores.
      const poster = meta.coverMode === 'poster';
      els.cover.classList.toggle('cover-poster', poster);
      if (meta.coverAspect && !poster) els.coverHero.style.aspectRatio = String(meta.coverAspect).replace(':', ' / ');
      if (meta.coverPosition && !poster) els.coverHero.style.objectPosition = meta.coverPosition;
      els.coverHero.addEventListener('error', () => els.cover.classList.remove('cover-poster'));
      els.coverHero.src = meta.coverImage;
    }

    const parts = [];
    if (meta.readingTimeMinutes) parts.push(t('readingTime', { n: meta.readingTimeMinutes }));
    parts.push(t('chapterCount', { n: chapters.length }));
    els.coverMeta.textContent = parts.join(' · ');
    if (els.coverHint) els.coverHint.textContent = t('offlineHint');
  }

  // Si el lector ya había empezado, la portada le ofrece retomar.
  function updateResume() {
    const last = lsGet('lastChapter', null);
    const canResume = !!last && chapters.some(c => c.id === last);
    els.startBtn.textContent = canResume ? t('startOver') : ((book.meta || {}).startLabel || t('start'));
    els.startBtn.className = canResume ? 'btn btn-ghost' : 'btn btn-primary';
    if (!els.resumeBtn) return;
    els.resumeBtn.hidden = !canResume;
    els.resumeBtn.textContent = t('resume');
    els.resumeBtn.dataset.chapterId = canResume ? last : '';
  }

  function renderSidebar() {
    els.chapterList.innerHTML = '';
    const visited = getVisited();
    chapters.forEach((ch, idx) => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.className = 'chapter-link' + (visited.has(ch.id) ? ' done' : '');
      btn.dataset.chapterId = ch.id;
      btn.innerHTML = `<span class="num">${escapeHtml(chapterLabels[idx])}</span><span>${escapeHtml(ch.title)}</span>`;
      btn.addEventListener('click', () => {
        goToChapter(ch.id);
        closeSidebar();
      });
      li.appendChild(btn);
      els.chapterList.appendChild(li);
    });
    highlightActiveChapter();
  }

  // Número que muestra el índice para cada capítulo. Los capítulos con
  // "numbered": false (prólogo, introducción, epílogo) no llevan número ni
  // consumen uno, así el Capítulo 1 sigue siendo el 01.
  let chapterLabels = [];
  function computeChapterLabels() {
    let n = 0;
    chapterLabels = chapters.map(ch => {
      if (ch.numbered === false) return '·';
      if (ch.number != null) return typeof ch.number === 'number' ? String(ch.number).padStart(2, '0') : String(ch.number);
      n += 1;
      return String(n).padStart(2, '0');
    });
  }

  function highlightActiveChapter() {
    const activeId = (chapters[currentIndex] || {}).id;
    els.chapterList.querySelectorAll('.chapter-link').forEach(a => {
      const active = a.dataset.chapterId === activeId;
      a.classList.toggle('active', active);
      if (active) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  }

  /* ---------------- Imágenes (hero de capítulo y bloque image) ----------------
     Reserva el espacio exacto y muestra un placeholder si el archivo todavía
     no existe. Así se puede maquetar el libro completo antes de tener las
     imágenes finales, y sumarlas después sin tocar nada más. */
  function buildImageFigure(data, opts = {}) {
    const figure = document.createElement('figure');
    const frame = document.createElement('div');
    frame.className = 'image-frame';
    frame.style.aspectRatio = String(data.aspect || opts.defaultAspect || '16:9').replace(':', ' / ');

    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder';
    placeholder.innerHTML = `
      <span class="ph-icon" aria-hidden="true">🖼️</span>
      <span class="ph-alt">${escapeHtml(data.alt || t('imagePending'))}</span>
      <span class="ph-file">${escapeHtml(data.src || t('imageNoFile'))}</span>
    `;

    if (data.src) {
      const img = document.createElement('img');
      img.loading = opts.eager ? 'eager' : 'lazy';
      img.decoding = 'async';
      img.alt = data.alt || '';
      img.addEventListener('error', () => { img.remove(); frame.appendChild(placeholder); });
      img.src = data.src;
      frame.appendChild(img);
    } else {
      frame.appendChild(placeholder);
    }

    figure.appendChild(frame);
    if (data.caption) {
      const cap = document.createElement('figcaption');
      cap.className = 'image-caption';
      cap.textContent = data.caption;
      figure.appendChild(cap);
    }
    return figure;
  }

  // chapter.hero admite un objeto { src, alt, caption, aspect } o solo la ruta.
  function normalizeHero(hero) {
    if (!hero) return null;
    return typeof hero === 'string' ? { src: hero } : hero;
  }

  function renderChapterHero(chapter) {
    if (!els.chapterHero) return;
    els.chapterHero.innerHTML = '';
    const hero = normalizeHero(chapter.hero);
    els.chapterHero.hidden = !hero;
    if (hero) els.chapterHero.appendChild(buildImageFigure(hero, { eager: true, defaultAspect: '16:9' }));
  }

  /* ---------------- Render de bloques de contenido ---------------- */
  const blockRenderers = {
    lead(block) {
      const p = document.createElement('p');
      p.className = 'lead';
      p.innerHTML = mdInline(block.text);
      return p;
    },
    paragraph(block) {
      const p = document.createElement('p');
      p.innerHTML = mdInline(block.text);
      return p;
    },
    heading(block) {
      const h = document.createElement('h2');
      h.innerHTML = mdInline(block.text);
      return h;
    },
    quote(block) {
      const bq = document.createElement('blockquote');
      bq.className = 'blockquote';
      bq.innerHTML = mdInline(block.text);
      if (block.attribution) {
        const cite = document.createElement('cite');
        cite.className = 'blockquote-cite';
        cite.textContent = block.attribution;
        bq.appendChild(cite);
      }
      return bq;
    },
    list(block) {
      const ul = document.createElement(block.style === 'numbered' ? 'ol' : 'ul');
      ul.className = 'list-block';
      (block.items || []).forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = mdInline(item);
        ul.appendChild(li);
      });
      return ul;
    },
    flow(block) {
      const wrap = document.createElement('div');
      wrap.className = 'flow';
      (block.steps || []).forEach((step, i) => {
        if (i > 0) {
          const arrow = document.createElement('span');
          arrow.className = 'flow-arrow';
          arrow.setAttribute('aria-hidden', 'true');
          arrow.textContent = '→';
          wrap.appendChild(arrow);
        }
        const pill = document.createElement('span');
        pill.className = 'flow-step';
        pill.textContent = step;
        wrap.appendChild(pill);
      });
      return wrap;
    },
    pillars(block) {
      const grid = document.createElement('div');
      grid.className = 'pillars';
      (block.items || []).forEach(item => {
        const card = document.createElement('div');
        card.className = 'pillar-card';
        const h3 = document.createElement('h3');
        h3.innerHTML = mdInline(item.title);
        const p = document.createElement('p');
        p.innerHTML = mdInline(item.text);
        card.appendChild(h3);
        card.appendChild(p);
        grid.appendChild(card);
      });
      return grid;
    },

    image(block) {
      const wrap = document.createElement('div');
      wrap.className = 'image-block';
      wrap.appendChild(buildImageFigure(block));
      return wrap;
    },

    reflection(block) {
      const wrap = document.createElement('div');
      wrap.className = 'interactive-block reflection-block';
      wrap.dataset.reflectionId = block.id;
      const label = document.createElement('label');
      label.className = 'q-label';
      label.textContent = block.question;
      label.setAttribute('for', 'reflection-' + block.id);
      const textarea = document.createElement('textarea');
      textarea.id = 'reflection-' + block.id;
      textarea.placeholder = block.placeholder || t('reflectionPlaceholder');
      textarea.value = lsGet('reflection_' + block.id, '');
      const note = document.createElement('span');
      note.className = 'save-note';
      note.textContent = t('reflectionSaved');
      wrap.appendChild(label);
      wrap.appendChild(textarea);
      wrap.appendChild(note);
      return wrap;
    },
    quiz(block) {
      const wrap = document.createElement('div');
      wrap.className = 'interactive-block quiz-block';
      wrap.dataset.quizId = block.id;
      const label = document.createElement('span');
      label.className = 'q-label';
      label.textContent = block.question;
      const options = document.createElement('div');
      options.className = 'quiz-options';
      const saved = lsGet('quiz_' + block.id, null);
      (block.options || []).forEach((opt, i) => {
        const optBtn = document.createElement('button');
        optBtn.type = 'button';
        optBtn.className = 'quiz-option' + (saved === i ? ' selected' : '');
        optBtn.setAttribute('aria-pressed', String(saved === i));
        optBtn.dataset.optionIndex = String(i);
        optBtn.textContent = opt;
        options.appendChild(optBtn);
      });
      const feedback = document.createElement('p');
      feedback.className = 'quiz-feedback';
      feedback.setAttribute('aria-live', 'polite');
      feedback.hidden = saved === null;
      feedback.textContent = saved === null ? '' : (block.feedback || t('quizFeedback'));
      wrap.appendChild(label);
      wrap.appendChild(options);
      wrap.appendChild(feedback);
      return wrap;
    },
    // Botón-enlace: lleva a una agenda, WhatsApp, página de venta, etc.
    button(block) {
      const wrap = document.createElement('div');
      wrap.className = 'button-block';
      const a = document.createElement('a');
      a.className = 'btn ' + (block.style === 'ghost' ? 'btn-ghost' : 'btn-primary');
      a.href = block.url || '#';
      if (!/^#/.test(a.getAttribute('href'))) { a.target = '_blank'; a.rel = 'noopener'; }
      a.textContent = block.text || '';
      wrap.appendChild(a);
      if (block.note) {
        const note = document.createElement('span');
        note.className = 'save-note';
        note.textContent = block.note;
        wrap.appendChild(note);
      }
      return wrap;
    },
    cta(block) {
      const wrap = document.createElement('div');
      wrap.className = 'cta-block';
      wrap.dataset.ctaId = block.id;
      const h2 = document.createElement('h2');
      h2.innerHTML = mdInline(block.heading);
      const p = document.createElement('p');
      p.innerHTML = mdInline(block.text);
      const form = document.createElement('form');
      form.className = 'cta-form';
      form.innerHTML = `
        <input type="email" name="email" placeholder="${escapeHtml(block.placeholder || t('ctaPlaceholder'))}" aria-label="${escapeHtml(block.placeholder || t('ctaPlaceholder'))}" required autocomplete="email" />
        <button type="submit" class="btn btn-primary">${escapeHtml(block.buttonText || t('ctaButton'))}</button>
        ${consentHtml()}
      `;
      const success = document.createElement('p');
      success.className = 'cta-success';
      success.hidden = true;
      success.textContent = block.successText || t('ctaSuccess');
      wrap.appendChild(h2);
      wrap.appendChild(p);
      wrap.appendChild(form);
      wrap.appendChild(success);
      return wrap;
    },

    // Diagnóstico interactivo de varias dimensiones con escala Likert,
    // que calcula un perfil y lo bloquea detrás de nombre + correo.
    // Ver references/content-schema.md → "Bloque diagnostic".
    diagnostic(block) {
      const wrap = document.createElement('div');
      wrap.className = 'diagnostic';
      mountDiagnostic(wrap, block);
      return wrap;
    },
  };

  /* =========================================================
     Leads — a dónde van el nombre y el correo que deja el lector.
     Se configura en content.json → meta.leads (sin tocar este archivo):
       emailjs: envía un correo con una plantilla de EmailJS (por ejemplo,
                el resultado del diagnóstico al lector, con copia al autor).
       webhook: envía los datos en JSON a una URL (CRM, n8n, Zapier, etc.).
     Sin meta.leads el libro funciona en modo demo: los datos quedan solo
     en el navegador del visitante.
     Ver references/leads-emailjs.md.
     ========================================================= */
  const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';

  function leadsConfig() { return (book && book.meta && book.meta.leads) || {}; }

  // Casilla de consentimiento (meta.leads.consent), para cualquier formulario.
  function consentHtml() {
    const consent = leadsConfig().consent;
    if (!consent || !consent.text) return '';
    return `<label class="consent-row"><input type="checkbox" name="consent"${consent.required === false ? '' : ' required'} /><span>${mdInline(consent.text)}</span></label>`;
  }
  function readConsent(form) {
    const box = form.querySelector('input[name="consent"]');
    return box ? box.checked : null;
  }

  async function deliverLead(lead) {
    const cfg = leadsConfig();
    const jobs = [];
    const ej = cfg.emailjs;
    const templateId = ej && ej.templates && ej.templates[lead.type];
    if (ej && ej.serviceId && ej.publicKey && templateId) {
      jobs.push(fetch(EMAILJS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service_id: ej.serviceId, template_id: templateId, user_id: ej.publicKey, template_params: lead.params }),
      }).then(res => { if (!res.ok) throw new Error('EmailJS respondió ' + res.status); return 'emailjs'; }));
    }
    if (cfg.webhook && cfg.webhook.url) {
      jobs.push(fetch(cfg.webhook.url, {
        method: 'POST',
        headers: { 'Content-Type': cfg.webhook.contentType || 'application/json' },
        body: JSON.stringify(lead),
      }).then(res => { if (!res.ok) throw new Error('El webhook respondió ' + res.status); return 'webhook'; }));
    }
    if (!jobs.length) return { configured: false, sent: [] };
    const results = await Promise.allSettled(jobs);
    const failed = results.filter(r => r.status === 'rejected');
    failed.forEach(r => console.error('[Libro Web] No se pudo enviar el lead:', r.reason));
    return { configured: true, sent: results.filter(r => r.status === 'fulfilled').map(r => r.value), failed: failed.length };
  }

  // Guarda el lead en este dispositivo y lo envía. Si el envío falla (sin
  // conexión, servicio caído) queda en cola y se reintenta más tarde.
  async function submitLead(lead) {
    const meta = book.meta || {};
    lead.date = new Date().toISOString();
    lead.book = plain(meta.title);
    lead.params = Object.assign({
      to_name: lead.name || '', to_email: lead.email, name: lead.name || '', email: lead.email,
      book_title: plain(meta.title), book_url: absUrl('./'), source: lead.source, date: lead.date,
      consent: lead.consent == null ? '' : (lead.consent ? 'sí' : 'no'),
    }, lead.params || {});

    const log = lsGet('leads', []);
    log.push({ type: lead.type, source: lead.source, name: lead.name, email: lead.email, consent: lead.consent, date: lead.date });
    lsSet('leads', log);

    let outcome;
    try { outcome = await deliverLead(lead); }
    catch (err) { console.error(err); outcome = { configured: true, sent: [], failed: 1 }; }
    if (outcome.configured && outcome.failed) {
      const pending = lsGet('pendingLeads', []);
      pending.push(lead);
      lsSet('pendingLeads', pending.slice(-20));
    }
    return outcome;
  }

  async function retryPendingLeads() {
    const pending = lsGet('pendingLeads', []);
    if (!pending.length || !navigator.onLine) return;
    lsSet('pendingLeads', []);
    const still = [];
    for (const lead of pending) {
      let outcome;
      try { outcome = await deliverLead(lead); } catch (e) { outcome = { failed: 1 }; }
      lead.attempts = (lead.attempts || 0) + 1;
      if (outcome.failed && lead.attempts < 5) still.push(lead);
    }
    if (still.length) lsSet('pendingLeads', lsGet('pendingLeads', []).concat(still));
  }

  function blockErrorNote(block) {
    const note = document.createElement('p');
    note.className = 'block-error';
    note.textContent = `${t('blockError')} (type: "${block && block.type}"${block && block.id ? `, id: "${block.id}"` : ''})`;
    return note;
  }

  function renderChapterBody(chapter) {
    els.chapterBody.innerHTML = '';
    (chapter.blocks || []).forEach((block, i) => {
      const renderer = block && blockRenderers[block.type];
      if (!renderer) {
        // tipo de bloque desconocido: se ignora sin romper el render
        console.warn('[Libro Web] Bloque ignorado, tipo desconocido:', block && block.type, 'en', chapter.id);
        return;
      }
      // Los bloques interactivos guardan su estado por id: si falta, se
      // deriva uno estable de la posición para que no choquen entre sí.
      if (!block.id) block.id = `${chapter.id}-${block.type}-${i}`;
      let node;
      try {
        node = renderer(block);
      } catch (err) {
        // un bloque mal formado no debe tumbar el capítulo entero
        console.error('[Libro Web] Error al mostrar un bloque en', chapter.id, block, err);
        node = blockErrorNote(block);
      }
      els.chapterBody.appendChild(node);
    });
  }

  /* =========================================================
     Diagnóstico — componente autocontenido: guarda respuestas y
     desbloqueo en localStorage, y maneja sus propios eventos (no
     depende de la delegación de eventos general).
     ========================================================= */
  function mountDiagnostic(container, block) {
    const dimensions = (Array.isArray(block.dimensions) ? block.dimensions : [])
      .filter(d => d && Array.isArray(d.items) && d.items.length)
      .map((d, i) => Object.assign({}, d, { id: d.id || 'dim-' + (i + 1) }));
    const profiles = Array.isArray(block.profiles) ? block.profiles : [];
    if (!dimensions.length || !profiles.length) {
      console.error('[Libro Web] Diagnóstico sin "dimensions" (con "items") o sin "profiles":', block.id);
      container.appendChild(blockErrorNote(block));
      return;
    }
    const scaleLabels = (Array.isArray(block.scaleLabels) && block.scaleLabels.length) ? block.scaleLabels : t('diagScale');
    const scaleMax = scaleLabels.length;

    function loadAnswers() {
      const saved = lsGet('diag_answers_' + block.id, null);
      const answers = {};
      dimensions.forEach(dim => {
        const savedDim = (saved && Array.isArray(saved[dim.id])) ? saved[dim.id] : [];
        answers[dim.id] = dim.items.map((_, i) => (typeof savedDim[i] === 'number' ? savedDim[i] : null));
      });
      return answers;
    }

    const state = {
      step: Math.max(0, Math.min(Number(lsGet('diag_step_' + block.id, 0)) || 0, dimensions.length)),
      answers: loadAnswers(),
      unlocked: lsGet('diag_unlocked_' + block.id, false),
    };

    function dimAnswered(dim) { return state.answers[dim.id].every(v => v !== null); }
    function allAnswered() { return dimensions.every(dimAnswered); }

    function toPct(avg) { return scaleMax > 1 ? Math.round(((avg - 1) / (scaleMax - 1)) * 100) : 100; }

    function computeScores() {
      const dimAverages = dimensions.map(dim => {
        const vals = state.answers[dim.id];
        const sum = vals.reduce((a, b) => a + b, 0);
        const avg = sum / vals.length;
        return { id: dim.id, label: dim.label, avg, sum, max: vals.length * scaleMax, pct: toPct(avg), dim };
      });
      const overall = dimAverages.reduce((a, d) => a + d.avg, 0) / dimAverages.length;
      return { dimAverages, overall };
    }

    // Dimensiones a las que conviene prestar atención primero
    // (block.priorities): las de menor puntaje, o las de mayor si la escala
    // mide un problema ("order": "highest"). En empates gana el orden del JSON.
    function pickPriorities(dimAverages) {
      const cfg = block.priorities;
      if (!cfg) return [];
      const dir = cfg.order === 'highest' ? -1 : 1;
      return dimAverages.map((d, i) => ({ d, i }))
        .sort((a, b) => (a.d.avg - b.d.avg) * dir || a.i - b.i)
        .slice(0, Math.max(1, Math.min(cfg.count || 3, dimAverages.length)))
        .map(x => x.d);
    }

    // Variables que recibe la plantilla de correo (EmailJS) o el webhook.
    function resultParams(dimAverages, overall) {
      const profile = pickByMax(profiles, overall);
      const stage = (Array.isArray(block.stages) && block.stages.length) ? pickByMax(block.stages, overall) : null;
      const pri = pickPriorities(dimAverages);
      const cfg = block.priorities || {};
      const mail = block.email || {};
      const params = {
        diagnostic_title: plain(block.title),
        overall_score: overall.toFixed(1), overall_pct: toPct(overall),
        profile_emoji: profile.emoji || '', profile_title: plain(profile.title),
        profile_strength: plain(profile.strength), profile_risk: plain(profile.risk), profile_next: plain(profile.next),
        stage_label: stage ? plain(stage.label) : '',
        priority_count: pri.length,
        image_hero: absUrl(mail.heroImage || (book.meta || {}).coverImage),
        image_closing: absUrl(mail.closingImage),
        cta_text: mail.ctaText || '', cta_url: mail.ctaUrl ? absUrl(mail.ctaUrl) : absUrl('./'),
      };
      dimAverages.forEach((d, i) => {
        params[`dim_${i + 1}_label`] = d.label;
        params[`dim_${i + 1}_pct`] = d.pct;
        params[`dim_${i + 1}_score`] = d.sum;
      });
      pri.forEach((d, i) => {
        const k = `priority_${i + 1}_`;
        params[k + 'label'] = d.label;
        params[k + 'score'] = d.sum;
        params[k + 'max'] = d.max;
        params[k + 'pct'] = d.pct;
        params[k + 'text'] = plain(d.dim.insight);
        params[k + 'advice'] = plain(d.dim.advice);
        params[k + 'image'] = absUrl(d.dim.image);
      });
      // Bloques ya armados, por si la plantilla prefiere {{{dims_html}}} y
      // {{{priorities_html}}} en vez de las variables sueltas.
      params.dims_html = dimAverages.map(d =>
        `<p style="margin:0 0 6px"><strong>${escapeHtml(d.label)}</strong>: ${d.pct}%</p>`).join('');
      params.priorities_html = pri.map((d, i) =>
        `<div style="margin:0 0 22px"><p style="margin:0 0 4px;font-size:12px;letter-spacing:2px;text-transform:uppercase">${escapeHtml(cfg.eyebrow || t('diagPriorityEyebrow'))} ${String(i + 1).padStart(2, '0')}</p>` +
        `<h3 style="margin:0 0 8px">${escapeHtml(d.label)}</h3>` +
        `<p style="margin:0 0 8px"><strong>${escapeHtml(cfg.levelLabel || t('diagPriorityLevel'))}:</strong> ${escapeHtml(t('diagPriorityOf', { score: d.sum, max: d.max }))}</p>` +
        (d.dim.insight ? `<p style="margin:0 0 8px">${escapeHtml(plain(d.dim.insight))}</p>` : '') +
        (d.dim.advice ? `<p style="margin:0"><strong>${escapeHtml(t('diagAdvice'))}:</strong> ${escapeHtml(plain(d.dim.advice))}</p>` : '') +
        '</div>').join('');
      return params;
    }

    function pickByMax(list, value) {
      return list.find(x => value <= x.max) || list[list.length - 1];
    }

    function render() {
      container.innerHTML = '';
      lsSet('diag_step_' + block.id, state.step);

      const eyebrow = document.createElement('p');
      eyebrow.className = 'diag-eyebrow';
      eyebrow.textContent = block.eyebrow || t('diagEyebrow');
      container.appendChild(eyebrow);

      const title = document.createElement('h3');
      title.className = 'diag-title';
      title.innerHTML = mdInline(block.title);
      container.appendChild(title);

      if (state.step === 0) {
        if (block.subtitle) {
          const subtitle = document.createElement('p');
          subtitle.className = 'diag-subtitle';
          subtitle.textContent = block.subtitle;
          container.appendChild(subtitle);
        }
        if (block.intro) {
          const intro = document.createElement('p');
          intro.className = 'diag-intro';
          intro.textContent = block.intro;
          container.appendChild(intro);
        }
      }

      const totalSteps = dimensions.length + 1;
      const dots = document.createElement('div');
      dots.className = 'diag-steps';
      dots.setAttribute('aria-hidden', 'true');
      for (let i = 0; i < totalSteps; i++) {
        const dot = document.createElement('span');
        dot.className = 'diag-step-dot' + (i < state.step ? ' done' : i === state.step ? ' active' : '');
        dots.appendChild(dot);
      }
      container.appendChild(dots);

      if (state.step < dimensions.length) {
        renderDimensionStep(dimensions[state.step]);
      } else {
        renderResultsStep();
      }
    }

    function goToStep(step) {
      state.step = step;
      render();
      // al cambiar de paso, volver al inicio del componente
      if (container.getBoundingClientRect().top < 0) container.scrollIntoView({ block: 'start' });
    }

    function renderDimensionStep(dim) {
      const dimLabel = document.createElement('p');
      dimLabel.className = 'diag-dim-label';
      dimLabel.textContent = t('diagDimension', { current: state.step + 1, total: dimensions.length, label: dim.label });
      container.appendChild(dimLabel);

      const dimQuestion = document.createElement('p');
      dimQuestion.className = 'diag-dim-question';
      dimQuestion.textContent = dim.question || '';
      container.appendChild(dimQuestion);

      const count = document.createElement('span');
      count.className = 'diag-count';
      const nextBtn = document.createElement('button');

      // Elegir una respuesta actualiza solo lo necesario (sin redibujar el
      // componente), para no perder el foco ni la posición de lectura.
      function refreshProgress() {
        const done = state.answers[dim.id].filter(v => v !== null).length;
        count.textContent = t('diagAnswered', { done, total: dim.items.length });
        nextBtn.disabled = !dimAnswered(dim);
      }

      dim.items.forEach((itemText, itemIdx) => {
        const itemWrap = document.createElement('div');
        itemWrap.className = 'diag-item';
        const p = document.createElement('p');
        p.className = 'diag-item-text';
        p.textContent = itemText;
        const scale = document.createElement('div');
        scale.className = 'diag-scale';
        scale.style.setProperty('--scale-cols', String(scaleMax));
        scale.setAttribute('role', 'group');
        scale.setAttribute('aria-label', itemText);
        scaleLabels.forEach((label, i) => {
          const value = i + 1;
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.textContent = label;
          const selected = state.answers[dim.id][itemIdx] === value;
          btn.classList.toggle('selected', selected);
          btn.setAttribute('aria-pressed', String(selected));
          btn.addEventListener('click', () => {
            state.answers[dim.id][itemIdx] = value;
            lsSet('diag_answers_' + block.id, state.answers);
            scale.querySelectorAll('button').forEach(b => {
              b.classList.toggle('selected', b === btn);
              b.setAttribute('aria-pressed', String(b === btn));
            });
            refreshProgress();
          });
          scale.appendChild(btn);
        });
        itemWrap.appendChild(p);
        itemWrap.appendChild(scale);
        container.appendChild(itemWrap);
      });

      const nav = document.createElement('div');
      nav.className = 'diag-nav';

      const backBtn = document.createElement('button');
      backBtn.type = 'button';
      backBtn.className = 'btn btn-ghost';
      backBtn.textContent = t('diagPrev');
      backBtn.disabled = state.step === 0;
      backBtn.addEventListener('click', () => goToStep(state.step - 1));

      nextBtn.type = 'button';
      nextBtn.className = 'btn btn-primary';
      const isLast = state.step === dimensions.length - 1;
      nextBtn.textContent = isLast ? t('diagSeeResult') : t('diagNext');
      nextBtn.addEventListener('click', () => goToStep(state.step + 1));
      refreshProgress();

      nav.appendChild(backBtn);
      nav.appendChild(count);
      nav.appendChild(nextBtn);
      container.appendChild(nav);
    }

    function renderResultsStep() {
      if (!allAnswered()) {
        const idx = dimensions.findIndex(d => !dimAnswered(d));
        state.step = idx === -1 ? 0 : idx;
        render();
        return;
      }

      const { dimAverages, overall } = computeScores();

      if (!state.unlocked) {
        renderGate();
      } else {
        renderFullResults(dimAverages, overall);
      }

      const backBtn = document.createElement('button');
      backBtn.type = 'button';
      backBtn.className = 'btn btn-ghost';
      backBtn.textContent = t('diagReview');
      backBtn.addEventListener('click', () => goToStep(dimensions.length - 1));
      container.appendChild(backBtn);
    }

    function renderGate() {
      const gate = block.gate || {};
      const wrap = document.createElement('div');
      wrap.className = 'diag-gate';
      wrap.innerHTML = `
        <h3>${escapeHtml(gate.heading || t('diagGateHeading'))}</h3>
        <ul>${(gate.bullets || []).map(b => `<li>✅ ${escapeHtml(b)}</li>`).join('')}</ul>
      `;
      const namePh = gate.namePlaceholder || t('diagNamePlaceholder');
      const emailPh = gate.emailPlaceholder || t('diagEmailPlaceholder');
      const form = document.createElement('form');
      form.className = 'diag-gate-form';
      form.innerHTML = `
        <input type="text" name="name" placeholder="${escapeHtml(namePh)}" aria-label="${escapeHtml(namePh)}" required autocomplete="name" />
        <input type="email" name="email" placeholder="${escapeHtml(emailPh)}" aria-label="${escapeHtml(emailPh)}" required autocomplete="email" />
        <button type="submit" class="btn btn-primary">${escapeHtml(gate.buttonText || t('diagSeeResult'))}</button>
        ${consentHtml()}
      `;
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = form.querySelector('input[name="name"]').value.trim();
        const email = form.querySelector('input[name="email"]').value.trim();
        if (!email) return;

        // El destino del lead se configura en content.json → meta.leads.
        // El resultado se muestra aunque el envío falle: queda en cola y se
        // reintenta solo.
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = t('sending');
        const { dimAverages, overall } = computeScores();
        const outcome = await submitLead({ type: 'diagnostic', source: 'diagnostico_' + block.id, name, email,
          consent: readConsent(form), params: resultParams(dimAverages, overall) });

        state.unlocked = true;
        lsSet('diag_unlocked_' + block.id, true);
        render();
        const emailed = outcome.configured && outcome.sent.indexOf('emailjs') !== -1;
        showToast(emailed ? t('diagEmailSent', { email }) : t('diagUnlocked'), emailed ? 5000 : 3200);
      });
      wrap.appendChild(form);
      if (gate.note) {
        const note = document.createElement('p');
        note.className = 'save-note diag-gate-note';
        note.textContent = gate.note;
        wrap.appendChild(note);
      }
      container.appendChild(wrap);
    }

    function renderFullResults(dimAverages, overall) {
      const profile = pickByMax(profiles, overall);
      const stage = (Array.isArray(block.stages) && block.stages.length) ? pickByMax(block.stages, overall) : null;

      const profileEl = document.createElement('div');
      profileEl.className = 'diag-profile';
      profileEl.innerHTML = `
        <div class="diag-profile-emoji" aria-hidden="true">${escapeHtml(profile.emoji || '')}</div>
        <div class="diag-profile-title">${escapeHtml(profile.title || '')}</div>
        <div class="diag-profile-row"><b>${escapeHtml(t('diagStrength'))}</b>${mdInline(profile.strength || '')}</div>
        <div class="diag-profile-row"><b>${escapeHtml(t('diagRisk'))}</b>${mdInline(profile.risk || '')}</div>
        <div class="diag-profile-row"><b>${escapeHtml(t('diagNextStep'))}</b>${mdInline(profile.next || '')}</div>
      `;
      container.appendChild(profileEl);

      // Barras de 0 a 100 %: la respuesta más baja en todo (1) es 0 % y la
      // más alta en todo es 100 %.
      const barsWrap = document.createElement('div');
      barsWrap.className = 'diag-bars';
      dimAverages.forEach(d => {
        const pct = d.pct;
        const row = document.createElement('div');
        row.className = 'diag-bar-row';
        row.innerHTML = `
          <div class="diag-bar-head"><span>${escapeHtml(d.label)}</span><span>${pct}%</span></div>
          <div class="diag-bar-track"><div class="diag-bar-fill" style="width:${Math.max(3, pct)}%"></div></div>
        `;
        barsWrap.appendChild(row);
      });
      container.appendChild(barsWrap);

      const pri = pickPriorities(dimAverages);
      if (pri.length) {
        const cfg = block.priorities;
        const wrap = document.createElement('div');
        wrap.className = 'diag-priorities';
        if (cfg.heading) {
          const h = document.createElement('h4');
          h.className = 'diag-priorities-heading';
          h.textContent = cfg.heading;
          wrap.appendChild(h);
        }
        pri.forEach((d, i) => {
          const card = document.createElement('div');
          card.className = 'diag-priority';
          card.innerHTML = `
            <div class="diag-priority-eyebrow">${escapeHtml(cfg.eyebrow || t('diagPriorityEyebrow'))} ${String(i + 1).padStart(2, '0')}</div>
            <div class="diag-priority-title">${escapeHtml(d.label)}</div>
            <div class="diag-priority-level"><b>${escapeHtml(cfg.levelLabel || t('diagPriorityLevel'))}:</b> ${escapeHtml(t('diagPriorityOf', { score: d.sum, max: d.max }))}</div>
            ${d.dim.insight ? `<div class="diag-priority-text">${mdInline(d.dim.insight)}</div>` : ''}
            ${d.dim.advice ? `<div class="diag-priority-text"><b>${escapeHtml(t('diagAdvice'))}</b>${mdInline(d.dim.advice)}</div>` : ''}
          `;
          wrap.appendChild(card);
        });
        container.appendChild(wrap);
      }

      if (stage) {
        const stageEl = document.createElement('div');
        stageEl.className = 'diag-stage';
        stageEl.innerHTML = `
          <div class="diag-stage-label">${escapeHtml(block.stageLabel || t('diagStage'))}</div>
          <div class="diag-stage-value">${escapeHtml(stage.label || '')}</div>
        `;
        container.appendChild(stageEl);
      }

      if (block.closingLine) {
        const closing = document.createElement('p');
        closing.className = 'diag-closing';
        closing.innerHTML = mdInline(block.closingLine);
        container.appendChild(closing);
      }
    }

    render();
  }

  /* ---- Delegación de eventos para los bloques interactivos simples ---- */
  els.chapterBody.addEventListener('input', (e) => {
    const block = e.target.closest('.reflection-block');
    if (block && e.target.tagName === 'TEXTAREA') {
      lsSet('reflection_' + block.dataset.reflectionId, e.target.value);
    }
  });

  els.chapterBody.addEventListener('click', (e) => {
    const optBtn = e.target.closest('.quiz-option');
    if (optBtn) {
      const block = optBtn.closest('.quiz-block');
      const idx = Number(optBtn.dataset.optionIndex);
      block.querySelectorAll('.quiz-option').forEach(b => {
        b.classList.toggle('selected', b === optBtn);
        b.setAttribute('aria-pressed', String(b === optBtn));
      });
      lsSet('quiz_' + block.dataset.quizId, idx);
      const chapter = chapters[currentIndex];
      const quizBlockData = (chapter.blocks || []).find(b => b.id === block.dataset.quizId);
      const feedback = block.querySelector('.quiz-feedback');
      feedback.hidden = false;
      feedback.textContent = (quizBlockData && quizBlockData.feedback) || t('quizFeedback');
    }
  });

  // Nota: este listener es solo para el CTA simple (bloque "cta"). El
  // formulario del diagnóstico usa la clase "diag-gate-form" y maneja su
  // propio submit, así evitamos que ambos se disparen a la vez.
  els.chapterBody.addEventListener('submit', (e) => {
    const form = e.target.closest('.cta-form');
    if (!form) return;
    e.preventDefault();
    const wrap = form.closest('.cta-block');
    if (!wrap) return;
    const email = form.querySelector('input[type="email"]').value.trim();
    if (!email) return;

    // El destino del correo se configura en content.json → meta.leads.
    submitLead({ type: 'cta', source: 'cta_' + wrap.dataset.ctaId, email, consent: readConsent(form),
      params: { chapter_id: chapters[currentIndex].id, chapter_title: chapters[currentIndex].title,
        image_hero: absUrl((book.meta || {}).coverImage) } });

    form.hidden = true;
    const success = wrap.querySelector('.cta-success');
    if (success) success.hidden = false;
    showToast(t('ctaToast'));
  });

  /* ---------------- Navegación entre capítulos ---------------- */
  function goToCover() {
    currentIndex = -1;
    els.cover.hidden = false;
    els.reader.hidden = true;
    // Quita el #capitulo de la URL sin disparar otro render.
    if (location.hash) {
      try { history.pushState(null, '', location.pathname + location.search); }
      catch (e) { location.hash = ''; }
    }
    updateResume();
    updateProgressBar();
    highlightActiveChapter();
    window.scrollTo(0, 0);
  }

  function goToChapter(id, opts = {}) {
    const idx = chapters.findIndex(c => c.id === id);
    if (idx === -1) return;
    currentIndex = idx;
    const chapter = chapters[idx];

    els.cover.hidden = true;
    els.reader.hidden = false;
    renderChapterHero(chapter);
    els.chapterKicker.textContent = chapter.kicker || '';
    els.chapterTitle.textContent = chapter.title;
    renderChapterBody(chapter);
    els.chapterPosition.textContent = `${idx + 1} / ${chapters.length}`;
    els.prevBtn.disabled = false;
    els.nextBtn.textContent = idx === chapters.length - 1 ? t('end') : t('next');

    if (opts.updateHash !== false && location.hash !== '#' + chapter.id) location.hash = chapter.id;

    const visited = getVisited();
    visited.add(chapter.id);
    saveVisited(visited);
    lsSet('lastChapter', chapter.id);

    renderSidebar(); // refresca marcas de "leído" y el capítulo activo
    window.scrollTo(0, 0);
    updateProgressBar();
    // Lleva el foco al título para lectores de pantalla y teclado.
    if (opts.focus !== false) els.chapterTitle.focus({ preventScroll: true });
  }

  // Avance de lectura del libro completo: capítulos ya pasados más lo
  // recorrido (scroll) del capítulo actual.
  function updateProgressBar() {
    let pct = 0;
    if (currentIndex >= 0 && chapters.length) {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const frac = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 1;
      pct = ((currentIndex + frac) / chapters.length) * 100;
    }
    els.progressBar.style.width = pct.toFixed(1) + '%';
  }

  function initScrollProgress() {
    window.addEventListener('scroll', updateProgressBar, { passive: true });
    window.addEventListener('resize', updateProgressBar);
  }

  /* ---------------- Sidebar (menú móvil) ---------------- */
  function openSidebar() {
    els.sidebar.classList.add('open');
    els.sidebarOverlay.hidden = false;
    els.menuToggle.setAttribute('aria-expanded', 'true');
    els.sidebarClose.focus();
  }
  function closeSidebar() {
    const wasOpen = els.sidebar.classList.contains('open');
    els.sidebar.classList.remove('open');
    els.sidebarOverlay.hidden = true;
    els.menuToggle.setAttribute('aria-expanded', 'false');
    return wasOpen;
  }

  /* ---------------- Tema claro/oscuro (opcional) ---------------- */
  function initTheme() {
    if (!els.themeToggle) return; // el libro no tiene toggle: usa un tema fijo
    const saved = lsGet('theme', null);
    if (saved) document.documentElement.setAttribute('data-theme', saved);
    els.themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      lsSet('theme', next);
    });
  }

  /* ---------------- Tamaño de letra de lectura (opcional) ---------------- */
  function initFontSize() {
    let idx = Number(lsGet('fontScale', 0)) || 0;
    if (idx < 0 || idx >= FONT_SCALES.length) idx = 0;
    const apply = () => {
      document.documentElement.style.setProperty('--reading-scale', String(FONT_SCALES[idx]));
      updateProgressBar();
    };
    apply();
    if (!els.fontSizeBtn) return;
    els.fontSizeBtn.addEventListener('click', () => {
      idx = (idx + 1) % FONT_SCALES.length;
      lsSet('fontScale', idx);
      apply();
    });
  }

  /* ---------------- Toast ---------------- */
  let toastTimer = null;
  function showToast(msg, ms = 3200) {
    els.toast.textContent = msg;
    els.toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.toast.classList.remove('show'), ms);
  }

  /* ---------------- Estado de conexión ---------------- */
  function initConnectivity() {
    const update = () => { els.offlineBadge.hidden = navigator.onLine; };
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    update();
  }

  /* ---------------- Instalación como app (PWA) ----------------
     Dos accesos: el ícono de la barra superior (solo cuando el navegador
     ofrece instalación directa) y un botón siempre visible al final del
     índice. Cuando el navegador no permite instalar con un clic (iPhone,
     Safari, Firefox), el botón del índice muestra los pasos a mano. */
  function initInstallPrompt() {
    let deferredPrompt = null;
    const ua = navigator.userAgent;
    const isIos = /iphone|ipad|ipod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isAndroid = /android/i.test(ua);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
    const manualSteps = () => t(isIos ? 'installIos' : isAndroid ? 'installAndroid' : 'installDesktop');

    const setInstalled = () => {
      els.installBtn.hidden = true;
      if (els.sidebarInstall) els.sidebarInstall.hidden = true;
      if (els.installHelp) { els.installHelp.hidden = false; els.installHelp.textContent = t('installDone'); }
    };
    if (els.sidebarInstall) els.sidebarInstall.hidden = isStandalone;
    if (isIos && !isStandalone) els.installBtn.hidden = false;

    const install = async (fromSidebar) => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        deferredPrompt = null;
        els.installBtn.hidden = true;
        if (choice && choice.outcome === 'accepted') setInstalled();
        return;
      }
      if (fromSidebar && els.installHelp) {
        els.installHelp.textContent = manualSteps();
        els.installHelp.hidden = false;
      } else {
        showToast(manualSteps(), 7000);
      }
    };

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      els.installBtn.hidden = false;
    });
    els.installBtn.addEventListener('click', () => install(false));
    if (els.sidebarInstall) els.sidebarInstall.addEventListener('click', () => install(true));
    window.addEventListener('appinstalled', setInstalled);
  }

  /* ---------------- Service worker ---------------- */
  function initServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js').catch(() => {
          /* si falla el registro (por ejemplo en file://), la app sigue funcionando online */
        });
      });
    }
  }

  // Pide al service worker que guarde todas las imágenes del libro que ya
  // existan, para que la lectura offline sea completa aunque el lector
  // todavía no haya abierto esos capítulos. Las que faltan se omiten.
  function warmOfflineCache() {
    if (!('serviceWorker' in navigator) || !navigator.onLine) return;
    const urls = new Set();
    if (book.meta && book.meta.coverImage) urls.add(book.meta.coverImage);
    chapters.forEach(ch => {
      const hero = normalizeHero(ch.hero);
      if (hero && hero.src) urls.add(hero.src);
      (ch.blocks || []).forEach(b => { if (b && b.type === 'image' && b.src) urls.add(b.src); });
    });
    if (!urls.size) return;
    navigator.serviceWorker.ready.then(reg => {
      if (reg.active) reg.active.postMessage({ type: 'PRECACHE', urls: Array.from(urls) });
    }).catch(() => { /* sin service worker: no hay nada que precargar */ });
  }

  /* ---------------- Enrutamiento simple por hash ---------------- */
  function initRouting() {
    window.addEventListener('hashchange', () => {
      const id = decodeURIComponent(location.hash.replace('#', ''));
      if (!id) {
        if (currentIndex !== -1) goToCover();
        return;
      }
      // goToChapter ya cambió el hash: no volver a renderizar lo mismo.
      if (chapters[currentIndex] && chapters[currentIndex].id === id) return;
      goToChapter(id, { updateHash: false });
    });
  }

  /* ---------------- Arranque ---------------- */
  async function init() {
    initTheme();
    initFontSize();
    initConnectivity();
    initInstallPrompt();
    initServiceWorker();
    initRouting();
    initScrollProgress();

    els.chapterTitle.setAttribute('tabindex', '-1');
    els.menuToggle.addEventListener('click', openSidebar);
    els.sidebarClose.addEventListener('click', closeSidebar);
    els.sidebarOverlay.addEventListener('click', closeSidebar);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && closeSidebar()) els.menuToggle.focus();
    });
    els.startBtn.addEventListener('click', () => { if (chapters.length) goToChapter(chapters[0].id); });
    if (els.resumeBtn) {
      els.resumeBtn.addEventListener('click', () => goToChapter(els.resumeBtn.dataset.chapterId));
    }
    els.prevBtn.addEventListener('click', () => {
      if (currentIndex <= 0) { goToCover(); return; }
      goToChapter(chapters[currentIndex - 1].id);
    });
    els.nextBtn.addEventListener('click', () => {
      if (currentIndex < chapters.length - 1) goToChapter(chapters[currentIndex + 1].id);
      else goToCover(); // el último capítulo devuelve a la portada
    });

    try {
      book = await loadContent();
      chapters = Array.isArray(book.chapters) ? book.chapters : [];
      ui = Object.assign({}, UI_DEFAULTS, (book.meta && book.meta.ui) || {});
    } catch (err) {
      els.chapterBody.innerHTML = '';
      els.coverTitle.textContent = t('loadErrorTitle');
      els.coverSubtitle.textContent = t('loadErrorText');
      els.startBtn.hidden = true;
      console.error(err);
      return;
    }

    computeChapterLabels();
    if (els.sidebarInstall) (els.sidebarInstall.querySelector('span') || els.sidebarInstall).textContent = t('install');
    renderCover();
    renderSidebar();
    retryPendingLeads();
    window.addEventListener('online', retryPendingLeads);

    const hashId = decodeURIComponent(location.hash.replace('#', ''));
    if (hashId && chapters.some(c => c.id === hashId)) {
      goToChapter(hashId, { updateHash: false, focus: false });
    } else {
      goToCover();
    }

    warmOfflineCache();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
