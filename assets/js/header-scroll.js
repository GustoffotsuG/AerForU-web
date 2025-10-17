/**
 * Gestión de efectos del header al hacer scroll
 */

import { debounce } from './utils.js';

export const HeaderScroll = {
    header: null,
    lastScroll: 0,
    scrollThreshold: 100,

    /**
     * Inicializa el gestor de scroll del header
     */
    init() {
        this.header = document.getElementById('header');
        
        if (!this.header) {
            console.warn('Header element not found');
            return;
        }

        this.attachListeners();
    },

    /**
     * Maneja el scroll de la página
     */
    handleScroll() {
        const currentScroll = window.pageYOffset;

        // Añadir clase 'scrolled' después del threshold
        if (currentScroll > this.scrollThreshold) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }

        // Opcional: Ocultar header al hacer scroll hacia abajo
        // if (currentScroll > this.lastScroll && currentScroll > this.scrollThreshold) {
        //     this.header.style.transform = 'translateY(-100%)';
        // } else {
        //     this.header.style.transform = 'translateY(0)';
        // }

        this.lastScroll = currentScroll;
    },

    /**
     * Adjunta event listeners
     */
    attachListeners() {
        // Usar debounce para optimizar rendimiento
        window.addEventListener('scroll', debounce(() => {
            this.handleScroll();
        }, 10));

        // Verificar scroll inicial
        this.handleScroll();
    }
};