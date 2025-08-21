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

// State management
let state = {
    autoCompile: true,
    isVerticalLayout: false,
    floatingPanels: {
        editor: false,
        preview: false
    }
};

// DOM elements
const elements = {
    input: document.getElementById('mermaid-input'),
    output: document.getElementById('mermaid-output'),
    clearBtn: document.getElementById('clear-btn'),
    exampleSelect: document.getElementById('example-select'),
    autoCompileToggle: document.getElementById('auto-compile-toggle'),
    compileBtn: document.getElementById('compile-btn'),
    layoutToggle: document.getElementById('layout-toggle'),
    downloadDropdown: document.getElementById('download-dropdown'),
    downloadMenu: document.getElementById('download-menu'),
    panelsContainer: document.getElementById('panels-container'),
    editorPanel: document.getElementById('editor-panel'),
    previewPanel: document.getElementById('preview-panel')
};

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
    "Rust" : 4.2`
};

let renderTimeout;

// Debounced render function
function debounceRender() {
    clearTimeout(renderTimeout);
    renderTimeout = setTimeout(renderDiagram, 500);
}

// Render mermaid diagram
async function renderDiagram() {
    const code = elements.input.value.trim();
    
    if (!code) {
        showPlaceholder();
        return;
    }
    
    try {
        elements.output.innerHTML = '';
        const id = 'mermaid-' + Date.now();
        const { svg } = await mermaid.render(id, code);
        elements.output.innerHTML = svg;
        
        const svgElement = elements.output.querySelector('svg');
        if (svgElement) {
            svgElement.style.maxWidth = '100%';
            svgElement.style.height = 'auto';
        }
        
    } catch (error) {
        showError(error.message);
    }
}

// Show placeholder content
function showPlaceholder() {
    elements.output.innerHTML = `
        <div class="text-github-fg-muted text-center">
            <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            <p class="text-lg">Your diagram will appear here</p>
            <p class="text-sm mt-2">Start typing in the editor to see the live preview</p>
        </div>
    `;
}

// Show error message
function showError(message) {
    elements.output.innerHTML = `
        <div class="text-github-danger-fg text-center p-4">
            <svg class="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.382 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
            <p class="font-medium">Syntax Error</p>
            <p class="text-sm mt-2 text-github-fg-muted">${message}</p>
        </div>
    `;
}

// Auto compile toggle
function toggleAutoCompile() {
    state.autoCompile = !state.autoCompile;
    const toggle = elements.autoCompileToggle;
    const span = toggle.querySelector('span');
    
    if (state.autoCompile) {
        toggle.classList.remove('bg-gray-400');
        toggle.classList.add('bg-github-success-fg');
        span.classList.add('translate-x-6');
        span.classList.remove('translate-x-1');
        elements.compileBtn.classList.add('hidden');
    } else {
        toggle.classList.remove('bg-github-success-fg');
        toggle.classList.add('bg-gray-400');
        span.classList.remove('translate-x-6');
        span.classList.add('translate-x-1');
        elements.compileBtn.classList.remove('hidden');
    }
}

// Layout toggle
function toggleLayout() {
    state.isVerticalLayout = !state.isVerticalLayout;
    
    if (state.isVerticalLayout) {
        elements.panelsContainer.classList.add('vertical');
        elements.layoutToggle.textContent = 'Horizontal Layout';
    } else {
        elements.panelsContainer.classList.remove('vertical');
        elements.layoutToggle.textContent = 'Vertical Layout';
    }
}

// Download functions
async function downloadPNG() {
    const svgElement = elements.output.querySelector('svg');
    if (!svgElement) {
        alert('No diagram to download. Please create a diagram first.');
        return;
    }
    
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const svgRect = svgElement.getBoundingClientRect();
        
        canvas.width = svgRect.width * 2;
        canvas.height = svgRect.height * 2;
        ctx.scale(2, 2);
        
        const svgData = new XMLSerializer().serializeToString(svgElement);
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
}

async function downloadSVG() {
    const svgElement = elements.output.querySelector('svg');
    if (!svgElement) {
        alert('No diagram to download. Please create a diagram first.');
        return;
    }
    
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.download = 'mermaid-diagram.svg';
    link.href = url;
    link.click();
    
    URL.revokeObjectURL(url);
}

async function downloadPDF() {
    // For PDF, we'll convert SVG to PNG and then use a library or browser print
    const svgElement = elements.output.querySelector('svg');
    if (!svgElement) {
        alert('No diagram to download. Please create a diagram first.');
        return;
    }
    
    // Simple approach: open print dialog
    const printWindow = window.open('', '_blank');
    const svgData = new XMLSerializer().serializeToString(svgElement);
    
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
}

function downloadCode() {
    const code = elements.input.value.trim();
    if (!code) {
        alert('No code to download. Please write some Mermaid code first.');
        return;
    }
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.download = 'mermaid-code.txt';
    link.href = url;
    link.click();
    
    URL.revokeObjectURL(url);
}

// Panel dragging functionality
function initializePanelDragging() {
    const panelHeaders = document.querySelectorAll('.panel-header');
    
    panelHeaders.forEach(header => {
        let isDragging = false;
        let startX, startY;
        let currentX, currentY;
        
        header.addEventListener('mousedown', startDrag);
        
        function startDrag(e) {
            const panel = header.closest('.resizable-panel');
            const floatBtn = header.querySelector('.panel-float-btn');
            
            if (e.target === floatBtn || floatBtn.contains(e.target)) {
                togglePanelFloat(panel);
                return;
            }
            
            if (!panel.classList.contains('floating-panel')) return;
            
            isDragging = true;
            startX = e.clientX - panel.offsetLeft;
            startY = e.clientY - panel.offsetTop;
            
            header.classList.add('dragging');
            
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stopDrag);
        }
        
        function drag(e) {
            if (!isDragging) return;
            
            e.preventDefault();
            currentX = e.clientX - startX;
            currentY = e.clientY - startY;
            
            const panel = header.closest('.resizable-panel');
            panel.style.left = currentX + 'px';
            panel.style.top = currentY + 'px';
        }
        
        function stopDrag() {
            isDragging = false;
            header.classList.remove('dragging');
            
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', stopDrag);
        }
    });
}

function togglePanelFloat(panel) {
    const isFloating = panel.classList.contains('floating-panel');
    
    if (isFloating) {
        // Dock panel
        panel.classList.remove('floating-panel');
        panel.style.left = '';
        panel.style.top = '';
        panel.style.width = '50%';
        panel.style.height = '';
        elements.panelsContainer.appendChild(panel);
    } else {
        // Float panel
        panel.classList.add('floating-panel');
        panel.style.left = '100px';
        panel.style.top = '100px';
        panel.style.width = '600px';
        panel.style.height = '400px';
        document.body.appendChild(panel);
    }
}

// Panel resizing
function initializePanelResizing() {
    const resizeHandle = document.querySelector('.resize-handle-right');
    let isResizing = false;
    
    resizeHandle.addEventListener('mousedown', startResize);
    
    function startResize(e) {
        isResizing = true;
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);
    }
    
    function resize(e) {
        if (!isResizing) return;
        
        const container = elements.panelsContainer;
        const containerRect = container.getBoundingClientRect();
        const relativeX = e.clientX - containerRect.left;
        const percentage = (relativeX / containerRect.width) * 100;
        
        if (percentage > 20 && percentage < 80) {
            elements.editorPanel.style.width = percentage + '%';
            elements.previewPanel.style.width = (100 - percentage) + '%';
        }
    }
    
    function stopResize() {
        isResizing = false;
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);
    }
}

// Event listeners
elements.input.addEventListener('input', () => {
    if (state.autoCompile) {
        debounceRender();
    }
});

elements.clearBtn.addEventListener('click', () => {
    elements.input.value = '';
    showPlaceholder();
});

elements.exampleSelect.addEventListener('change', (e) => {
    if (e.target.value && examples[e.target.value]) {
        elements.input.value = examples[e.target.value];
        if (state.autoCompile) {
            renderDiagram();
        }
    }
    e.target.value = '';
});

elements.autoCompileToggle.addEventListener('click', toggleAutoCompile);
elements.compileBtn.addEventListener('click', renderDiagram);
elements.layoutToggle.addEventListener('click', toggleLayout);

// Download menu
elements.downloadDropdown.addEventListener('click', (e) => {
    e.stopPropagation();
    elements.downloadMenu.classList.toggle('hidden');
});

document.addEventListener('click', () => {
    elements.downloadMenu.classList.add('hidden');
});

document.getElementById('download-png').addEventListener('click', downloadPNG);
document.getElementById('download-svg').addEventListener('click', downloadSVG);
document.getElementById('download-pdf').addEventListener('click', downloadPDF);
document.getElementById('download-code').addEventListener('click', downloadCode);

// Initialize
window.addEventListener('load', () => {
    elements.input.value = examples.flowchart;
    renderDiagram();
    initializePanelDragging();
    initializePanelResizing();
});