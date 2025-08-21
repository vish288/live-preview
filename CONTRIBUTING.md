# Contributing to Live Preview

Thank you for your interest in contributing to Live Preview! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

### Reporting Issues

- Check if the issue already exists in the [Issues](https://github.com/vish288/live-preview/issues) section
- Use the appropriate issue template
- Provide clear description and steps to reproduce
- Include browser and OS information for bugs

### Suggesting Features

- Open a feature request issue
- Explain the use case and benefits
- Provide examples if possible

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
   - Follow the code style guidelines
   - Add tests if applicable
   - Update documentation
4. **Commit your changes**
   ```bash
   git commit -m "feat: add new feature"
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request**

## Development Setup

### Prerequisites

- Node.js 22+
- Python 3.12+
- pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/vish288/live-preview.git
cd live-preview

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Code Style

- TypeScript for type safety
- ESLint for linting
- Prettier for formatting

Run quality checks:
```bash
pnpm quality
```

### Testing

```bash
# Run all tests
pnpm test

# Type checking
pnpm typecheck

# Linting
pnpm lint
```

## Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test changes
- `chore:` Build/tooling changes

## License

By contributing, you agree that your contributions will be licensed under the MIT License.