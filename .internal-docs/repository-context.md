# Mermaid Playground Repository Context

## Repository Overview

**Project**: Interactive Mermaid.js diagram playground with live preview  
**Primary Language**: TypeScript, Vue.js 3  
**Domain**: Web development tools, diagram editors  
**Deployment**: GitHub Pages via automated CI/CD  
**License**: MIT

## Technical Architecture

### Core Technologies
- **Frontend Framework**: Vue.js 3 with Composition API
- **Type System**: TypeScript with strict configuration
- **Styling**: Tailwind CSS + GitHub design system
- **Diagram Engine**: Mermaid.js v10.6.1
- **Interactivity**: D3.js v7 for zoom/pan/interactive features
- **Build System**: Custom Node.js build script with CDN inlining
- **Package Manager**: pnpm (required)

### File Structure Analysis
```
mermaid-playground/
├── index.html           # Main application entry point
├── app.js              # Compiled Vue application (build artifact)
├── build.js            # Production build script with CDN inlining
├── script.js           # Legacy script (unused)
├── src/
│   ├── app.ts          # Main Vue 3 Composition API application
│   ├── types/index.ts  # TypeScript type definitions
│   ├── utils/examples.ts # Pre-built diagram examples
│   └── components/     # Empty directory (future expansion)
├── dist/               # Build output directory
├── package.json        # Dependencies and npm scripts
├── tsconfig.json       # TypeScript configuration
└── .internal-docs/     # Repository memory and context
```

### Development Workflow Commands
```bash
# Development
pnpm dev                # TypeScript compilation + Python dev server on :8000
pnpm build:dev          # Development build
pnpm build:prod         # Production build with optimizations

# Quality Assurance
pnpm test               # Full test suite (HTML + TS + accessibility)
pnpm validate           # Validation suite (HTML + TS with zero warnings)
pnpm typecheck          # TypeScript validation
pnpm lint               # ESLint validation
pnpm format             # Prettier code formatting

# Testing Components
pnpm test:html          # HTML validation via html-validate
pnpm test:ts            # TypeScript + ESLint checks
pnpm test:accessibility # pa11y accessibility testing
```

## Feature Implementation Status

### Core Features (Complete)
- ✅ Live preview with debounced rendering (500ms)
- ✅ Auto-compile toggle with manual compilation mode
- ✅ Theme system (light/dark/system) with GitHub styling
- ✅ Responsive design with mobile support
- ✅ Floating panels with drag/resize functionality
- ✅ Multiple diagram types (flowchart, sequence, Gantt, pie, class, state)
- ✅ Export system (PNG, SVG, PDF, code download)
- ✅ D3.js enhanced interactivity (zoom, pan, hover effects)
- ✅ Built-in help system with documentation

### Technical Quality
- ✅ TypeScript strict mode with comprehensive type definitions
- ✅ Vue 3 Composition API with reactive state management
- ✅ ESLint + Prettier configuration
- ✅ HTML validation
- ✅ Accessibility testing (pa11y)
- ✅ Production build optimization
- ✅ GitHub Actions CI/CD pipeline

## Development Environment

### Requirements
- **Node.js**: >=22.0.0
- **Python**: >=3.11.0 (for development server)
- **Package Manager**: pnpm (configured in engines)
- **Optional**: mise for tool version management

### Dependencies Analysis
**Production Dependencies**: None (all CDN-based)
**Development Dependencies**:
- TypeScript ecosystem: `typescript@^5.6.3`, `@typescript-eslint/*@^8.15.0`
- Linting/Formatting: `eslint@^9.15.0`, `prettier@^3.3.3`
- Validation: `html-validate@^8.24.1`, `pa11y@^8.0.0`
- Type Definitions: `@types/d3@^7.4.3`

### Build Process
1. TypeScript compilation (`tsc`)
2. Custom build script (`build.js`) that:
   - Downloads CDN resources
   - Inlines JavaScript/CSS for production
   - Replaces Tailwind CDN with custom CSS
   - Creates self-contained HTML file

## Code Patterns and Conventions

### Vue 3 Composition API Patterns
- Reactive state management with `ref()` and `computed()`
- Event handling with debounced functions
- Template refs for DOM manipulation
- Component-based icon system

### TypeScript Patterns
- Strict type definitions in `src/types/index.ts`
- Interface-based state management
- Global type declarations for external libraries
- Type-safe event handlers and API calls

### Styling Patterns
- GitHub design system color palette
- Utility-first approach with custom CSS for complex components
- Dark mode support with class-based theme switching
- Responsive design with mobile-first approach

## Performance Considerations

### Current Optimizations
- Debounced diagram rendering (500ms delay)
- Optional manual compilation for large diagrams
- CDN resource inlining for production
- SVG-based diagram output for scalability
- Lazy loading of help documentation

### Potential Improvements
- Virtual scrolling for large diagrams
- Worker-based diagram compilation
- Code splitting for different diagram types
- Caching compiled diagrams

## Deployment Configuration

### GitHub Pages Setup
- Source: GitHub Actions workflow
- Build artifact: Single HTML file with inlined resources
- URL: `https://vish288.github.io/mermaid-playground`

### CI/CD Pipeline
- Automated testing on push/PR
- Build artifact generation
- Deployment to GitHub Pages
- Alternative GitLab CI configuration available

## Security Considerations

### Current Security Measures
- CSP-friendly implementation (no inline scripts in final build)
- XSS protection through Vue.js template system
- No server-side components (static site)
- External dependency management via CDN

### Access Patterns
- Read-only access to mermaid-js.github.io documentation
- CDN resources from trusted providers
- No user data collection or storage
- Client-side only operation

## Future Enhancement Opportunities

### Identified Upgrade Paths
1. **Vue 3 Ecosystem**: Upgrade to latest Vue 3 features
2. **TypeScript**: Latest TypeScript version and stricter configs
3. **Build System**: Vite migration for better development experience
4. **Testing**: Vitest for modern testing framework
5. **UI Components**: Component library integration
6. **Feature Enhancements**: Additional diagram types, collaboration features
7. **Performance**: Web Workers, virtual scrolling, caching
8. **Developer Experience**: Hot reload, better error handling

### Technical Debt Assessment
- **Low**: Well-structured codebase with good separation of concerns
- **Medium**: Custom build system could be replaced with Vite
- **Low**: TypeScript coverage is comprehensive
- **Medium**: Test coverage could be expanded beyond validation