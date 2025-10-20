/**
 * Gestor de carga de datos desde archivos JSON
 */

export const DataLoader = {
    /**
     * Carga un archivo JSON
     * @param {String} path - Ruta al archivo JSON
     * @returns {Promise<Object>}
     */
    async loadJSON(path) {
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error loading JSON from ${path}:`, error);
            return null;
        }
    },

    /**
     * Carga las funcionalidades desde features.json
     * @returns {Promise<Array>}
     */
    async loadFeatures() {
        const data = await this.loadJSON('./assets/data/features.json');
        return data?.features || [];
    },

    /**
     * Carga las capturas desde screenshots.json
     * @returns {Promise<Array>}
     */
    async loadScreenshots() {
        const data = await this.loadJSON('./assets/data/screenshots.json');
        return data?.screenshots || [];
    },

    /**
     * Carga los pasos de instalación desde installation.json
     * @returns {Promise<Array>}
     */
    async loadInstallationSteps() {
        const data = await this.loadJSON('./assets/data/installation.json');
        return data?.steps || [];
    },

    /**
     * Carga los metadatos SEO desde seo.json
     * @returns {Promise<Object>}
     */
    async loadSEO() {
        const data = await this.loadJSON('./config/seo.json');
        return data || {};
    }
};