# Implementation Tasks

## Phase 1: Foundation & Tokens

### 1.1 Create CSS reset and base styles

- [x] Create `src/styles/reset.css` with modern CSS reset
- [x] Normalize box-sizing, margins, and default element styles
- [x] Set up HTML5 semantic element display properties
- [x] **Validation**: Verify consistent baseline across browsers

### 1.2 Define design tokens

- [x] Create `src/styles/tokens.css` with CSS custom properties
- [x] Define spacing scale (--space-xs through --space-3xl)
- [x] Define typography scale (--size-xs through --size-4xl)
- [x] Define line height variables (--leading-tight, --leading-normal, --leading-relaxed)
- [x] **Validation**: All tokens are defined and accessible

### 1.3 Implement color scheme system

- [x] Define color tokens in `tokens.css`
- [x] Create light theme colors with WCAG AA contrast
- [x] Create dark theme colors with WCAG AA contrast
- [x] Implement `prefers-color-scheme` media queries
- [x] Set `color-scheme` meta tag in HTML
- [x] **Validation**: Test color contrast ratios, verify theme switching works

## Phase 2: Typography

### 2.1 Set up font stacks

- [x] Define system font stack for Latin text
- [x] Add Japanese font stack (Hiragino, Meiryo)
- [x] Configure monospace font stack for code
- [x] Apply font rendering optimizations
- [x] **Validation**: Test rendering on macOS, Windows, Linux

### 2.2 Create typography system

- [x] Create `src/styles/typography.css`
- [x] Define modular scale using CSS custom properties
- [x] Implement fluid typography with clamp()
- [x] Style heading hierarchy (h1-h6)
- [x] Style body text, paragraphs, lists
- [x] **Validation**: Check font sizes at 320px, 768px, 1440px viewports

### 2.3 Style semantic text elements

- [x] Style strong, em, mark, code elements
- [x] Configure links (default, hover, active, focus states)
- [x] Set up blockquote and cite styles
- [x] Add pre and code block styling
- [x] **Validation**: Verify all semantic elements render correctly

## Phase 3: Layout System

### 3.1 Create base layout structure

- [x] Create `src/styles/layout.css`
- [x] Set up page container with max-width constraints
- [x] Configure body flexbox layout for footer positioning
- [x] Apply spacing system to layout elements
- [x] **Validation**: Test layout at mobile, tablet, desktop sizes

### 3.2 Implement responsive breakpoints

- [x] Define custom media queries for tablet (768px)
- [x] Define custom media queries for desktop (1024px)
- [x] Add tablet-specific layout adjustments
- [x] Add desktop-specific layout adjustments
- [x] **Validation**: Test responsive behavior at each breakpoint

### 3.3 Style header and footer

- [x] Style header element with appropriate spacing
- [x] Style footer with navigation links
- [x] Ensure touch-friendly spacing for mobile
- [x] Add print styles to hide header/footer
- [x] **Validation**: Check header/footer on all viewport sizes

## Phase 4: Components

### 4.1 Create component styles

- [x] Create `src/styles/components.css`
- [x] Style article containers
- [x] Style navigation lists
- [x] Configure focus indicators for accessibility
- [x] **Validation**: Test all interactive components

### 4.2 Add component responsive behavior

- [x] Apply responsive spacing to components
- [x] Adjust component layout for different viewports
- [x] Ensure touch targets meet 44x44px minimum
- [x] **Validation**: Test touch interactions on mobile device

## Phase 5: Integration & Polish

### 5.1 Update CSS entry point

- [x] Update `src/styles/index.css` to import all modules in correct order
- [x] Set up CSS layers (@layer) for predictable cascade
- [x] Remove old/unused CSS files
- [x] **Validation**: Build CSS bundle, verify output

### 5.2 Update HTML templates

- [x] Verify templates work with new CSS structure
- [x] Add `color-scheme` meta tag if not present
- [x] Remove inline styles if any exist
- [x] **Validation**: Test all pages render correctly

### 5.3 Cross-browser testing

- [x] Test in Chrome, Firefox, Safari, Edge
- [x] Test on iOS Safari, Chrome Android
- [x] Verify at 320px, 375px, 768px, 1024px, 1440px widths
- [x] Test light and dark mode switching
- [x] **Validation**: No visual regressions, all features work

### 5.4 Accessibility audit

- [x] Run axe or similar accessibility checker
- [x] Verify WCAG AA contrast ratios
- [x] Test keyboard navigation
- [x] Test with screen reader (VoiceOver or NVDA)
- [x] **Validation**: No accessibility violations

### 5.5 Performance check

- [x] Measure CSS bundle size (target: < 10KB minified)
- [x] Check for unused CSS rules
- [x] Verify no layout shift (CLS)
- [x] **Validation**: Performance metrics meet targets (5.28KB minified, 1.56KB gzipped)

## Dependencies

- **1.3 → 2.1**: Color tokens must be defined before typography uses them
- **1.2 → 3.1**: Spacing tokens must be defined before layout uses them
- **2.2 → 3.1**: Typography must be established before layout references it
- **4.1 → 5.1**: All component styles must exist before integration
- **5.1 → 5.2**: CSS must be updated before testing templates
- **5.2 → 5.3**: Templates must be updated before cross-browser testing

## Parallelizable Work

- Tasks 2.3 and 3.3 can be done in parallel after their dependencies
- Tasks 5.3 and 5.4 can be done in parallel
- Testing tasks (5.3, 5.4, 5.5) can run concurrently

## Rollback Plan

If issues are discovered:

1. Git revert to previous CSS state
2. Vite build will regenerate old CSS bundle
3. Templates continue to reference same CSS file paths
4. No template changes required for rollback
