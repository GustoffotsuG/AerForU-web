/**
 * Gestor de temas (claro/oscuro)
 */

import { getLocalStorage, setLocalStorage } from './utils.js';

export const ThemeManager = {
    THEME_KEY: 'theme',
    DARK_THEME: 'dark',
    LIGHT_THEME: 'light',

    /**
     * Inicializa el gestor de temas
     */
    init() {
        const savedTheme = getLocalStorage(this.THEME_KEY, this.DARK_THEME);
        this.setTheme(savedTheme);
        this.attachListeners();
        this.detectSystemTheme();
    },

    /**
     * Establece el tema
     * @param {String} theme - 'dark' o 'light'
     */
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        setLocalStorage(this.THEME_KEY, theme);
        this.updateIcon(theme);
        
        // Evento personalizado para otros módulos
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    },

    /**
     * Actualiza el icono del toggle
     * @param {String} theme
     */
    updateIcon(theme) {
        const icon = document.querySelector('.theme-icon');
        if (icon) {
            icon.textContent = theme === this.DARK_THEME ? '☀️' : '🌙';
            icon.setAttribute('aria-label', 
                theme === this.DARK_THEME ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'
            );
        }
    },

    /**
     * Alterna entre temas
     */
    toggle() {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === this.DARK_THEME ? this.LIGHT_THEME : this.DARK_THEME;
        this.setTheme(newTheme);
    },

    /**
     * Obtiene el tema actual
     * @returns {String}
     */
    getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || this.DARK_THEME;
    },

    /**
     * Detecta y respeta las preferencias del sistema
     */
    detectSystemTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Solo aplicar si el usuario no ha establecido una preferencia
        const hasUserPreference = localStorage.getItem(this.THEME_KEY);
        
        if (!hasUserPreference) {
            this.setTheme(mediaQuery.matches ? this.DARK_THEME : this.LIGHT_THEME);
        }

        // Escuchar cambios en las preferencias del sistema
        mediaQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem(this.THEME_KEY)) {
                this.setTheme(e.matches ? this.DARK_THEME : this.LIGHT_THEME);
            }
        });
    },

    /**
     * Adjunta event listeners
     */
    attachListeners() {
        const toggle = document.getElementById('themeToggle');
        if (toggle) {
            toggle.addEventListener('click', () => this.toggle());
            
            // Accesibilidad: permitir toggle con teclado
            toggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggle();
                }
            });
        }
    }
};