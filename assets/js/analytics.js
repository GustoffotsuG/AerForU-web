/**
 * Sistema de Analytics para tracking de eventos
 * Compatible con Google Analytics 4 (GA4) y Universal Analytics (UA)
 */

export const Analytics = {
    isGA4Available: false,
    isUAAvailable: false,

    /**
     * Inicializa el sistema de analytics
     */
    init() {
        this.checkAnalytics();
        console.log('📊 Analytics initialized');
        console.log(`   GA4: ${this.isGA4Available ? '✅' : '❌'}`);
        console.log(`   UA: ${this.isUAAvailable ? '✅' : '❌'}`);
    },

    /**
     * Verifica qué versión de Analytics está disponible
     */
    checkAnalytics() {
        // Comprobar Google Analytics 4 (gtag.js)
        this.isGA4Available = typeof gtag !== 'undefined';
        
        // Comprobar Universal Analytics (analytics.js o ga)
        this.isUAAvailable = typeof ga !== 'undefined';
    },

    /**
     * Trackea una descarga
     * @param {String} fileName - Nombre del archivo descargado
     * @param {String} downloadUrl - URL de descarga
     */
    trackDownload(fileName = 'AeRForU.zip', downloadUrl = null) {
        const eventData = {
            event_category: 'Downloads',
            event_label: fileName,
            value: 1
        };

        // Google Analytics 4
        if (this.isGA4Available) {
            gtag('event', 'file_download', {
                file_name: fileName,
                file_extension: this.getFileExtension(fileName),
                link_url: downloadUrl || window.location.href,
                ...eventData
            });
            console.log('📊 GA4: Download tracked -', fileName);
        }

        // Universal Analytics (fallback)
        if (this.isUAAvailable) {
            ga('send', 'event', {
                eventCategory: 'Downloads',
                eventAction: 'Download',
                eventLabel: fileName,
                eventValue: 1
            });
            console.log('📊 UA: Download tracked -', fileName);
        }

        // Fallback: log para debugging si no hay analytics
        if (!this.isGA4Available && !this.isUAAvailable) {
            console.log('⚠️ Analytics not available. Download would be tracked:', {
                fileName,
                downloadUrl,
                timestamp: new Date().toISOString()
            });
        }
    },

    /**
     * Trackea un click en botón
     * @param {String} buttonName - Nombre del botón
     * @param {String} buttonLocation - Ubicación del botón
     */
    trackButtonClick(buttonName, buttonLocation = 'Hero') {
        const eventData = {
            event_category: 'Engagement',
            event_label: `${buttonLocation} - ${buttonName}`
        };

        // Google Analytics 4
        if (this.isGA4Available) {
            gtag('event', 'button_click', {
                button_name: buttonName,
                button_location: buttonLocation,
                ...eventData
            });
        }

        // Universal Analytics
        if (this.isUAAvailable) {
            ga('send', 'event', {
                eventCategory: 'Engagement',
                eventAction: 'Button Click',
                eventLabel: `${buttonLocation} - ${buttonName}`
            });
        }

        console.log(`📊 Button click tracked: ${buttonName} (${buttonLocation})`);
    },

    /**
     * Trackea navegación a secciones
     * @param {String} sectionName - Nombre de la sección
     */
    trackSectionView(sectionName) {
        if (this.isGA4Available) {
            gtag('event', 'section_view', {
                section_name: sectionName,
                event_category: 'Navigation'
            });
        }

        if (this.isUAAvailable) {
            ga('send', 'event', {
                eventCategory: 'Navigation',
                eventAction: 'Section View',
                eventLabel: sectionName
            });
        }
    },

    /**
     * Trackea clicks en enlaces externos
     * @param {String} url - URL del enlace
     * @param {String} linkText - Texto del enlace
     */
    trackOutboundLink(url, linkText = '') {
        const eventData = {
            event_category: 'Outbound Links',
            event_label: linkText || url
        };

        if (this.isGA4Available) {
            gtag('event', 'click', {
                link_url: url,
                link_text: linkText,
                outbound: true,
                ...eventData
            });
        }

        if (this.isUAAvailable) {
            ga('send', 'event', {
                eventCategory: 'Outbound Links',
                eventAction: 'Click',
                eventLabel: url,
                transport: 'beacon'
            });
        }

        console.log('📊 Outbound link tracked:', url);
    },

    /**
     * Trackea errores
     * @param {String} errorMessage - Mensaje de error
     * @param {String} errorLocation - Ubicación del error
     */
    trackError(errorMessage, errorLocation = 'Unknown') {
        if (this.isGA4Available) {
            gtag('event', 'exception', {
                description: errorMessage,
                fatal: false,
                error_location: errorLocation
            });
        }

        if (this.isUAAvailable) {
            ga('send', 'exception', {
                exDescription: errorMessage,
                exFatal: false
            });
        }

        console.error('📊 Error tracked:', errorMessage, 'at', errorLocation);
    },

    /**
     * Trackea tiempo en página
     * @param {Number} seconds - Segundos en la página
     */
    trackTimeOnPage(seconds) {
        if (this.isGA4Available) {
            gtag('event', 'timing_complete', {
                name: 'page_engagement',
                value: seconds,
                event_category: 'Engagement'
            });
        }

        if (this.isUAAvailable) {
            ga('send', 'timing', {
                timingCategory: 'Engagement',
                timingVar: 'Time on Page',
                timingValue: seconds * 1000
            });
        }
    },

    /**
     * Trackea scroll depth
     * @param {Number} percentage - Porcentaje de scroll
     */
    trackScrollDepth(percentage) {
        if (this.isGA4Available) {
            gtag('event', 'scroll', {
                percent_scrolled: percentage,
                event_category: 'Engagement'
            });
        }

        if (this.isUAAvailable) {
            ga('send', 'event', {
                eventCategory: 'Engagement',
                eventAction: 'Scroll Depth',
                eventLabel: `${percentage}%`,
                eventValue: percentage
            });
        }
    },

    /**
     * Obtiene la extensión de un archivo
     * @param {String} fileName
     * @returns {String}
     */
    getFileExtension(fileName) {
        return fileName.split('.').pop().toLowerCase();
    },

    /**
     * Crea un evento personalizado
     * @param {String} eventName - Nombre del evento
     * @param {Object} eventParams - Parámetros del evento
     */
    trackCustomEvent(eventName, eventParams = {}) {
        if (this.isGA4Available) {
            gtag('event', eventName, eventParams);
        }

        if (this.isUAAvailable && eventParams.eventCategory && eventParams.eventAction) {
            ga('send', 'event', eventParams);
        }

        console.log('📊 Custom event tracked:', eventName, eventParams);
    }
};