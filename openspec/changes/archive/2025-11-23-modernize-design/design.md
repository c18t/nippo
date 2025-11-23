# Design System Architecture

## Design Principles

1. **Simplicity**: Minimal, focused design with clear visual hierarchy
2. **Readability**: Content-first approach optimized for reading daily
   reports
3. **Consistency**: Unified spacing, typography, and color systems
4. **Accessibility**: WCAG AA compliant contrast and responsive text
   sizing
5. **Performance**: Lightweight CSS with no external dependencies

## Visual Language

### Layout Philosophy

- **Mobile-first**: Base styles for mobile, progressively enhance for larger screens
- **Content-focused**: Maximum readable line length (~70 characters)
- **Breathing room**: Generous whitespace and padding
- **Vertical rhythm**: Consistent spacing scale

### Color Strategy

- **System-aware**: Respect `prefers-color-scheme` media query
- **Two themes**: Light and dark with automatic switching
- **Minimal palette**: Primary text, secondary text, accent, background
- **High contrast**: Ensure readability in both modes

### Typography System

- **System fonts**: Native font stacks for performance and consistency
- **Modular scale**: 1.25 ratio for heading sizes
- **Optimal line height**: 1.6-1.8 for body text
- **Responsive sizing**: Fluid typography with clamp()

## CSS Architecture

### File Structure

```text
src/styles/
├── index.css       # Entry point, imports all modules
├── tokens.css      # Design tokens (colors, spacing, typography)
├── reset.css       # CSS reset/normalization
├── layout.css      # Layout and grid systems
├── typography.css  # Typography styles
└── components.css  # Component-specific styles
```

### Cascade Layers

Use CSS `@layer` for predictable cascade:

1. `reset` - Normalize browser defaults
2. `tokens` - Custom properties and design tokens
3. `layout` - Page structure and grid
4. `typography` - Text styling
5. `components` - Component-level styles

### Custom Properties

Define all design tokens as CSS custom properties:

- Colors: `--color-text`, `--color-bg`, `--color-accent`
- Spacing: `--space-xs`, `--space-sm`, `--space-md`, `--space-lg`,
  `--space-xl`
- Typography: `--font-base`, `--font-heading`, `--size-*`, `--leading-*`

## Responsive Strategy

### Breakpoints

- **Mobile**: 320px - 767px (base styles)
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

### Layout Adaptation

- **Mobile**: Single column, full width with padding
- **Tablet**: Constrained width (700px max), centered
- **Desktop**: Wider content area (800px max), more breathing room

### Typography Scaling

Use `clamp()` for fluid typography:

```css
font-size: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
```

## Dark Mode Implementation

### Color Tokens

Define light/dark variants:

```css
:root {
  color-scheme: light dark;
}

@media (prefers-color-scheme: light) {
  :root {
    --color-bg: #ffffff;
    --color-text: #1a1a1a;
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #1a1a1a;
    --color-text: #e8e8e8;
  }
}
```

### Contrast Requirements

- **Light mode**: Minimum 4.5:1 contrast ratio
- **Dark mode**: Minimum 4.5:1 contrast ratio
- **Interactive elements**: Minimum 3:1 against background

## Browser Support

Target: `>= 0.25%` usage (specified in browserslist)

Key features used:

- CSS Custom Properties
- CSS Grid
- Flexbox
- `clamp()` function
- `@layer` directive
- `prefers-color-scheme` media query

All features are supported in modern browsers as per the browserslist
target.
