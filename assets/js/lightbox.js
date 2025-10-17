/**
 * Gestor del Lightbox para galería de imágenes
 */

export const LightboxManager = {
    lightbox: null,
    lightboxImg: null,
    lightboxClose: null,
    lightboxCaption: null,

    /**
     * Inicializa el lightbox
     */
    init() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = document.getElementById('lightboxImg');
        this.lightboxClose = document.getElementById('lightboxClose');
        this.lightboxCaption = document.getElementById('lightboxCaption');

        if (!this.lightbox || !this.lightboxImg || !this.lightboxClose) {
            console.warn('Lightbox elements not found');
            return;
        }

        this.attachListeners();
    },

    /**
     * Abre el lightbox con una imagen
     * @param {String} src - URL de la imagen
     * @param {String} alt - Texto alternativo
     */
    open(src, alt) {
        // Precargar imagen en alta resolución
        const img = new Image();
        img.onload = () => {
            this.lightbox.classList.add('active');
            this.lightboxImg.src = src;
            this.lightboxImg.alt = alt;
            
            if (this.lightboxCaption) {
                this.lightboxCaption.textContent = alt;
            }
            
            // Prevenir scroll del body
            document.body.style.overflow = 'hidden';
            
            // Focus en el botón de cerrar para accesibilidad
            setTimeout(() => this.lightboxClose.focus(), 100);
        };
        
        img.onerror = () => {
            console.error('Error loading image:', src);
        };
        
        img.src = src;
    },

    /**
     * Cierra el lightbox
     */
    close() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
        this.lightboxImg.src = '';
        
        if (this.lightboxCaption) {
            this.lightboxCaption.textContent = '';
        }
    },

    /**
     * Adjunta event listeners
     */
    attachListeners() {
        // Click en imágenes para abrir lightbox
        document.querySelectorAll('.screenshot-img').forEach(img => {
            // Click
            img.addEventListener('click', (e) => {
                this.open(e.target.src, e.target.alt);
            });
            
            // Accesibilidad: Enter/Space para abrir
            img.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.open(e.target.src, e.target.alt);
                }
            });
            
            // Hacer las imágenes focuseables
            img.setAttribute('tabindex', '0');
            img.setAttribute('role', 'button');
            img.setAttribute('aria-label', 'Click para ampliar imagen');
        });

        // Cerrar lightbox con el botón X
        this.lightboxClose.addEventListener('click', () => this.close());
        
        // Accesibilidad: Enter/Space para cerrar
        this.lightboxClose.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.close();
            }
        });

        // Click fuera de la imagen para cerrar
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.close();
            }
        });

        // Tecla Escape para cerrar
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.lightbox.classList.contains('active')) {
                this.close();
            }
        });
    }
};