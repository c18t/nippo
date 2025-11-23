# Typography System

## ADDED Requirements

### Requirement: System font stack

Typography SHALL use native system font stacks to provide optimal
rendering, performance, and consistency with the user's operating
system.

#### Scenario: Font family selection

```gherkin
GIVEN text is rendered
WHEN selecting fonts
THEN the font stack applies:
  - Primary: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif
  - Monospace: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas,
    "Liberation Mono", monospace
  - Japanese: "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo,
    sans-serif (prepended to system stack)
```

#### Scenario: Font loading performance

```gherkin
GIVEN the page loads
WHEN rendering text
THEN font loading:
  - Uses system fonts only (no web font downloads)
  - Has zero font loading delay
  - Maintains consistent rendering across platforms
```

### Requirement: Modular type scale

Typography sizes SHALL follow a modular scale (1.25 ratio) for
harmonious visual hierarchy.

#### Scenario: Type scale definition

```gherkin
GIVEN the typography system is defined
WHEN setting font sizes
THEN sizes follow the scale:
  - --size-xs: 0.8rem
  - --size-sm: 0.889rem
  - --size-base: 1rem
  - --size-md: 1.125rem
  - --size-lg: 1.266rem
  - --size-xl: 1.424rem
  - --size-2xl: 1.602rem
  - --size-3xl: 1.802rem
  - --size-4xl: 2.027rem
```

#### Scenario: Heading hierarchy

```gherkin
GIVEN heading elements are used
WHEN rendering headings (h1-h6)
THEN font sizes apply:
  - h1: --size-3xl or --size-4xl
  - h2: --size-2xl
  - h3: --size-xl
  - h4: --size-lg
  - h5: --size-md
  - h6: --size-base (with bold weight)
```

### Requirement: Fluid typography

Typography SHALL scale fluidly between breakpoints using CSS `clamp()`
for optimal readability at all viewport sizes.

#### Scenario: Responsive text sizing

```gherkin
GIVEN text is rendered at any viewport width
WHEN the viewport changes
THEN font sizes:
  - Scale smoothly between minimum and maximum sizes
  - Use clamp() with viewport-relative units
  - Maintain readability at all sizes
  - Example: clamp(1rem, 0.9rem + 0.5vw, 1.125rem)
```

#### Scenario: Mobile vs desktop sizing

```gherkin
GIVEN text is rendered
WHEN comparing mobile (375px) to desktop (1440px)
THEN font sizes:
  - Body text: 16px mobile → 18px desktop
  - H1: 28px mobile → 32px desktop
  - Maintain proportional scale relationships
```

### Requirement: Optimal line height and measure

Typography SHALL use line heights and line lengths optimized for
comfortable reading.

#### Scenario: Body text line height

```gherkin
GIVEN body text is rendered
WHEN setting line height
THEN the line-height value:
  - Is between 1.6 and 1.8 for body text
  - Is between 1.2 and 1.4 for headings
  - Maintains consistent vertical rhythm
```

#### Scenario: Line length constraint

```gherkin
GIVEN a paragraph of text
WHEN rendered in the layout
THEN the line length:
  - Does not exceed 70-80 characters (optimal readability)
  - Is achieved through max-width constraints
  - Adapts to viewport size
```

### Requirement: Japanese text rendering

Typography SHALL be optimized for both English and Japanese text with
appropriate spacing and rendering settings.

#### Scenario: Japanese font support

```gherkin
GIVEN text contains Japanese characters
WHEN rendered
THEN the typography:
  - Uses Japanese-optimized fonts (Hiragino, Meiryo)
  - Falls back to system sans-serif if unavailable
  - Maintains consistent size and spacing
```

#### Scenario: Font rendering quality

```gherkin
GIVEN any text is rendered
WHEN displaying on screen
THEN rendering optimizations apply:
  - -webkit-font-smoothing: antialiased
  - -moz-osx-font-smoothing: grayscale
  - text-rendering: optimizeLegibility
  - font-synthesis: none
```

### Requirement: Semantic text styles

Text styling SHALL use semantic HTML elements and logical groupings
rather than purely visual classifications.

#### Scenario: Emphasis and importance

```gherkin
GIVEN text needs emphasis or importance
WHEN marking up content
THEN semantic elements are styled:
  - <strong>: Bold weight, maintains color
  - <em>: Italic style, maintains weight
  - <mark>: Highlighted background
  - <code>: Monospace font, subtle background
```
