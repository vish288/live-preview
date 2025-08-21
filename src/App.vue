<template>
  <div :class="['min-h-screen transition-colors duration-300', isDarkMode ? 'dark bg-midnight-950' : 'bg-sandal-50']">
    <!-- Main Layout -->
    <div class="flex flex-col min-h-screen">
      
      <!-- Header -->
      <header class="sticky top-0 z-50 border-b backdrop-blur-xl bg-white/80 dark:bg-midnight-900/80 border-sandal-200/50 dark:border-midnight-700/50">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            
            <!-- Logo & Brand -->
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 dark:from-blue-500 dark:to-indigo-500 flex items-center justify-center shadow-md">
                <span class="text-white font-bold text-sm">MP</span>
              </div>
              <div>
                <h1 class="text-xl font-bold text-sandal-900 dark:text-midnight-100">Mermaid Playground</h1>
                <p class="text-xs text-sandal-600 dark:text-midnight-400">Live diagram editor</p>
              </div>
            </div>

            <!-- Navigation -->
            <nav class="hidden md:flex items-center space-x-1">
              <a href="https://vish288.github.io" class="px-4 py-2 rounded-lg text-sm font-medium text-sandal-700 dark:text-midnight-300 hover:bg-sandal-100 dark:hover:bg-midnight-800 transition-colors">
                Home
              </a>
              <a href="https://vish288.github.io/repositories" class="px-4 py-2 rounded-lg text-sm font-medium text-sandal-700 dark:text-midnight-300 hover:bg-sandal-100 dark:hover:bg-midnight-800 transition-colors">
                Projects
              </a>
              <span class="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-amber-500 to-orange-500 dark:from-blue-500 dark:to-indigo-500 text-white">
                Live
              </span>
            </nav>

            <!-- Controls -->
            <div class="flex items-center space-x-3">
              <a href="https://github.com/vish288/mermaid-playground" target="_blank" class="p-2 rounded-lg text-sandal-600 dark:text-midnight-400 hover:bg-sandal-100 dark:hover:bg-midnight-800 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              
              <button @click="toggleTheme" class="p-2 rounded-lg bg-sandal-100/80 dark:bg-midnight-800/80 text-sandal-700 dark:text-midnight-300 hover:bg-sandal-200 dark:hover:bg-midnight-700 transition-colors">
                <component :is="themeIcon" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-8 py-8">
        
        <!-- Toolbar Component -->
        <Toolbar 
          :autoCompile="autoCompile"
          :isVertical="isVertical"
          :selectedTemplate="selectedTemplate"
          @loadTemplate="loadTemplate"
          @clearEditor="clearEditor"
          @toggleAutoCompile="toggleAutoCompile"
          @renderDiagram="renderDiagram"
          @toggleLayout="toggleLayout"
          @toggleHelp="toggleHelp"
          @exportAs="exportAs"
        />

        <!-- Editor & Preview Panels -->
        <div :class="['grid gap-6', isVertical ? 'grid-rows-2 h-[800px]' : 'grid-cols-2 h-[600px]']">
          
          <!-- Editor Panel Component -->
          <EditorPanel 
            :code="code"
            @updateCode="updateCode"
          />

          <!-- Preview Panel Component -->
          <PreviewPanel 
            :diagramHTML="diagramHTML"
            :error="error"
          />
        </div>
      </main>

      <!-- Help Panel Component -->
      <HelpPanel 
        :show="showHelp"
        @close="showHelp = false"
      />

      <!-- Footer -->
      <footer class="border-t backdrop-blur-sm bg-white/80 dark:bg-midnight-900/80 border-sandal-200/50 dark:border-midnight-700/50">
        <div class="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div class="flex items-center space-x-3">
              <div class="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 dark:from-blue-500 dark:to-indigo-500 flex items-center justify-center">
                <span class="text-white font-bold text-xs">MP</span>
              </div>
              <span class="text-sm text-sandal-700 dark:text-midnight-300">Built with Vue.js & Mermaid.js</span>
            </div>
            <div class="flex items-center space-x-6 text-sm">
              <a href="https://vish288.github.io" class="text-sandal-600 dark:text-midnight-400 hover:text-sandal-800 dark:hover:text-midnight-200 transition-colors">Portfolio</a>
              <a href="https://github.com/vish288/mermaid-playground" target="_blank" class="text-sandal-600 dark:text-midnight-400 hover:text-sandal-800 dark:hover:text-midnight-200 transition-colors">GitHub</a>
              <span class="text-sandal-500 dark:text-midnight-500">© 2025 Vish</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import mermaid from 'mermaid';

// Import Components
import Toolbar from './components/Toolbar.vue';
import EditorPanel from './components/EditorPanel.vue';
import PreviewPanel from './components/PreviewPanel.vue';
import HelpPanel from './components/HelpPanel.vue';

// Theme icons
const SunIcon = { 
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
  </svg>` 
};

const MoonIcon = { 
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
  </svg>` 
};

// Reactive state
const code = ref(`graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E`);

const diagramHTML = ref('');
const error = ref('');
const autoCompile = ref(true);
const isVertical = ref(false);
const theme = ref('system');
const showHelp = ref(false);
const selectedTemplate = ref('');

// Theme management
const systemDarkMode = ref(window.matchMedia('(prefers-color-scheme: dark)').matches);

const isDarkMode = computed(() => {
  if (theme.value === 'system') {
    return systemDarkMode.value;
  }
  return theme.value === 'dark';
});

const themeIcon = computed(() => {
  if (theme.value === 'light') return SunIcon;
  if (theme.value === 'dark') return MoonIcon;
  return systemDarkMode.value ? MoonIcon : SunIcon;
});

// Templates
const templates = {
  flowchart: `graph TD
    A[Start] --> B{Decision Point}
    B -->|Option A| C[Process A]
    B -->|Option B| D[Process B]
    C --> E[Merge Results]
    D --> E
    E --> F[End]
    
    style A fill:#e1f5fe
    style F fill:#f3e5f5
    style B fill:#fff3e0`,

  sequence: `sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant Database
    
    User->>Frontend: Submit Form
    Frontend->>API: POST /api/data
    API->>Database: INSERT query
    Database-->>API: Success response
    API-->>Frontend: 200 OK
    Frontend-->>User: Success message`,

  gantt: `gantt
    title Project Timeline
    dateFormat YYYY-MM-DD
    
    section Planning
    Requirements    :done, req, 2024-01-01, 2024-01-07
    Design         :done, design, after req, 7d
    
    section Development
    Frontend       :active, frontend, after design, 14d
    Backend        :backend, after design, 14d
    Testing        :testing, after frontend, 5d`,

  pie: `pie title Technology Stack
    "Vue.js" : 35
    "React" : 25
    "Angular" : 15
    "Svelte" : 10
    "Other" : 15`,

  class: `classDiagram
    class User {
        +String username
        +String email
        +login()
        +logout()
    }
    
    class Post {
        +String title
        +String content
        +User author
        +publish()
    }
    
    User ||--o{ Post : creates`
};

// Methods
const renderDiagram = async () => {
  if (!code.value.trim()) {
    diagramHTML.value = '';
    error.value = '';
    return;
  }

  try {
    error.value = '';
    await nextTick();
    const { svg } = await mermaid.render('mermaid-diagram', code.value);
    diagramHTML.value = svg;
  } catch (e: any) {
    console.error('Mermaid render error:', e);
    error.value = e?.message || 'Invalid syntax';
    diagramHTML.value = '';
  }
};

const updateCode = (newCode: string) => {
  code.value = newCode;
  if (autoCompile.value) {
    renderDiagram();
  }
};

const clearEditor = () => {
  code.value = '';
  diagramHTML.value = '';
  error.value = '';
  selectedTemplate.value = '';
};

const toggleAutoCompile = () => {
  autoCompile.value = !autoCompile.value;
  if (autoCompile.value) {
    renderDiagram();
  }
};

const toggleLayout = () => {
  isVertical.value = !isVertical.value;
};

const toggleHelp = () => {
  showHelp.value = !showHelp.value;
};

const toggleTheme = () => {
  const themes = ['light', 'dark', 'system'];
  const currentIndex = themes.indexOf(theme.value);
  const nextIndex = (currentIndex + 1) % themes.length;
  theme.value = themes[nextIndex];
  localStorage.setItem('mermaid-playground-theme', theme.value);
  document.documentElement.classList.toggle('dark', isDarkMode.value);
};

const loadTemplate = (type: string) => {
  if (templates[type as keyof typeof templates]) {
    code.value = templates[type as keyof typeof templates];
    selectedTemplate.value = type;
    if (autoCompile.value) {
      renderDiagram();
    }
  }
};

const exportAs = (format: string) => {
  if (format === 'mermaid') {
    const blob = new Blob([code.value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diagram.mermaid';
    a.click();
    URL.revokeObjectURL(url);
    return;
  }

  // For SVG/PNG exports, show coming soon
  alert(`${format.toUpperCase()} export coming soon!`);
};

// Initialize
onMounted(async () => {
  // Initialize mermaid
  mermaid.initialize({ 
    startOnLoad: false,
    theme: 'default',
    themeVariables: {
      primaryColor: isDarkMode.value ? '#3b82f6' : '#f59e0b',
      primaryTextColor: isDarkMode.value ? '#e2e8f0' : '#1f2937',
      primaryBorderColor: isDarkMode.value ? '#475569' : '#d1d5db',
      lineColor: isDarkMode.value ? '#64748b' : '#6b7280',
      secondaryColor: isDarkMode.value ? '#1e293b' : '#f9fafb',
      tertiaryColor: isDarkMode.value ? '#0f172a' : '#ffffff'
    }
  });

  // Load saved theme
  const savedTheme = localStorage.getItem('mermaid-playground-theme');
  if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
    theme.value = savedTheme;
  }
  
  // Watch system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', (e) => {
    systemDarkMode.value = e.matches;
  });
  
  // Apply initial theme
  document.documentElement.classList.toggle('dark', isDarkMode.value);
  
  // Initial render
  await renderDiagram();
});
</script>