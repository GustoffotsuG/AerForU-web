/**
 * NON-CRITICAL MODULES
 * Código que NO es necesario para First Paint ni interacción inicial
 * Se carga cuando el navegador está idle (requestIdleCallback)
 */

/**
 * Carga todos los módulos no críticos
 */
export async function loadNonCriticalModules() {
    console.log('⏳ Loading non-critical modules...');
    
    try {
        // Cargar módulos en paralelo
        const [
            { GitHubVersion },
            { Analytics }
        ] = await Promise.all([
            import('./github-version.js'),
            import('./analytics.js')
        ]);

        // 1. Inicializar Analytics (bajo impacto en UX)
        Analytics.init();
        console.log('✅ Analytics initialized');

        // 2. Cargar versión de GitHub (lazy, no crítico)
        await GitHubVersion.renderVersionInfo('version-info');
        console.log('✅ GitHub version loaded');

        console.log('✅ All non-critical modules loaded');
        
        return { GitHubVersion, Analytics };
        
    } catch (error) {
        console.error('Error loading non-critical modules:', error);
        return null;
    }
}

/**
 * Carga módulos de analytics de forma ultra-lazy
 * Solo se ejecuta después de 3 segundos de inactividad
 */
export async function loadAnalyticsLazy() {
    try {
        const { Analytics } = await import('./analytics.js');
        Analytics.init();
        console.log('✅ Analytics loaded (lazy)');
        return Analytics;
    } catch (error) {
        console.warn('Analytics failed to load:', error);
        return null;
    }
}

/**
 * Precarga de contenido para navegación futura
 * Se ejecuta cuando el usuario está a punto de hacer clic
 */
export function setupPrefetchOnHover() {
    // Prefetch de páginas al hacer hover sobre enlaces
    const links = document.querySelectorAll('a[href^="http"]');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const url = link.href;
            
            // Crear link de prefetch
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = url;
            prefetchLink.as = 'document';
            
            document.head.appendChild(prefetchLink);
        }, { once: true, passive: true });
    });
    
    console.log('✅ Prefetch on hover enabled');
}

/**
 * Lazy load de imágenes fuera de viewport
 * Para imágenes que no tienen loading="lazy"
 */
export function setupLazyLoadImages() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
        
        console.log('✅ Lazy load images enabled');
    }
}

/**
 * Setup de tracking de scroll depth para Analytics
 * Solo se activa después de que todo esté cargado
 */
export function setupScrollTracking() {
    let scrollPercentages = [25, 50, 75, 100];
    let tracked = new Set();

    const trackScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        scrollPercentages.forEach(threshold => {
            if (scrollPercent >= threshold && !tracked.has(threshold)) {
                tracked.add(threshold);
                
                // Track con Analytics si está disponible
                if (window.Analytics) {
                    window.Analytics.trackScrollDepth(threshold);
                }
                
                console.log(`📊 Scroll: ${threshold}%`);
            }
        });
    };

    // Throttle del tracking de scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                trackScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    console.log('✅ Scroll tracking enabled');
}

/**
 * Setup de Service Worker para PWA (opcional)
 */
export async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('✅ Service Worker registered:', registration.scope);
            return registration;
        } catch (error) {
            console.warn('Service Worker registration failed:', error);
            return null;
        }
    }
    return null;
}

/**
 * Inicialización completa de módulos no críticos
 * Esta es la función principal que se llama desde app.js
 */
export async function initNonCritical() {
    console.log('🚀 Initializing non-critical features...');
    
    // 1. Cargar módulos principales no críticos
    await loadNonCriticalModules();
    
    // 2. Setup de características adicionales (ultra-lazy)
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            setupLazyLoadImages();
            setupScrollTracking();
        }, { timeout: 5000 });
        
        // Prefetch en hover después de todo
        requestIdleCallback(() => {
            setupPrefetchOnHover();
        }, { timeout: 10000 });
    } else {
        setTimeout(() => {
            setupLazyLoadImages();
            setupScrollTracking();
            setupPrefetchOnHover();
        }, 3000);
    }
    
    console.log('✅ Non-critical initialization complete');
}