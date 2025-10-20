/**
 * AeRForU Website - Aplicación Principal
 * Punto de entrada que inicializa todos los módulos y carga datos
 */

import { ThemeManager } from './theme-manager.js';
import { LightboxManager } from './lightbox.js';
import { AnimationObserver } from './animations.js';
import { SmoothScroll } from './smooth-scroll.js';
import { HeaderScroll } from './header-scroll.js';
import { ImagePreloader } from './image-preloader.js';
import { DataLoader } from './data-loader.js';
import { DOMBuilder } from './dom-builder.js';
import { performanceMark, domReady } from './utils.js';

/**
 * Aplicación principal
 */
const App = {
    /**
     * Inicializa la aplicación
     */
    init() {
        console.log('🚀 Initializing AeRForU Website...');
        
        // Inicializar gestor de temas de inmediato (antes del DOM)
        ThemeManager.init();
        
        // Esperar a que el DOM esté completamente cargado
        domReady(() => {
            this.loadData();
        });
    },

    /**
     * Carga todos los datos JSON
     */
    async loadData() {
        try {
            console.log('📦 Loading data from JSON files...');
            
            // Cargar datos en paralelo para mejor rendimiento
            const [features, screenshots, steps] = await Promise.all([
                DataLoader.loadFeatures(),
                DataLoader.loadScreenshots(),
                DataLoader.loadInstallationSteps()
            ]);

            // Renderizar contenido dinámico
            this.renderContent(features, screenshots, steps);
            
            // IMPORTANTE: Inicializar componentes DESPUÉS de renderizar
            // Esperar un momento para que el DOM se actualice
            setTimeout(() => {
                this.initComponents();
            }, 100);
            
            console.log('✅ Data loaded and rendered successfully');
        } catch (error) {
            console.error('❌ Error loading data:', error);
            // Inicializar componentes incluso si falla la carga de datos
            this.initComponents();
        }
    },

    /**
     * Renderiza el contenido dinámico
     */
    renderContent(features, screenshots, steps) {
        // Renderizar funcionalidades
        if (features.length > 0) {
            DOMBuilder.renderFeatures(features, 'features-grid');
            console.log(`✓ Rendered ${features.length} features`);
        }

        // Renderizar capturas
        if (screenshots.length > 0) {
            DOMBuilder.renderScreenshots(screenshots, 'screenshots-gallery');
            console.log(`✓ Rendered ${screenshots.length} screenshots`);
        }

        // Renderizar pasos de instalación
        if (steps.length > 0) {
            DOMBuilder.renderInstallationSteps(steps, 'installation-steps');
            console.log(`✓ Rendered ${steps.length} installation steps`);
        }
    },

    /**
     * Inicializa todos los componentes
     */
    initComponents() {
        try {
            console.log('⚙️ Initializing components...');
            
            // Inicializar componentes básicos primero
            SmoothScroll.init();
            HeaderScroll.init();
            ImagePreloader.init();
            AnimationObserver.init();
            
            // CRÍTICO: Inicializar lightbox AL FINAL
            // Para asegurar que todas las imágenes estén en el DOM
            console.log('🖼️ Initializing Lightbox...');
            LightboxManager.init();
            
            // Verificar que el lightbox se haya inicializado correctamente
            const screenshotImages = document.querySelectorAll('.screenshot-img');
            console.log(`✓ Found ${screenshotImages.length} screenshot images`);
            
            if (screenshotImages.length === 0) {
                console.warn('⚠️ No screenshot images found! Lightbox may not work.');
            }

            // Marcar cuando la app está lista
            performanceMark('app-initialized');
            
            console.log('✅ AeRForU Website initialized successfully');
            
            // Debug: Verificar event listeners
            this.debugLightbox();
            
        } catch (error) {
            console.error('❌ Error initializing components:', error);
        }
    },

    /**
     * Función de debug para verificar el lightbox
     */
    debugLightbox() {
        console.log('🔍 Lightbox Debug Info:');
        console.log('- Lightbox element:', document.getElementById('lightbox'));
        console.log('- Lightbox image:', document.getElementById('lightboxImg'));
        console.log('- Close button:', document.getElementById('lightboxClose'));
        console.log('- Screenshot images:', document.querySelectorAll('.screenshot-img').length);
        
        // Verificar que las imágenes tengan el event listener
        const firstImg = document.querySelector('.screenshot-img');
        if (firstImg) {
            console.log('- First image has click listener:', firstImg.onclick !== null || firstImg.addEventListener !== undefined);
            console.log('- First image attributes:', {
                src: firstImg.src,
                alt: firstImg.alt,
                tabindex: firstImg.getAttribute('tabindex'),
                role: firstImg.getAttribute('role')
            });
        }
    },

    /**
     * Registra Service Worker para PWA (opcional)
     */
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(reg => console.log('Service Worker registered:', reg))
                    .catch(err => console.warn('Service Worker registration failed:', err));
            });
        }
    }
};

// Iniciar la aplicación
App.init();

// Opcional: descomentar para habilitar PWA
// App.registerServiceWorker();

// Exportar para debugging en consola
window.App = App;
window.LightboxManager = LightboxManager;