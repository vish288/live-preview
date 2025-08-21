# Mermaid Playground

[![Release](https://img.shields.io/github/v/release/vish288/live-preview?style=for-the-badge&color=blue)](https://github.com/vish288/live-preview/releases)
[![CI](https://img.shields.io/github/actions/workflow/status/vish288/live-preview/ci.yml?branch=main&style=for-the-badge&label=CI)](https://github.com/vish288/live-preview/actions/workflows/ci.yml)
[![Quality](https://img.shields.io/github/actions/workflow/status/vish288/live-preview/quality.yml?branch=main&style=for-the-badge&label=Quality)](https://github.com/vish288/live-preview/actions/workflows/quality.yml)
[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge)](https://vish288.github.io/live-preview)

Interactive Mermaid.js diagram editor with live preview functionality. Create, edit, and export beautiful diagrams with real-time rendering.

## ✨ Features

- 🎨 **Live Preview** - Real-time diagram rendering as you type
- 🎯 **Auto-Compile Toggle** - Choose between automatic or manual compilation
- 🌓 **Theme Support** - Light, dark, and system theme modes
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 📊 **Multiple Diagram Types** - Flowcharts, sequence diagrams, Gantt charts, pie charts, class diagrams
- 💾 **Export Options** - Download as SVG, PNG, or raw Mermaid code
- ⚡ **TypeScript** - Full type safety and modern development experience
- 📖 **Built-in Help** - Integrated documentation and examples
- 🎛️ **Enhanced Toolbar** - Intuitive controls with accessibility focus
- 🔄 **Layout Toggle** - Switch between horizontal and vertical layouts

## 🚀 Quick Start

Visit the [live demo](https://vish288.github.io/live-preview) or run locally:

### Development

```bash
# Clone the repository
git clone https://github.com/vish288/live-preview.git
cd live-preview

# Install dependencies (requires Node.js 20+)
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

### Code Quality

```bash
# Run all validation checks
pnpm run validate

# Run all tests
pnpm test

# Format code
pnpm run format

# Type checking
pnpm run typecheck
```

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| [Vue.js 3](https://vuejs.org/) | Progressive JavaScript framework | `^3.5.19` |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe development | `^5.6.3` |
| [Vite](https://vitejs.dev/) | Fast build tool and dev server | `^7.1.3` |
| [Mermaid.js](https://mermaid.js.org/) | Diagram and flowchart generation | `^11.10.0` |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework | `^4.1.12` |
| [pnpm](https://pnpm.io/) | Fast, disk space efficient package manager | `10.14.0` |

### Architecture

- **Component-based** - Modular Vue.js components with TypeScript
- **Reactive state** - Vue Composition API for state management  
- **Modern CSS** - Tailwind CSS 4.x with custom color palettes
- **Type safety** - Strict TypeScript configuration
- **Fast builds** - Vite with HMR for instant development feedback

## 🎨 User Interface

Modern, accessible design with:

- **🌈 Theme System** - Light, dark, and system-adaptive themes with custom color palettes
- **📐 Layout Options** - Horizontal/vertical split with visual state indicators  
- **🎛️ Enhanced Toolbar** - Intuitive controls with template selection and export options
- **📖 Help Integration** - Built-in documentation with Mermaid syntax examples
- **📱 Responsive Design** - Seamless experience across desktop and mobile devices

## 🔧 Development

### Prerequisites

- **Node.js** `>=20.0.0`
- **pnpm** (recommended package manager)

### Project Structure

```
src/
├── components/          # Vue components
│   ├── EditorPanel.vue  # Code editor with syntax highlighting
│   ├── PreviewPanel.vue # Live diagram preview
│   ├── Toolbar.vue      # Controls and template selection
│   └── HelpPanel.vue    # Documentation modal
├── types/               # TypeScript type definitions
├── utils/               # Utility functions and examples
└── App.vue             # Main application component
```

### CI/CD Pipeline

Automated workflows ensure code quality:

- ✅ **Type checking** with TypeScript
- ✅ **Linting** with ESLint  
- ✅ **Code formatting** with Prettier
- ✅ **HTML validation** for accessibility
- ✅ **Automated releases** with semantic-release

## 🚀 Deployment

- **Live Demo**: [vish288.github.io/live-preview](https://vish288.github.io/live-preview)
- **Hosting**: GitHub Pages with automated deployments
- **Build**: Optimized Vite bundles with asset optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes with proper tests
4. Ensure all CI checks pass: `pnpm run validate`
5. Commit using [conventional commits](https://conventionalcommits.org/)
6. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

Built with ❤️ using Vue.js and Mermaid.js