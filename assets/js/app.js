/**
 * AeRForU Website - Aplicación Principal
 * Inicializa todos los módulos y gestiona la carga de datos
 */

import { ThemeManager } from './theme-manager.js';
import { LightboxManager } from './lightbox.js';
import { AnimationObserver } from './animations.js';
import { SmoothScroll } from './smooth-scroll.js';
import { HeaderScroll } from './header-scroll.js';
import { ImagePreloader } from './image-preloader.js';
import { DataLoader } from './data-loader.js';
import { DOMBuilder } from './dom-builder.js';
import { GitHubVersion } from './github-version.js';
import { performanceMark, domReady } from './utils.js';

/**
 * Aplicación principal
 */
const App = {
    /**
     * Inicializa la aplicación
     */
    init() {
        // Inicializar tema antes de que cargue el DOM
        ThemeManager.init();
        
        // Esperar a que el DOM esté listo
        domReady(() => {
            this.loadData();
        });
    },

    /**
     * Carga todos los datos desde archivos JSON
     */
    async loadData() {
        try {
            // Cargar datos en paralelo
            const [features, screenshots, steps] = await Promise.all([
                DataLoader.loadFeatures(),
                DataLoader.loadScreenshots(),
                DataLoader.loadInstallationSteps()
            ]);

            // Renderizar contenido dinámico
            this.renderContent(features, screenshots, steps);
            
            // Inicializar componentes después del renderizado
            setTimeout(() => this.initComponents(), 100);
            
        } catch (error) {
            console.error('Error loading data:', error);
            this.initComponents();
        }
    },

    /**
     * Renderiza el contenido dinámico en el DOM
     */
    renderContent(features, screenshots, steps) {
        if (features.length > 0) {
            DOMBuilder.renderFeatures(features, 'features-grid');
        }

        if (screenshots.length > 0) {
            DOMBuilder.renderScreenshots(screenshots, 'screenshots-gallery');
        }

        if (steps.length > 0) {
            DOMBuilder.renderInstallationSteps(steps, 'installation-steps');
        }
    },

    /**
     * Inicializa todos los componentes de la aplicación
     */
    initComponents() {
        try {
            // Inicializar componentes básicos
            SmoothScroll.init();
            HeaderScroll.init();
            ImagePreloader.init();
            AnimationObserver.init();
            
            // Inicializar lightbox sin listeners automáticos
            LightboxManager.initWithoutImageListeners();
            
            // Adjuntar listeners de lightbox a las imágenes
            this.attachLightboxListeners();

            // Marcar inicialización completa
            performanceMark('app-initialized');
            
        } catch (error) {
            console.error('Error initializing components:', error);
        }
    },

    /**
     * Adjunta event listeners del lightbox a los cards de screenshots
     */
    attachLightboxListeners() {
        const images = document.querySelectorAll('.screenshot-img');
        
        if (images.length === 0) return;
        
        images.forEach((img) => {
            const card = img.closest('.screenshot-card');
            
            if (!card) return;
            
            // Estilo de cursor
            card.style.cursor = 'pointer';
            
            // Handler de click
            const openLightbox = (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                if (window.LightboxManager?.open) {
                    window.LightboxManager.open(img.src, img.alt);
                }
            };
            
            // Event listeners
            card.onclick = openLightbox;
            card.addEventListener('click', openLightbox);
            
            // Soporte de teclado
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(e);
                }
            });
            
            // Accesibilidad
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Click para ampliar: ${img.alt}`);
        });
    },

    /**
     * Registra Service Worker para PWA (opcional)
     */
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(reg => console.log('Service Worker registered'))
                    .catch(err => console.warn('Service Worker registration failed:', err));
            });
        }
    }
};

// Iniciar aplicación
App.init();

// Exportar LightboxManager globalmente después de un breve delay
setTimeout(() => {
    window.LightboxManager = LightboxManager;
}, 200);

// Exportar App para debugging (opcional en producción)
if (process.env.NODE_ENV !== 'production') {
    window.App = App;
}