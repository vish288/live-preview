// Vue 3 Composition API Application
const { createApp, ref, computed, watch, onMounted, nextTick } = Vue;

// Initialize Mermaid
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
        const code = ref('');
        const diagramHTML = ref('');
        const autoCompile = ref(true);
        const selectedExample = ref('');
        const isVerticalLayout = ref(false);
        const showThemeMenu = ref(false);
        const showDownloadMenu = ref(false);
        const theme = ref('light');
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

        // Example diagrams
        const examples = {
            flowchart: `graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
    C --> E[End]`,
            
            sequence: `sequenceDiagram
    participant A as Alice
    participant B as Bob
    participant C as Charlie
    
    A->>B: Hello Bob!
    B->>C: How are you Charlie?
    C-->>A: I am good thanks!
    B-->>A: Charlie says hi!`,
            
            gantt: `gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    section Planning
    Research           :done,    des1, 2024-01-01,2024-01-05
    Design             :active,  des2, 2024-01-06, 3d
    section Development
    Frontend           :         dev1, after des2, 5d
    Backend            :         dev2, after des2, 7d
    Testing            :         test1, after dev1, 3d`,
            
            pie: `pie title Programming Languages Usage
    "JavaScript" : 42.5
    "Python" : 30.2
    "TypeScript" : 15.8
    "Go" : 7.3
    "Rust" : 4.2`,

            class: `classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +String breed
        +bark()
    }
    class Cat {
        +boolean indoor
        +meow()
    }
    Animal <|-- Dog
    Animal <|-- Cat`,

            state: `stateDiagram-v2
    [*] --> Idle
    Idle --> Processing : start
    Processing --> Idle : reset
    Processing --> Success : complete
    Processing --> Error : fail
    Success --> [*]
    Error --> Idle : retry`
        };

        // Theme management
        const themes = [
            { value: 'light', label: 'Light', icon: 'SunIcon' },
            { value: 'dark', label: 'Dark', icon: 'MoonIcon' },
            { value: 'system', label: 'System', icon: 'SystemIcon' }
        ];

        const downloadOptions = [
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
        let renderTimeout;
        const debounceRender = () => {
            clearTimeout(renderTimeout);
            renderTimeout = setTimeout(renderDiagram, 500);
        };

        // Render diagram function
        const renderDiagram = async () => {
            const trimmedCode = code.value.trim();
            
            if (!trimmedCode) {
                showPlaceholder();
                return;
            }
            
            try {
                const id = 'mermaid-' + Date.now();
                const { svg } = await mermaid.render(id, trimmedCode);
                diagramHTML.value = svg;
                
                // Use D3 to enhance the diagram with interactivity
                nextTick(() => {
                    enhanceWithD3();
                });
                
            } catch (error) {
                showError(error.message);
            }
        };

        // Show placeholder
        const showPlaceholder = () => {
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
        const showError = (message) => {
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
        const enhanceWithD3 = () => {
            const svg = d3.select('#app').select('svg');
            if (svg.empty()) return;

            // Add zoom and pan functionality
            const zoom = d3.zoom()
                .scaleExtent([0.1, 3])
                .on('zoom', (event) => {
                    svg.select('g').attr('transform', event.transform);
                });

            svg.call(zoom);

            // Add hover effects to nodes
            svg.selectAll('.node, .actor, .activation')
                .style('cursor', 'pointer')
                .on('mouseover', function() {
                    d3.select(this).style('opacity', 0.8);
                })
                .on('mouseout', function() {
                    d3.select(this).style('opacity', 1);
                });

            // Add double-click to reset zoom
            svg.on('dblclick.zoom', () => {
                svg.transition()
                    .duration(750)
                    .call(zoom.transform, d3.zoomIdentity);
            });
        };

        // Event handlers
        const onCodeChange = () => {
            if (autoCompile.value) {
                debounceRender();
            }
        };

        const toggleAutoCompile = () => {
            autoCompile.value = !autoCompile.value;
        };

        const loadExample = () => {
            if (selectedExample.value && examples[selectedExample.value]) {
                code.value = examples[selectedExample.value];
                if (autoCompile.value) {
                    renderDiagram();
                }
            }
            selectedExample.value = '';
        };

        const clearEditor = () => {
            code.value = '';
            showPlaceholder();
        };

        const toggleLayout = () => {
            isVerticalLayout.value = !isVerticalLayout.value;
        };

        const setTheme = (newTheme) => {
            theme.value = newTheme;
            showThemeMenu.value = false;
            localStorage.setItem('mermaid-playground-theme', newTheme);
        };

        const toggleFloat = (panel) => {
            floatingPanels.value[panel] = !floatingPanels.value[panel];
        };

        // Download functions
        const download = async (format) => {
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

        const downloadPNG = async () => {
            const svg = document.querySelector('#app svg');
            if (!svg) {
                alert('No diagram to download. Please create a diagram first.');
                return;
            }
            
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
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
                
            } catch (error) {
                alert('Error downloading PNG: ' + error.message);
            }
        };

        const downloadSVG = () => {
            const svg = document.querySelector('#app svg');
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

        const downloadPDF = () => {
            const svg = document.querySelector('#app svg');
            if (!svg) {
                alert('No diagram to download. Please create a diagram first.');
                return;
            }
            
            const printWindow = window.open('', '_blank');
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

        const downloadCode = () => {
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
        const startDrag = (event, panel) => {
            if (!floatingPanels.value[panel]) return;
            
            event.preventDefault();
            const startX = event.clientX - panelPositions.value[panel].x;
            const startY = event.clientY - panelPositions.value[panel].y;
            
            const onMouseMove = (e) => {
                panelPositions.value[panel].x = e.clientX - startX;
                panelPositions.value[panel].y = e.clientY - startY;
            };
            
            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };
            
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };

        const startResize = (event) => {
            event.preventDefault();
            
            const onMouseMove = (e) => {
                const container = document.querySelector('[ref="panelsContainer"]');
                if (!container) return;
                
                const containerRect = container.getBoundingClientRect();
                const relativeX = e.clientX - containerRect.left;
                const percentage = (relativeX / containerRect.width) * 100;
                
                if (percentage > 20 && percentage < 80) {
                    panelSizes.value.editor = percentage;
                    panelSizes.value.preview = 100 - percentage;
                }
            };
            
            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };
            
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };

        // Initialize
        onMounted(() => {
            // Load saved theme
            const savedTheme = localStorage.getItem('mermaid-playground-theme');
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
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.relative')) {
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
createApp(App).mount('#app');