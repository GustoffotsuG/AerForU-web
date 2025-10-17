/**
 * Utilidades compartidas
 */

/**
 * Debounce - Optimización de rendimiento para eventos frecuentes
 * @param {Function} func - Función a ejecutar
 * @param {Number} wait - Tiempo de espera en ms
 * @returns {Function}
 */
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Throttle - Limita la ejecución de una función
 * @param {Function} func - Función a ejecutar
 * @param {Number} limit - Tiempo límite en ms
 * @returns {Function}
 */
export const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

/**
 * Detecta si el usuario prefiere movimiento reducido
 * @returns {Boolean}
 */
export const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Marca de performance
 * @param {String} name - Nombre de la marca
 */
export const performanceMark = (name) => {
    if (window.performance && window.performance.mark) {
        window.performance.mark(name);
    }
};

/**
 * Obtiene datos de localStorage de forma segura
 * @param {String} key - Clave
 * @param {*} defaultValue - Valor por defecto
 * @returns {*}
 */
export const getLocalStorage = (key, defaultValue = null) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error);
        return defaultValue;
    }
};

/**
 * Guarda datos en localStorage de forma segura
 * @param {String} key - Clave
 * @param {*} value - Valor a guardar
 * @returns {Boolean}
 */
export const setLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.warn(`Error writing localStorage key "${key}":`, error);
        return false;
    }
};

/**
 * Espera a que el DOM esté listo
 * @param {Function} callback
 */
export const domReady = (callback) => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
};

/**
 * Obtiene parámetros de URL
 * @param {String} param - Nombre del parámetro
 * @returns {String|null}
 */
export const getUrlParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};