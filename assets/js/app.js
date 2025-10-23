/**
 * AeRForU Website - Aplicación Principal OPTIMIZADA
 * - Carga diferida de módulos pesados
 * - Inicialización progresiva
 * - Reducción de Total Blocking Time
 */

// Importaciones críticas primero (necesarias para First Paint)
import { ThemeManager } from './theme-manager.js';
import { domReady } from './utils.js';

/**
 * Aplicación principal con inicialización progresiva
 */
const App = {
    // Flags de estado
    isInitialized: false,
    modulesLoaded: {
        critical: false,
        secondary: false,
        lazy: false
    },

    /**
     * Inicialización INMEDIATA - Solo crítico
     */
    init() {
        // 1. Tema INMEDIATO (debe aplicarse antes de First Paint)
        ThemeManager.init();
        
        // 2. DOM Ready - Carga progresiva
        domReady(() => {
            this.loadCriticalModules();
        });
    },

    /**
     * PASO 1: Módulos críticos (necesarios para interacción básica)
     * Carga en ~100ms
     */
    async loadCriticalModules() {
        try {
            // Importaciones críticas en paralelo
            const [
                { SmoothScroll },
                { HeaderScroll },
                { DownloadManager }
            ] = await Promise.all([
                import('./smooth-scroll.js'),
                import('./header-scroll.js'),
                import('./download-manager.js')
            ]);

            // Inicializar críticos
            SmoothScroll.init();
            HeaderScroll.init();
            DownloadManager.init();
            
            this.modulesLoaded.critical = true;
            console.log('✅ Critical modules loaded');

            // Cargar contenido dinámico en paralelo
            this.loadContent();
            
            // Diferir módulos secundarios (no bloquean interacción)
            if ('requestIdleCallback' in window) {
                requestIdleCallback(() => this.loadSecondaryModules(), { timeout: 2000 });
            } else {
                setTimeout(() => this.loadSecondaryModules(), 1000);
            }
            
        } catch (error) {
            console.error('Error loading critical modules:', error);
        }
    },

    /**
     * PASO 2: Carga de contenido (JSON) - No bloquea interacción
     */
    async loadContent() {
        try {
            const { DataLoader } = await import('./data-loader.js');
            const { DOMBuilder } = await import('./dom-builder.js');

            // Cargar datos en paralelo
            const [features, screenshots, steps] = await Promise.all([
                DataLoader.loadFeatures(),
                DataLoader.loadScreenshots(),
                DataLoader.loadInstallationSteps()
            ]);

            // Renderizar progresivamente (uno por uno, sin bloquear)
            requestAnimationFrame(() => {
                if (features.length > 0) {
                    DOMBuilder.renderFeatures(features, 'features-grid');
                }
            });

            requestAnimationFrame(() => {
                if (screenshots.length > 0) {
                    DOMBuilder.renderScreenshots(screenshots, 'screenshots-gallery');
                }
            });

            requestAnimationFrame(() => {
                if (steps.length > 0) {
                    DOMBuilder.renderInstallationSteps(steps, 'installation-steps');
                }
            });

            // Adjuntar lightbox después de renderizar
            if ('requestIdleCallback' in window) {
                requestIdleCallback(() => this.attachLightboxListeners(), { timeout: 1000 });
            } else {
                setTimeout(() => this.attachLightboxListeners(), 500);
            }

            // Cargar versión de GitHub (no crítica)
            if ('requestIdleCallback' in window) {
                requestIdleCallback(() => this.loadVersionInfo(), { timeout: 3000 });
            } else {
                setTimeout(() => this.loadVersionInfo(), 2000);
            }
            
            // Cargar módulos no críticos cuando idle
            if ('requestIdleCallback' in window) {
                requestIdleCallback(async () => {
                    const { initNonCritical } = await import('./non-critical.js');
                    await initNonCritical();
                }, { timeout: 3000 });
            } else {
                setTimeout(async () => {
                    const { initNonCritical } = await import('./non-critical.js');
                    await initNonCritical();
                }, 2000);
            }

        } catch (error) {
            console.error('Error loading content:', error);
        }
    },

    /**
     * PASO 3: Módulos secundarios (animaciones, preloader)
     * Se cargan cuando el navegador está idle
     */
    async loadSecondaryModules() {
        try {
            const [
                { AnimationObserver },
                { ImagePreloader }
            ] = await Promise.all([
                import('./animations.js'),
                import('./image-preloader.js')
            ]);

            AnimationObserver.init();
            ImagePreloader.init();
            
            this.modulesLoaded.secondary = true;
            console.log('✅ Secondary modules loaded');

        } catch (error) {
            console.error('Error loading secondary modules:', error);
        }
    },

    /**
     * Carga de versión desde GitHub (LAZY - no crítica)
     */
    async loadVersionInfo() {
        try {
            const { GitHubVersion } = await import('./github-version.js');
            await GitHubVersion.renderVersionInfo('version-info');
        } catch (error) {
            console.error('Error loading version info:', error);
        }
    },

    /**
     * Adjunta listeners del lightbox (después de renderizar screenshots)
     */
    async attachLightboxListeners() {
        try {
            const { LightboxManager } = await import('./lightbox.js');
            
            // Inicializar lightbox sin listeners automáticos
            LightboxManager.initWithoutImageListeners();
            
            // Exponer globalmente
            window.LightboxManager = LightboxManager;
            
            // Adjuntar a imágenes
            const images = document.querySelectorAll('.screenshot-img');
            
            if (images.length === 0) return;
            
            images.forEach((img) => {
                const card = img.closest('.screenshot-card');
                if (!card) return;
                
                card.style.cursor = 'pointer';
                
                const openLightbox = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    LightboxManager.open(img.src, img.alt);
                };
                
                card.addEventListener('click', openLightbox, { passive: false });
                card.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openLightbox(e);
                    }
                });
                
                card.setAttribute('tabindex', '0');
                card.setAttribute('aria-label', `Click para ampliar: ${img.alt}`);
            });
            
            console.log('✅ Lightbox listeners attached');
            
        } catch (error) {
            console.error('Error attaching lightbox:', error);
        }
    }
};

// Inicializar aplicación INMEDIATAMENTE
App.init();

// Exportar globalmente para debugging y compatibilidad
window.App = App;
window.DownloadManager = null; // Se inicializará después

// Esperar a que DownloadManager esté disponible
setTimeout(() => {
    import('./download-manager.js').then(({ DownloadManager }) => {
        window.DownloadManager = DownloadManager;
    });
}, 100);