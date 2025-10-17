/**
 * Precarga inteligente de imágenes con lazy loading
 */

export const ImagePreloader = {
    observer: null,

    /**
     * Inicializa el preloader de imágenes
     */
    init() {
        if (!('IntersectionObserver' in window)) {
            // Fallback para navegadores antiguos
            this.loadAllImages();
            return;
        }

        this.setupObserver();
        this.observeImages();
    },

    /**
     * Configura el Intersection Observer
     */
    setupObserver() {
        const options = {
            root: null,
            rootMargin: '50px 0px', // Precargar 50px antes de que sea visible
            threshold: 0.01
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);
    },

    /**
     * Observa todas las imágenes lazy
     */
    observeImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            if (this.observer) {
                this.observer.observe(img);
            }
        });
    },

    /**
     * Carga una imagen específica
     * @param {HTMLImageElement} img
     */
    loadImage(img) {
        if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        }

        // Añadir clase cuando la imagen se carga
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        }, { once: true });

        // Manejar errores de carga
        img.addEventListener('error', () => {
            console.error('Error loading image:', img.src);
            img.classList.add('error');
        }, { once: true });
    },

    /**
     * Fallback: carga todas las imágenes inmediatamente
     */
    loadAllImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => this.loadImage(img));
    },

    /**
     * Desconecta el observer
     */
    disconnect() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
};