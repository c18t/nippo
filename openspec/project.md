# Project Context

## Purpose

Source code for the nippo (daily report) website at nippo.c18t.me. This project
manages static HTML templates and builds frontend assets (CSS/JS) using Vite.

The built assets are used by a separate Go web server that processes the HTML
templates.

## Tech Stack

### Core Technologies

- **TypeScript 5.2+** (ES2020 target)
- **Vite 5.x** - Build tool and development server
- **Lightning CSS 1.22+** - CSS transformer and minifier
- **pnpm 10.22+** - Package manager
- **Go html/template** - Template engine (separate process, not part of this
  build)

### Development Tools

- **mise** - Development tool version manager
  - Node.js 25
  - Python 3
  - container-use, gh, jq, shellcheck, yamllint, and other CLI tools
- **pre-commit** - Git hook manager for code quality
- **Prettier** - Code formatter
- **markdownlint-cli2** - Markdown linter

## Project Conventions

### Code Style

- **Prettier** for code formatting (.prettierrc)
  - Applied to TypeScript, JavaScript, JSON, YAML, Markdown, Shell scripts
- **TypeScript strict mode** enabled (tsconfig.json)
  - `noUnusedLocals: true`
  - `noUnusedParameters: true`
  - `noFallthroughCasesInSwitch: true`
  - `skipLibCheck: true`
- **Markdown** formatting enforced by markdownlint-cli2
  (.markdownlint-cli2.yaml)

### Architecture Patterns

#### Directory Structure

- `templates/` - Go html/template format HTML templates
  - `_layout.html` - Base layout (wraps all pages)
  - `_header.html` - Header partial (navigation)
  - `_footer.html` - Footer partial (links, copyright)
  - `index.html` - Index page template
  - `nippo.html` - Daily report page template
  - `calender.html` - Calendar page template
- `src/` - Frontend asset sources (processed by Vite)
  - `css/style.css` - Main stylesheet
  - `js/main.ts` - Main TypeScript entry point
- `output/` - Vite build output directory (git ignored)
  - `style.css` - Compiled and minified CSS
  - `main.js` - Compiled and bundled JavaScript
- `test/` - Vite public directory for test/development files
- `openspec/` - OpenSpec documentation
  - `project.md` - This file (project context)
  - `AGENTS.md` - OpenSpec workflow instructions
  - `specs/` - Specification documents
  - `changes/` - Change proposals

#### Build Pipeline

1. **Source files**: `src/css/style.css`, `src/js/main.ts`
2. **Vite processing**:
   - TypeScript compilation (ES2020)
   - Lightning CSS transformation and minification
   - Module bundling
3. **Output**: `output/style.css`, `output/main.js` (fixed filenames, no
   hashing)

#### Template Integration

- Go server reads templates from `templates/`
- Templates reference assets: `/output/style.css`, `/output/main.js`
- Asset filenames must remain fixed (no content hashing) for template
  integration

### Testing Strategy

No automated testing strategy defined at this time. Manual testing via:

- `mise run dev` - Development server with hot reload
- `pnpm preview` - Preview production build locally

### Git Workflow

- **Pull requests**: Check `.github/pull_request_template.md` for PR template if
  it exists
- **Pre-commit hooks**: Automatically run on commit
  - Prettier formatting
  - markdownlint validation
  - yamllint validation
  - shellcheck (shell scripts)
  - Trailing whitespace removal
  - End-of-file fixer

## Domain Context

Static site for displaying daily reports (nippo). The site is served by a
separate Go web server that:

1. Processes HTML templates from `templates/` directory
2. Serves static assets from `output/` directory
3. Handles dynamic content (date filtering, archive navigation, etc.)

This project is responsible ONLY for building the frontend assets (CSS/JS). The
Go server is maintained separately.

## Important Constraints

### Build Output

- Build output must go to `output/` directory
- Asset filenames are **fixed**: `style.css`, `main.js` (no content hashing)
- `emptyOutDir: false` means build does NOT clear output directory before
  building
- Output directory should be git-ignored but checked for correctness

### CSS Processing

- **Lightning CSS** used for CSS processing
  - Browser target: `>= 0.25%` usage (via browserslist)
  - Custom media queries enabled (`@custom-media`)
  - CSS minification enabled in production

### TypeScript Configuration

- Target: ES2020
- Module: ESNext (Vite handles module bundling)
- Strict mode enabled
- No unused locals/parameters allowed
- Library checks skipped (`skipLibCheck: true`)

### Tool Management

- **All tools managed by mise** (specified in `.mise.toml`)
- Node.js version: 25
- Package manager: pnpm (lockfile: `pnpm-lock.yaml`)
- mise tasks defined for common operations (setup, build, dev)

## External Dependencies

### Runtime Dependencies

None. This is a purely static asset build project.

### Development Dependencies

All managed via pnpm (see `package.json`):

- Vite and related plugins
- TypeScript compiler
- Lightning CSS
- Prettier and plugins
- markdownlint-cli2
- Claude Code and MCP-related tools

### Tool Dependencies

Managed via mise (see `.mise.toml`):

- Node.js, Python
- container-use (Docker/container management)
- gh (GitHub CLI)
- jq (JSON processor)
- pre-commit
- shellcheck, yamllint, hadolint, actionlint
- octocov (GitHub Actions coverage)

## Development Environment Setup

### Prerequisites

- mise installed (<https://mise.jdx.dev/>)
- Git

### Setup Steps

1. Clone repository
2. Run `mise trust` to trust the `.mise.toml` configuration
3. Run `mise run setup` to:
   - Install all tools specified in `.mise.toml`
   - Install pnpm packages
   - Set up Claude Code MCP servers (if `.mcp.json` exists)
   - Install pre-commit hooks

### Claude Code MCP Integration

The project includes MCP (Model Context Protocol) server configuration:

- `.mcp.json` - MCP server definitions
- `.claude/settings.local.template.json` - Template for local Claude Code
  settings
- mise task `setup:claude-mcp` - Automatically configures MCP servers from
  `.mcp.json`

## File Naming Conventions

- **Templates**: Partials prefixed with `_` (e.g., `_layout.html`)
- **CSS**: Single main stylesheet (`src/css/style.css`)
- **JavaScript/TypeScript**: Single main entry point (`src/js/main.ts`)
- **Output**: Fixed filenames without hashing (`style.css`, `main.js`)

## Browser Support

Target browsers: `>= 0.25%` usage (via browserslist)

This typically includes:

- Modern Chrome, Firefox, Safari, Edge
- Recent mobile browsers (iOS Safari, Chrome Android)
- No legacy IE support
