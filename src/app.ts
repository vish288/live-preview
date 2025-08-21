// Vue 3 Composition API Application with TypeScript
import type { 
  Theme, 
  DownloadOption, 
  AppState, 
  MermaidAPI,
  D3Selection,
  D3ZoomBehavior
} from './types';
import { examples } from './utils/examples';

const { createApp, ref, computed, watch, onMounted, nextTick } = window.Vue;

// Initialize Mermaid
window.mermaid.initialize({ 
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

// Main App
const App = {
  components: {
    SunIcon,
    MoonIcon,
    SystemIcon
  },
  setup() {
    // Reactive state
    const code = ref<string>('');
    const diagramHTML = ref<string>('');
    const autoCompile = ref<boolean>(true);
    const selectedExample = ref<string>('');
    const isVerticalLayout = ref<boolean>(false);
    const showThemeMenu = ref<boolean>(false);
    const showDownloadMenu = ref<boolean>(false);
    const theme = ref<Theme['value']>('light');
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

    const currentTheme = computed(() => {
      const themeObj = themes.find(t => t.value === theme.value);
      return themeObj ? themeObj.label : 'Light';
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

    // Debounced render function
    let renderTimeout: number;
    const debounceRender = (): void => {
      clearTimeout(renderTimeout);
      renderTimeout = window.setTimeout(renderDiagram, 500);
    };

    // Render diagram function
    const renderDiagram = async (): Promise<void> => {
      const trimmedCode = code.value.trim();
      
      if (!trimmedCode) {
        showPlaceholder();
        return;
      }
      
      try {
        const id = 'mermaid-' + Date.now();
        const { svg } = await window.mermaid.render(id, trimmedCode);
        diagramHTML.value = svg;
        
        // Use D3 to enhance the diagram with interactivity
        nextTick(() => {
          enhanceWithD3();
        });
        
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        showError(errorMessage);
      }
    };

    // Show placeholder
    const showPlaceholder = (): void => {
      diagramHTML.value = `
        <div class="text-github-fg-muted text-center">
          <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
          <p class="text-lg">Your diagram will appear here</p>
          <p class="text-sm mt-2">Start typing in the editor to see the live preview</p>
        </div>
      `;
    };

    // Show error
    const showError = (message: string): void => {
      diagramHTML.value = `
        <div class="text-github-danger-fg text-center p-4">
          <svg class="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.382 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
          <p class="font-medium">Syntax Error</p>
          <p class="text-sm mt-2 text-github-fg-muted">${message}</p>
        </div>
      `;
    };

    // Enhance diagram with D3.js
    const enhanceWithD3 = (): void => {
      const svg: D3Selection = window.d3.select('#app').select('svg');
      if (svg.empty()) return;

      // Add zoom and pan functionality
      const zoom: D3ZoomBehavior = window.d3.zoom()
        .scaleExtent([0.1, 3])
        .on('zoom', (event) => {
          svg.select('g').attr('transform', event.transform);
        });

      svg.call(zoom);

      // Add hover effects to nodes
      svg.selectAll('.node, .actor, .activation')
        .style('cursor', 'pointer')
        .on('mouseover', function() {
          window.d3.select(this).style('opacity', 0.8);
        })
        .on('mouseout', function() {
          window.d3.select(this).style('opacity', 1);
        });

      // Add double-click to reset zoom
      svg.on('dblclick.zoom', () => {
        svg.transition()
          .duration(750)
          .call(zoom.transform, window.d3.zoomIdentity);
      });
    };

    // Event handlers
    const onCodeChange = (): void => {
      if (autoCompile.value) {
        debounceRender();
      }
    };

    const toggleAutoCompile = (): void => {
      autoCompile.value = !autoCompile.value;
    };

    const loadExample = (): void => {
      if (selectedExample.value && examples[selectedExample.value as keyof typeof examples]) {
        code.value = examples[selectedExample.value as keyof typeof examples];
        if (autoCompile.value) {
          renderDiagram();
        }
      }
      selectedExample.value = '';
    };

    const clearEditor = (): void => {
      code.value = '';
      showPlaceholder();
    };

    const toggleLayout = (): void => {
      isVerticalLayout.value = !isVerticalLayout.value;
    };

    const setTheme = (newTheme: Theme['value']): void => {
      theme.value = newTheme;
      showThemeMenu.value = false;
      localStorage.setItem('mermaid-playground-theme', newTheme);
    };

    const toggleFloat = (panel: 'editor' | 'preview'): void => {
      floatingPanels.value[panel] = !floatingPanels.value[panel];
    };

    // Download functions
    const download = async (format: DownloadOption['value']): Promise<void> => {
      showDownloadMenu.value = false;
      
      switch (format) {
        case 'png':
          await downloadPNG();
          break;
        case 'svg':
          await downloadSVG();
          break;
        case 'pdf':
          await downloadPDF();
          break;
        case 'code':
          downloadCode();
          break;
      }
    };

    const downloadPNG = async (): Promise<void> => {
      const svg = document.querySelector('#app svg') as SVGElement;
      if (!svg) {
        alert('No diagram to download. Please create a diagram first.');
        return;
      }
      
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        const svgRect = svg.getBoundingClientRect();
        
        canvas.width = svgRect.width * 2;
        canvas.height = svgRect.height * 2;
        ctx.scale(2, 2);
        
        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        
        const img = new Image();
        img.onload = function() {
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width / 2, canvas.height / 2);
          ctx.drawImage(img, 0, 0, svgRect.width, svgRect.height);
          
          const link = document.createElement('a');
          link.download = 'mermaid-diagram.png';
          link.href = canvas.toDataURL('image/png');
          link.click();
          
          URL.revokeObjectURL(svgUrl);
        };
        img.src = svgUrl;
        
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        alert('Error downloading PNG: ' + errorMessage);
      }
    };

    const downloadSVG = (): void => {
      const svg = document.querySelector('#app svg') as SVGElement;
      if (!svg) {
        alert('No diagram to download. Please create a diagram first.');
        return;
      }
      
      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.download = 'mermaid-diagram.svg';
      link.href = url;
      link.click();
      
      URL.revokeObjectURL(url);
    };

    const downloadPDF = (): void => {
      const svg = document.querySelector('#app svg') as SVGElement;
      if (!svg) {
        alert('No diagram to download. Please create a diagram first.');
        return;
      }
      
      const printWindow = window.open('', '_blank');
      if (!printWindow) return;
      
      const svgData = new XMLSerializer().serializeToString(svg);
      
      printWindow.document.write(`
        <html>
          <head><title>Mermaid Diagram</title></head>
          <body style="margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh;">
            ${svgData}
          </body>
        </html>
      `);
      
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    };

    const downloadCode = (): void => {
      if (!code.value.trim()) {
        alert('No code to download. Please write some Mermaid code first.');
        return;
      }
      
      const blob = new Blob([code.value], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.download = 'mermaid-code.txt';
      link.href = url;
      link.click();
      
      URL.revokeObjectURL(url);
    };

    // Drag and resize functionality
    const startDrag = (event: MouseEvent, panel: 'editor' | 'preview'): void => {
      if (!floatingPanels.value[panel]) return;
      
      event.preventDefault();
      const startX = event.clientX - panelPositions.value[panel].x;
      const startY = event.clientY - panelPositions.value[panel].y;
      
      const onMouseMove = (e: MouseEvent): void => {
        panelPositions.value[panel].x = e.clientX - startX;
        panelPositions.value[panel].y = e.clientY - startY;
      };
      
      const onMouseUp = (): void => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    const startResize = (event: MouseEvent): void => {
      event.preventDefault();
      
      const onMouseMove = (e: MouseEvent): void => {
        const container = document.querySelector('[ref="panelsContainer"]') as HTMLElement;
        if (!container) return;
        
        const containerRect = container.getBoundingClientRect();
        const relativeX = e.clientX - containerRect.left;
        const percentage = (relativeX / containerRect.width) * 100;
        
        if (percentage > 20 && percentage < 80) {
          panelSizes.value.editor = percentage;
          panelSizes.value.preview = 100 - percentage;
        }
      };
      
      const onMouseUp = (): void => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    // Initialize
    onMounted(() => {
      // Load saved theme
      const savedTheme = localStorage.getItem('mermaid-playground-theme') as Theme['value'] | null;
      if (savedTheme && themes.find(t => t.value === savedTheme)) {
        theme.value = savedTheme;
      }

      // Load default example
      code.value = examples.flowchart;
      renderDiagram();

      // Handle system theme changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (theme.value === 'system') {
          // Force reactivity update
          theme.value = 'system';
        }
      });

      // Close dropdowns when clicking outside
      document.addEventListener('click', (e: Event) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.relative')) {
          showThemeMenu.value = false;
          showDownloadMenu.value = false;
        }
      });
    });

    return {
      // State
      code,
      diagramHTML,
      autoCompile,
      selectedExample,
      isVerticalLayout,
      showThemeMenu,
      showDownloadMenu,
      theme,
      floatingPanels,
      panelPositions,
      panelSizes,
      
      // Computed
      isDarkMode,
      currentTheme,
      themeIcon,
      editorPanelStyle,
      previewPanelStyle,
      
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
      toggleFloat,
      download,
      renderDiagram,
      startDrag,
      startResize
    };
  }
};

// Create and mount the app
window.Vue.createApp(App).mount('#app');