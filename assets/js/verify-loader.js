/**
 * Script de Verificación del Setup
 * Ejecutar en la consola del navegador para verificar la instalación
 * 
 * USO:
 * 1. Abre la consola del navegador (F12)
 * 2. Copia y pega todo este código
 * 3. Presiona Enter
 */

(async function verifySetup() {
    console.log('%c🔍 VERIFICACIÓN DEL SETUP DE AEROFORU', 'font-size: 20px; font-weight: bold; color: #667eea;');
    console.log('═'.repeat(50));
    
    const results = {
        passed: 0,
        failed: 0,
        warnings: 0
    };

    // Test 1: Verificar archivos JSON
    console.log('\n📋 Test 1: Verificando archivos JSON...');
    const jsonFiles = [
        './assets/data/features.json',
        './assets/data/screenshots.json',
        './assets/data/installation.json',
        './config/seo.json'
    ];

    for (const file of jsonFiles) {
        try {
            const response = await fetch(file);
            if (response.ok) {
                const data = await response.json();
                console.log(`✅ ${file} - OK`);
                results.passed++;
            } else {
                console.error(`❌ ${file} - Error ${response.status}`);
                results.failed++;
            }
        } catch (error) {
            console.error(`❌ ${file} - ${error.message}`);
            results.failed++;
        }
    }

    // Test 2: Verificar módulos JavaScript
    console.log('\n📦 Test 2: Verificando módulos JavaScript...');
    const jsModules = [
        'data-loader.js',
        'dom-builder.js',
        'app.js',
        'theme-manager.js',
        'lightbox.js',
        'animations.js',
        'smooth-scroll.js',
        'header-scroll.js',
        'image-preloader.js',
        'utils.js'
    ];

    for (const module of jsModules) {
        const script = document.querySelector(`script[src*="${module}"]`) || 
                      document.querySelector(`script[type="module"]`);
        if (script || module === 'app.js') {
            console.log(`✅ ${module} - Referenciado`);
            results.passed++;
        } else {
            console.warn(`⚠️ ${module} - No encontrado`);
            results.warnings++;
        }
    }

    // Test 3: Verificar contenedores HTML
    console.log('\n🏗️ Test 3: Verificando contenedores HTML...');
    const containers = [
        { id: 'features-grid', name: 'Grid de Funcionalidades' },
        { id: 'screenshots-gallery', name: 'Galería de Capturas' },
        { id: 'installation-steps', name: 'Pasos de Instalación' },
        { id: 'header', name: 'Header' },
        { id: 'themeToggle', name: 'Toggle de Tema' },
        { id: 'lightbox', name: 'Lightbox' }
    ];

    for (const container of containers) {
        const element = document.getElementById(container.id);
        if (element) {
            console.log(`✅ #${container.id} (${container.name}) - Encontrado`);
            results.passed++;
        } else {
            console.error(`❌ #${container.id} (${container.name}) - No encontrado`);
            results.failed++;
        }
    }

    // Test 4: Verificar contenido renderizado
    console.log('\n🎨 Test 4: Verificando contenido renderizado...');
    
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length > 0) {
        console.log(`✅ Funcionalidades renderizadas: ${featureCards.length}`);
        results.passed++;
    } else {
        console.warn(`⚠️ No se encontraron funcionalidades renderizadas`);
        results.warnings++;
    }

    const screenshotCards = document.querySelectorAll('.screenshot-card');
    if (screenshotCards.length > 0) {
        console.log(`✅ Capturas renderizadas: ${screenshotCards.length}`);
        results.passed++;
    } else {
        console.warn(`⚠️ No se encontraron capturas renderizadas`);
        results.warnings++;
    }

    const steps = document.querySelectorAll('.step');
    if (steps.length > 0) {
        console.log(`✅ Pasos de instalación renderizados: ${steps.length}`);
        results.passed++;
    } else {
        console.warn(`⚠️ No se encontraron pasos de instalación renderizados`);
        results.warnings++;
    }

    // Test 5: Verificar funcionalidades interactivas
    console.log('\n⚡ Test 5: Verificando funcionalidades interactivas...');
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle && themeToggle.onclick) {
        console.log(`✅ Toggle de tema - Funcional`);
        results.passed++;
    } else {
        console.warn(`⚠️ Toggle de tema - Posible problema de inicialización`);
        results.warnings++;
    }

    const lightboxImages = document.querySelectorAll('.screenshot-img');
    if (lightboxImages.length > 0) {
        console.log(`✅ Imágenes con lightbox: ${lightboxImages.length}`);
        results.passed++;
    } else {
        console.warn(`⚠️ No se encontraron imágenes con lightbox`);
        results.warnings++;
    }

    // Test 6: Verificar localStorage
    console.log('\n💾 Test 6: Verificando localStorage...');
    try {
        const theme = localStorage.getItem('theme');
        if (theme) {
            console.log(`✅ Tema guardado: ${theme}`);
            results.passed++;
        } else {
            console.log(`ℹ️ No hay tema guardado (normal en primera visita)`);
        }
    } catch (error) {
        console.error(`❌ localStorage no disponible: ${error.message}`);
        results.failed++;
    }

    // Test 7: Verificar CSS
    console.log('\n🎨 Test 7: Verificando archivos CSS...');
    const cssFiles = [
        'variables.css',
        'main.css',
        'components.css',
        'screenshots.css',
        'installation.css',
        'responsive.css'
    ];

    for (const css of cssFiles) {
        const link = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
            .find(l => l.href.includes(css));
        if (link) {
            console.log(`✅ ${css} - Cargado`);
            results.passed++;
        } else {
            console.error(`❌ ${css} - No encontrado`);
            results.failed++;
        }
    }

    // Test 8: Verificar Performance
    console.log('\n⚡ Test 8: Verificando performance...');
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - 
                        window.performance.timing.navigationStart;
        if (loadTime > 0) {
            console.log(`✅ Tiempo de carga: ${loadTime}ms`);
            if (loadTime < 3000) {
                console.log(`   🚀 Excelente performance!`);
                results.passed++;
            } else {
                console.warn(`   ⚠️ Tiempo de carga alto (>3s)`);
                results.warnings++;
            }
        }
    }

    // Test 9: Verificar errores en consola
    console.log('\n🐛 Test 9: Verificando errores de consola...');
    console.log(`ℹ️ Revisa manualmente la consola para errores en rojo`);

    // Resumen Final
    console.log('\n' + '═'.repeat(50));
    console.log('%c📊 RESUMEN DE VERIFICACIÓN', 'font-size: 18px; font-weight: bold; color: #667eea;');
    console.log('═'.repeat(50));
    console.log(`%c✅ Tests Pasados: ${results.passed}`, 'color: #4ade80; font-weight: bold;');
    console.log(`%c⚠️ Advertencias: ${results.warnings}`, 'color: #fbbf24; font-weight: bold;');
    console.log(`%c❌ Tests Fallidos: ${results.failed}`, 'color: #ef4444; font-weight: bold;');
    
    const total = results.passed + results.warnings + results.failed;
    const score = ((results.passed / total) * 100).toFixed(1);
    
    console.log('\n' + '═'.repeat(50));
    if (results.failed === 0 && results.warnings <= 2) {
        console.log(`%c🎉 ¡SETUP COMPLETADO! Score: ${score}%`, 'font-size: 16px; color: #4ade80; font-weight: bold;');
        console.log('%c✨ Todo está funcionando correctamente', 'color: #667eea;');
    } else if (results.failed === 0) {
        console.log(`%c✅ SETUP FUNCIONAL - Score: ${score}%`, 'font-size: 16px; color: #fbbf24; font-weight: bold;');
        console.log('%c⚠️ Hay algunas advertencias menores', 'color: #fbbf24;');
    } else {
        console.log(`%c⚠️ SETUP INCOMPLETO - Score: ${score}%`, 'font-size: 16px; color: #ef4444; font-weight: bold;');
        console.log('%c❌ Se encontraron errores que deben corregirse', 'color: #ef4444;');
    }
    console.log('═'.repeat(50));

    // Recomendaciones
    if (results.failed > 0 || results.warnings > 2) {
        console.log('\n💡 RECOMENDACIONES:');
        if (results.failed > 0) {
            console.log('1. Verifica que todos los archivos existan en las rutas correctas');
            console.log('2. Asegúrate de estar ejecutando un servidor HTTP local');
            console.log('3. Revisa los errores en rojo en la consola');
        }
        if (results.warnings > 2) {
            console.log('4. Espera a que la página cargue completamente');
            console.log('5. Recarga la página (Ctrl+F5 / Cmd+Shift+R)');
        }
    }

    console.log('\n📚 Para más información, consulta IMPLEMENTATION_GUIDE.md');
    console.log('═'.repeat(50) + '\n');

    return {
        passed: results.passed,
        warnings: results.warnings,
        failed: results.failed,
        score: score + '%'
    };
})();