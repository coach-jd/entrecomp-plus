# Prompts de imágenes — EntreComp Plus: le apuesto al piloto, no al coche

Este documento reúne todas las imágenes del libro. Cada una tiene su ficha
y, si falta generarla, su prompt en formato JSON.

**Cómo usarlo**

1. Busca una imagen con **Estado: pendiente**.
2. Copia su bloque JSON completo, desde `{` hasta `}`.
3. Pégalo en tu generador de imágenes (Nano Banana u otro).
4. Descarga el resultado como JPG (unos 1600 px de ancho, menos de 400 KB)
   y guárdalo con la ruta y el nombre exactos del título de la ficha.
5. Sube el archivo al repositorio y recarga el libro: la imagen reemplaza
   sola al recuadro punteado. No hay que tocar código.

## Estilo común

- **Estilo:** fotorrealista. Fotografía editorial realista de automovilismo de resistencia, texturas reales, grano fino, sin apariencia de ilustración ni de render 3D.
- **Paleta:** `#161a2e` `#8a2f63` `#1d6672` `#f0a050` `#f7f5f0`
- **Mundo visual:** las 24 Horas de Le Mans. Boxes, radio, relevo de pilotos, noche y amanecer en la pista. El piloto es el emprendedor, el coche es la idea y los pits son el equipo y las conversaciones que lo sostienen.

Cada prompt ya incluye este estilo: se puede copiar solo, sin el resto del
documento.

## Portada

### `images/portada.jpg`

- **Uso:** portada del libro
- **Proporción:** 16:10
- **Estado:** pendiente
- **Descripción:** Un coche de resistencia con los faros encendidos sale del carril de boxes hacia la pista al anochecer, mientras el equipo lo observa desde el muro.

```json
{
  "type": "photorealistic photograph",
  "subject": "Un coche de resistencia con los faros encendidos sale del carril de boxes hacia la pista al anochecer, mientras el equipo lo observa desde el muro.",
  "setting": "Circuito de resistencia de 24 horas en el campo francés, al estilo de Le Mans: carril de boxes, garajes de las escuderías y pista, época actual.",
  "composition": "Plano general horizontal con aire alrededor del sujeto, nada importante pegado a los bordes; el tercio inferior limpio para que la imagen se funda con el título.",
  "lighting": "Luz de carrera de resistencia: mezcla de luz natural de la hora del día y focos del circuito, contraste suave y cinematográfico, tonos fríos azul marino con acentos cálidos naranja.",
  "camera": "Cámara full frame, lente de 28 mm, f/4.",
  "color_palette": [
    "#161a2e",
    "#8a2f63",
    "#1d6672",
    "#f0a050",
    "#f7f5f0"
  ],
  "mood": "Tensión serena, sensación de carrera larga que apenas comienza o continúa.",
  "style": "Fotografía editorial realista de automovilismo de resistencia, texturas reales, grano fino, sin apariencia de ilustración ni de render 3D.",
  "aspect_ratio": "16:10",
  "avoid": [
    "texto legible",
    "letras o números visibles",
    "logos o marcas de patrocinadores",
    "marcas de agua",
    "bordes o marcos",
    "manos o rostros deformes",
    "aspecto de foto de stock posada"
  ]
}
```
## Prólogo — Le aposté al coche

### `images/prologo-hero.jpg`

- **Uso:** imagen hero (abre el capítulo)
- **Proporción:** 16:9
- **Estado:** pendiente
- **Descripción:** Un coche de resistencia detenido en su box vacío, de noche, iluminado por la luz del garaje mientras la pista sigue encendida al fondo.

```json
{
  "type": "photorealistic photograph",
  "subject": "Un coche de resistencia detenido en su box vacío, de noche, iluminado por la luz del garaje mientras la pista sigue encendida al fondo.",
  "setting": "Circuito de resistencia de 24 horas en el campo francés, al estilo de Le Mans: carril de boxes, garajes de las escuderías y pista, época actual.",
  "composition": "Plano general amplio, sujeto entre el centro y un tercio, aire a los lados para recortes en celular.",
  "lighting": "Luz de carrera de resistencia: mezcla de luz natural de la hora del día y focos del circuito, contraste suave y cinematográfico, tonos fríos azul marino con acentos cálidos naranja.",
  "camera": "Cámara full frame, lente de 28 mm, f/4.",
  "color_palette": [
    "#161a2e",
    "#8a2f63",
    "#1d6672",
    "#f0a050",
    "#f7f5f0"
  ],
  "mood": "Tensión serena, sensación de carrera larga que apenas comienza o continúa.",
  "style": "Fotografía editorial realista de automovilismo de resistencia, texturas reales, grano fino, sin apariencia de ilustración ni de render 3D.",
  "aspect_ratio": "16:9",
  "avoid": [
    "texto legible",
    "letras o números visibles",
    "logos o marcas de patrocinadores",
    "marcas de agua",
    "bordes o marcos",
    "manos o rostros deformes",
    "aspecto de foto de stock posada"
  ]
}
```

### `images/prologo-1.jpg`

- **Uso:** imagen de apoyo dentro del texto
- **Proporción:** 3:2
- **Estado:** pendiente
- **Descripción:** Sobre un escritorio de madera, una libreta abierta con bocetos de guion gráfico a lápiz, una cámara de video antigua y una taza de café, bajo la luz de una lámpara.

```json
{
  "type": "photorealistic photograph",
  "subject": "Sobre un escritorio de madera, una libreta abierta con bocetos de guion gráfico a lápiz, una cámara de video antigua y una taza de café, bajo la luz de una lámpara.",
  "setting": "Escritorio de un emprendedor en una casa de Venezuela hacia 2010, de noche, ambiente íntimo.",
  "composition": "Plano medio o de detalle, sujeto en un tercio, fondo desenfocado.",
  "lighting": "Luz de carrera de resistencia: mezcla de luz natural de la hora del día y focos del circuito, contraste suave y cinematográfico, tonos fríos azul marino con acentos cálidos naranja.",
  "camera": "Cámara full frame, lente de 85 mm, f/2, poca profundidad de campo.",
  "color_palette": [
    "#161a2e",
    "#8a2f63",
    "#1d6672",
    "#f0a050",
    "#f7f5f0"
  ],
  "mood": "Concentración y oficio, atención al detalle.",
  "style": "Fotografía editorial realista de automovilismo de resistencia, texturas reales, grano fino, sin apariencia de ilustración ni de render 3D.",
  "aspect_ratio": "3:2",
  "avoid": [
    "texto legible",
    "letras o números visibles",
    "logos o marcas de patrocinadores",
    "marcas de agua",
    "bordes o marcos",
    "manos o rostros deformes",
    "aspecto de foto de stock posada"
  ]
}
```

## Capítulo 1 — Emprender también te transforma a ti

### `images/el-piloto-hero.jpg`

- **Uso:** imagen hero (abre el capítulo)
- **Proporción:** 16:9
- **Estado:** pendiente
- **Descripción:** Una piloto de resistencia, de perfil, se ajusta los guantes sentada en el borde del muro de boxes antes de su turno, con el casco a su lado.

```json
{
  "type": "photorealistic photograph",
  "subject": "Una piloto de resistencia, de perfil, se ajusta los guantes sentada en el borde del muro de boxes antes de su turno, con el casco a su lado.",
  "setting": "Circuito de resistencia de 24 horas en el campo francés, al estilo de Le Mans: carril de boxes, garajes de las escuderías y pista, época actual.",
  "composition": "Plano general amplio, sujeto entre el centro y un tercio, aire a los lados para recortes en celular.",
  "lighting": "Luz de carrera de resistencia: mezcla de luz natural de la hora del día y focos del circuito, contraste suave y cinematográfico, tonos fríos azul marino con acentos cálidos naranja.",
  "camera": "Cámara full frame, lente de 28 mm, f/4.",
  "color_palette": [
    "#161a2e",
    "#8a2f63",
    "#1d6672",
    "#f0a050",
    "#f7f5f0"
  ],
  "mood": "Tensión serena, sensación de carrera larga que apenas comienza o continúa.",
  "style": "Fotografía editorial realista de automovilismo de resistencia, texturas reales, grano fino, sin apariencia de ilustración ni de render 3D.",
  "aspect_ratio": "16:9",
  "avoid": [
    "texto legible",
    "letras o números visibles",
    "logos o marcas de patrocinadores",
    "marcas de agua",
    "bordes o marcos",
    "manos o rostros deformes",
    "aspecto de foto de stock posada"
  ]
}
```

### `images/el-piloto-1.jpg`

- **Uso:** imagen de apoyo dentro del texto
- **Proporción:** 3:2
- **Estado:** pendiente
- **Descripción:** Primer plano de las manos de un piloto con guantes sobre el volante de un coche de carreras, con el habitáculo en penumbra.

```json
{
  "type": "photorealistic photograph",
  "subject": "Primer plano de las manos de un piloto con guantes sobre el volante de un coche de carreras, con el habitáculo en penumbra.",
  "setting": "Circuito de resistencia de 24 horas en el campo francés, al estilo de Le Mans: carril de boxes, garajes de las escuderías y pista, época actual.",
  "composition": "Plano medio o de detalle, sujeto en un tercio, fondo desenfocado.",
  "lighting": "Luz de carrera de resistencia: mezcla de luz natural de la hora del día y focos del circuito, contraste suave y cinematográfico, tonos fríos azul marino con acentos cálidos naranja.",
  "camera": "Cámara full frame, lente de 85 mm, f/2, poca profundidad de campo.",
  "color_palette": [
    "#161a2e",
    "#8a2f63",
    "#1d6672",
    "#f0a050",
    "#f7f5f0"
  ],
  "mood": "Concentración y oficio, atención al detalle.",
  "style": "Fotografía editorial realista de automovilismo de resistencia, texturas reales, grano fino, sin apariencia de ilustración ni de render 3D.",
  "aspect_ratio": "3:2",
  "avoid": [
    "texto legible",
    "letras o números visibles",
    "logos o marcas de patrocinadores",
    "marcas de agua",
    "bordes o marcos",
    "manos o rostros deformes",
    "aspecto de foto de stock posada"
  ]
}
```

## Capítulo 2 — El mapa que recibimos de Europa

### `images/mapa-europeo-hero.jpg`

- **Uso:** imagen hero (abre el capítulo)
- **Proporción:** 16:9
- **Estado:** pendiente
- **Descripción:** Vista aérea al amanecer de un circuito de resistencia que serpentea entre bosques y campos, con la recta principal todavía vacía.

```json
{
  "type": "photorealistic photograph",
  "subject": "Vista aérea al amanecer de un circuito de resistencia que serpentea entre bosques y campos, con la recta principal todavía vacía.",
  "setting": "Circuito de resistencia de 24 horas en el campo francés, al estilo de Le Mans: carril de boxes, garajes de las escuderías y pista, época actual.",
  "composition": "Plano general amplio, sujeto entre el centro y un tercio, aire a los lados para recortes en celular.",
  "lighting": "Luz de carrera de resistencia: mezcla de luz natural de la hora del día y focos del circuito, contraste suave y cinematográfico, tonos fríos azul marino con acentos cálidos naranja.",
  "camera": "Cámara full frame, lente de 28 mm, f/4.",
  "color_palette": [
    "#161a2e",
    "#8a2f63",
    "#1d6672",
    "#f0a050",
    "#f7f5f0"
  ],
  "mood": "Tensión serena, sensación de carrera larga que apenas comienza o continúa.",
  "style": "Fotografía editorial realista de automovilismo de resistencia, texturas reales, grano fino, sin apariencia de ilustración ni de render 3D.",
  "aspect_ratio": "16:9",
  "avoid": [
    "texto legible",
    "letras o números visibles",
    "logos o marcas de patrocinadores",
    "marcas de agua",
    "bordes o marcos",
    "manos o rostros deformes",
    "aspecto de foto de stock posada"
  ]
}
```

### `images/mapa-europeo-1.jpg`

- **Uso:** imagen de apoyo dentro del texto
- **Proporción:** 3:2
- **Estado:** pendiente
- **Descripción:** Un ingeniero de pista, de espaldas, estudia un plano impreso del circuito extendido sobre la mesa del box, con marcas a lápiz que no se alcanzan a leer.

```json
{
  "type": "photorealistic photograph",
  "subject": "Un ingeniero de pista, de espaldas, estudia un plano impreso del circuito extendido sobre la mesa del box, con marcas a lápiz que no se alcanzan a leer.",
  "setting": "Circuito de resistencia de 24 horas en el campo francés, al estilo de Le Mans: carril de boxes, garajes de las escuderías y pista, época actual.",
  "composition": "Plano medio o de detalle, sujeto en un tercio, fondo desenfocado.",
  "lighting": "Luz de carrera de resistencia: mezcla de luz natural de la hora del día y focos del circuito, contraste suave y cinematográfico, tonos fríos azul marino con acentos cálidos naranja.",
  "camera": "Cámara full frame, lente de 85 mm, f/2, poca profundidad de campo.",
  "color_palette": [
    "#161a2e",
    "#8a2f63",
    "#1d6672",
    "#f0a050",
    "#f7f5f0"
  ],
  "mood": "Concentración y oficio, atención al detalle.",
  "style": "Fotografía editorial realista de automovilismo de resistencia, texturas reales, grano fino, sin apariencia de ilustración ni de render 3D.",
  "aspect_ratio": "3:2",
  "avoid": [
    "texto legible",
    "letras o números visibles",
    "logos o marcas de patrocinadores",
    "marcas de agua",
    "bordes o marcos",
    "manos o rostros deformes",
    "aspecto de foto de stock posada"
  ]
}
```

## Capítulo 3 — Lo que se decide en los pits

### `images/los-pits-hero.jpg`

- **Uso:** imagen hero (abre el capítulo)
- **Proporción:** 16:9
- **Estado:** pendiente
- **Descripción:** Un coche de resistencia entra de noche al carril de boxes mientras el equipo, con cascos y auriculares, lo espera en posición bajo las luces.

```json
{
  "type": "photorealistic photograph",
  "subject": "Un coche de resistencia entra de noche al carril de boxes mientras el equipo, con cascos y auriculares, lo espera en posición bajo las luces.",
  "setting": "Circuito de resistencia de 24 horas en el campo francés, al estilo de Le Mans: carril de boxes, garajes de las escuderías y pista, época actual.",
  "composition": "Plano general amplio, sujeto entre el centro y un tercio, aire a los lados para recortes en celular.",
  "lighting": "Luz de carrera de resistencia: mezcla de luz natural de la hora del día y focos del circuito, contraste suave y cinematográfico, tonos fríos azul marino con acentos cálidos naranja.",
  "camera": "Cámara full frame, lente de 28 mm, f/4.",
  "color_palette": [
    "#161a2e",
    "#8a2f63",
    "#1d6672",
    "#f0a050",
    "#f7f5f0"
  ],
  "mood": "Tensión serena, sensación de carrera larga que apenas comienza o continúa.",
  "style": "Fotografía editorial realista de automovilismo de resistencia, texturas reales, grano fino, sin apariencia de ilustración ni de render 3D.",
  "aspect_ratio": "16:9",
  "avoid": [
    "texto legible",
    "letras o números visibles",
    "logos o marcas de patrocinadores",
    "marcas de agua",
    "bordes o marcos",
    "manos o rostros deformes",
    "aspecto de foto de stock posada"
  ]
}
```

### `images/los-pits-1.jpg`

- **Uso:** imagen de apoyo dentro del texto
- **Proporción:** 3:2
- **Estado:** pendiente
- **Descripción:** Detalle de los auriculares y el micrófono de radio de un ingeniero de pista apoyados sobre el muro de boxes, con la pista desenfocada al fondo.

```json
{
  "type": "photorealistic photograph",
  "subject": "Detalle de los auriculares y el micrófono de radio de un ingeniero de pista apoyados sobre el muro de boxes, con la pista desenfocada al fondo.",
  "setting": "Circuito de resistencia de 24 horas en el campo francés, al estilo de Le Mans: carril de boxes, garajes de las escuderías y pista, época actual.",
  "composition": "Plano medio o de detalle, sujeto en un tercio, fondo desenfocado.",
  "lighting": "Luz de carrera de resistencia: mezcla de luz natural de la hora del día y focos del circuito, contraste suave y cinematográfico, tonos fríos azul marino con acentos cálidos naranja.",
  "camera": "Cámara full frame, lente de 85 mm, f/2, poca profundidad de campo.",
  "color_palette": [
    "#161a2e",
    "#8a2f63",
    "#1d6672",
    "#f0a050",
    "#f7f5f0"
  ],
  "mood": "Concentración y oficio, atención al detalle.",
  "style": "Fotografía editorial realista de automovilismo de resistencia, texturas reales, grano fino, sin apariencia de ilustración ni de render 3D.",
  "aspect_ratio": "3:2",
  "avoid": [
    "texto legible",
    "letras o números visibles",
    "logos o marcas de patrocinadores",
    "marcas de agua",
    "bordes o marcos",
    "manos o rostros deformes",
    "aspecto de foto de stock posada"
  ]
}
```

## Capítulo 4 — Describir el mundo antes de interpretarlo

### `images/afirmaciones-hero.jpg`

- **Uso:** imagen hero (abre el capítulo)
- **Proporción:** 16:9
- **Estado:** pendiente
- **Descripción:** Un piloto, con el casco puesto y la visera levantada, habla por radio desde el habitáculo mientras recorre la pista al atardecer.

```json
{
  "type": "photorealistic photograph",
  "subject": "Un piloto, con el casco puesto y la visera levantada, habla por radio desde el habitáculo mientras recorre la pista al atardecer.",
  "setting": "Circuito de resistencia de 24 horas en el campo francés, al estilo de Le Mans: carril de boxes, garajes de las escuderías y pista, época actual.",
  "composition": "Plano general amplio, sujeto entre el centro y un tercio, aire a los lados para recortes en celular.",
  "lighting": "Luz de carrera de resistencia: mezcla de luz natural de la hora del día y focos del circuito, contraste suave y cinematográfico, tonos fríos azul marino con acentos cálidos naranja.",
  "camera": "Cámara full frame, lente de 28 mm, f/4.",
  "color_palette": [
    "#161a2e",
    "#8a2f63",
    "#1d6672",
    "#f0a050",
    "#f7f5f0"
  ],
  "mood": "Tensión serena, sensación de carrera larga que apenas comienza o continúa.",
  "style": "Fotografía editorial realista de automovilismo de resistencia, texturas reales, grano fino, sin apariencia de ilustración ni de render 3D.",
  "aspect_ratio": "16:9",
  "avoid": [
    "texto legible",
    "letras o números visibles",
    "logos o marcas de patrocinadores",
    "marcas de agua",
    "bordes o marcos",
    "manos o rostros deformes",
    "aspecto de foto de stock posada"
  ]
}
```

### `images/afirmaciones-1.jpg`

- **Uso:** imagen de apoyo dentro del texto
- **Proporción:** 3:2
- **Estado:** pendiente
- **Descripción:** Manos que toman notas en una libreta junto a una pantalla de tiempos por vuelta completamente desenfocada, en el muro de boxes.

```json
{
  "type": "photorealistic photograph",
  "subject": "Manos que toman notas en una libreta junto a una pantalla de tiempos por vuelta completamente desenfocada, en el muro de boxes.",
  "setting": "Circuito de resistencia de 24 horas en el campo francés, al estilo de Le Mans: carril de boxes, garajes de las escuderías y pista, época actual.",
  "composition": "Plano medio o de detalle, sujeto en un tercio, fondo desenfocado.",
  "lighting": "Luz de carrera de resistencia: mezcla de luz natural de la hora del día y focos del circuito, contraste suave y cinematográfico, tonos fríos azul marino con acentos cálidos naranja.",
  "camera": "Cámara full frame, lente de 85 mm, f/2, poca profundidad de campo.",
  "color_palette": [
    "#161a2e",
    "#8a2f63",
    "#1d6672",
    "#f0a050",
    "#f7f5f0"
  ],
  "mood": "Concentración y oficio, atención al detalle.",
  "style": "Fotografía editorial realista de automovilismo de resistencia, texturas reales, grano fino, sin apariencia de ilustración ni de render 3D.",
  "aspect_ratio": "3:2",
  "avoid": [
    "texto legible",
    "letras o números visibles",
    "logos o marcas de patrocinadores",
    "marcas de agua",
    "bordes o marcos",
    "manos o rostros deformes",
    "aspecto de foto de stock posada"
  ]
}
```

## Capítulo 5 — Declarar un rumbo y hacerte responsable

### `images/declaraciones-hero.jpg`

- **Uso:** imagen hero (abre el capítulo)
- **Proporción:** 16:9
- **Estado:** pendiente
- **Descripción:** La bandera tricolor ondea en lo alto sobre la parrilla de salida mientras los coches esperan alineados al caer la tarde.

```json
{
  "type": "photorealistic photograph",
  "subject": "La bandera tricolor ondea en lo alto sobre la parrilla de salida mientras los coches esperan alineados al caer la tarde.",
  "setting": "Circuito de resistencia de 24 horas en el campo francés, al estilo de Le Mans: carril de boxes, garajes de las escuderías y pista, época actual.",
  "composition": "Plano general amplio, sujeto entre el centro y un tercio, aire a los lados para recortes en celular.",
  "lighting": "Luz de carrera de resistencia: mezcla de luz natural de la hora del día y focos del circuito, contraste suave y cinematográfico, tonos fríos azul marino con acentos cálidos naranja.",
  "camera": "Cámara full frame, lente de 28 mm, f/4.",
  "color_palette": [
    "#161a2e",
    "#8a2f63",
    "#1d6672",
    "#f0a050",
    "#f7f5f0"
  ],
  "mood": "Tensión serena, sensación de carrera larga que apenas comienza o continúa.",
  "style": "Fotografía editorial realista de automovilismo de resistencia, texturas reales, grano fino, sin apariencia de ilustración ni de render 3D.",
  "aspect_ratio": "16:9",
  "avoid": [
    "texto legible",
    "letras o números visibles",
    "logos o marcas de patrocinadores",
    "marcas de agua",
    "bordes o marcos",
    "manos o rostros deformes",
    "aspecto de foto de stock posada"
  ]
}
```

### `images/declaraciones-1.jpg`

- **Uso:** imagen de apoyo dentro del texto
- **Proporción:** 3:2
- **Estado:** pendiente
- **Descripción:** Primer plano de la mano enguantada de un comisario de pista que sostiene una bandera enrollada, a punto de desplegarla.

```json
{
  "type": "photorealistic photograph",
  "subject": "Primer plano de la mano enguantada de un comisario de pista que sostiene una bandera enrollada, a punto de desplegarla.",
  "setting": "Circuito de resistencia de 24 horas en el campo francés, al estilo de Le Mans: carril de boxes, garajes de las escuderías y pista, época actual.",
  "composition": "Plano medio o de detalle, sujeto en un tercio, fondo desenfocado.",
  "lighting": "Luz de carrera de resistencia: mezcla de luz natural de la hora del día y focos del circuito, contraste suave y cinematográfico, tonos fríos azul marino con acentos cálidos naranja.",
  "camera": "Cámara full frame, lente de 85 mm, f/2, poca profundidad de campo.",
  "color_palette": [
    "#161a2e",
    "#8a2f63",
    "#1d6672",
    "#f0a050",
    "#f7f5f0"
  ],
  "mood": "Concentración y oficio, atención al detalle.",
  "style": "Fotografía editorial realista de automovilismo de resistencia, texturas reales, grano fino, sin apariencia de ilustración ni de render 3D.",
  "aspect_ratio": "3:2",
  "avoid": [
    "texto legible",
    "letras o números visibles",
    "logos o marcas de patrocinadores",
    "marcas de agua",
    "bordes o marcos",
    "manos o rostros deformes",
    "aspecto de foto de stock posada"
  ]
}
```

## Capítulo 6 — Una buena intención todavía necesita un acuerdo

### `images/coordinar-acciones-hero.jpg`

- **Uso:** imagen hero (abre el capítulo)
- **Proporción:** 16:9
- **Estado:** pendiente
- **Descripción:** Un equipo de mecánicos coordinados rodea un coche detenido en el carril de boxes durante una parada nocturna, con movimiento congelado por el flash.

```json
{
  "type": "photorealistic photograph",
  "subject": "Un equipo de mecánicos coordinados rodea un coche detenido en el carril de boxes durante una parada nocturna, con movimiento congelado por el flash.",
  "setting": "Circuito de resistencia de 24 horas en el campo francés, al estilo de Le Mans: carril de boxes, garajes de las escuderías y pista, época actual.",
  "composition": "Plano general amplio, sujeto entre el centro y un tercio, aire a los lados para recortes en celular.",
  "lighting": "Luz de carrera de resistencia: mezcla de luz natural de la hora del día y focos del circuito, contraste suave y cinematográfico, tonos fríos azul marino con acentos cálidos naranja.",
  "camera": "Cámara full frame, lente de 28 mm, f/4.",
  "color_palette": [
    "#161a2e",
    "#8a2f63",
    "#1d6672",
    "#f0a050",
    "#f7f5f0"
  ],
  "mood": "Tensión serena, sensación de carrera larga que apenas comienza o continúa.",
  "style": "Fotografía editorial realista de automovilismo de resistencia, texturas reales, grano fino, sin apariencia de ilustración ni de render 3D.",
  "aspect_ratio": "16:9",
  "avoid": [
    "texto legible",
    "letras o números visibles",
    "logos o marcas de patrocinadores",
    "marcas de agua",
    "bordes o marcos",
    "manos o rostros deformes",
    "aspecto de foto de stock posada"
  ]
}
```

### `images/coordinar-acciones-1.jpg`

- **Uso:** imagen de apoyo dentro del texto
- **Proporción:** 3:2
- **Estado:** pendiente
- **Descripción:** Detalle de un mecánico arrodillado que sujeta la pistola neumática sobre la rueda, esperando la señal de su compañero.

```json
{
  "type": "photorealistic photograph",
  "subject": "Detalle de un mecánico arrodillado que sujeta la pistola neumática sobre la rueda, esperando la señal de su compañero.",
  "setting": "Circuito de resistencia de 24 horas en el campo francés, al estilo de Le Mans: carril de boxes, garajes de las escuderías y pista, época actual.",
  "composition": "Plano medio o de detalle, sujeto en un tercio, fondo desenfocado.",
  "lighting": "Luz de carrera de resistencia: mezcla de luz natural de la hora del día y focos del circuito, contraste suave y cinematográfico, tonos fríos azul marino con acentos cálidos naranja.",
  "camera": "Cámara full frame, lente de 85 mm, f/2, poca profundidad de campo.",
  "color_palette": [
    "#161a2e",
    "#8a2f63",
    "#1d6672",
    "#f0a050",
    "#f7f5f0"
  ],
  "mood": "Concentración y oficio, atención al detalle.",
  "style": "Fotografía editorial realista de automovilismo de resistencia, texturas reales, grano fino, sin apariencia de ilustración ni de render 3D.",
  "aspect_ratio": "3:2",
  "avoid": [
    "texto legible",
    "letras o números visibles",
    "logos o marcas de patrocinadores",
    "marcas de agua",
    "bordes o marcos",
    "manos o rostros deformes",
    "aspecto de foto de stock posada"
  ]
}
```

## Capítulo 7 — La conversación que cuesta escuchar

### `images/retroalimentacion-hero.jpg`

- **Uso:** imagen hero (abre el capítulo)
- **Proporción:** 16:9
- **Estado:** pendiente
- **Descripción:** Una piloto y su ingeniero revisan juntos los datos de la tanda en una computadora portátil dentro del box, con la pantalla fuera de foco.

```json
{
  "type": "photorealistic photograph",
  "subject": "Una piloto y su ingeniero revisan juntos los datos de la tanda en una computadora portátil dentro del box, con la pantalla fuera de foco.",
  "setting": "Circuito de resistencia de 24 horas en el campo francés, al estilo de Le Mans: carril de boxes, garajes de las escuderías y pista, época actual.",
  "composition": "Plano general amplio, sujeto entre el centro y un tercio, aire a los lados para recortes en celular.",
  "lighting": "Luz de carrera de resistencia: mezcla de luz natural de la hora del día y focos del circuito, contraste suave y cinematográfico, tonos fríos azul marino con acentos cálidos naranja.",
  "camera": "Cámara full frame, lente de 28 mm, f/4.",
  "color_palette": [
    "#161a2e",
    "#8a2f63",
    "#1d6672",
    "#f0a050",
    "#f7f5f0"
  ],
  "mood": "Tensión serena, sensación de carrera larga que apenas comienza o continúa.",
  "style": "Fotografía editorial realista de automovilismo de resistencia, texturas reales, grano fino, sin apariencia de ilustración ni de render 3D.",
  "aspect_ratio": "16:9",
  "avoid": [
    "texto legible",
    "letras o números visibles",
    "logos o marcas de patrocinadores",
    "marcas de agua",
    "bordes o marcos",
    "manos o rostros deformes",
    "aspecto de foto de stock posada"
  ]
}
```

### `images/retroalimentacion-1.jpg`

- **Uso:** imagen de apoyo dentro del texto
- **Proporción:** 3:2
- **Estado:** pendiente
- **Descripción:** Un casco de carreras apoyado sobre una mesa del box junto a unas hojas de tiempos boca abajo, bajo una luz cálida.

```json
{
  "type": "photorealistic photograph",
  "subject": "Un casco de carreras apoyado sobre una mesa del box junto a unas hojas de tiempos boca abajo, bajo una luz cálida.",
  "setting": "Circuito de resistencia de 24 horas en el campo francés, al estilo de Le Mans: carril de boxes, garajes de las escuderías y pista, época actual.",
  "composition": "Plano medio o de detalle, sujeto en un tercio, fondo desenfocado.",
  "lighting": "Luz de carrera de resistencia: mezcla de luz natural de la hora del día y focos del circuito, contraste suave y cinematográfico, tonos fríos azul marino con acentos cálidos naranja.",
  "camera": "Cámara full frame, lente de 85 mm, f/2, poca profundidad de campo.",
  "color_palette": [
    "#161a2e",
    "#8a2f63",
    "#1d6672",
    "#f0a050",
    "#f7f5f0"
  ],
  "mood": "Concentración y oficio, atención al detalle.",
  "style": "Fotografía editorial realista de automovilismo de resistencia, texturas reales, grano fino, sin apariencia de ilustración ni de render 3D.",
  "aspect_ratio": "3:2",
  "avoid": [
    "texto legible",
    "letras o números visibles",
    "logos o marcas de patrocinadores",
    "marcas de agua",
    "bordes o marcos",
    "manos o rostros deformes",
    "aspecto de foto de stock posada"
  ]
}
```

## Capítulo 8 — Diseñar la conversación que tu proyecto necesita

### `images/disenar-conversaciones-hero.jpg`

- **Uso:** imagen hero (abre el capítulo)
- **Proporción:** 16:9
- **Estado:** pendiente
- **Descripción:** El equipo de una escudería reunido alrededor de una mesa en el garaje, de noche, conversando la estrategia de carrera con el coche cubierto al fondo.

```json
{
  "type": "photorealistic photograph",
  "subject": "El equipo de una escudería reunido alrededor de una mesa en el garaje, de noche, conversando la estrategia de carrera con el coche cubierto al fondo.",
  "setting": "Circuito de resistencia de 24 horas en el campo francés, al estilo de Le Mans: carril de boxes, garajes de las escuderías y pista, época actual.",
  "composition": "Plano general amplio, sujeto entre el centro y un tercio, aire a los lados para recortes en celular.",
  "lighting": "Luz de carrera de resistencia: mezcla de luz natural de la hora del día y focos del circuito, contraste suave y cinematográfico, tonos fríos azul marino con acentos cálidos naranja.",
  "camera": "Cámara full frame, lente de 28 mm, f/4.",
  "color_palette": [
    "#161a2e",
    "#8a2f63",
    "#1d6672",
    "#f0a050",
    "#f7f5f0"
  ],
  "mood": "Tensión serena, sensación de carrera larga que apenas comienza o continúa.",
  "style": "Fotografía editorial realista de automovilismo de resistencia, texturas reales, grano fino, sin apariencia de ilustración ni de render 3D.",
  "aspect_ratio": "16:9",
  "avoid": [
    "texto legible",
    "letras o números visibles",
    "logos o marcas de patrocinadores",
    "marcas de agua",
    "bordes o marcos",
    "manos o rostros deformes",
    "aspecto de foto de stock posada"
  ]
}
```

### `images/disenar-conversaciones-1.jpg`

- **Uso:** imagen de apoyo dentro del texto
- **Proporción:** 3:2
- **Estado:** pendiente
- **Descripción:** Dos personas conversan sentadas frente a frente en una mesa sencilla del box, con tazas de café y una libreta abierta, vistas de perfil.

```json
{
  "type": "photorealistic photograph",
  "subject": "Dos personas conversan sentadas frente a frente en una mesa sencilla del box, con tazas de café y una libreta abierta, vistas de perfil.",
  "setting": "Circuito de resistencia de 24 horas en el campo francés, al estilo de Le Mans: carril de boxes, garajes de las escuderías y pista, época actual.",
  "composition": "Plano medio o de detalle, sujeto en un tercio, fondo desenfocado.",
  "lighting": "Luz de carrera de resistencia: mezcla de luz natural de la hora del día y focos del circuito, contraste suave y cinematográfico, tonos fríos azul marino con acentos cálidos naranja.",
  "camera": "Cámara full frame, lente de 85 mm, f/2, poca profundidad de campo.",
  "color_palette": [
    "#161a2e",
    "#8a2f63",
    "#1d6672",
    "#f0a050",
    "#f7f5f0"
  ],
  "mood": "Concentración y oficio, atención al detalle.",
  "style": "Fotografía editorial realista de automovilismo de resistencia, texturas reales, grano fino, sin apariencia de ilustración ni de render 3D.",
  "aspect_ratio": "3:2",
  "avoid": [
    "texto legible",
    "letras o números visibles",
    "logos o marcas de patrocinadores",
    "marcas de agua",
    "bordes o marcos",
    "manos o rostros deformes",
    "aspecto de foto de stock posada"
  ]
}
```

### `images/disenar-conversaciones-2.jpg`

- **Uso:** imagen de apoyo dentro del texto
- **Proporción:** 3:2
- **Estado:** pendiente
- **Descripción:** Una mochila ecológica de tela gris dentro de una caja de envío abierta sobre una mesa, junto a un teléfono con la pantalla apagada.

```json
{
  "type": "photorealistic photograph",
  "subject": "Una mochila ecológica de tela gris dentro de una caja de envío abierta sobre una mesa, junto a un teléfono con la pantalla apagada.",
  "setting": "Mesa de trabajo de un pequeño emprendimiento, de día, luz de ventana.",
  "composition": "Plano medio o de detalle, sujeto en un tercio, fondo desenfocado.",
  "lighting": "Luz de carrera de resistencia: mezcla de luz natural de la hora del día y focos del circuito, contraste suave y cinematográfico, tonos fríos azul marino con acentos cálidos naranja.",
  "camera": "Cámara full frame, lente de 85 mm, f/2, poca profundidad de campo.",
  "color_palette": [
    "#161a2e",
    "#8a2f63",
    "#1d6672",
    "#f0a050",
    "#f7f5f0"
  ],
  "mood": "Concentración y oficio, atención al detalle.",
  "style": "Fotografía editorial realista de automovilismo de resistencia, texturas reales, grano fino, sin apariencia de ilustración ni de render 3D.",
  "aspect_ratio": "3:2",
  "avoid": [
    "texto legible",
    "letras o números visibles",
    "logos o marcas de patrocinadores",
    "marcas de agua",
    "bordes o marcos",
    "manos o rostros deformes",
    "aspecto de foto de stock posada"
  ]
}
```

## Capítulo 9 — Las otras tres áreas, vistas desde la conversación

### `images/las-tres-areas-hero.jpg`

- **Uso:** imagen hero (abre el capítulo)
- **Proporción:** 16:9
- **Estado:** pendiente
- **Descripción:** Un coche de resistencia con los faros encendidos atraviesa una curva de noche, con estelas de luz y el público difuminado detrás de las vallas.

```json
{
  "type": "photorealistic photograph",
  "subject": "Un coche de resistencia con los faros encendidos atraviesa una curva de noche, con estelas de luz y el público difuminado detrás de las vallas.",
  "setting": "Circuito de resistencia de 24 horas en el campo francés, al estilo de Le Mans: carril de boxes, garajes de las escuderías y pista, época actual.",
  "composition": "Plano general amplio, sujeto entre el centro y un tercio, aire a los lados para recortes en celular.",
  "lighting": "Luz de carrera de resistencia: mezcla de luz natural de la hora del día y focos del circuito, contraste suave y cinematográfico, tonos fríos azul marino con acentos cálidos naranja.",
  "camera": "Cámara full frame, lente de 28 mm, f/4.",
  "color_palette": [
    "#161a2e",
    "#8a2f63",
    "#1d6672",
    "#f0a050",
    "#f7f5f0"
  ],
  "mood": "Tensión serena, sensación de carrera larga que apenas comienza o continúa.",
  "style": "Fotografía editorial realista de automovilismo de resistencia, texturas reales, grano fino, sin apariencia de ilustración ni de render 3D.",
  "aspect_ratio": "16:9",
  "avoid": [
    "texto legible",
    "letras o números visibles",
    "logos o marcas de patrocinadores",
    "marcas de agua",
    "bordes o marcos",
    "manos o rostros deformes",
    "aspecto de foto de stock posada"
  ]
}
```

### `images/las-tres-areas-1.jpg`

- **Uso:** imagen de apoyo dentro del texto
- **Proporción:** 3:2
- **Estado:** pendiente
- **Descripción:** Juegos de neumáticos apilados y bidones de combustible ordenados contra la pared de un garaje de carreras, iluminados por tubos fluorescentes.

```json
{
  "type": "photorealistic photograph",
  "subject": "Juegos de neumáticos apilados y bidones de combustible ordenados contra la pared de un garaje de carreras, iluminados por tubos fluorescentes.",
  "setting": "Circuito de resistencia de 24 horas en el campo francés, al estilo de Le Mans: carril de boxes, garajes de las escuderías y pista, época actual.",
  "composition": "Plano medio o de detalle, sujeto en un tercio, fondo desenfocado.",
  "lighting": "Luz de carrera de resistencia: mezcla de luz natural de la hora del día y focos del circuito, contraste suave y cinematográfico, tonos fríos azul marino con acentos cálidos naranja.",
  "camera": "Cámara full frame, lente de 85 mm, f/2, poca profundidad de campo.",
  "color_palette": [
    "#161a2e",
    "#8a2f63",
    "#1d6672",
    "#f0a050",
    "#f7f5f0"
  ],
  "mood": "Concentración y oficio, atención al detalle.",
  "style": "Fotografía editorial realista de automovilismo de resistencia, texturas reales, grano fino, sin apariencia de ilustración ni de render 3D.",
  "aspect_ratio": "3:2",
  "avoid": [
    "texto legible",
    "letras o números visibles",
    "logos o marcas de patrocinadores",
    "marcas de agua",
    "bordes o marcos",
    "manos o rostros deformes",
    "aspecto de foto de stock posada"
  ]
}
```

### `images/las-tres-areas-2.jpg`

- **Uso:** imagen de apoyo dentro del texto
- **Proporción:** 3:2
- **Estado:** pendiente
- **Descripción:** Desde la tribuna, la recta principal de noche con varios coches que pasan dejando estelas de luz roja y blanca.

```json
{
  "type": "photorealistic photograph",
  "subject": "Desde la tribuna, la recta principal de noche con varios coches que pasan dejando estelas de luz roja y blanca.",
  "setting": "Circuito de resistencia de 24 horas en el campo francés, al estilo de Le Mans: carril de boxes, garajes de las escuderías y pista, época actual.",
  "composition": "Plano medio o de detalle, sujeto en un tercio, fondo desenfocado.",
  "lighting": "Luz de carrera de resistencia: mezcla de luz natural de la hora del día y focos del circuito, contraste suave y cinematográfico, tonos fríos azul marino con acentos cálidos naranja.",
  "camera": "Cámara full frame, lente de 85 mm, f/2, poca profundidad de campo.",
  "color_palette": [
    "#161a2e",
    "#8a2f63",
    "#1d6672",
    "#f0a050",
    "#f7f5f0"
  ],
  "mood": "Concentración y oficio, atención al detalle.",
  "style": "Fotografía editorial realista de automovilismo de resistencia, texturas reales, grano fino, sin apariencia de ilustración ni de render 3D.",
  "aspect_ratio": "3:2",
  "avoid": [
    "texto legible",
    "letras o números visibles",
    "logos o marcas de patrocinadores",
    "marcas de agua",
    "bordes o marcos",
    "manos o rostros deformes",
    "aspecto de foto de stock posada"
  ]
}
```

## Capítulo 10 — ¿Cómo está hoy tu piloto?

### `images/diagnostico-hero.jpg`

- **Uso:** imagen hero (abre el capítulo)
- **Proporción:** 16:9
- **Estado:** pendiente
- **Descripción:** Un piloto sentado en el habitáculo con el casco puesto, en silencio, mira hacia la salida del box antes de comenzar su tanda.

```json
{
  "type": "photorealistic photograph",
  "subject": "Un piloto sentado en el habitáculo con el casco puesto, en silencio, mira hacia la salida del box antes de comenzar su tanda.",
  "setting": "Circuito de resistencia de 24 horas en el campo francés, al estilo de Le Mans: carril de boxes, garajes de las escuderías y pista, época actual.",
  "composition": "Plano general amplio, sujeto entre el centro y un tercio, aire a los lados para recortes en celular.",
  "lighting": "Luz de carrera de resistencia: mezcla de luz natural de la hora del día y focos del circuito, contraste suave y cinematográfico, tonos fríos azul marino con acentos cálidos naranja.",
  "camera": "Cámara full frame, lente de 28 mm, f/4.",
  "color_palette": [
    "#161a2e",
    "#8a2f63",
    "#1d6672",
    "#f0a050",
    "#f7f5f0"
  ],
  "mood": "Tensión serena, sensación de carrera larga que apenas comienza o continúa.",
  "style": "Fotografía editorial realista de automovilismo de resistencia, texturas reales, grano fino, sin apariencia de ilustración ni de render 3D.",
  "aspect_ratio": "16:9",
  "avoid": [
    "texto legible",
    "letras o números visibles",
    "logos o marcas de patrocinadores",
    "marcas de agua",
    "bordes o marcos",
    "manos o rostros deformes",
    "aspecto de foto de stock posada"
  ]
}
```

### `images/diagnostico-1.jpg`

- **Uso:** imagen de apoyo dentro del texto
- **Proporción:** 3:2
- **Estado:** pendiente
- **Descripción:** Detalle de la visera de un casco reflejando las luces del carril de boxes, con el guante del piloto apoyado en el borde del habitáculo.

```json
{
  "type": "photorealistic photograph",
  "subject": "Detalle de la visera de un casco reflejando las luces del carril de boxes, con el guante del piloto apoyado en el borde del habitáculo.",
  "setting": "Circuito de resistencia de 24 horas en el campo francés, al estilo de Le Mans: carril de boxes, garajes de las escuderías y pista, época actual.",
  "composition": "Plano medio o de detalle, sujeto en un tercio, fondo desenfocado.",
  "lighting": "Luz de carrera de resistencia: mezcla de luz natural de la hora del día y focos del circuito, contraste suave y cinematográfico, tonos fríos azul marino con acentos cálidos naranja.",
  "camera": "Cámara full frame, lente de 85 mm, f/2, poca profundidad de campo.",
  "color_palette": [
    "#161a2e",
    "#8a2f63",
    "#1d6672",
    "#f0a050",
    "#f7f5f0"
  ],
  "mood": "Concentración y oficio, atención al detalle.",
  "style": "Fotografía editorial realista de automovilismo de resistencia, texturas reales, grano fino, sin apariencia de ilustración ni de render 3D.",
  "aspect_ratio": "3:2",
  "avoid": [
    "texto legible",
    "letras o números visibles",
    "logos o marcas de patrocinadores",
    "marcas de agua",
    "bordes o marcos",
    "manos o rostros deformes",
    "aspecto de foto de stock posada"
  ]
}
```

## Epílogo — Volver a la pista con otra mirada

### `images/epilogo-hero.jpg`

- **Uso:** imagen hero (abre el capítulo)
- **Proporción:** 16:9
- **Estado:** pendiente
- **Descripción:** Amanecer sobre la recta principal: un coche de resistencia cubierto de polvo sigue en carrera mientras el cielo se tiñe de naranja.

```json
{
  "type": "photorealistic photograph",
  "subject": "Amanecer sobre la recta principal: un coche de resistencia cubierto de polvo sigue en carrera mientras el cielo se tiñe de naranja.",
  "setting": "Circuito de resistencia de 24 horas en el campo francés, al estilo de Le Mans: carril de boxes, garajes de las escuderías y pista, época actual.",
  "composition": "Plano general amplio, sujeto entre el centro y un tercio, aire a los lados para recortes en celular.",
  "lighting": "Luz de carrera de resistencia: mezcla de luz natural de la hora del día y focos del circuito, contraste suave y cinematográfico, tonos fríos azul marino con acentos cálidos naranja.",
  "camera": "Cámara full frame, lente de 28 mm, f/4.",
  "color_palette": [
    "#161a2e",
    "#8a2f63",
    "#1d6672",
    "#f0a050",
    "#f7f5f0"
  ],
  "mood": "Tensión serena, sensación de carrera larga que apenas comienza o continúa.",
  "style": "Fotografía editorial realista de automovilismo de resistencia, texturas reales, grano fino, sin apariencia de ilustración ni de render 3D.",
  "aspect_ratio": "16:9",
  "avoid": [
    "texto legible",
    "letras o números visibles",
    "logos o marcas de patrocinadores",
    "marcas de agua",
    "bordes o marcos",
    "manos o rostros deformes",
    "aspecto de foto de stock posada"
  ]
}
```

### `images/epilogo-1.jpg`

- **Uso:** imagen de apoyo dentro del texto
- **Proporción:** 3:2
- **Estado:** pendiente
- **Descripción:** Un piloto de espaldas, con el casco bajo el brazo, camina por el carril de boxes vacío hacia la luz del amanecer.

```json
{
  "type": "photorealistic photograph",
  "subject": "Un piloto de espaldas, con el casco bajo el brazo, camina por el carril de boxes vacío hacia la luz del amanecer.",
  "setting": "Circuito de resistencia de 24 horas en el campo francés, al estilo de Le Mans: carril de boxes, garajes de las escuderías y pista, época actual.",
  "composition": "Plano medio o de detalle, sujeto en un tercio, fondo desenfocado.",
  "lighting": "Luz de carrera de resistencia: mezcla de luz natural de la hora del día y focos del circuito, contraste suave y cinematográfico, tonos fríos azul marino con acentos cálidos naranja.",
  "camera": "Cámara full frame, lente de 85 mm, f/2, poca profundidad de campo.",
  "color_palette": [
    "#161a2e",
    "#8a2f63",
    "#1d6672",
    "#f0a050",
    "#f7f5f0"
  ],
  "mood": "Concentración y oficio, atención al detalle.",
  "style": "Fotografía editorial realista de automovilismo de resistencia, texturas reales, grano fino, sin apariencia de ilustración ni de render 3D.",
  "aspect_ratio": "3:2",
  "avoid": [
    "texto legible",
    "letras o números visibles",
    "logos o marcas de patrocinadores",
    "marcas de agua",
    "bordes o marcos",
    "manos o rostros deformes",
    "aspecto de foto de stock posada"
  ]
}
```

## Anexo — El mapa completo y sus fuentes

### `images/fuentes-hero.jpg`

- **Uso:** imagen hero (abre el capítulo)
- **Proporción:** 16:9
- **Estado:** pendiente
- **Descripción:** Vista cenital del carril de boxes ordenado y vacío, con las marcas de posición de cada equipo pintadas en el asfalto.

```json
{
  "type": "photorealistic photograph",
  "subject": "Vista cenital del carril de boxes ordenado y vacío, con las marcas de posición de cada equipo pintadas en el asfalto.",
  "setting": "Circuito de resistencia de 24 horas en el campo francés, al estilo de Le Mans: carril de boxes, garajes de las escuderías y pista, época actual.",
  "composition": "Plano general amplio, sujeto entre el centro y un tercio, aire a los lados para recortes en celular.",
  "lighting": "Luz de carrera de resistencia: mezcla de luz natural de la hora del día y focos del circuito, contraste suave y cinematográfico, tonos fríos azul marino con acentos cálidos naranja.",
  "camera": "Cámara full frame, lente de 28 mm, f/4.",
  "color_palette": [
    "#161a2e",
    "#8a2f63",
    "#1d6672",
    "#f0a050",
    "#f7f5f0"
  ],
  "mood": "Tensión serena, sensación de carrera larga que apenas comienza o continúa.",
  "style": "Fotografía editorial realista de automovilismo de resistencia, texturas reales, grano fino, sin apariencia de ilustración ni de render 3D.",
  "aspect_ratio": "16:9",
  "avoid": [
    "texto legible",
    "letras o números visibles",
    "logos o marcas de patrocinadores",
    "marcas de agua",
    "bordes o marcos",
    "manos o rostros deformes",
    "aspecto de foto de stock posada"
  ]
}
```

### `images/fuentes-1.jpg`

- **Uso:** imagen de apoyo dentro del texto
- **Proporción:** 3:2
- **Estado:** pendiente
- **Descripción:** Una mesa de trabajo con una libreta cerrada, un bolígrafo y un casco de carreras, iluminada por la luz de la mañana que entra por la puerta del garaje.

```json
{
  "type": "photorealistic photograph",
  "subject": "Una mesa de trabajo con una libreta cerrada, un bolígrafo y un casco de carreras, iluminada por la luz de la mañana que entra por la puerta del garaje.",
  "setting": "Circuito de resistencia de 24 horas en el campo francés, al estilo de Le Mans: carril de boxes, garajes de las escuderías y pista, época actual.",
  "composition": "Plano medio o de detalle, sujeto en un tercio, fondo desenfocado.",
  "lighting": "Luz de carrera de resistencia: mezcla de luz natural de la hora del día y focos del circuito, contraste suave y cinematográfico, tonos fríos azul marino con acentos cálidos naranja.",
  "camera": "Cámara full frame, lente de 85 mm, f/2, poca profundidad de campo.",
  "color_palette": [
    "#161a2e",
    "#8a2f63",
    "#1d6672",
    "#f0a050",
    "#f7f5f0"
  ],
  "mood": "Concentración y oficio, atención al detalle.",
  "style": "Fotografía editorial realista de automovilismo de resistencia, texturas reales, grano fino, sin apariencia de ilustración ni de render 3D.",
  "aspect_ratio": "3:2",
  "avoid": [
    "texto legible",
    "letras o números visibles",
    "logos o marcas de patrocinadores",
    "marcas de agua",
    "bordes o marcos",
    "manos o rostros deformes",
    "aspecto de foto de stock posada"
  ]
}
```

