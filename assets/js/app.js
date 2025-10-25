/**
 * AeRForU Website - Aplicación Principal OPTIMIZADA
 * ✅ SOLUCIÓN RACE CONDITION: Polling verificado antes de lightbox
 */

// Importaciones críticas primero
import { ThemeManager } from './theme-manager.js';
import { domReady } from './utils.js';

const App = {
    isInitialized: false,
    modulesLoaded: {
        critical: false,
        secondary: false,
        lazy: false
    },
    
    // 🔧 NUEVAS PROPIEDADES PARA TRACKING
    expectedScreenshotCount: 0,
    expectedFeatureCount: 0,

    /**
     * Inicialización INMEDIATA - Solo crítico
     */
    init() {
        if (this.isInitialized) {
            console.warn('⚠️ App already initialized, skipping...');
            return;
        }
        
        console.log('🚀 Initializing AeRForU Website...');
        ThemeManager.init();
        
        domReady(() => {
            this.loadCriticalModules();
        });
        
        this.isInitialized = true;
    },

    /**
     * PASO 1: Módulos críticos
     */
    async loadCriticalModules() {
        try {
            const [
                { SmoothScroll },
                { HeaderScroll },
                { DownloadManager }
            ] = await Promise.all([
                import('./smooth-scroll.js'),
                import('./header-scroll.js'),
                import('./download-manager.js')
            ]);

            SmoothScroll.init();
            HeaderScroll.init();
            DownloadManager.init();
            
            this.modulesLoaded.critical = true;
            console.log('✅ Critical modules loaded');

            // Cargar contenido y diferir secundarios
            await this.loadContent();
            
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
     * PASO 2: Carga de contenido (JSON) - CON TRACKING
     */
    async loadContent() {
        console.log('📦 Loading dynamic content...');
        
        try {
            const { DataLoader } = await import('./data-loader.js');
            const { DOMBuilder } = await import('./dom-builder.js');

            // Cargar datos en paralelo
            const [features, screenshots, steps] = await Promise.all([
                DataLoader.loadFeatures(),
                DataLoader.loadScreenshots(),
                DataLoader.loadInstallationSteps()
            ]);
            
            // 🔧 GUARDAR RECUENTOS ESPERADOS
            this.expectedScreenshotCount = screenshots.length;
            this.expectedFeatureCount = features.length;

            console.log(`✅ Data loaded:`, { 
                features: features.length, 
                screenshots: screenshots.length, 
                steps: steps.length 
            });

            // Verificar contenedores
            const featuresContainer = document.getElementById('features-grid');
            const screenshotsContainer = document.getElementById('screenshots-gallery');
            const stepsContainer = document.getElementById('installation-steps');

            if (!featuresContainer || !screenshotsContainer || !stepsContainer) {
                console.error('❌ Containers not found in DOM');
                return;
            }

            // 🔧 RENDERIZADO SECUENCIAL CON AWAIT
            // 1. Features (con verificación)
            if (features.length > 0) {
                DOMBuilder.renderFeatures(features, 'features-grid');
                await this.waitForFeaturesToRender();
            } else {
                featuresContainer.innerHTML = '<p class="loading-placeholder">❌ Error cargando funcionalidades</p>';
            }

            // 2. Steps (simple, no requiere verificación especial)
            if (steps.length > 0) {
                DOMBuilder.renderInstallationSteps(steps, 'installation-steps');
            } else {
                stepsContainer.innerHTML = '<p class="loading-placeholder">❌ Error cargando pasos</p>';
            }
            
            // 3. Screenshots (con verificación CRÍTICA)
            if (screenshots.length > 0) {
                DOMBuilder.renderScreenshots(screenshots, 'screenshots-gallery');
                
                // ✅ ESPERAR A QUE TODAS LAS IMÁGENES ESTÉN RENDERIZADAS
                await this.waitForScreenshotsToRender();
                
                // ✅ SOLO ENTONCES ADJUNTAR LIGHTBOX
                await this.attachLightboxListeners();
            } else {
                screenshotsContainer.innerHTML = '<p class="loading-placeholder">❌ Error cargando capturas</p>';
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
            console.error('❌ Error loading content:', error);
            const containers = ['features-grid', 'screenshots-gallery', 'installation-steps'];
            containers.forEach(id => {
                const container = document.getElementById(id);
                if (container) {
                    container.innerHTML = `<p class="loading-placeholder">❌ Error: ${error.message}</p>`;
                }
            });
        }
    },

    /**
     * 🆕 POLLING: Espera a que TODAS las features estén renderizadas
     */
    async waitForFeaturesToRender() {
        const EXPECTED_COUNT = this.expectedFeatureCount;
        const MAX_RETRIES = 50; // 50 * 10ms = 500ms timeout
        const WAIT_TIME = 10;
        
        let retries = 0;
        
        return new Promise((resolve, reject) => {
            const checkFeatures = () => {
                const features = document.querySelectorAll('.feature-card');
                
                if (features.length >= EXPECTED_COUNT) {
                    console.log(`✅ Features rendered: ${features.length}/${EXPECTED_COUNT}`);
                    resolve();
                } else if (retries < MAX_RETRIES) {
                    retries++;
                    setTimeout(checkFeatures, WAIT_TIME);
                } else {
                    console.error(`❌ Timeout waiting for features. Found: ${features.length}/${EXPECTED_COUNT}`);
                    reject(new Error('Feature rendering timeout'));
                }
            };
            
            checkFeatures();
        });
    },

    /**
     * 🆕 POLLING: Espera a que TODAS las screenshots estén renderizadas
     */
    async waitForScreenshotsToRender() {
        const EXPECTED_COUNT = this.expectedScreenshotCount;
        const MAX_RETRIES = 100; // 100 * 10ms = 1s timeout (más tiempo para imágenes)
        const WAIT_TIME = 10;
        
        let retries = 0;
        
        return new Promise((resolve, reject) => {
            const checkScreenshots = () => {
                const images = document.querySelectorAll('.screenshot-img');
                
                if (images.length >= EXPECTED_COUNT) {
                    console.log(`✅ Screenshots rendered: ${images.length}/${EXPECTED_COUNT}`);
                    resolve();
                } else if (retries < MAX_RETRIES) {
                    retries++;
                    
                    // Log cada 20 reintentos para debugging
                    if (retries % 20 === 0) {
                        console.log(`⏳ Waiting for screenshots... ${images.length}/${EXPECTED_COUNT} (attempt ${retries}/${MAX_RETRIES})`);
                    }
                    
                    setTimeout(checkScreenshots, WAIT_TIME);
                } else {
                    console.error(`❌ Timeout waiting for screenshots. Found: ${images.length}/${EXPECTED_COUNT}`);
                    reject(new Error('Screenshot rendering timeout'));
                }
            };
            
            checkScreenshots();
        });
    },

    /**
     * PASO 3: Módulos secundarios (animaciones, preloader)
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
     * ✅ LIGHTBOX: Solo se ejecuta DESPUÉS de verificar que las imágenes existen
     */
    async attachLightboxListeners() {
        try {
            const { LightboxManager } = await import('./lightbox.js');
            
            // Inicializar lightbox sin listeners automáticos
            LightboxManager.initWithoutImageListeners();
            
            // Exponer globalmente
            window.LightboxManager = LightboxManager;
            
            // 🔧 VERIFICACIÓN FINAL antes de adjuntar listeners
            const images = document.querySelectorAll('.screenshot-img');
            const EXPECTED = this.expectedScreenshotCount;
            
            if (images.length < EXPECTED) {
                console.warn(`⚠️ Image count mismatch! Expected: ${EXPECTED}, Found: ${images.length}`);
            }
            
            // Adjuntar listeners a TODAS las imágenes encontradas
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
            
            console.log(`✅ Lightbox listeners attached to ${images.length} images`);
            
        } catch (error) {
            console.error('Error attaching lightbox:', error);
        }
    }
};

// Inicializar aplicación INMEDIATAMENTE
App.init();

// Handler para beforeunload
window.addEventListener('beforeunload', () => {
    console.log('👋 Page unloading...');
});

// Exportar globalmente
window.App = App;
window.DownloadManager = null;

setTimeout(() => {
    import('./download-manager.js').then(({ DownloadManager }) => {
        window.DownloadManager = DownloadManager;
    });
}, 100);