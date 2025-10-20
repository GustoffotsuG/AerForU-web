/**
 * Gestor del Lightbox para galería de imágenes con navegación
 */

export const LightboxManager = {
    lightbox: null,
    lightboxImg: null,
    lightboxClose: null,
    lightboxCaption: null,
    currentIndex: 0,
    images: [],
    isZoomed: false,

    /**
     * Inicializa el lightbox COMPLETO (con listeners de imágenes)
     */
    init() {
        this.initWithoutImageListeners();
        this.attachImageListeners();
    },

    /**
     * Inicializa el lightbox SIN adjuntar listeners a las imágenes
     * (Útil cuando queremos controlar los listeners externamente)
     */
    initWithoutImageListeners() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = document.getElementById('lightboxImg');
        this.lightboxClose = document.getElementById('lightboxClose');
        this.lightboxCaption = document.getElementById('lightboxCaption');

        if (!this.lightbox || !this.lightboxImg || !this.lightboxClose) {
            console.warn('Lightbox elements not found');
            return;
        }

        // Recolectar todas las imágenes
        this.collectImages();
        
        // Crear controles de navegación
        this.createNavigationControls();
        
        // Adjuntar listeners (excepto los de las imágenes)
        this.attachBasicListeners();
        
        console.log('✅ Lightbox initialized (without image listeners)');
    },

    /**
     * Recolecta todas las imágenes de la galería
     */
    collectImages() {
        const imageElements = document.querySelectorAll('.screenshot-img');
        this.images = Array.from(imageElements).map(img => ({
            src: img.src,
            alt: img.alt
        }));
        console.log(`   Collected ${this.images.length} images`);
    },

    /**
     * Crea los controles de navegación (flechas)
     */
    createNavigationControls() {
        // Verificar si ya existen
        if (document.getElementById('lightboxPrev')) {
            console.log('   Navigation controls already exist');
            return;
        }

        // Botón anterior
        const prevBtn = document.createElement('button');
        prevBtn.className = 'lightbox-nav prev';
        prevBtn.innerHTML = '❮';
        prevBtn.setAttribute('aria-label', 'Imagen anterior');
        prevBtn.id = 'lightboxPrev';
        
        // Botón siguiente
        const nextBtn = document.createElement('button');
        nextBtn.className = 'lightbox-nav next';
        nextBtn.innerHTML = '❯';
        nextBtn.setAttribute('aria-label', 'Imagen siguiente');
        nextBtn.id = 'lightboxNext';

        // Añadir al lightbox
        this.lightbox.appendChild(prevBtn);
        this.lightbox.appendChild(nextBtn);

        // Event listeners para navegación
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.previousImage();
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.nextImage();
        });
        
        console.log('   Navigation controls created');
    },

    /**
     * Abre el lightbox con una imagen
     * @param {String} src - URL de la imagen
     * @param {String} alt - Texto alternativo
     */
    open(src, alt) {
        console.log(`📸 Opening lightbox: ${alt}`);
        
        // Encontrar el índice de la imagen actual
        this.currentIndex = this.images.findIndex(img => img.src === src);
        if (this.currentIndex === -1) this.currentIndex = 0;

        // Precargar imagen en alta resolución
        const img = new Image();
        img.onload = () => {
            this.lightbox.classList.add('active');
            this.lightboxImg.src = src;
            this.lightboxImg.alt = alt;
            this.isZoomed = false;
            this.lightboxImg.classList.remove('zoomed');
            
            if (this.lightboxCaption) {
                this.lightboxCaption.textContent = alt;
            }
            
            // Actualizar visibilidad de botones de navegación
            this.updateNavigationButtons();
            
            // Prevenir scroll del body
            document.body.style.overflow = 'hidden';
            
            // Focus en el botón de cerrar para accesibilidad
            setTimeout(() => this.lightboxClose.focus(), 100);
            
            console.log('✅ Lightbox opened');
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
        this.isZoomed = false;
        this.lightboxImg.classList.remove('zoomed');
        
        if (this.lightboxCaption) {
            this.lightboxCaption.textContent = '';
        }
        
        console.log('❌ Lightbox closed');
    },

    /**
     * Muestra la imagen anterior
     */
    previousImage() {
        if (this.images.length === 0) return;
        
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        const prevImg = this.images[this.currentIndex];
        
        // Animación de transición
        this.lightboxImg.style.opacity = '0';
        setTimeout(() => {
            this.lightboxImg.src = prevImg.src;
            this.lightboxImg.alt = prevImg.alt;
            this.lightboxCaption.textContent = prevImg.alt;
            this.isZoomed = false;
            this.lightboxImg.classList.remove('zoomed');
            this.lightboxImg.style.opacity = '1';
            this.updateNavigationButtons();
        }, 200);
    },

    /**
     * Muestra la imagen siguiente
     */
    nextImage() {
        if (this.images.length === 0) return;
        
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        const nextImg = this.images[this.currentIndex];
        
        // Animación de transición
        this.lightboxImg.style.opacity = '0';
        setTimeout(() => {
            this.lightboxImg.src = nextImg.src;
            this.lightboxImg.alt = nextImg.alt;
            this.lightboxCaption.textContent = nextImg.alt;
            this.isZoomed = false;
            this.lightboxImg.classList.remove('zoomed');
            this.lightboxImg.style.opacity = '1';
            this.updateNavigationButtons();
        }, 200);
    },

    /**
     * Alterna el zoom de la imagen
     */
    toggleZoom() {
        this.isZoomed = !this.isZoomed;
        
        if (this.isZoomed) {
            this.lightboxImg.classList.add('zoomed');
            this.lightbox.style.cursor = 'zoom-out';
        } else {
            this.lightboxImg.classList.remove('zoomed');
            this.lightbox.style.cursor = 'zoom-in';
        }
    },

    /**
     * Actualiza la visibilidad de los botones de navegación
     */
    updateNavigationButtons() {
        const prevBtn = document.getElementById('lightboxPrev');
        const nextBtn = document.getElementById('lightboxNext');
        
        if (!prevBtn || !nextBtn) return;

        // Mostrar/ocultar según si hay múltiples imágenes
        if (this.images.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        }
    },

    /**
     * Adjunta event listeners básicos (sin imágenes)
     */
    attachBasicListeners() {
        // Cerrar lightbox con el botón X
        this.lightboxClose.addEventListener('click', () => this.close());
        
        // Accesibilidad: Enter/Space para cerrar
        this.lightboxClose.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.close();
            }
        });

        // Click en la imagen para hacer zoom
        this.lightboxImg.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleZoom();
        });

        // Click fuera de la imagen para cerrar
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.close();
            }
        });

        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    this.close();
                    break;
                case 'ArrowLeft':
                    this.previousImage();
                    break;
                case 'ArrowRight':
                    this.nextImage();
                    break;
                case ' ':
                    e.preventDefault();
                    this.toggleZoom();
                    break;
            }
        });

        // Soporte para gestos táctiles en móviles
        let touchStartX = 0;
        let touchEndX = 0;

        this.lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        this.lightbox.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });

        this.handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    this.nextImage();
                } else {
                    this.previousImage();
                }
            }
        };
        
        console.log('   Basic listeners attached');
    },

    /**
     * Adjunta listeners a las imágenes de la galería
     * (Este método se llama desde app.js o puede usarse aquí)
     */
    attachImageListeners() {
        document.querySelectorAll('.screenshot-img').forEach((img, index) => {
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
        
        console.log('   Image listeners attached');
    }
};