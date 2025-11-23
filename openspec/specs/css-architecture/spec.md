# css-architecture Specification

## Purpose

TBD - created by archiving change modernize-css-structure. Update Purpose
after archive.

## Requirements

### Requirement: Modular CSS file organization

Styles SHALL be organized into separate modules based on their purpose
and scope, with clear separation between reset/normalization and design
system styles.

#### Scenario: Reset and design system separation

```gherkin
GIVEN the CSS codebase
WHEN organizing style files
THEN the structure includes:
  - `src/styles/reset.css`: Browser reset and normalization only
  - `src/styles/index.css`: Design tokens, typography, layout, components
  - `src/nippo.css`: Entry point that imports modules in correct order
```

#### Scenario: Import order dependency

```gherkin
GIVEN multiple CSS modules need to be combined
WHEN importing in the entry file
THEN import order:
  - Reset styles are imported first
  - Design system styles are imported after reset
  - Ensures proper cascade and specificity
```

### Requirement: Lightning CSS nesting syntax

Styles SHALL use Lightning CSS native nesting syntax to improve
readability and reduce repetition while maintaining standard CSS
compatibility.

#### Scenario: Pseudo-selector nesting

```gherkin
GIVEN a selector with hover, focus, or other pseudo-states
WHEN writing CSS
THEN pseudo-selectors are nested using `&:` syntax:
  a {
    color: blue;
    &:hover { color: darkblue; }
    &:focus { outline: 2px solid blue; }
  }
```

#### Scenario: Child selector nesting

```gherkin
GIVEN a parent element with child selectors
WHEN writing CSS
THEN child selectors are nested within parent:
  pre {
    background: gray;
    & code {
      background: transparent;
    }
  }
```

#### Scenario: Component structure nesting

```gherkin
GIVEN a component with multiple descendant selectors
WHEN organizing component styles
THEN descendant selectors are nested within the component:
  footer {
    ul { display: flex; }
    li { margin: 0; }
    a {
      padding: 1rem;
      &:hover { background: gray; }
    }
  }
```

### Requirement: Responsive nesting

Media queries SHALL be nested within their parent selectors when they
modify properties of a specific component, improving code locality.

#### Scenario: Component-specific responsive styles

```gherkin
GIVEN a component needs different styles at different breakpoints
WHEN writing responsive CSS
THEN media queries are nested within the component:
  footer {
    ul {
      gap: 1rem;
      @media (min-width: 768px) {
        gap: 1.5rem;
      }
    }
  }
```

#### Scenario: Global responsive layout

```gherkin
GIVEN layout changes affect multiple elements
WHEN the breakpoint changes have broad scope
THEN standalone media queries group related changes:
  @media (min-width: 768px) {
    body { padding: 2rem; }
    header, article, footer { max-width: 700px; }
  }
```

### Requirement: DRY principle for repeated properties

Common properties shared across related selectors SHALL be grouped to
reduce repetition and improve maintainability.

#### Scenario: Heading common properties

```gherkin
GIVEN h1-h6 elements share common styling
WHEN defining heading styles
THEN common properties are defined once:
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
  }
  h1 { font-size: 2rem; }
  h2 { font-size: 1.5rem; }
```

#### Scenario: Semantic text element grouping

```gherkin
GIVEN related semantic elements share styles
WHEN styling strong, b, em, i elements
THEN grouping reduces repetition:
  strong, b { font-weight: 700; }
  em, i { font-style: italic; }
```
