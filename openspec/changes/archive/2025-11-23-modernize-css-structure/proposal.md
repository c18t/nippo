# modernize-css-structure

## Summary

Modernize the CSS architecture to leverage Lightning CSS features (nesting,
modern syntax) and improve maintainability by separating reset styles from
design system styles. Add specification for Markdown-sourced article content
rendering.

## Motivation

The current CSS structure was written in traditional flat CSS syntax, which:

- Does not leverage Lightning CSS's native nesting capabilities
- Mixes reset styles with design system styles, making the site-specific design
  harder to identify
- Lacks specification for how Markdown content should preserve whitespace and
  line breaks

## Goals

1. Restructure CSS to use Lightning CSS nesting syntax for better readability
2. Separate CSS reset into a dedicated module (`reset.css`)
3. Add specification for article content rendering (Markdown whitespace
   preservation)
4. Maintain identical visual output and behavior

## Non-Goals

- Changing the visual design or color scheme
- Adding new CSS features or capabilities
- Modifying the design token system

## Scope

**Affected Specs:**

- `typography` (MODIFIED) - Add article content rendering requirements
- `css-architecture` (ADDED) - New spec for CSS file organization

**Affected Code:**

- `src/styles/index.css` - Restructured with nesting syntax
- `src/styles/reset.css` - New file with extracted reset styles
- `src/nippo.css` - Updated imports

## Dependencies

None - this is a refactoring change that preserves existing behavior.

## Success Criteria

- All CSS using Lightning CSS nesting where appropriate
- Reset styles isolated in `src/styles/reset.css`
- Article paragraph line breaks preserved (Markdown compatibility)
- Visual output unchanged from previous implementation
- Build produces identical minified CSS functionality
