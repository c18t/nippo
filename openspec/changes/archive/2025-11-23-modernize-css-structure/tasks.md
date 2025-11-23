# Tasks for modernize-css-structure

## Implementation Tasks

1. **Extract CSS reset styles**
   - Create `src/styles/reset.css` with all reset/normalization styles
   - Remove reset styles from `src/styles/index.css`
   - Validation: `reset.css` contains only browser normalization, no
     design tokens

2. **Update CSS imports**
   - Modify `src/nippo.css` to import `reset.css` before `index.css`
   - Validation: Build output includes reset styles first

3. **Refactor CSS to use nesting syntax**
   - Convert pseudo-selectors (`:hover`, `:focus`) to nested `&:` syntax
   - Nest child selectors (e.g., `pre code` → `pre { & code }`)
   - Nest component parts (e.g., `footer ul`, `footer a` →
     `footer { ul { } a { } }`)
   - Move responsive styles into nested `@media` queries within parent
     selectors
   - Validation: CSS compiles without errors, minified output is
     functionally equivalent

4. **Consolidate redundant styles**
   - Group heading common properties before individual h1-h6 rules
   - Remove duplicate properties across selectors
   - Validation: Visual output unchanged

5. **Add article content rendering specification**
   - Create spec delta for typography with Markdown whitespace
     requirements
   - Document `white-space: pre-wrap` requirement for article paragraphs
   - Document `br { display: none }` requirement (prevent double line
     breaks)
   - Validation: Spec passes `openspec validate --strict`

6. **Create CSS architecture specification**
   - Create new `css-architecture` spec
   - Document file organization (reset.css, index.css)
   - Document nesting conventions and Lightning CSS usage
   - Validation: Spec passes `openspec validate --strict`

7. **Verify visual output**
   - Build production CSS
   - Compare rendered output with previous version
   - Test both light and dark color schemes
   - Test all responsive breakpoints
   - Validation: Pixel-perfect match with previous design

## Validation

- [ ] `pnpm run build` succeeds
- [ ] `openspec validate modernize-css-structure --strict` passes
- [ ] Visual regression testing passes (manual Playwright verification)
- [ ] Article line breaks preserve Markdown formatting
- [ ] All color scheme and responsive requirements still met
