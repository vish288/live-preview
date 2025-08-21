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
        
        <!-- Toolbar -->
        <div class="mb-8 p-4 rounded-xl bg-white/60 dark:bg-midnight-800/60 backdrop-blur-sm border border-sandal-200/50 dark:border-midnight-700/50 shadow-sm">
          <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            
            <!-- Left Controls -->
            <div class="flex flex-wrap items-center gap-3">
              <select 
                @change="loadTemplate(($event.target as HTMLSelectElement).value)" 
                class="px-4 py-2 rounded-lg border border-sandal-300 dark:border-midnight-600 bg-white dark:bg-midnight-800 text-sandal-900 dark:text-midnight-100 text-sm focus:ring-2 focus:ring-amber-500 dark:focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choose template...</option>
                <option value="flowchart">🔄 Flowchart</option>
                <option value="sequence">👥 Sequence</option>
                <option value="gantt">📊 Gantt Chart</option>
                <option value="pie">🥧 Pie Chart</option>
                <option value="class">🏗️ Class Diagram</option>
              </select>

              <div class="h-6 w-px bg-sandal-300 dark:bg-midnight-600"></div>

              <button @click="clearEditor" class="px-3 py-2 rounded-lg border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm font-medium">
                Clear
              </button>

              <button 
                @click="toggleAutoCompile" 
                :class="[
                  'px-3 py-2 rounded-lg border text-sm font-medium transition-colors',
                  autoCompile 
                    ? 'border-green-300 dark:border-green-700 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' 
                    : 'border-sandal-300 dark:border-midnight-600 text-sandal-700 dark:text-midnight-300 hover:bg-sandal-50 dark:hover:bg-midnight-800'
                ]"
              >
                Auto-compile {{ autoCompile ? 'ON' : 'OFF' }}
              </button>

              <button v-if="!autoCompile" @click="renderDiagram" class="px-4 py-2 rounded-lg bg-amber-500 dark:bg-blue-500 text-white hover:bg-amber-600 dark:hover:bg-blue-600 transition-colors text-sm font-medium">
                Render
              </button>
            </div>

            <!-- Right Controls -->
            <div class="flex items-center gap-3">
              <button @click="toggleLayout" class="p-2 rounded-lg border border-sandal-300 dark:border-midnight-600 text-sandal-700 dark:text-midnight-300 hover:bg-sandal-50 dark:hover:bg-midnight-800 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="isVertical" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 4v16M9 4l-4 4m4-4l4 4"></path>
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 9h16M4 9l4-4m-4 4l4 4"></path>
                </svg>
              </button>

              <button @click="showHelp = !showHelp" class="p-2 rounded-lg border border-sandal-300 dark:border-midnight-600 text-sandal-700 dark:text-midnight-300 hover:bg-sandal-50 dark:hover:bg-midnight-800 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </button>

              <div class="relative">
                <button @click="showExportMenu = !showExportMenu" class="p-2 rounded-lg border border-sandal-300 dark:border-midnight-600 text-sandal-700 dark:text-midnight-300 hover:bg-sandal-50 dark:hover:bg-midnight-800 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </button>
                
                <div v-if="showExportMenu" class="absolute right-0 top-full mt-1 w-40 py-2 bg-white dark:bg-midnight-800 rounded-lg shadow-lg border border-sandal-200 dark:border-midnight-700 z-10">
                  <button @click="exportAs('svg')" class="w-full px-4 py-2 text-left text-sm text-sandal-900 dark:text-midnight-100 hover:bg-sandal-50 dark:hover:bg-midnight-700">SVG</button>
                  <button @click="exportAs('png')" class="w-full px-4 py-2 text-left text-sm text-sandal-900 dark:text-midnight-100 hover:bg-sandal-50 dark:hover:bg-midnight-700">PNG</button>
                  <button @click="exportAs('mermaid')" class="w-full px-4 py-2 text-left text-sm text-sandal-900 dark:text-midnight-100 hover:bg-sandal-50 dark:hover:bg-midnight-700">Mermaid Code</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Editor & Preview -->
        <div :class="['grid gap-6', isVertical ? 'grid-rows-2 h-[800px]' : 'grid-cols-2 h-[600px]']">
          
          <!-- Code Editor -->
          <div class="rounded-xl bg-white/60 dark:bg-midnight-800/60 backdrop-blur-sm border border-sandal-200/50 dark:border-midnight-700/50 shadow-sm overflow-hidden">
            <div class="flex items-center justify-between px-4 py-3 border-b border-sandal-200/50 dark:border-midnight-700/50 bg-sandal-50/50 dark:bg-midnight-900/50">
              <div class="flex items-center space-x-3">
                <div class="flex space-x-1.5">
                  <div class="w-3 h-3 rounded-full bg-red-400"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div class="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span class="text-sm font-medium text-sandal-800 dark:text-midnight-200">Editor</span>
              </div>
              <span class="text-xs text-sandal-600 dark:text-midnight-400">{{ code.length }} chars</span>
            </div>
            
            <textarea 
              v-model="code" 
              @input="onCodeChange"
              class="w-full h-full p-4 bg-transparent border-none outline-none resize-none font-mono text-sm text-sandal-900 dark:text-midnight-100 placeholder-sandal-500 dark:placeholder-midnight-500"
              placeholder="# Start typing your Mermaid diagram here...
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]"
              spellcheck="false"
            />
          </div>

          <!-- Preview -->
          <div class="rounded-xl bg-white/60 dark:bg-midnight-800/60 backdrop-blur-sm border border-sandal-200/50 dark:border-midnight-700/50 shadow-sm overflow-hidden">
            <div class="flex items-center justify-between px-4 py-3 border-b border-sandal-200/50 dark:border-midnight-700/50 bg-sandal-50/50 dark:bg-midnight-900/50">
              <div class="flex items-center space-x-3">
                <div class="flex space-x-1.5">
                  <div class="w-3 h-3 rounded-full bg-red-400"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div class="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span class="text-sm font-medium text-sandal-800 dark:text-midnight-200">Preview</span>
              </div>
              <div class="flex items-center space-x-2">
                <div :class="['w-2 h-2 rounded-full', diagramHTML ? 'bg-green-400' : 'bg-sandal-400 dark:bg-midnight-500']"></div>
                <span class="text-xs text-sandal-600 dark:text-midnight-400">{{ diagramHTML ? 'Ready' : 'Waiting' }}</span>
              </div>
            </div>
            
            <div class="h-full p-4 overflow-auto bg-gradient-to-br from-sandal-25 to-white dark:from-midnight-950 dark:to-midnight-900">
              <div 
                v-if="diagramHTML" 
                v-html="diagramHTML" 
                class="flex items-center justify-center min-h-full"
              ></div>
              <div v-else-if="error" class="flex items-center justify-center min-h-full text-center">
                <div class="text-red-500">
                  <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p class="font-medium">Syntax Error</p>
                  <p class="text-sm text-red-400 mt-1">{{ error }}</p>
                </div>
              </div>
              <div v-else class="flex items-center justify-center min-h-full text-center">
                <div class="text-sandal-400 dark:text-midnight-500">
                  <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <p class="text-sm">Your diagram will appear here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Help Modal -->
      <div v-if="showHelp" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click="showHelp = false">
        <div class="bg-white dark:bg-midnight-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden" @click.stop>
          <div class="flex items-center justify-between p-6 border-b border-sandal-200 dark:border-midnight-700">
            <h3 class="text-xl font-bold text-sandal-900 dark:text-midnight-100">Mermaid Syntax Help</h3>
            <button @click="showHelp = false" class="p-2 rounded-lg hover:bg-sandal-100 dark:hover:bg-midnight-700 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div class="p-6 overflow-y-auto max-h-96">
            <div class="space-y-4 text-sm text-sandal-700 dark:text-midnight-300">
              <div>
                <h4 class="font-semibold mb-2">Basic Flowchart</h4>
                <pre class="p-3 bg-sandal-50 dark:bg-midnight-900 rounded text-xs overflow-x-auto">graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Process]
    B -->|No| D[Alternative]</pre>
              </div>
              <div>
                <h4 class="font-semibold mb-2">Sequence Diagram</h4>
                <pre class="p-3 bg-sandal-50 dark:bg-midnight-900 rounded text-xs overflow-x-auto">sequenceDiagram
    Alice->>Bob: Hello Bob!
    Bob-->>Alice: Hello Alice!</pre>
              </div>
              <p class="text-xs text-sandal-600 dark:text-midnight-400">
                Visit <a href="https://mermaid-js.github.io/mermaid/" target="_blank" class="text-amber-600 dark:text-blue-400 hover:underline">mermaid-js.github.io</a> for full documentation.
              </p>
            </div>
          </div>
        </div>
      </div>

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
import { ref, computed, onMounted, nextTick } from 'vue'
import mermaid from 'mermaid'

// Theme icons
const SunIcon = { 
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
  </svg>` 
}

const MoonIcon = { 
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
  </svg>` 
}

// Reactive state
const code = ref(`graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E`)

const diagramHTML = ref('')
const error = ref('')
const autoCompile = ref(true)
const isVertical = ref(false)
const theme = ref('system')
const showHelp = ref(false)
const showExportMenu = ref(false)

// Theme management
const systemDarkMode = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)

const isDarkMode = computed(() => {
  if (theme.value === 'system') {
    return systemDarkMode.value
  }
  return theme.value === 'dark'
})

const themeIcon = computed(() => {
  if (theme.value === 'light') return SunIcon
  if (theme.value === 'dark') return MoonIcon
  return systemDarkMode.value ? MoonIcon : SunIcon
})

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
}

// Methods
const renderDiagram = async () => {
  if (!code.value.trim()) {
    diagramHTML.value = ''
    error.value = ''
    return
  }

  try {
    error.value = ''
    await nextTick()
    const { svg } = await mermaid.render('mermaid-diagram', code.value)
    diagramHTML.value = svg
  } catch (e: any) {
    console.error('Mermaid render error:', e)
    error.value = e?.message || 'Invalid syntax'
    diagramHTML.value = ''
  }
}

const onCodeChange = () => {
  if (autoCompile.value) {
    renderDiagram()
  }
}

const clearEditor = () => {
  code.value = ''
  diagramHTML.value = ''
  error.value = ''
}

const toggleAutoCompile = () => {
  autoCompile.value = !autoCompile.value
  if (autoCompile.value) {
    renderDiagram()
  }
}

const toggleLayout = () => {
  isVertical.value = !isVertical.value
}

const toggleTheme = () => {
  const themes = ['light', 'dark', 'system']
  const currentIndex = themes.indexOf(theme.value)
  const nextIndex = (currentIndex + 1) % themes.length
  theme.value = themes[nextIndex]
  localStorage.setItem('mermaid-playground-theme', theme.value)
  document.documentElement.classList.toggle('dark', isDarkMode.value)
}

const loadTemplate = (type: string) => {
  if (templates[type as keyof typeof templates]) {
    code.value = templates[type as keyof typeof templates]
    if (autoCompile.value) {
      renderDiagram()
    }
  }
}

const exportAs = (format: string) => {
  showExportMenu.value = false
  
  if (format === 'mermaid') {
    const blob = new Blob([code.value], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'diagram.mermaid'
    a.click()
    URL.revokeObjectURL(url)
    return
  }

  // For SVG/PNG exports, show coming soon
  alert(`${format.toUpperCase()} export coming soon!`)
}

// Click outside handler
document.addEventListener('click', (e) => {
  if (showExportMenu.value && !(e.target as Element)?.closest('.relative')) {
    showExportMenu.value = false
  }
})

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
  })

  // Load saved theme
  const savedTheme = localStorage.getItem('mermaid-playground-theme')
  if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
    theme.value = savedTheme
  }
  
  // Watch system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', (e) => {
    systemDarkMode.value = e.matches
  })
  
  // Apply initial theme
  document.documentElement.classList.toggle('dark', isDarkMode.value)
  
  // Initial render
  await renderDiagram()
})
</script>

<style scoped>
/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  background: transparent;
}

textarea::-webkit-scrollbar-thumb {
  background: rgba(107, 114, 128, 0.3);
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: rgba(107, 114, 128, 0.5);
}

/* Dark mode scrollbar */
.dark textarea::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.3);
}

.dark textarea::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.5);
}
</style>