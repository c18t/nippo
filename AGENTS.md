# AGENTS.md

This file provides guidance to AI assistants (Claude Code and other agents) when
working with code in this repository.

> **For comprehensive project context**, see `openspec/project.md` which
> contains detailed information about:
>
> - Project purpose and goals
> - Complete tech stack and dependencies
> - Architecture patterns and conventions
> - Testing strategy and constraints
> - Domain context and external dependencies

This file focuses on **practical commands and development workflows**.

<!-- OPENSPEC:START -->

## OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:

- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big
  performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:

- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

## Development Environment

This project uses Dev Containers (Codespaces or VS Code).
[mise](https://mise.jdx.dev/) for managing development tools
and [pnpm](https://pnpm.io/) for Node.js package management.

### Environment Check Before Code Modifications

**Before starting any code changes, verify your development environment and
adapt your workflow accordingly:**

1. **Check if you're in a DevContainer:**

   ```bash
   echo $DEVCONTAINER
   ```

   - If the variable is set (not empty): you're inside a DevContainer
   - If the variable is unset (empty): you're outside a DevContainer

2. **Choose workflow based on environment:**

   **Inside DevContainer:**
   - If on `main` branch: Ask the user if they want to create a new branch worktree
   - If on a non-`main` worktree: Proceed with implementation

   **Outside DevContainer:**
   - Use the `container-use` workflow described below

### container-use

ALWAYS use ONLY Environments for ANY and ALL file, code, or shell operations—NO
EXCEPTIONS—even for simple or generic requests.

DO NOT install or use the git cli with the environment_run_cmd tool. All
environment tools will handle git operations for you. Changing ".git" yourself
will compromise the integrity of your environment.

You MUST inform the user how to view your work using
`container-use log <env_id>` AND `container-use checkout <env_id>`.
Failure to do this will make your work inaccessible to others.

### Initial Setup

```bash
mise trust
mise run setup    # Installs tools, pnpm packages, and pre-commit hooks
```

This installs:

- Node.js 25
- Python 3
- pnpm, pre-commit, container-use, gh, and other CLI tools
- All dependencies from package.json
- pre-commit hooks

### Essential Commands

**Development:**

```bash
mise run dev      # or: mise run d
                  # Start Vite development server with hot reload
```

**Building:**

```bash
mise run build    # or: mise run b
                  # Build production assets to output/ directory
pnpm build        # Direct pnpm invocation
```

The build process:

- Compiles `src/css/style.css` → `output/style.css`
- Compiles `src/js/main.ts` → `output/main.js`
- Uses Lightning CSS for CSS transformation and minification
- Targets browsers with `>= 0.25%` usage

**Preview:**

```bash
pnpm preview      # Preview production build locally
```

**Code Quality:**

**IMPORTANT**: When you modify files, you MUST run the appropriate linters to
check for errors before committing:

**For Markdown files** (any `.md` file):

```bash
markdownlint-cli2 "**/*.md"
```

This validates Markdown formatting and ensures documentation consistency.

**For TypeScript files** (`**/*.ts`):

TypeScript errors are checked during build with:

```bash
mise run build
```

**Run all linters and formatters:**

```bash
pre-commit run --all-files
```

This runs:

- Prettier (code formatting)
- markdownlint (Markdown linting)
- yamllint (YAML validation)
- shellcheck (shell script linting)
- Other configured hooks

## Project Structure

```text
src/                    # Frontend asset sources
  ├── css/
  │   └── style.css     # Main stylesheet
  └── js/
      └── main.ts       # Main TypeScript entry point

templates/              # Go html/template format HTML templates
  ├── _layout.html      # Base layout template
  ├── _header.html      # Header partial
  ├── _footer.html      # Footer partial
  ├── index.html        # Index page template
  ├── nippo.html        # Nippo page template
  └── calender.html     # Calendar page template

output/                 # Build output directory (git ignored)
  ├── style.css         # Compiled CSS
  └── main.js           # Compiled JavaScript

test/                   # Vite public directory for test files

openspec/               # OpenSpec documentation
  ├── project.md        # Project context and specifications
  ├── AGENTS.md         # OpenSpec workflow instructions
  ├── specs/            # Specification documents
  └── changes/          # Change proposals
```

## Build Configuration

The project uses Vite with Lightning CSS:

- **vite.config.ts**: Main build configuration
  - Input: `src/css/style.css`, `src/js/main.ts`
  - Output: `output/style.css`, `output/main.js` (no hash in filenames)
  - `emptyOutDir: false` - build doesn't clear output directory
- **Lightning CSS**: CSS transformer and minifier
  - Browser target: `>= 0.25%` usage
  - Custom media queries enabled
- **TypeScript**: Strict mode enabled
  - ES2020 target
  - Module bundling via Vite

## Development Workflow

1. **Start development**: `mise run dev`
2. **Make changes** to files in `src/`
3. **Check formatting** before committing:
   - `pre-commit run --all-files` or
   - Let pre-commit hooks run automatically on commit
4. **Build for production**: `mise run build`
5. **Test the build**: Check `output/` directory or run `pnpm preview`

## Notes for AI Assistants

- HTML templates in `templates/` use Go's `html/template` syntax. They are NOT
  processed by Vite
- Only modify files in `src/` for frontend changes
- The `output/` directory should not be edited manually
- Asset filenames are fixed (no content hashing) for Go template integration
- Use `mise run` commands instead of direct npm/pnpm for consistency
