📝 README - Juego de Mecanografía para Niños
🎮 Descripción del Proyecto
Juego de Mecanografía para Niños es una aplicación web educativa diseñada para ayudar a niños de 9 a 10 años a mejorar su velocidad y precisión al escribir en el teclado del computador. El juego presenta palabras en español organizadas en niveles progresivos de dificultad, desde palabras simples hasta palabras con acentos más complejas.

✨ Características Principales
✅ 6 Niveles Progresivos: Desde palabras básicas hasta palabras con acentos

📝 Sistema de Corrección: Guía al estudiante cuando comete errores ortográficos

🎯 Sistema de Errores: 4 errores máximos por nivel con indicador visual

📊 Estadísticas en Tiempo Real: Muestra nivel actual, puntuación y errores

📱 Diseño Responsive: Se adapta a diferentes tamaños de pantalla

🎨 Interfaz Amigable: Diseño colorido y atractivo para niños

🔄 Opción de Reinicio: Permite reiniciar el nivel actual en cualquier momento

📁 Estructura de Archivos
text
mecanografia-ninos/
├── index.html          # Archivo principal HTML
├── style.css           # Estilos CSS de la aplicación
├── script.js           # Lógica JavaScript del juego
└── README.md           # Este archivo de documentación
🚀 Cómo Ejecutar el Juego
Método 1: Abrir directamente en el navegador
Descarga los tres archivos (index.html, style.css, script.js)

Colócalos en la misma carpeta

Haz doble clic en index.html para abrirlo en tu navegador

Método 2: Usar un servidor local (opcional)
bash
# Si tienes Python instalado
python -m http.server 8000

# Si tienes Node.js instalado
npx serve .
Luego abre: http://localhost:8000 en tu navegador

🎯 Niveles del Juego
Nivel 1-2: Palabras Simples
Palabras cortas y comunes sin acentos

Ejemplos: casa, mesa, perro, gato

Nivel 3-4: Palabras Intermedias
Palabras más largas y complejas

Ejemplos: escuela, familia, computadora

Nivel 5-6: Palabras Avanzadas
Palabras con acentos y mayor complejidad

Ejemplos: matemáticas, geografía, difícil

🎮 Instrucciones de Juego
Ver la palabra objetivo en la parte superior de la pantalla

Escribir la palabra en el campo de texto

Presionar Enter o dejar que el juego valide automáticamente

Corregir errores siguiendo las indicaciones del sistema

Completar las 10 palabras de cada nivel

Avanzar al siguiente nivel al completar el nivel actual

Sistema de Puntuación:
✅ +10 puntos por cada palabra correcta

❌ 1 error por cada intento incorrecto

⚠️ Máximo 4 errores por nivel

🛠️ Tecnologías Utilizadas
HTML5: Estructura del juego

CSS3: Estilos y diseño responsivo

JavaScript (ES6): Lógica del juego y validaciones

Font Awesome: Íconos para mejorar la interfaz

Google Fonts: Tipografía adecuada para niños

🔧 Características Técnicas
Validación de Palabras:
Comparación en tiempo real mientras se escribe

Detección de errores de acentuación

Sugerencias para corrección ortográfica

Autocompletado automático

Interfaz de Usuario:
Diseño responsivo (mobile, tablet, desktop)

Indicadores visuales de progreso

Animaciones suaves para feedback

Controles intuitivos para niños

Gestión de Estado:
Guardado del progreso por sesión

Reinicio de nivel manteniendo configuración

Sistema de errores persistente

📱 Compatibilidad
Navegadores: Chrome, Firefox, Safari, Edge (versiones recientes)

Dispositivos: Computadoras, laptops, tablets

Sistemas Operativos: Windows, macOS, Linux, Chrome OS

🎨 Personalización
El juego puede ser fácilmente personalizado modificando:

Palabras por nivel: Editar el objeto wordLevels en script.js

Colores: Modificar las variables de color en style.css

Dificultad: Ajustar el número de errores permitidos

Diseño: Cambiar fuentes y tamaños en CSS

🐛 Solución de Problemas
Problema: Los estilos no se cargan
Solución: Verificar que todos los archivos estén en la misma carpeta y que los nombres coincidan exactamente.

Problema: El juego no valida las palabras
Solución:

Presionar F12 para abrir las herramientas de desarrollador

Ir a la pestaña "Console"

Verificar si hay errores JavaScript

Recargar la página

Problema: No aparecen los íconos
Solución: Asegurarse de tener conexión a internet, ya que los íconos se cargan desde Font Awesome CDN.

📈 Beneficios Educativos
Mejora la velocidad de escritura mediante práctica repetitiva

Refuerza la ortografía con palabras correctamente acentuadas

Desarrolla la atención al detalle

Fomenta la autocorrección mediante feedback inmediato

Adapta la dificultad al nivel del estudiante

🤝 Contribuir
Si deseas contribuir al proyecto:

Haz un fork del proyecto

Crea una rama para tu funcionalidad (git checkout -b nueva-funcionalidad)

Haz commit de tus cambios (git commit -m 'Agregar nueva funcionalidad')

Push a la rama (git push origin nueva-funcionalidad)

Abre un Pull Request

📄 Licencia
Este proyecto está bajo la licencia MIT. Puedes usarlo, modificarlo y distribuirlo libremente para fines educativos.

👨‍🏫 Uso en el Aula
Este juego es ideal para:

Clases de informática en primaria

Refuerzo de ortografía en español

Actividades extraescolares

Terapia ocupacional para desarrollo motor fino

✍️ Autor
Desarrollado como una herramienta educativa para fomentar el aprendizaje de mecanografía en niños.

🔮 Futuras Mejoras
Agregar efectos de sonido

Sistema de logros y medallas

Modo competencia contra reloj

Personalización de avatar

Exportación de resultados

Versión multijugador

App móvil nativa

🎯 Objetivo Final: Convertir la práctica de mecanografía en una experiencia divertida y educativa para los niños, ayudándoles a desarrollar una habilidad esencial para el siglo XXI.

¡Diviértete aprendiendo a escribir! 🚀

