#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

// Build configuration
const config = {
    outputDir: 'dist',
    outputFile: 'index.html',
    cdnResources: [
        'https://cdn.tailwindcss.com',
        'https://unpkg.com/vue@3/dist/vue.global.prod.js',
        'https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js',
        'https://d3js.org/d3.v7.min.js'
    ]
};

// Utility functions
const log = (message) => console.log(`[BUILD] ${message}`);
const error = (message) => console.error(`[ERROR] ${message}`);

// Download CDN resource
const downloadResource = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let data = '';
            response.on('data', chunk => data += chunk);
            response.on('end', () => {
                if (response.statusCode === 200) {
                    resolve(data);
                } else {
                    reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
                }
            });
        }).on('error', reject);
    });
};

// Inline CSS for GitHub Pages compatibility
const getInlineCSS = () => {
    return `
        /* Reset and base styles */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        
        /* Utility classes for layout */
        .min-h-screen { min-height: 100vh; }
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .flex-1 { flex: 1; }
        .items-center { align-items: center; }
        .justify-center { justify-content: center; }
        .justify-between { justify-content: space-between; }
        .gap-1 { gap: 0.25rem; }
        .gap-2 { gap: 0.5rem; }
        .gap-4 { gap: 1rem; }
        .gap-6 { gap: 1.5rem; }
        
        /* Spacing */
        .p-4 { padding: 1rem; }
        .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
        .py-1\\.5 { padding-top: 0.375rem; padding-bottom: 0.375rem; }
        .px-4 { padding-left: 1rem; padding-right: 1rem; }
        .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
        .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
        .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
        .py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
        .mb-3 { margin-bottom: 0.75rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-8 { margin-bottom: 2rem; }
        .mt-2 { margin-top: 0.5rem; }
        .mt-8 { margin-top: 2rem; }
        .ml-2 { margin-left: 0.5rem; }
        
        /* Typography */
        .text-sm { font-size: 0.875rem; }
        .text-lg { font-size: 1.125rem; }
        .text-xl { font-size: 1.25rem; }
        .text-5xl { font-size: 3rem; }
        .font-bold { font-weight: 700; }
        .font-medium { font-weight: 500; }
        .font-semibold { font-weight: 600; }
        .text-center { text-align: center; }
        .font-mono { font-family: Monaco, Menlo, 'Ubuntu Mono', monospace; }
        .leading-relaxed { line-height: 1.625; }
        
        /* Colors - Light theme */
        .bg-white { background-color: #ffffff; }
        .bg-gray-50 { background-color: #f9fafb; }
        .bg-gray-400 { background-color: #9ca3af; }
        .text-gray-500 { color: #6b7280; }
        .text-gray-700 { color: #374151; }
        .border-gray-200 { border-color: #e5e7eb; }
        .border-gray-300 { border-color: #d1d5db; }
        
        /* GitHub colors */
        .bg-github-canvas { background-color: #ffffff; }
        .bg-github-canvas-default { background-color: #f6f8fa; }
        .bg-github-canvas-subtle { background-color: #f6f8fa; }
        .border-github-border-default { border-color: #d0d7de; }
        .text-github-fg-default { color: #1f2328; }
        .text-github-fg-muted { color: #656d76; }
        .text-github-accent-fg { color: #0969da; }
        .bg-github-accent-emphasis { background-color: #0969da; }
        .text-github-success-fg { color: #1a7f37; }
        .bg-github-success-fg { background-color: #1a7f37; }
        .text-github-danger-fg { color: #d1242f; }
        .bg-github-btn-bg { background-color: #f6f8fa; }
        .border-github-btn-border { border-color: #d0d7de; }
        
        /* Dark theme */
        .dark .bg-github-canvas { background-color: #0d1117; }
        .dark .bg-github-canvas-default { background-color: #010409; }
        .dark .bg-github-canvas-subtle { background-color: #161b22; }
        .dark .border-github-border-default { border-color: #30363d; }
        .dark .text-github-fg-default { color: #e6edf3; }
        .dark .text-github-fg-muted { color: #7d8590; }
        .dark .text-github-accent-fg { color: #2f81f7; }
        .dark .bg-github-accent-emphasis { background-color: #1f6feb; }
        .dark .text-github-success-fg { color: #3fb950; }
        .dark .bg-github-success-fg { background-color: #3fb950; }
        .dark .text-github-danger-fg { color: #f85149; }
        .dark .bg-github-btn-bg { background-color: #21262d; }
        .dark .border-github-btn-border { border-color: #30363d; }
        
        /* Layout */
        .container { max-width: 1400px; margin: 0 auto; }
        .grid { display: grid; }
        .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
        .rounded-lg { border-radius: 0.5rem; }
        .rounded-md { border-radius: 0.375rem; }
        .rounded-full { border-radius: 9999px; }
        .border { border-width: 1px; }
        .border-b { border-bottom-width: 1px; }
        .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
        .overflow-hidden { overflow: hidden; }
        .overflow-auto { overflow: auto; }
        
        /* Interactive */
        .cursor-pointer { cursor: pointer; }
        .cursor-move { cursor: move; }
        .cursor-col-resize { cursor: col-resize; }
        .transition-colors { transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out; }
        .hover\\:bg-gray-50:hover { background-color: #f9fafb; }
        .hover\\:text-github-fg-default:hover { color: #1f2328; }
        .hover\\:bg-github-btn-hover-bg:hover { background-color: #f3f4f6; }
        .hover\\:bg-github-accent-fg:hover { background-color: #0969da; }
        .hover\\:underline:hover { text-decoration: underline; }
        
        /* Form elements */
        .resize-none { resize: none; }
        .outline-none { outline: none; }
        
        /* Positioning */
        .relative { position: relative; }
        .absolute { position: absolute; }
        .fixed { position: fixed; }
        .top-0 { top: 0; }
        .right-0 { right: 0; }
        .z-50 { z-index: 50; }
        .z-1000 { z-index: 1000; }
        
        /* Sizing */
        .w-3 { width: 0.75rem; }
        .h-3 { height: 0.75rem; }
        .w-4 { width: 1rem; }
        .h-4 { height: 1rem; }
        .w-11 { width: 2.75rem; }
        .h-6 { height: 1.5rem; }
        .w-12 { width: 3rem; }
        .h-12 { height: 3rem; }
        .w-16 { width: 4rem; }
        .h-16 { height: 4rem; }
        .w-36 { width: 9rem; }
        .w-48 { width: 12rem; }
        .w-full { width: 100%; }
        .h-full { height: 100%; }
        .max-w-7xl { max-width: 80rem; }
        .max-w-90vw { max-width: 90vw; }
        .max-h-90vh { max-height: 90vh; }
        .min-w-300 { min-width: 300px; }
        .min-h-200 { min-height: 200px; }
        
        /* Transform */
        .transform { transform: translateX(var(--tw-translate-x, 0)) translateY(var(--tw-translate-y, 0)) rotate(var(--tw-rotate, 0)) skewX(var(--tw-skew-x, 0)) skewY(var(--tw-skew-y, 0)) scaleX(var(--tw-scale-x, 1)) scaleY(var(--tw-scale-y, 1)); }
        .translate-x-1 { --tw-translate-x: 0.25rem; }
        .translate-x-6 { --tw-translate-x: 1.5rem; }
        
        /* Display */
        .hidden { display: none; }
        .inline-block { display: inline-block; }
        .inline-flex { display: inline-flex; }
        
        /* Colors */
        .text-white { color: #ffffff; }
        .text-red-500 { color: #ef4444; }
        .text-yellow-500 { color: #eab308; }
        .text-green-500 { color: #22c55e; }
        .bg-red-500 { background-color: #ef4444; }
        .bg-yellow-500 { background-color: #eab308; }
        .bg-green-500 { background-color: #22c55e; }
        .bg-white { background-color: #ffffff; }
        
        /* Opacity */
        .opacity-50 { opacity: 0.5; }
        .opacity-80 { opacity: 0.8; }
        .opacity-90 { opacity: 0.9; }
        
        /* Custom styles */
        .resizable-panel { position: relative; }
        .resize-handle-right {
            position: absolute; top: 0; right: -2px; width: 4px; height: 100%;
            cursor: col-resize; background: transparent; z-index: 10;
        }
        .resize-handle-right:hover { background: #0969da; }
        .floating-panel {
            position: fixed; z-index: 1000; min-width: 300px; min-height: 200px;
            max-width: 90vw; max-height: 90vh;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        .panel-header.dragging { user-select: none; }
        .vertical-layout { flex-direction: column; }
        .vertical-layout .resizable-panel { width: 100% !important; }
        
        /* Media queries */
        @media (min-width: 1024px) {
            .lg\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
    `;
};

// Main build function
async function build() {
    try {
        log('Starting build process...');
        
        // Create output directory
        if (!fs.existsSync(config.outputDir)) {
            fs.mkdirSync(config.outputDir, { recursive: true });
        }
        
        // Read source files
        log('Reading source files...');
        const htmlContent = fs.readFileSync('index.html', 'utf8');
        const jsContent = fs.readFileSync('app.js', 'utf8');
        
        // Download CDN resources
        log('Downloading CDN resources...');
        const cdnContents = {};
        
        for (const url of config.cdnResources) {
            try {
                log(`Downloading ${url}...`);
                cdnContents[url] = await downloadResource(url);
            } catch (err) {
                error(`Failed to download ${url}: ${err.message}`);
                // Fallback to CDN link
                cdnContents[url] = null;
            }
        }
        
        // Build the final HTML
        log('Building final HTML...');
        let finalHtml = htmlContent;
        
        // Replace CDN links with inline content or keep as fallback
        finalHtml = finalHtml.replace(
            '<script src="https://cdn.tailwindcss.com"></script>',
            `<style>${getInlineCSS()}</style>`
        );
        
        if (cdnContents['https://unpkg.com/vue@3/dist/vue.global.prod.js']) {
            finalHtml = finalHtml.replace(
                '<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>',
                `<script>${cdnContents['https://unpkg.com/vue@3/dist/vue.global.prod.js']}</script>`
            );
        }
        
        if (cdnContents['https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js']) {
            finalHtml = finalHtml.replace(
                '<script src="https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js"></script>',
                `<script>${cdnContents['https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js']}</script>`
            );
        }
        
        if (cdnContents['https://d3js.org/d3.v7.min.js']) {
            finalHtml = finalHtml.replace(
                '<script src="https://d3js.org/d3.v7.min.js"></script>',
                `<script>${cdnContents['https://d3js.org/d3.v7.min.js']}</script>`
            );
        }
        
        // Inline the app.js
        finalHtml = finalHtml.replace(
            '<script src="app.js"></script>',
            `<script>${jsContent}</script>`
        );
        
        // Remove the Tailwind config since we're using inline CSS
        finalHtml = finalHtml.replace(
            /<script>\s*tailwind\.config[\s\S]*?<\/script>/,
            ''
        );
        
        // Write the final file
        const outputPath = path.join(config.outputDir, config.outputFile);
        fs.writeFileSync(outputPath, finalHtml);
        
        log(`Build completed successfully! Output: ${outputPath}`);
        log(`File size: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`);
        
    } catch (err) {
        error(`Build failed: ${err.message}`);
        process.exit(1);
    }
}

// Run build if called directly
if (require.main === module) {
    build();
}

module.exports = { build };