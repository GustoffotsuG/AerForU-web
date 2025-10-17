/**
 * AeRForU Website - Aplicación Principal
 * Punto de entrada que inicializa todos los módulos
 */

import { ThemeManager } from './theme-manager.js';
import { LightboxManager } from './lightbox.js';
import { AnimationObserver } from './animations.js';
import { SmoothScroll } from './smooth-scroll.js';
import { HeaderScroll } from './heade-scroll.js';
import { ImagePreloader } from './image-preloader.js';
import { performanceMark, domReady } from './utils.js';

/**
 * Aplicación principal
 */
const App = {
    /**
     * Inicializa la aplicación
     */
    init() {
        // Inicializar gestor de temas de inmediato
        ThemeManager.init();
        
        // Esperar a que el DOM esté completamente cargado
        domReady(() => {
            this.initComponents();
        });
    },

    /**
     * Inicializa todos los componentes
     */
    initComponents() {
        try {
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
            console.error('❌ Error initializing app:', error);
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