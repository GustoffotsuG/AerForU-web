/**
 * Gestor de descargas con sistema de notificaciones toast y Analytics
 */

import { Analytics } from './analytics.js';

export const DownloadManager = {
    downloadBtn: null,
    originalContent: '',
    toastContainer: null,
    activeToasts: new Set(),

    /**
     * Inicializa el gestor de descargas
     */
    init() {
        this.createToastContainer();
        this.attachDownloadListeners();
        console.log('✅ DownloadManager initialized');
    },

    /**
     * Crea el contenedor de toasts
     */
    createToastContainer() {
        if (document.getElementById('toast-container')) return;

        this.toastContainer = document.createElement('div');
        this.toastContainer.id = 'toast-container';
        this.toastContainer.className = 'toast-container';
        this.toastContainer.setAttribute('aria-live', 'polite');
        this.toastContainer.setAttribute('aria-atomic', 'true');
        document.body.appendChild(this.toastContainer);
    },

    /**
     * Adjunta listeners a los botones de descarga
     */
    attachDownloadListeners() {
        // Buscar todos los botones de descarga
        const downloadButtons = document.querySelectorAll('a[download], .btn-primary[download]');
        
        downloadButtons.forEach(btn => {
            // Guardar contenido original
            if (btn.classList.contains('btn-primary')) {
                this.downloadBtn = btn;
                this.originalContent = btn.innerHTML;
            }

            btn.addEventListener('click', (e) => {
                this.handleDownload(e, btn);
            });
        });
    },

    /**
     * Maneja el proceso de descarga
     */
    async handleDownload(e, btn) {
        // Si ya está descargando, ignorar
        if (btn.classList.contains('downloading')) {
            e.preventDefault();
            return;
        }

        // Obtener información de la descarga
        const downloadUrl = btn.href || btn.getAttribute('href');
        const fileName = btn.getAttribute('download') || 'AeRForU.zip';

        // 📊 TRACKEAR CLICK EN BOTÓN DE DESCARGA
        Analytics.trackButtonClick('Download Button', 'Hero Section');

        // NO PREVENIR el comportamiento por defecto - dejar que la descarga ocurra
        // El navegador manejará la descarga automáticamente

        // Mostrar estado de descarga INMEDIATAMENTE
        this.showDownloadingState(btn);
        
        // Mostrar toast de inicio INMEDIATAMENTE
        this.showToast({
            type: 'info',
            title: '📥 Iniciando descarga',
            message: 'Preparando el archivo AeRForU...',
            duration: 2000,
            showProgress: true
        });

        // Usar un timeout MUY corto solo para feedback visual
        setTimeout(() => {
            this.showSuccessState(btn);
            
            // 📊 TRACKEAR DESCARGA COMPLETADA
            Analytics.trackDownload(fileName, downloadUrl);
            
            // Toast de éxito
            this.showToast({
                type: 'success',
                title: '✅ ¡Descarga iniciada!',
                message: 'AeRForU se está descargando. Consulta la carpeta de descargas.',
                duration: 4000
            });

            // Restaurar botón después de 3 segundos
            setTimeout(() => {
                this.resetButton(btn);
            }, 3000);
        }, 800);
    },

    /**
     * Muestra el estado de descarga
     */
    showDownloadingState(btn) {
        btn.classList.add('downloading');
        
        const icon = btn.querySelector('span:first-child');
        const text = btn.querySelector('span:last-child');
        
        if (icon) icon.innerHTML = '<span class="download-spinner"></span>';
        if (text) text.textContent = 'Descargando...';
    },

    /**
     * Muestra el estado de éxito
     */
    showSuccessState(btn) {
        btn.classList.remove('downloading');
        btn.classList.add('success');
        
        const icon = btn.querySelector('span:first-child');
        const text = btn.querySelector('span:last-child');
        
        if (icon) icon.innerHTML = '<span class="success-check">✓</span>';
        if (text) text.textContent = '¡Descargado!';
    },

    /**
     * Restaura el botón a su estado original
     */
    resetButton(btn) {
        btn.classList.remove('downloading', 'success');
        
        if (this.originalContent) {
            btn.innerHTML = this.originalContent;
        }
    },

    /**
     * Muestra una notificación toast
     * @param {Object} options - Opciones del toast
     */
    showToast(options = {}) {
        const {
            type = 'info',
            title = '',
            message = '',
            duration = 3000,
            showProgress = false,
            closable = true
        } = options;

        const toast = document.createElement('div');
        const toastId = `toast-${Date.now()}`;
        toast.id = toastId;
        toast.className = `toast toast-${type}`;
        toast.setAttribute('role', 'alert');

        // Icono según tipo
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        const icon = type === 'info' && showProgress ? 
            '<span class="download-spinner"></span>' : 
            icons[type] || icons.info;

        // Construir HTML del toast
        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-content">
                ${title ? `<div class="toast-title">${title}</div>` : ''}
                ${message ? `<div class="toast-message">${message}</div>` : ''}
            </div>
            ${closable ? '<button class="toast-close" aria-label="Cerrar notificación">×</button>' : ''}
            ${showProgress ? '<div class="toast-progress"></div>' : ''}
        `;

        // Añadir al contenedor
        this.toastContainer.appendChild(toast);
        this.activeToasts.add(toastId);

        // Animar entrada
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Event listener para cerrar
        if (closable) {
            const closeBtn = toast.querySelector('.toast-close');
            closeBtn?.addEventListener('click', () => {
                this.hideToast(toastId);
            });
        }

        // Auto-ocultar después del duration
        if (duration > 0) {
            setTimeout(() => {
                this.hideToast(toastId);
            }, duration);
        }

        return toastId;
    },

    /**
     * Oculta un toast específico
     */
    hideToast(toastId) {
        const toast = document.getElementById(toastId);
        if (!toast) return;

        toast.classList.remove('show');
        toast.classList.add('hide');

        setTimeout(() => {
            toast.remove();
            this.activeToasts.delete(toastId);
        }, 400);
    },

    /**
     * Oculta todos los toasts
     */
    hideAllToasts() {
        this.activeToasts.forEach(toastId => {
            this.hideToast(toastId);
        });
    },

    /**
     * Muestra un toast de error personalizado
     */
    showError(message) {
        // 📊 TRACKEAR ERROR
        Analytics.trackError(message, 'Download Manager');
        
        this.showToast({
            type: 'error',
            title: '❌ Error',
            message: message || 'Ha ocurrido un error inesperado',
            duration: 4000
        });
    },

    /**
     * Muestra un toast de éxito personalizado
     */
    showSuccess(message) {
        this.showToast({
            type: 'success',
            title: '✅ Éxito',
            message: message,
            duration: 3000
        });
    },

    /**
     * Muestra un toast de información personalizado
     */
    showInfo(message) {
        this.showToast({
            type: 'info',
            title: 'ℹ️ Información',
            message: message,
            duration: 3000
        });
    }
};