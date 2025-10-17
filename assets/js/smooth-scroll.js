/**
 * Gestión de scroll suave entre secciones
 */

export const SmoothScroll = {
    headerOffset: 80,

    /**
     * Inicializa el smooth scroll
     */
    init() {
        this.attachListeners();
    },

    /**
     * Realiza scroll suave a un elemento
     * @param {HTMLElement} target - Elemento destino
     */
    scrollToElement(target) {
        if (!target) return;

        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - this.headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    },

    /**
     * Adjunta event listeners a enlaces internos
     */
    attachListeners() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                
                // Ignorar enlaces vacíos
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    this.scrollToElement(target);
                    
                    // Actualizar URL sin hacer scroll
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }
                }
            });
        });
    },

    /**
     * Scroll al inicio de la página
     */
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};