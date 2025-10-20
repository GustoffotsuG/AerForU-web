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
            
            // Inicializar componentes después de cargar el contenido
            this.initComponents();
            
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
            
            // Inicializar componentes en orden de prioridad
            LightboxManager.init();
            AnimationObserver.init();
            SmoothScroll.init();
            HeaderScroll.init();
            ImagePreloader.init();

            // Marcar cuando la app está lista (para analytics/debugging)
            performanceMark('app-initialized');
            
            console.log('✅ AeRForU Website initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing components:', error);
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