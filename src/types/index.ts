// Type definitions for Mermaid Playground

export interface Theme {
    value: 'light' | 'dark' | 'system';
    label: string;
    icon: string;
}

export interface DownloadOption {
    value: 'png' | 'svg' | 'pdf' | 'code';
    label: string;
}

export interface PanelPosition {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface PanelSizes {
    editor: number;
    preview: number;
}

export interface FloatingPanels {
    editor: boolean;
    preview: boolean;
}

export interface AppState {
    code: string;
    diagramHTML: string;
    autoCompile: boolean;
    selectedExample: string;
    isVerticalLayout: boolean;
    showThemeMenu: boolean;
    showDownloadMenu: boolean;
    theme: Theme['value'];
    floatingPanels: FloatingPanels;
    panelPositions: Record<'editor' | 'preview', PanelPosition>;
    panelSizes: PanelSizes;
}

export interface ExampleDiagrams {
    flowchart: string;
    sequence: string;
    gantt: string;
    pie: string;
    class: string;
    state: string;
}

// Mermaid.js types (simplified)
export interface MermaidAPI {
    initialize: (config: MermaidConfig) => void;
    render: (id: string, code: string) => Promise<{ svg: string }>;
}

export interface MermaidConfig {
    startOnLoad: boolean;
    theme: string;
    themeVariables?: Record<string, string>;
}

// D3.js types (extending existing)
export interface D3Selection extends d3.Selection<any, any, any, any> {}
export interface D3ZoomBehavior extends d3.ZoomBehavior<any, any> {}

export interface VueApp {
    mount: (selector: string) => void;
}
