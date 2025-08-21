// Vite entry point for Mermaid Playground
// Using proper npm packages for better reliability and performance

// Import global styles
import './style.css';

// Import npm packages
import { createApp } from 'vue';
import mermaid from 'mermaid';
import * as d3 from 'd3';

// Remove duplicate declarations since they're in types/index.ts

// Direct imports - no global window access needed

// Import the full working app
import { App } from './app';

// Initialize the app with npm packages
function initializeApp() {
  console.log('🚀 Initializing Mermaid Playground...');
  console.log('📦 Using npm packages directly:');
  console.log('  - Vue.js:', !!createApp ? '✅ Imported' : '❌ Missing');
  console.log('  - Mermaid.js:', !!mermaid ? '✅ Imported' : '❌ Missing');
  console.log('  - D3.js:', !!d3 ? '✅ Imported' : '❌ Missing');
  
  console.log('✅ All required npm packages imported successfully!');

  // Initialize Mermaid.js
  console.log('🧜‍♀️ Initializing Mermaid.js with theme configuration...');
  mermaid.initialize({ 
    startOnLoad: false,
    theme: 'default',
    themeVariables: {
      primaryColor: '#0969da',
      primaryTextColor: '#1f2328',
      primaryBorderColor: '#d0d7de',
      lineColor: '#656d76',
      secondaryColor: '#f6f8fa',
      tertiaryColor: '#ffffff'
    }
  });
  console.log('✅ Mermaid.js initialized successfully!');

  // Create and mount Vue app using global CDN Vue
  try {
    console.log('🔧 Creating Vue 3 application...');
    console.log('📦 App component structure:', {
      hasComponents: !!App.components,
      hasSetup: !!App.setup,
      hasTemplate: !!App.template,
      componentsCount: App.components ? Object.keys(App.components).length : 0
    });
    
    const app = createApp(App);
    console.log('✅ Vue app instance created');
    
    // Remove loading skeleton before mounting
    console.log('🔄 Removing loading skeleton...');
    const loadingSkeleton = document.getElementById('loading-skeleton');
    if (loadingSkeleton) {
      loadingSkeleton.remove();
      console.log('✅ Loading skeleton removed');
    } else {
      console.log('ℹ️ No loading skeleton found (already removed)');
    }
    
    console.log('🎯 Mounting Vue app to #app element...');
    app.mount('#app');
    console.log('🎉 Mermaid Playground initialized and mounted successfully!');
  } catch (error: any) {
    console.error('Failed to initialize Vue app:', error);
    console.error('Error details:', error?.stack);
    
    // Remove loading skeleton and show error
    const loadingSkeleton = document.getElementById('loading-skeleton');
    if (loadingSkeleton) {
      loadingSkeleton.remove();
    }
    
    const appDiv = document.getElementById('app');
    if (appDiv) {
      appDiv.innerHTML = `<div style="padding: 20px; background: #fee; border: 1px solid #f88; margin: 20px; border-radius: 5px;">
        <h2>Vue App Failed to Load</h2>
        <p><strong>Error:</strong> ${error?.message || 'Unknown error'}</p>
        <p><strong>Check the browser console for more details.</strong></p>
        <details style="margin-top: 10px;">
          <summary>Error Stack Trace</summary>
          <pre style="background: #f8f8f8; padding: 10px; overflow: auto; margin-top: 5px;">${error?.stack || 'No stack trace available'}</pre>
        </details>
      </div>`;
    }
  }
}

// Start initialization immediately (no need to wait for CDN)
console.log('📄 Document ready state:', document.readyState);

if (document.readyState === 'loading') {
  console.log('⏳ Waiting for DOM to be ready...');
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  console.log('✅ DOM already ready, initializing immediately');
  initializeApp();
}