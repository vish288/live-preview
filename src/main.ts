// Vite entry point for Mermaid Playground
import './style.css';
import { createApp } from 'vue';
import App from './App.vue';

// Create and mount Vue app
const app = createApp(App);

// Remove loading skeleton before mounting
const loadingSkeleton = document.getElementById('loading-skeleton');
if (loadingSkeleton) {
  loadingSkeleton.remove();
}

// Mount the app
app.mount('#app');