/**
 * Constructor de elementos DOM dinámicos
 */

export const DOMBuilder = {
    /**
     * Crea una tarjeta de funcionalidad
     * @param {Object} feature - Datos de la funcionalidad
     * @returns {HTMLElement}
     */
    createFeatureCard(feature) {
        const article = document.createElement('article');
        article.className = 'feature-card fade-in';
        
        article.innerHTML = `
            <div class="feature-icon">${feature.icon}</div>
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
        `;
        
        return article;
    },

    /**
     * Crea una tarjeta de captura de pantalla
     * @param {Object} screenshot - Datos de la captura
     * @returns {HTMLElement}
     */
    createScreenshotCard(screenshot) {
        const article = document.createElement('article');
        article.className = 'screenshot-card fade-in';
        
        article.innerHTML = `
            <div class="screenshot-wrapper">
                <img src="${screenshot.image}" 
                     alt="${screenshot.alt}" 
                     class="screenshot-img"
                     loading="lazy"
                     width="1200"
                     height="675">
                <div class="screenshot-overlay"></div>
            </div>
            <div class="screenshot-caption">
                <h3>${screenshot.icon} ${screenshot.title}</h3>
                <p>${screenshot.description}</p>
            </div>
        `;
        
        return article;
    },

    /**
     * Crea un paso de instalación
     * @param {Object} step - Datos del paso
     * @returns {HTMLElement}
     */
    createInstallationStep(step) {
        const article = document.createElement('article');
        article.className = 'step fade-in';
        
        // Crear header
        const header = document.createElement('div');
        header.className = 'step-header';
        header.innerHTML = `
            <span class="step-number">${step.number}</span>
            <h3>${step.title}</h3>
        `;
        
        // Crear párrafo de descripción
        const description = document.createElement('p');
        
        // Si no hay código, usar innerHTML directamente
        if (!step.code) {
            description.innerHTML = step.description;
        } else {
            // Si hay código, añadirlo después
            description.innerHTML = step.description;
            const code = document.createElement('code');
            code.textContent = step.code;
            description.appendChild(document.createTextNode(' '));
            description.appendChild(code);
        }
        
        // Añadir elementos al article
        article.appendChild(header);
        article.appendChild(description);
        
        // Añadir enlace si existe
        if (step.link) {
            const linkPara = document.createElement('p');
            linkPara.innerHTML = `<a href="${step.link.url}" target="_blank" rel="noopener" style="${step.link.style || ''}">${step.link.text}</a>`;
            article.appendChild(linkPara);
        }
        
        return article;
    },

    /**
     * Renderiza funcionalidades en el contenedor
     * @param {Array} features - Array de funcionalidades
     * @param {String} containerId - ID del contenedor
     */
    renderFeatures(features, containerId = 'features-grid') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Container ${containerId} not found`);
            return;
        }

        container.innerHTML = '';
        const sortedFeatures = features.sort((a, b) => a.order - b.order);

        sortedFeatures.forEach(feature => {
            const card = this.createFeatureCard(feature);
            container.appendChild(card);
        });
    },

    /**
     * Renderiza capturas en el contenedor
     * @param {Array} screenshots - Array de capturas
     * @param {String} containerId - ID del contenedor
     */
    renderScreenshots(screenshots, containerId = 'screenshots-gallery') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Container ${containerId} not found`);
            return;
        }

        container.innerHTML = '';
        const sortedScreenshots = screenshots.sort((a, b) => a.order - b.order);

        sortedScreenshots.forEach(screenshot => {
            const card = this.createScreenshotCard(screenshot);
            container.appendChild(card);
        });
    },

    /**
     * Renderiza pasos de instalación en el contenedor
     * @param {Array} steps - Array de pasos
     * @param {String} containerId - ID del contenedor
     */
    renderInstallationSteps(steps, containerId = 'installation-steps') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Container ${containerId} not found`);
            return;
        }

        container.innerHTML = '';
        const sortedSteps = steps.sort((a, b) => a.number - b.number);

        sortedSteps.forEach(step => {
            const stepElement = this.createInstallationStep(step);
            container.appendChild(stepElement);
        });
    }
};