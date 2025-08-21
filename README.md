# Live Preview

Interactive Mermaid.js diagram editor with live preview, built with Vue.js 3, TypeScript, and D3.js.

## Features

- 🎨 **Live Preview** - Real-time diagram rendering as you type
- 🎯 **Auto-Compile Toggle** - Choose between automatic or manual compilation
- 🌓 **Theme Support** - Light, dark, and system theme modes with visual indicators
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🪟 **Floating Panels** - Draggable and resizable editor/preview windows
- 📊 **Multiple Diagram Types** - Flowcharts, sequence diagrams, Gantt charts, pie charts, class diagrams, state diagrams
- 💾 **Export Options** - Download as PNG, SVG, PDF, or raw Mermaid code
- 🔍 **D3.js Enhanced** - Zoom, pan, and interactive diagram exploration
- ⚡ **TypeScript** - Full type safety and modern development experience
- 📖 **Built-in Help** - Integrated documentation and examples viewer
- 🎛️ **Enhanced Toolbar** - Reorganized controls with larger, more accessible icons
- 🔄 **Smart Layout Toggle** - Visual indicators showing current and target layout states

## Quick Start

### Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Build

```bash
# Build for production
pnpm build
```

### Testing

```bash
# Run all tests
pnpm test

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Format code
pnpm format
```

## Tech Stack

- **Vue.js 3** - Progressive JavaScript framework with Composition API
- **TypeScript** - Type-safe development with strict configuration
- **Vite** - Fast build tool with hot module replacement
- **Mermaid.js** - Diagram and flowchart generation
- **D3.js** - Data visualization and diagram interaction
- **Tailwind CSS** - Utility-first CSS framework
- **pnpm** - Fast, disk space efficient package manager
- **Node.js 22** - JavaScript runtime

## User Interface

The application features a modern, responsive design with:

- **Header Navigation** - Clean title with integrated theme switcher
- **Toolbar Controls** - Enhanced icons (24px) for better accessibility
- **Layout Options** - Horizontal/vertical split with visual state indicators
- **Theme System** - Light, dark, and system-adaptive themes
- **Help Integration** - Built-in documentation viewer with README content
- **Export Menu** - Multiple format options (PNG, SVG, PDF, Mermaid code)
- **Example Library** - Pre-built diagram templates for quick start

## Environment Setup

This project uses [mise](https://mise.jdx.dev/) for tool version management:

```bash
# Install mise (if not already installed)
curl https://mise.jdx.dev/install.sh | sh

# Install project tools
mise install
```

## Build Configuration

The project uses **Vite** for modern, fast development and production builds:

- **Development** - Hot module replacement with TypeScript support
- **Production** - Optimized bundles with asset inlining for GitHub Pages
- **TypeScript** - Strict compilation with full type checking
- **Path Aliases** - Clean imports with `@/` prefixes
- **Asset Optimization** - Automatic CSS/JS minification and bundling

## Deployment

Configured for deployment to **GitHub Pages** with:
- Single-bundle output for static hosting compatibility
- Asset optimization and cache-friendly naming
- Automatic builds via GitHub Actions (when configured)

## License

MIT