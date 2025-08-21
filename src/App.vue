<template>
  <div class="transition-colors duration-200 page-layout" :class="{'dark': isDarkMode}">
    <div class="page-background text-github-fg-default main-wrapper">
      <div class="container mx-auto px-4 py-6 flex flex-col max-w-7xl relative flex-1 content-gutter">
        <!-- Header -->
        <header class="mb-8">
          <nav class="border-b bg-github-canvas/90 backdrop-blur-sm border-github-border-default shadow-sm">
            <div class="container mx-auto px-4">
              <div class="flex h-16 items-center justify-between">
                <!-- Logo -->
                <a href="https://vish288.github.io" class="flex items-center space-x-2">
                  <div class="h-8 w-8 rounded-full bg-gradient-to-r from-github-accent-fg to-emerald-600 flex items-center justify-center">
                    <span class="text-white font-bold text-sm">VS</span>
                  </div>
                  <span class="font-bold text-xl text-github-fg-default">Vish</span>
                </a>

                <!-- Navigation Links -->
                <div class="flex items-center space-x-1">
                  <a href="https://vish288.github.io" 
                     class="px-3 py-2 rounded-md text-sm font-medium text-github-fg-muted hover:text-github-fg-default hover:bg-github-canvas-subtle transition-colors flex items-center space-x-2">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <span class="hidden sm:inline">About</span>
                  </a>
                  <a href="https://vish288.github.io/repositories" 
                     class="px-3 py-2 rounded-md text-sm font-medium text-github-fg-muted hover:text-github-fg-default hover:bg-github-canvas-subtle transition-colors flex items-center space-x-2">
                    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span class="hidden sm:inline">Repositories</span>
                  </a>
                  <span class="px-3 py-2 rounded-md text-sm font-medium bg-github-accent-emphasis text-white flex items-center space-x-2">
                    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z"></path>
                      <path d="M2 17L12 22L22 17"></path>
                      <path d="M2 12L12 17L22 12"></path>
                    </svg>
                    <span class="hidden sm:inline">Live Preview</span>
                  </span>
                  <!-- Theme Toggle -->
                  <button 
                    @click="toggleTheme"
                    class="px-3 py-2 rounded-md text-sm font-medium text-github-fg-muted hover:text-github-fg-default hover:bg-github-canvas-subtle transition-colors"
                    title="Toggle theme">
                    <component :is="themeIcon" class="w-4 h-4"></component>
                  </button>
                </div>
              </div>
            </div>
          </nav>
          <div class="text-center py-8">
            <div class="inline-flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2L2 7L12 12L22 7L12 2Z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 17L12 22L22 17"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 12L12 17L22 12"></path>
                </svg>
              </div>
              <h1 class="text-3xl font-bold bg-gradient-to-r from-github-fg-default to-github-fg-muted bg-clip-text text-transparent">
                Live Preview
              </h1>
            </div>
            <p class="text-github-fg-muted text-lg font-light">Interactive diagram editor with live preview</p>
          </div>
        </header>
        
        <!-- Main Workspace -->
        <div class="flex-1 relative min-h-0 main-content">
          <!-- Toolbar -->
          <Toolbar 
            v-model:selected-example="selectedExample"
            v-model:auto-compile="autoCompile"
            v-model:vertical-layout="isVerticalLayout"
            v-model:show-download-menu="showDownloadMenu"
            :download-options="downloadOptions"
            @load-example="loadExample"
            @clear-editor="clearEditor"
            @render-diagram="renderDiagram"
            @toggle-layout="toggleLayout"
            @download="download"
            @show-help="showHelp = true"
          />

          <!-- Panels Container -->
          <div 
            ref="panelsContainer"
            :class="['flex h-full panels-container', {'vertical-layout': isVerticalLayout}]">
            
            <!-- Editor Panel -->
            <EditorPanel
              v-model:code="code"
              v-model:floating="floatingPanels.editor"
              :panel-style="editorPanelStyle"
              :auto-compile="autoCompile"
              @code-change="onCodeChange"
              @render="renderDiagram"
              @start-drag="startDrag"
              @start-resize="startResize"
            />
            
            <!-- Preview Panel -->
            <PreviewPanel
              v-model:floating="floatingPanels.preview"
              :panel-style="previewPanelStyle"
              :diagram-html="diagramHTML"
              @start-drag="startDrag"
            />
          </div>
        </div>
        
        <!-- Help Panel -->
        <HelpPanel 
          v-model:show="showHelp"
          :readme-content="readmeContent"
        />
        
        <!-- Mobile Help Button -->
        <button 
          v-if="!showHelp" 
          @click="showHelp = true" 
          class="fixed bottom-6 right-6 w-14 h-14 bg-github-accent-emphasis text-white rounded-full shadow-lg hover:bg-github-accent-fg transition-colors z-40 flex items-center justify-center sm:hidden">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Footer -->
    <footer class="footer-modern">
      <div class="container mx-auto px-4 py-4 max-w-7xl content-gutter">
        <div class="flex flex-col xs:flex-row justify-between items-center space-y-3 xs:space-y-0 gap-4">
          <div class="flex flex-col xs:flex-row items-center gap-2 xs:gap-4">
            <p class="text-xs sm:text-sm text-github-fg-muted">© 2025 Vish</p>
            <span class="hidden xs:block text-github-fg-muted">•</span>
            <p class="text-xs sm:text-sm text-github-fg-muted">Live Preview Editor</p>
          </div>
          
          <div class="flex items-center space-x-3 sm:space-x-4">
            <a href="https://github.com/vish288/live-preview" 
               target="_blank" 
               rel="noopener noreferrer"
               class="text-github-fg-muted hover:text-github-fg-default transition-colors p-1"
               title="View on GitHub">
              <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/suryanarayananvisweshwaran/" 
               target="_blank" 
               rel="noopener noreferrer"
               class="text-github-fg-muted hover:text-github-fg-default transition-colors p-1"
               title="Connect on LinkedIn">
              <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://mermaid-js.github.io/mermaid/" 
               target="_blank" 
               rel="noopener noreferrer"
               class="text-github-fg-muted hover:text-github-fg-default transition-colors text-xs sm:text-sm font-medium px-2 py-1 hover:bg-github-canvas-subtle rounded"
               title="Mermaid.js Documentation">
              Docs
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// This is the main Vue 3 Composition API component
// Import composables and components will be added here
import { ref, computed, watch, onMounted, nextTick } from 'vue';

// Import types
import type { 
  Theme, 
  DownloadOption, 
  AppState 
} from '@/types';

// Import utilities
import { examples } from '@/utils/examples';

// Import components (will be created in Phase 2.2)
import Toolbar from '@/components/Toolbar.vue';
import EditorPanel from '@/components/EditorPanel.vue';
import PreviewPanel from '@/components/PreviewPanel.vue';
import HelpPanel from '@/components/HelpPanel.vue';

// SVG Icon Components
const SunIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
    </svg>
  `
};

const MoonIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
    </svg>
  `
};

const SystemIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
    </svg>
  `
};

// Reactive state
const code = ref<string>('');
const diagramHTML = ref<string>('');
const autoCompile = ref<boolean>(true);
const selectedExample = ref<string>('');
const isVerticalLayout = ref<boolean>(false);
const showDownloadMenu = ref<boolean>(false);
const showHelp = ref<boolean>(false);
const theme = ref<Theme['value']>('light');
const readmeContent = ref<string>('');

const floatingPanels = ref({
  editor: false,
  preview: false
});

const panelPositions = ref({
  editor: { x: 100, y: 100, width: 600, height: 400 },
  preview: { x: 200, y: 200, width: 600, height: 400 }
});

const panelSizes = ref({
  editor: 50,
  preview: 50
});

// Theme management
const themes: Theme[] = [
  { value: 'light', label: 'Light', icon: 'SunIcon' },
  { value: 'dark', label: 'Dark', icon: 'MoonIcon' },
  { value: 'system', label: 'System', icon: 'SystemIcon' }
];

const downloadOptions: DownloadOption[] = [
  { value: 'png', label: 'PNG Image' },
  { value: 'svg', label: 'SVG Vector' },
  { value: 'pdf', label: 'PDF Document' },
  { value: 'code', label: 'Mermaid Code' }
];

// Computed properties
const isDarkMode = computed(() => {
  if (theme.value === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return theme.value === 'dark';
});

const themeIcon = computed(() => {
  const themeObj = themes.find(t => t.value === theme.value);
  return themeObj ? themeObj.icon : 'SunIcon';
});

const editorPanelStyle = computed(() => {
  if (floatingPanels.value.editor) {
    const pos = panelPositions.value.editor;
    return {
      left: pos.x + 'px',
      top: pos.y + 'px',
      width: pos.width + 'px',
      height: pos.height + 'px'
    };
  }
  return {
    width: panelSizes.value.editor + '%'
  };
});

const previewPanelStyle = computed(() => {
  if (floatingPanels.value.preview) {
    const pos = panelPositions.value.preview;
    return {
      left: pos.x + 'px',
      top: pos.y + 'px',
      width: pos.width + 'px',
      height: pos.height + 'px'
    };
  }
  return {
    width: panelSizes.value.preview + '%'
  };
});

// Main application logic - simplified for now
// Full implementation will be moved to composables in Phase 2.2

// Placeholder methods - will be properly implemented in Phase 2.2
const renderDiagram = () => {
  console.log('Render diagram');
};

const onCodeChange = () => {
  console.log('Code changed');
};

const loadExample = () => {
  console.log('Load example');
};

const clearEditor = () => {
  code.value = '';
};

const toggleLayout = () => {
  isVerticalLayout.value = !isVerticalLayout.value;
};

const toggleTheme = () => {
  const currentIndex = themes.findIndex(t => t.value === theme.value);
  const nextIndex = (currentIndex + 1) % themes.length;
  theme.value = themes[nextIndex].value;
};

const download = (format: string) => {
  console.log('Download', format);
};

const startDrag = (event: MouseEvent, panel: string) => {
  console.log('Start drag', panel);
};

const startResize = (event: MouseEvent) => {
  console.log('Start resize');
};

// Initialize
onMounted(() => {
  // Load saved theme
  const savedTheme = localStorage.getItem('live-preview-theme') as Theme['value'] | null;
  if (savedTheme && themes.find(t => t.value === savedTheme)) {
    theme.value = savedTheme;
  }

  // Load default example
  code.value = examples.flowchart;
  renderDiagram();
});
</script>

<style>
/* Global styles will be imported from src/style.css */
</style>