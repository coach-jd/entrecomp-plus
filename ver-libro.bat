@echo off
rem Abre este Libro Web en el navegador. Deja esta ventana abierta mientras lo revisas.
cd /d "%~dp0"
echo Abriendo el libro en http://localhost:8080 ...
echo Para terminar, cierra esta ventana.
start "" http://localhost:8080
python -m http.server 8080
if errorlevel 1 (
  echo.
  echo No se pudo iniciar. Comprueba que Python este instalado.
  pause
)
