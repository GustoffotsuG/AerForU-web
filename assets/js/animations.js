/**
 * Gestor de animaciones con Intersection Observer
 */

import { prefersReducedMotion } from './utils.js';

export const AnimationObserver = {
    observer: null,

    /**
     * Inicializa el Intersection Observer
     */
    init() {
        // No animar si el usuario prefiere movimiento reducido
        if (prefersReducedMotion()) {
            this.showAllElements();
            return;
        }

        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -80px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Añadir delay escalonado para mejor efecto visual
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 50);
                    
                    // Dejar de observar una vez animado (optimización)
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);

        // Observar todos los elementos con clase .fade-in
        this.observeElements();
    },

    /**
     * Observa elementos que deben animarse
     */
    observeElements() {
        document.querySelectorAll('.fade-in').forEach(el => {
            if (this.observer) {
                this.observer.observe(el);
            }
        });
    },

    /**
     * Muestra todos los elementos sin animación
     * Usado cuando prefers-reduced-motion está activo
     */
    showAllElements() {
        document.querySelectorAll('.fade-in').forEach(el => {
            el.classList.add('visible');
        });
    },

    /**
     * Desconecta el observer (limpieza)
     */
    disconnect() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
};