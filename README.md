# Mermaid Playground

Interactive Mermaid.js diagram editor with live preview, built with Vue.js 3, TypeScript, and D3.js.

## Features

- 🎨 **Live Preview** - Real-time diagram rendering as you type
- 🎯 **Auto-Compile Toggle** - Choose between automatic or manual compilation
- 🌓 **Theme Support** - Light, dark, and system theme modes
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🪟 **Floating Panels** - Draggable and resizable editor/preview windows
- 📊 **Multiple Diagram Types** - Flowcharts, sequence diagrams, Gantt charts, pie charts, class diagrams, state diagrams
- 💾 **Export Options** - Download as PNG, SVG, PDF, or raw Mermaid code
- 🔍 **D3.js Enhanced** - Zoom, pan, and interactive diagram exploration
- ⚡ **TypeScript** - Full type safety and modern development experience

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

- **Vue.js 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe development
- **Mermaid.js** - Diagram and flowchart generation
- **D3.js** - Data visualization and diagram interaction
- **Tailwind CSS** - Utility-first CSS framework
- **pnpm** - Fast, disk space efficient package manager
- **Node.js 22+** - JavaScript runtime
- **Python 3.12+** - Development server

## Environment Setup

This project uses [mise](https://mise.jdx.dev/) for tool version management:

```bash
# Install mise (if not already installed)
curl https://mise.jdx.dev/install.sh | sh

# Install project tools
mise install
```

## CI/CD

The project includes configurations for:
- **GitHub Actions** - Automated testing and deployment to GitHub Pages
- **GitLab CI** - Alternative CI/CD pipeline support

## License

MIT