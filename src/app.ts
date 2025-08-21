// Theme icons as simple template strings
const SunIcon = { template: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>` };
const MoonIcon = { template: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>` };
const SystemIcon = { template: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>` };

// Import Vue Composition API functions
import { ref, computed, onMounted, nextTick } from 'vue';
// Import Mermaid for diagram rendering
import mermaid from 'mermaid';

export const App = {
  components: { SunIcon, MoonIcon, SystemIcon },
  
  setup() {
    console.log('🔧 Setting up App component with Composition API...');
    
    // Reactive state
    const code = ref('graph TD\n    A[Start] --> B{Decision}\n    B -->|Yes| C[Action 1]\n    B -->|No| D[Action 2]');
    const diagramHTML = ref('');
    const autoCompile = ref(true);
    const isVerticalLayout = ref(false);
    const theme = ref('system');
    const showHelp = ref(false);
    const showDownloadMenu = ref(false);
    const readmeContent = ref('');

    // Theme management
    const themes = [
      { value: 'light', label: 'Light', icon: 'SunIcon' },
      { value: 'dark', label: 'Dark', icon: 'MoonIcon' },
      { value: 'system', label: 'System', icon: 'SystemIcon' }
    ];

    const isDarkMode = computed(() => {
      if (theme.value === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      return theme.value === 'dark';
    });

    const currentTheme = computed(() => themes.find(t => t.value === theme.value));
    const themeIcon = computed(() => {
      const iconName = currentTheme.value?.icon || 'SystemIcon';
      return iconName === 'SunIcon' ? SunIcon : 
             iconName === 'MoonIcon' ? MoonIcon : 
             SystemIcon;
    });

    // Download options
    const downloadOptions = [
      { value: 'png', label: 'PNG Image' },
      { value: 'svg', label: 'SVG Vector' },
      { value: 'pdf', label: 'PDF Document' },
      { value: 'mermaid', label: 'Mermaid Code' }
    ];

    // Methods
    const renderDiagram = async () => {
      if (!code.value.trim()) {
        diagramHTML.value = '<div class="text-gray-500 text-center py-8">Enter Mermaid code to see preview</div>';
        return;
      }

      try {
        await nextTick();
        const { svg } = await mermaid.render('mermaid-diagram', code.value);
        diagramHTML.value = svg;
      } catch (error: any) {
        console.error('Mermaid render error:', error);
        diagramHTML.value = `<div class="text-red-500 text-center py-8">Error: ${error?.message || 'Unknown error'}</div>`;
      }
    };

    const onCodeChange = () => {
      if (autoCompile.value) {
        renderDiagram();
      }
    };

    const toggleAutoCompile = () => {
      autoCompile.value = !autoCompile.value;
    };

    const clearEditor = () => {
      code.value = '';
      diagramHTML.value = '';
    };

    const toggleLayout = () => {
      isVerticalLayout.value = !isVerticalLayout.value;
    };

    const setTheme = (newTheme: string) => {
      theme.value = newTheme;
      document.documentElement.classList.toggle('dark', isDarkMode.value);
    };

    const toggleTheme = () => {
      const currentIndex = themes.findIndex(t => t.value === theme.value);
      const nextIndex = (currentIndex + 1) % themes.length;
      setTheme(themes[nextIndex].value);
    };

    const loadExample = (type: string) => {
      const examples: Record<string, string> = {
        flowchart: 'graph TD\n    A[Start] --> B{Decision}\n    B -->|Yes| C[Action 1]\n    B -->|No| D[Action 2]\n    C --> E[End]\n    D --> E',
        sequence: 'sequenceDiagram\n    participant A as Alice\n    participant B as Bob\n    A->>B: Hello Bob!\n    B-->>A: Hello Alice!',
        gantt: 'gantt\n    title Project Timeline\n    dateFormat YYYY-MM-DD\n    section Phase 1\n    Task 1 :done, 2024-01-01, 2024-01-15\n    Task 2 :active, 2024-01-16, 2024-01-31',
        pie: 'pie title Sample Data\n    "Category A" : 42.96\n    "Category B" : 50.05\n    "Category C" : 7.01',
        class: 'classDiagram\n    class Animal {\n        +String name\n        +makeSound()\n    }\n    class Dog {\n        +bark()\n    }\n    Animal <|-- Dog',
        state: 'stateDiagram-v2\n    [*] --> Still\n    Still --> [*]\n    Still --> Moving\n    Moving --> Still\n    Moving --> Crash\n    Crash --> [*]'
      };
      
      if (examples[type]) {
        code.value = examples[type];
        if (autoCompile.value) {
          renderDiagram();
        }
      }
    };

    const download = async (format: string) => {
      showDownloadMenu.value = false;
      
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

      // For other formats, we'd need additional implementation
      alert(`${format.toUpperCase()} export coming soon!`);
    };

    const loadReadmeContent = async () => {
      try {
        const response = await fetch('/README.md');
        if (response.ok) {
          const markdown = await response.text();
          // Simple markdown to HTML conversion
          const html = markdown
            .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
            .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mb-3">$1</h2>')
            .replace(/^### (.*$)/gim, '<h3 class="text-lg font-medium mb-2">$1</h3>')
            .replace(/^\* (.*$)/gim, '<li class="mb-1">$1</li>')
            .replace(/\n\n/g, '</p><p class="mb-4">')
            .replace(/^(.+)$/gim, '<p class="mb-4">$1</p>');
          
          readmeContent.value = `<div class="prose max-w-none">${html}</div>`;
        }
      } catch (error) {
        readmeContent.value = '<div class="text-gray-500">Failed to load documentation</div>';
      }
    };

    // Click outside handler
    const handleClickOutside = (event: Event) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.download-menu-container')) {
        showDownloadMenu.value = false;
      }
      // Help modal has its own close handling via the overlay click
    };

    // Initialize
    onMounted(async () => {
      document.documentElement.classList.toggle('dark', isDarkMode.value);
      await loadReadmeContent();
      await renderDiagram();
      
      // Add click outside handler
      document.addEventListener('click', handleClickOutside);
    });

    return {
      // State
      code,
      diagramHTML,
      autoCompile,
      isVerticalLayout,
      theme,
      showHelp,
      showDownloadMenu,
      readmeContent,
      
      // Computed
      isDarkMode,
      themeIcon,
      
      // Data
      themes,
      downloadOptions,
      
      // Methods
      onCodeChange,
      toggleAutoCompile,
      loadExample,
      clearEditor,
      toggleLayout,
      setTheme,
      toggleTheme,
      download,
      renderDiagram
    };
  },

  template: `
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
                  
                  <!-- Navigation -->
                  <div class="flex items-center space-x-1">
                    <span class="px-3 py-2 rounded-md text-sm font-medium bg-github-accent-emphasis text-white">
                      Mermaid Playground
                    </span>
                    <button @click="toggleTheme" class="px-3 py-2 rounded-md text-sm font-medium text-github-fg-muted hover:text-github-fg-default hover:bg-github-canvas-subtle transition-colors" title="Toggle theme">
                      <component :is="themeIcon"></component>
                    </button>
                  </div>
                </div>
              </div>
            </nav>
            
            <div class="text-center py-8">
              <h1 class="text-3xl font-bold mb-2">Mermaid Playground</h1>
              <p class="text-github-fg-muted">Interactive diagram editor with live preview</p>
            </div>
          </header>

          <!-- Toolbar -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-4">
              <!-- Left Controls -->
              <div class="flex items-center gap-2">
                <select @change="loadExample(($event.target as HTMLSelectElement).value)" class="text-sm text-github-fg-muted hover:text-github-fg-default border-none focus:outline-none cursor-pointer">
                  <option value="">Choose template...</option>
                  <option value="flowchart">Flowchart</option>
                  <option value="sequence">Sequence</option>
                  <option value="gantt">Gantt</option>
                  <option value="pie">Pie Chart</option>
                  <option value="class">Class</option>
                  <option value="state">State</option>
                </select>
                
                <div class="w-px h-4 bg-github-border-default mx-2"></div>
                
                <button @click="clearEditor" class="text-github-fg-muted hover:text-github-fg-default p-1" title="Clear">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
                
                <button @click="toggleAutoCompile" :class="['text-github-fg-muted hover:text-github-fg-default p-1', autoCompile ? 'text-github-success-fg' : '']" :title="autoCompile ? 'Auto-compile on' : 'Auto-compile off'">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </button>
                
                <button v-if="!autoCompile" @click="renderDiagram" class="text-github-accent-fg hover:text-github-accent-emphasis p-1" title="Compile">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                  </svg>
                </button>
              </div>

              <!-- Right Controls -->
              <div class="flex items-center gap-3">
                <button @click="toggleLayout" class="text-github-fg-muted hover:text-github-fg-default p-1" :title="isVerticalLayout ? 'Switch to horizontal' : 'Switch to vertical'">
                  <svg v-if="isVerticalLayout" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h4a2 2 0 002-2V7a2 2 0 00-2-2h-4a2 2 0 00-2 2z"></path>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8v8a2 2 0 002 2h8a2 2 0 002-2V8a2 2 0 00-2-2H9a2 2 0 00-2 2z"></path>
                  </svg>
                </button>
                
                <button @click="showHelp = !showHelp" class="text-github-fg-muted hover:text-github-fg-default p-1" title="Help">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </button>
                
                <div class="relative download-menu-container">
                  <button @click="showDownloadMenu = !showDownloadMenu" class="text-github-fg-muted hover:text-github-fg-default p-1" title="Download">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </button>
                  <div v-show="showDownloadMenu" class="absolute right-0 mt-2 w-40 bg-github-canvas border border-github-border-default rounded-lg shadow-lg z-50 py-1">
                    <button v-for="option in downloadOptions" :key="option.value" @click="download(option.value)" class="w-full text-left px-3 py-1.5 text-sm text-github-fg-default hover:bg-github-canvas-subtle transition-colors">
                      {{ option.label }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Main Content -->
          <div :class="['flex flex-1 gap-4', isVerticalLayout ? 'flex-col' : 'flex-row']">
            <!-- Editor -->
            <div class="flex-1 bg-github-canvas border border-github-border-default rounded-lg overflow-hidden">
              <div class="bg-github-canvas-subtle px-4 py-2 border-b border-github-border-default">
                <h3 class="text-sm font-medium text-github-fg-default">Editor</h3>
              </div>
              <textarea v-model="code" @input="onCodeChange" class="w-full h-96 p-4 bg-transparent border-none outline-none resize-none font-mono text-sm" placeholder="Enter Mermaid code here..." spellcheck="false"></textarea>
            </div>
            
            <!-- Preview -->
            <div class="flex-1 bg-github-canvas border border-github-border-default rounded-lg overflow-hidden">
              <div class="bg-github-canvas-subtle px-4 py-2 border-b border-github-border-default">
                <h3 class="text-sm font-medium text-github-fg-default">Preview</h3>
              </div>
              <div class="h-96 p-4 overflow-auto flex items-center justify-center" v-html="diagramHTML"></div>
            </div>
          </div>

          <!-- Help Modal -->
          <div v-if="showHelp" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" @click="showHelp = false">
            <div class="bg-github-canvas border border-github-border-default rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden" @click.stop>
              <div class="flex items-center justify-between p-4 border-b border-github-border-default">
                <h3 class="text-lg font-semibold text-github-fg-default">Help & Documentation</h3>
                <button @click="showHelp = false" class="text-github-fg-muted hover:text-github-fg-default">×</button>
              </div>
              <div class="p-4 overflow-y-auto max-h-[60vh]" v-html="readmeContent"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <footer class="footer-modern border-t border-github-border-default text-center py-4 text-sm text-github-fg-muted">
        <div class="container mx-auto px-4 max-w-7xl">
          <p>&copy; 2024 Vish. Built with Vue.js 3, TypeScript, Mermaid.js, and D3.js</p>
        </div>
      </footer>
    </div>
  `
};