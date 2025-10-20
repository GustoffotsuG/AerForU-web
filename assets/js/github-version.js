/**
 * Módulo para obtener información de versión desde GitHub
 */

export const GitHubVersion = {
    // URLs de la API de GitHub
    MANIFEST_URL: 'https://raw.githubusercontent.com/Jaimepas77/AeRForU/main/manifest.json',
    COMMITS_API: 'https://api.github.com/repos/Jaimepas77/AeRForU/commits?path=manifest.json&per_page=1',
    
    /**
     * Obtiene la versión actual del manifest.json
     */
    async getVersion() {
        try {
            const response = await fetch(this.MANIFEST_URL, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                },
                cache: 'no-cache'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const manifest = await response.json();
            return manifest.version || null;
            
        } catch (error) {
            console.warn('Error fetching version from GitHub:', error);
            return null;
        }
    },

    /**
     * Obtiene la fecha del último commit que modificó manifest.json
     */
    async getLastUpdateDate() {
        try {
            const response = await fetch(this.COMMITS_API, {
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                },
                cache: 'no-cache'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const commits = await response.json();
            
            if (commits && commits.length > 0) {
                const lastCommitDate = commits[0].commit.committer.date;
                return new Date(lastCommitDate);
            }
            
            return null;
            
        } catch (error) {
            console.warn('Error fetching last update date from GitHub:', error);
            return null;
        }
    },

    /**
     * Formatea una fecha de forma amigable
     */
    formatDate(date) {
        if (!date) return null;
        
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        // Formato relativo para fechas recientes
        if (diffDays === 0) {
            return 'Hoy';
        } else if (diffDays === 1) {
            return 'Ayer';
        } else if (diffDays < 7) {
            return `Hace ${diffDays} días`;
        } else if (diffDays < 30) {
            const weeks = Math.floor(diffDays / 7);
            return `Hace ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`;
        } else if (diffDays < 365) {
            const months = Math.floor(diffDays / 30);
            return `Hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
        }
        
        // Formato absoluto para fechas antiguas
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
    },

    /**
     * Obtiene toda la información de versión
     */
    async getVersionInfo() {
        const [version, lastUpdate] = await Promise.all([
            this.getVersion(),
            this.getLastUpdateDate()
        ]);

        return {
            version,
            lastUpdate,
            lastUpdateFormatted: this.formatDate(lastUpdate)
        };
    },

    /**
     * Renderiza la información de versión en el DOM
     */
    async renderVersionInfo(containerId = 'version-info') {
        const container = document.getElementById(containerId);
        
        if (!container) {
            console.warn(`Container ${containerId} not found`);
            return;
        }

        // Mostrar loading state
        container.innerHTML = `
            <div class="version-loading">
                <span class="spinner"></span>
                <span>Obteniendo versión...</span>
            </div>
        `;

        try {
            const info = await this.getVersionInfo();
            
            if (info.version) {
                container.innerHTML = `
                    <div class="version-badge">
                        <span class="version-label">Versión</span>
                        <span class="version-number">v${info.version}</span>
                    </div>
                    ${info.lastUpdateFormatted ? `
                        <div class="version-update">
                            <span class="update-icon">🕒</span>
                            <span class="update-text">Actualizado ${info.lastUpdateFormatted}</span>
                        </div>
                    ` : ''}
                `;
                
                console.log('✅ Version info loaded:', info);
            } else {
                // Fallback: mostrar versión por defecto si falla la carga
                container.innerHTML = `
                    <div class="version-badge">
                        <span class="version-label">Versión</span>
                        <span class="version-number">v1.0.12</span>
                    </div>
                    <div class="version-update">
                        <span class="update-icon">ℹ️</span>
                        <span class="update-text">Versión estable</span>
                    </div>
                `;
                
                console.warn('⚠️ Using fallback version info');
            }
            
        } catch (error) {
            console.error('Error rendering version info:', error);
            
            // Fallback UI en caso de error
            container.innerHTML = `
                <div class="version-badge">
                    <span class="version-label">Versión</span>
                    <span class="version-number">v1.0.12</span>
                </div>
            `;
        }
    }
};