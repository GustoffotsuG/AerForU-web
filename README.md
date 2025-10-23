# 🌐 AeRForU Website

Sitio web oficial de **AeRForU**, la extensión que mejora la experiencia en Acepta el Reto con funcionalidades avanzadas de programación competitiva.

🔗 **[Ver sitio en vivo](https://aerforu.netlify.app/)**

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación y Desarrollo](#-instalación-y-desarrollo)
- [Configuración](#-configuración)
- [Personalización](#-personalización)
- [Despliegue](#-despliegue)
- [Performance y SEO](#-performance-y-seo)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

---

## ✨ Características

### 🎨 Diseño y UX
- **Tema Claro/Oscuro**: Sistema de temas con persistencia en localStorage
- **Diseño Responsive**: Optimizado para móviles, tablets y desktop
- **Animaciones Suaves**: Fade-in con Intersection Observer y `prefers-reduced-motion`
- **Lightbox Avanzado**: Galería de imágenes con zoom, navegación y gestos táctiles

### ⚡ Performance
- **Lazy Loading**: Carga diferida de imágenes
- **Code Splitting**: CSS y JS modularizados
- **Debounce/Throttle**: Optimización de eventos scroll y resize
- **Image Preloading**: Precarga inteligente de recursos

### 📊 Funcionalidades
- **Contenido Dinámico**: Datos cargados desde archivos JSON
- **Versión en Tiempo Real**: Información de versión desde GitHub API
- **Sistema de Notificaciones**: Toasts animados para feedback
- **Analytics Integration**: Google Analytics 4 implementado
- **Download Manager**: Gestión de descargas con estados visuales

### ♿ Accesibilidad
- **ARIA Labels**: Etiquetas semánticas para lectores de pantalla
- **Navegación por Teclado**: Soporte completo de teclado
- **Focus Visible**: Indicadores claros de foco
- **Contraste WCAG AA**: Colores accesibles

### 🔍 SEO
- **Meta Tags Optimizados**: Open Graph, Twitter Cards
- **Structured Data**: Schema.org JSON-LD
- **Sitemap y Robots.txt**: Indexación optimizada
- **Canonical URLs**: URLs canónicas definidas

---

## 🛠 Tecnologías

### Frontend
- **HTML5**: Semántico y accesible
- **CSS3**: Variables CSS, Grid, Flexbox, Animaciones
- **JavaScript ES6+**: Módulos, Async/Await, Fetch API

### Herramientas
- **Git**: Control de versiones
- **GitHub API**: Información de versión en tiempo real
- **Google Analytics 4**: Tracking de eventos
- **Netlify**: Hosting y despliegue continuo

### APIs Utilizadas
- GitHub Raw Content API (manifest.json)
- GitHub Commits API (historial de versiones)

---

## 📁 Estructura del Proyecto

```
aeroforu-website/
│
├── index.html                    # Página principal
├── sitemap.xml                   # Mapa del sitio
├── robots.txt                    # Configuración de crawlers
├── _headers                      # Headers de seguridad (Netlify)
├── google820eba4849d3650c.html  # Verificación Google Search Console
│
├── assets/
│   ├── css/
│   │   ├── variables.css        # Variables CSS (colores, tamaños)
│   │   ├── main.css             # Estilos base y layout
│   │   ├── components.css       # Header, botones, cards, footer
│   │   ├── screenshots.css      # Galería y lightbox
│   │   ├── installation.css     # Pasos de instalación
│   │   ├── version-info.css     # Badge de versión
│   │   ├── footer.css           # Footer mejorado
│   │   ├── download-button.css  # Botón con animaciones
│   │   └── responsive.css       # Media queries
│   │
│   ├── js/
│   │   ├── app.js               # Inicialización principal
│   │   ├── theme-manager.js     # Gestión de temas
│   │   ├── lightbox.js          # Sistema de lightbox
│   │   ├── animations.js        # Intersection Observer
│   │   ├── smooth-scroll.js     # Scroll suave
│   │   ├── header-scroll.js     # Efectos del header
│   │   ├── image-preloader.js   # Precarga de imágenes
│   │   ├── data-loader.js       # Carga de JSON
│   │   ├── dom-builder.js       # Construcción del DOM
│   │   ├── github-version.js    # API de GitHub
│   │   ├── download-manager.js  # Gestor de descargas
│   │   ├── analytics.js         # Google Analytics
│   │   ├── utils.js             # Utilidades
│   │   └── verify-loader.js     # Script de verificación
│   │
│   ├── images/
│   │   ├── logo.png
│   │   └── screenshots/
│   │       ├── screenshot-1.webp
│   │       ├── screenshot-2.webp
│   │       └── ...
│   │
│   └── data/
│       ├── features.json        # Datos de funcionalidades
│       ├── screenshots.json     # Datos de capturas
│       └── installation.json    # Pasos de instalación
│
└── config/
    └── seo.json                 # Metadatos SEO
```

---

## 🚀 Instalación y Desarrollo

### Requisitos Previos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Servidor HTTP local (opcional pero recomendado)

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Jaimepas77/aeroforu-website.git
cd aeroforu-website
```

### 2. Iniciar Servidor Local

#### Con Python 3:
```bash
python -m http.server 8000
```

#### Con Node.js:
```bash
npx http-server -p 8000
```

#### Con PHP:
```bash
php -S localhost:8000
```

#### Con VS Code Live Server:
- Instalar extensión "Live Server"
- Click derecho en `index.html` → "Open with Live Server"

### 3. Abrir en Navegador

```
http://localhost:8000
```

### 4. Verificar Instalación

Abre la consola del navegador (F12) y pega el contenido de `assets/js/verify-loader.js` para ejecutar la verificación automática.

---

## ⚙️ Configuración

### Modificar Funcionalidades

Edita `assets/data/features.json`:

```json
{
  "features": [
    {
      "id": "unique-id",
      "icon": "📊",
      "title": "Título de la Funcionalidad",
      "description": "Descripción detallada...",
      "order": 1
    }
  ]
}
```

### Añadir Capturas de Pantalla

1. Coloca la imagen en `assets/images/screenshots/`
2. Edita `assets/data/screenshots.json`:

```json
{
  "screenshots": [
    {
      "id": "screenshot-id",
      "image": "./assets/images/screenshots/nueva.webp",
      "alt": "Descripción SEO optimizada",
      "icon": "📸",
      "title": "Título",
      "description": "Descripción breve",
      "order": 1
    }
  ]
}
```

### Actualizar Pasos de Instalación

Edita `assets/data/installation.json`:

```json
{
  "steps": [
    {
      "number": 1,
      "title": "Título del Paso",
      "description": "Descripción con <strong>HTML</strong> permitido",
      "code": "comando opcional"
    }
  ]
}
```

### Configurar SEO

Edita `config/seo.json` para actualizar metadatos, Open Graph y Twitter Cards.

---

## 🎨 Personalización

### Variables CSS

Modifica `assets/css/variables.css`:

```css
:root {
  --primary: #667eea;
  --secondary: #764ba2;
  --accent: #f093fb;
  /* ... más variables */
}
```

### Tema Oscuro

```css
[data-theme="dark"] {
  --text: #f1f5f9;
  --bg: #0f172a;
  --bg-card: #1e293b;
}
```

### Breakpoints Responsive

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

---

## 🔧 Módulos JavaScript

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
```

### GitHub Version
```javascript
import { GitHubVersion } from './github-version.js';
await GitHubVersion.renderVersionInfo('version-info');
```

### Analytics
```javascript
import { Analytics } from './analytics.js';
Analytics.trackDownload('AeRForU.zip');
Analytics.trackButtonClick('Download', 'Hero');
```

---

## 🚢 Despliegue

### Netlify (Recomendado)

1. **Conectar Repositorio**:
   - Fork este repositorio en tu cuenta de GitHub
   - Conecta Netlify con tu repositorio

2. **Configuración de Build**:
   ```
   Build command: (ninguno - sitio estático)
   Publish directory: /
   ```

3. **Variables de Entorno** (opcional):
   - `GA_TRACKING_ID`: ID de Google Analytics

4. **Deploy**: Automático en cada push a `main`

### GitHub Pages

1. Ve a Settings → Pages
2. Selecciona la rama `main` como source
3. El sitio estará en `https://tuusuario.github.io/repo`

### Vercel

```bash
npm i -g vercel
vercel --prod
```

---

## 📈 Performance y SEO

### Optimización de Imágenes

#### Convertir a WebP:
```bash
cwebp input.png -q 80 -o output.webp
```

#### Optimizar PNGs:
```bash
optipng -o7 *.png
```

### Minificación

#### CSS:
```bash
npx cssnano assets/css/*.css -o dist/style.min.css
```

#### JavaScript:
```bash
npx terser assets/js/*.js -o dist/script.min.js
```

### Lighthouse Score

Ejecuta auditoría de Lighthouse:
```bash
lighthouse https://aerforu.netlify.app --view
```

**Objetivos**:
- Performance: > 90
- Accessibility: > 95
- Best Practices: 100
- SEO: 100

### Headers de Seguridad

Configurados en `_headers` (Netlify):
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `X-Content-Type-Options: nosniff`
- Cache optimizado para assets estáticos

---

## 🐛 Debugging

### Chrome DevTools

```javascript
// Ver marcas de performance
performance.getEntriesByType('mark');

// Estado del tema
ThemeManager.getCurrentTheme();

// Imágenes cargadas
document.querySelectorAll('.screenshot-img').length;
```

### Script de Verificación

```javascript
// Copiar y pegar en consola
// El contenido de assets/js/verify-loader.js
```

---

## 🤝 Contribuir

Las contribuciones son bienvenidas:

1. **Fork** el proyecto
2. Crea una **rama** (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un **Pull Request**

### Guías de Contribución

- Mantén el código modular y comentado
- Sigue las convenciones de nombres existentes
- Asegura accesibilidad en nuevos componentes
- Prueba en múltiples navegadores
- Actualiza documentación si es necesario

---

## 📄 Licencia

**MIT License** - Ver archivo [LICENSE](LICENSE) para más detalles.

Eres libre de:
- ✅ Usar comercialmente
- ✅ Modificar
- ✅ Distribuir
- ✅ Uso privado

---

## 👤 Autor de la extension

**Jaime Pastrana García**

- 🌐 GitHub: [@Jaimepas77](https://github.com/Jaimepas77)
- 🚀 Proyecto Principal: [AeRForU Extension](https://github.com/Jaimepas77/AeRForU)
- 🌐 Website: [aerforu.netlify.app](https://aerforu.netlify.app/)

---

## 📞 Soporte

- **Issues de la web**: [GitHub Issues](https://github.com/GustoffotsuG/AerForU-web-in_development/issues)
- **Extensión**: [Repositorio Principal](https://github.com/Jaimepas77/AeRForU)
- **Issues de la extension**: [GitHub Issues](https://github.com/Jaimepas77/AeRForU/issues)
- **Acepta el Reto**: [aceptaelreto.com](https://aceptaelreto.com)

---

## 🌟 Agradecimientos

- **Acepta el Reto**: Por proporcionar una plataforma excepcional
- **Jaimepas77**: Por la creacion de una extensión para Acepta el Reto
- **Usuarios**: Por el feedback y sugerencias

---

## 📊 Estadísticas

- **Archivos CSS**: 8 módulos
- **Archivos JS**: 13 módulos
- **Imágenes Optimizadas**: WebP con lazy loading
- **Tiempo de Carga**: < 2s en 4G
- **Lighthouse Score**: 95+ en todas las categorías

---

⭐ **Si te gusta el proyecto, dale una estrella en GitHub!**

🔗 **[Ver Demo en Vivo](https://aerforu.netlify.app/)**