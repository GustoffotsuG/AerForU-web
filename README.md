# 🚀 AeRForU Website

Sitio web oficial de **AeRForU**, la extensión para mejorar la experiencia en Acepta el Reto.

## 📁 Estructura del Proyecto

```
aeroforu-website/
│
├── index.html                 # HTML principal
├── README.md                  # Este archivo
│
├── assets/
│   ├── css/
│   │   ├── variables.css     # Variables CSS (colores, tamaños)
│   │   ├── main.css          # Estilos principales
│   │   ├── components.css    # Estilos de componentes
│   │   ├── screenshots.css   # Estilos de galería
│   │   ├── installation.css  # Estilos de instalación
│   │   └── responsive.css    # Media queries
│   │
│   ├── js/
│   │   ├── app.js            # Inicialización principal
│   │   ├── theme-manager.js  # Gestión de temas
│   │   ├── lightbox.js       # Sistema de lightbox
│   │   ├── animations.js     # Animaciones
│   │   ├── smooth-scroll.js  # Scroll suave
│   │   ├── header-scroll.js  # Efectos del header
│   │   ├── image-preloader.js # Precarga de imágenes
│   │   └── utils.js          # Utilidades
│   │
│   ├── images/
│   │   ├── logo.png
│   │   └── screenshots/
│   │
│   └── data/
│       ├── features.json     # Datos de funcionalidades
│       ├── screenshots.json  # Datos de capturas
│       └── installation.json # Pasos de instalación
│
└── config/
    └── seo.json              # Metadatos SEO
```

## 🎯 Características

- ✅ **Diseño Modular**: Código organizado en módulos reutilizables
- 🎨 **Tema Claro/Oscuro**: Sistema de temas con persistencia
- 📱 **Responsive**: Optimizado para todos los dispositivos
- ⚡ **Performance**: Lazy loading, debounce, intersection observer
- ♿ **Accesibilidad**: ARIA labels, navegación por teclado
- 🔍 **SEO Optimizado**: Meta tags, structured data, Open Graph
- 🖼️ **Lightbox**: Galería de imágenes con zoom
- 🎭 **Animaciones**: Animaciones suaves con fade-in

## 🚀 Instalación y Desarrollo

### Requisitos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Servidor HTTP local (opcional para desarrollo)

### Desarrollo Local

1. **Clonar el repositorio**
```bash
git clone https://github.com/tuusuario/aeroforu-website.git
cd aeroforu-website
```

2. **Servidor de desarrollo (opcional)**

Con Python 3:
```bash
python -m http.server 8000
```

Con Node.js:
```bash
npx http-server -p 8000
```

Con PHP:
```bash
php -S localhost:8000
```

3. **Abrir en navegador**
```
http://localhost:8000
```

## 📝 Uso de los Archivos de Datos

### Modificar Funcionalidades
Edita `assets/data/features.json`:
```json
{
  "features": [
    {
      "id": "unique-id",
      "icon": "🎯",
      "title": "Título de la Funcionalidad",
      "description": "Descripción detallada...",
      "order": 1
    }
  ]
}
```

### Añadir Capturas de Pantalla
Edita `assets/data/screenshots.json`:
```json
{
  "screenshots": [
    {
      "id": "screenshot-id",
      "image": "./assets/images/screenshots/nueva.webp",
      "alt": "Texto alternativo descriptivo",
      "icon": "📸",
      "title": "Título",
      "description": "Descripción",
      "order": 1
    }
  ]
}
```

### Actualizar Metadatos SEO
Edita `config/seo.json`:
```json
{
  "meta": {
    "title": "Nuevo título",
    "description": "Nueva descripción"
  }
}
```

## 🎨 Personalización de Estilos

### Variables CSS
Modifica `assets/css/variables.css`:
```css
:root {
  --primary: #667eea;
  --secondary: #764ba2;
  /* ... más variables */
}
```

### Tema Oscuro
```css
[data-theme="dark"] {
  --text: #f1f5f9;
  --bg: #0f172a;
}
```

## 📦 Módulos JavaScript

### Theme Manager
```javascript
import { ThemeManager } from './theme-manager.js';
ThemeManager.init();
ThemeManager.toggle(); // Cambiar tema
```

### Lightbox
```javascript
import { LightboxManager } from './lightbox.js';
LightboxManager.open(imageSrc, imageAlt);
LightboxManager.close();
```

### Animations
```javascript
import { AnimationObserver } from './animations.js';
AnimationObserver.init();
```

## 🔧 Optimización

### Minificación de CSS
```bash
npx cssnano assets/css/*.css -o dist/style.min.css
```

### Minificación de JavaScript
```bash
npx terser assets/js/*.js -o dist/script.min.js
```

### Optimización de Imágenes
```bash
# Convertir a WebP
cwebp input.png -q 80 -o output.webp

# Optimizar PNGs
optipng -o7 *.png
```

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## ♿ Accesibilidad

- ARIA labels en elementos interactivos
- Navegación por teclado (Tab, Enter, Escape)
- Contraste de colores WCAG AA
- Soporte para `prefers-reduced-motion`
- Focus visible en elementos

## 🔍 SEO

- Meta tags optimizados
- Open Graph para redes sociales
- Twitter Cards
- Structured Data (JSON-LD)
- Sitemap.xml (recomendado)
- Robots.txt (recomendado)

## 🌐 Internacionalización (Futuro)

Preparado para i18n:
```
assets/
└── data/
    ├── es/
    │   ├── features.json
    │   └── installation.json
    └── en/
        ├── features.json
        └── installation.json
```

## 📈 Performance Tips

1. **Lazy Loading**: Imágenes se cargan bajo demanda
2. **Debounce**: Eventos optimizados (scroll, resize)
3. **CSS Containment**: Mejora el repaint
4. **Intersection Observer**: Animaciones eficientes
5. **Asset Compression**: Gzip/Brotli en servidor

## 🐛 Debugging

### Chrome DevTools
```javascript
// Ver marcas de performance
performance.getEntriesByType('mark');

// Estado del tema
ThemeManager.getCurrentTheme();
```

### Console Logs
Los módulos incluyen logs informativos. Para producción:
```javascript
// Desactivar console.log
if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
}
```

## 🚢 Despliegue

### GitHub Pages
1. Push a la rama `main` o `gh-pages`
2. Configurar GitHub Pages en Settings
3. El sitio estará en `https://usuario.github.io/repo`

### Netlify
1. Conectar repositorio
2. Build settings: ninguno (sitio estático)
3. Deploy automático en cada push

### Vercel
```bash
vercel --prod
```

## 📄 Licencia

MIT License - Ver archivo LICENSE para más detalles

## 👤 Autor

**Jaime Pastrana García**
- GitHub: [@Jaimepas77](https://github.com/Jaimepas77)
- Proyecto: [AeRForU](https://github.com/Jaimepas77/AeRForU)

## 🤝 Contribuir

Las contribuciones son bienvenidas:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📞 Soporte

- **Issues**: [GitHub Issues](https://github.com/Jaimepas77/AeRForU/issues)
- **Extensión**: [Repositorio Principal](https://github.com/Jaimepas77/AeRForU)
- **Acepta el Reto**: [aceptaelreto.com](https://aceptaelreto.com)

---

⭐ Si te gusta el proyecto, dale una estrella en GitHub!