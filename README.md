# Boda Sofía & Alfredo

Sitio web para la boda de Sofía & Alfredo - 19 de Septiembre de 2026

## 📁 Estructura del Proyecto

```
.
├── index.html                 # Archivo HTML principal
├── css/
│   └── styles.css            # Estilos CSS
├── js/
│   └── main.js               # Lógica JavaScript (interactividad, animaciones)
├── assets/
│   ├── images/               # Imágenes y gráficos
│   │   └── story-bg.png
│   └── fonts/                # Fuentes locales (si aplica)
├── README.md                 # Este archivo
└── .gitignore               # Archivos ignorados por Git
```

## 🎨 Características

- **Diseño responsivo** - Optimizado para desktop, tablet y móvil
- **Animaciones suaves** - Parallax scroll, fade-in animations, reveal on scroll
- **Interactividad** - Countdown timer, copiar IBAN, lógica de regalos
- **Rendimiento** - CSS externo, JS modular, imágenes optimizadas
- **Accesibilidad** - HTML semántico, aria labels, buena legibilidad

## 🚀 Desarrollo Local

1. Clonar el repositorio
2. Servir con un servidor local (ej: `python -m http.server 8000`)
3. Abrir `http://localhost:8000` en el navegador

## 📝 Secciones

- **Inicio** - Presentación con contador regresivo
- **Cómo Llegar** - Ubicación e instrucciones
- **La Finca** - Descripción del lugar y cronograma
- **Alojamiento** - Hoteles recomendados
- **Confirmación** - Formulario RSVP
- **Regalo** - Opciones de regalo

## 🔧 Personalización

### Cambiar información del evento
- Editar `index.html` para actualizar nombres, fechas, ubicación
- La fecha del countdown está en `js/main.js` línea 69

### Cambiar estilos
- Variables CSS en `css/styles.css` líneas 1-11
- Responsive breakpoints en `css/styles.css` líneas 172-189

### Agregar imágenes
- Guardar en `assets/images/`
- Actualizar rutas en `index.html` como: `assets/images/nombre-imagen.png`

## 📦 Buenas Prácticas Implementadas

✅ Separación de responsabilidades (HTML, CSS, JS)  
✅ Estructura de carpetas clara y mantenible  
✅ CSS modular con variables personalizadas  
✅ JavaScript sin dependencias externas (vanilla)  
✅ HTML semántico y accesible  
✅ Mobile-first responsive design  
✅ Performance optimizado  

## 🎯 Próximas Mejoras (Opcional)

- [ ] Minificar CSS y JavaScript para producción
- [ ] Optimizar imágenes (convertir a WebP)
- [ ] Agregar ServiceWorker para offline
- [ ] Implementar lazy loading de imágenes
- [ ] Agregar formulario de contacto independiente
- [ ] Dark mode toggle

## 📄 Licencia

Proyecto personalizado para evento. No está disponible para reutilización sin permiso.

---

**Última actualización:** 2026-04-03