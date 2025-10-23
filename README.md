# 🌐 AeRForU Website

Sitio web oficial de **AeRForU**, la extensión que mejora la experiencia en Acepta el Reto con funcionalidades avanzadas de programación competitiva.

🔗 **[Ver sitio en vivo](https://aerforu.netlify.app/)**

---

## 📋 Acerca del Proyecto

Este es el sitio web oficial de AeRForU, una extensión de navegador gratuita y open source que añade funcionalidades avanzadas a [Acepta el Reto](https://aceptaelreto.com). El sitio web sirve como landing page informativa para:

- ✨ Mostrar las funcionalidades de la extensión
- 📸 Galería de capturas de pantalla
- 📥 Instrucciones de instalación
- 📊 Información de versiones en tiempo real
- 🔗 Enlaces a recursos y documentación

---

## 🎨 Características del Sitio

### Diseño Moderno
- **Tema Claro/Oscuro**: Sistema de temas con persistencia
- **Diseño Responsive**: Optimizado para todos los dispositivos
- **Animaciones Suaves**: Con respeto a `prefers-reduced-motion`
- **Lightbox Avanzado**: Galería de imágenes con zoom y navegación

### Performance
- **Lazy Loading**: Carga diferida de imágenes
- **Code Splitting**: CSS y JS modularizados
- **Image Optimization**: Imágenes en formato WebP
- **Google Analytics**: Tracking de eventos y conversiones

### SEO Optimizado
- **Meta Tags Completos**: Open Graph, Twitter Cards
- **Structured Data**: Schema.org JSON-LD
- **Sitemap y Robots.txt**: Indexación optimizada
- **Score Lighthouse 95+**: En todas las categorías

---

## 🛠 Stack Tecnológico

- **HTML5** - Semántico y accesible
- **CSS3** - Variables CSS, Grid, Flexbox
- **JavaScript ES6+** - Módulos, Async/Await
- **Netlify** - Hosting y despliegue continuo
- **GitHub API** - Información de versión en tiempo real
- **Google Analytics 4** - Tracking de eventos

---

## 📁 Estructura del Proyecto

```
aeroforu-website/
│
├── index.html                 # Página principal
├── sitemap.xml                # Mapa del sitio
├── robots.txt                 # Configuración crawlers
├── manifest.json              # PWA manifest
│
├── assets/
│   ├── css/                   # Estilos modularizados
│   ├── js/                    # JavaScript ES6 modules
│   ├── images/                # Imágenes optimizadas
│   └── data/                  # Datos JSON dinámicos
│
└── config/
    └── seo.json               # Metadatos SEO
```

---

## 🚀 Instalación Local

Si quieres ejecutar el proyecto localmente para desarrollo o pruebas:

### Requisitos Previos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Servidor HTTP local

### Instalación

1. **Clona el repositorio**:
```bash
git clone https://github.com/TuUsuario/aeroforu-website.git
cd aeroforu-website
```

2. **Inicia un servidor local**:

Con Python:
```bash
python -m http.server 8000
```

Con Node.js:
```bash
npx http-server -p 8000
```

Con VS Code Live Server:
- Instala la extensión "Live Server"
- Click derecho en `index.html` → "Open with Live Server"

3. **Abre en el navegador**:
```
http://localhost:8000
```

---

## 🔧 Configuración

### Modificar Contenido

El contenido dinámico se carga desde archivos JSON en `/assets/data/`:

- **`features.json`** - Funcionalidades de la extensión
- **`screenshots.json`** - Capturas de pantalla
- **`installation.json`** - Pasos de instalación

### Personalizar Tema

Los colores y estilos se definen en `/assets/css/variables.css`:

```css
:root {
  --primary: #667eea;
  --secondary: #764ba2;
  --accent: #f093fb;
  /* ... */
}
```

---

## 📊 Google Analytics

El sitio incluye Google Analytics 4 para tracking de:
- Descargas de la extensión
- Clicks en botones importantes
- Navegación entre secciones
- Tiempo en página y scroll depth

Para configurar tu propio tracking, modifica el ID en `index.html`:
```javascript
gtag('config', 'TU-TRACKING-ID');
```

---

## 🐛 Reportar Problemas

Si encuentras algún bug o tienes sugerencias para mejorar el sitio web:

1. Verifica que no exista un issue similar
2. Crea un [nuevo issue](https://github.com/TuUsuario/aeroforu-website/issues) describiendo:
   - El problema encontrado
   - Pasos para reproducirlo
   - Navegador y versión
   - Capturas de pantalla si es posible

---

## 🤝 Contribuir

Las contribuciones son bienvenidas para:
- 🐛 Corregir bugs
- 📝 Mejorar documentación
- ♿ Mejorar accesibilidad
- ⚡ Optimizar performance
- 🎨 Sugerencias de diseño

**Nota**: Este es el sitio web oficial de AeRForU. No se aceptan forks que pretendan suplantar la identidad del proyecto. Si quieres crear tu propia landing page basada en este código, por favor cambia completamente la identidad visual y referencias.

### Cómo Contribuir

1. Fork el proyecto (solo para contribuir mejoras)
2. Crea una rama (`git checkout -b fix/bug-name`)
3. Commit tus cambios (`git commit -m 'Fix: descripción'`)
4. Push a la rama (`git push origin fix/bug-name`)
5. Abre un Pull Request

---

## 📄 Licencia

**MIT License** - Ver [LICENSE](LICENSE) para más detalles.

Este proyecto está bajo licencia MIT para fines educativos y de mejora. Sin embargo:

✅ **Permitido**:
- Usar el código para aprender
- Reportar bugs y sugerir mejoras
- Contribuir con pull requests
- Usar partes del código en tus proyectos

❌ **No permitido**:
- Suplantar la identidad de AeRForU
- Crear sitios web idénticos o muy similares
- Redistribuir como si fuera tu propio proyecto
- Usar sin dar crédito al autor original

---

## 👤 Autor de la Extensión

**Jaime Pastrana García**

- 🌐 GitHub: [@Jaimepas77](https://github.com/Jaimepas77)
- 🚀 Extensión: [AeRForU](https://github.com/Jaimepas77/AeRForU)
- 🌐 Website: [aerforu.netlify.app](https://aerforu.netlify.app/)

---

## 📞 Soporte

- **Preguntas sobre el sitio web**: [Issues del sitio](https://github.com/TuUsuario/aeroforu-website/issues)
- **Preguntas sobre la extensión**: [Repositorio de AeRForU](https://github.com/Jaimepas77/AeRForU)
- **Acepta el Reto**: [aceptaelreto.com](https://aceptaelreto.com)

---

## 🌟 Agradecimientos

- **Acepta el Reto**: Por proporcionar una plataforma excepcional para programación competitiva
- **Jaimepas77**: Por crear la extensión AeRForU
- **Comunidad**: Por el feedback y sugerencias constantes

---

## 📈 Estado del Proyecto

![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-SITE-ID/deploy-status)

- **Lighthouse Score**: 95+ en todas las categorías
- **Tiempo de Carga**: < 2s en 4G
- **Performance**: Optimizado y rápido
- **Accesibilidad**: WCAG AA compliant

---

⭐ **Si te gusta el proyecto, dale una estrella en GitHub!**

🔗 **[Ver Demo en Vivo](https://aerforu.netlify.app/)**