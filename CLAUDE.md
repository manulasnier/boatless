# CLAUDE.md

This file provides guidance to Claude AI when working with the **boatless** project.

## Project Overview

**boatless** is an open-source LESS CSS starter toolkit for web integrators.  
It provides utility classes, mixins, a grid system, and typography helpers to kickstart any web project using LESS-CSS.

- **Author:** Manu Lasnier <manu@manulasnier.com>
- **Version:** 0.0.7
- **License:** GNU GPL v3.0
- **Homepage:** https://boatless.manulasnier.com
- **Repository:** https://github.com/manulasnier/boatless
- **npm:** `npm install boatless --save-dev`

---

## Tech Stack

| Tool | Role |
|------|------|
| LESS CSS | Main stylesheet language |
| Webpack | Bundler & compiler |
| PostCSS | CSS post-processing |
| Autoprefixer | CSS vendor prefixes |
| cssnano | CSS minification |
| Stylelint | LESS linting |

---

## Project Structure

```
.
├── boat.less                  # Main entry point (imported by end users)
├── less/
│   ├── _var.less              # CSS variables and LESS variables
│   ├── _mixins.less           # Reusable LESS mixins
│   ├── _helpers.less          # Utility/helper classes
│   ├── _layout.less           # Layout and grid system
│   ├── _components.less       # UI components
│   ├── _forms.less            # Form styles
│   └── _typography.less       # Typography rules
├── test/
│   ├── index.html             # Demo HTML file
│   ├── _dev/demo.less         # Demo LESS source
│   └── dist/                  # Compiled CSS output (boatless.css, demo.css)
├── webpack.config.js          # Webpack configuration
├── postcss.config.js          # PostCSS configuration
├── package.json
├── CHANGELOG.md
└── README.md
```

---

## Available npm Scripts

```bash
# Development build (unminified)
npm run dev

# Watch mode (auto-recompile on file change)
npm run watch

# Production build (minified, optimized)
npm run build
```

---

## How to Use boatless

### Install via npm

```bash
npm install boatless --save-dev
```

### Import in your LESS file

```less
@import "~boatless";
```

This imports `boat.less` which in turn loads all partials from the `less/` directory.

---

## Architecture Notes

- **`boat.less`** is the single entry point declared as `"main"` in `package.json`.
- Partials in `less/` follow the LESS convention (`_filename.less`).
- The grid system uses **CSS container queries** (`@container`) for responsive behavior (since v0.0.7).
- CSS custom properties (`var()`) are used alongside LESS variables (since v0.0.7).
- PostCSS runs **only on production build** to apply autoprefixer and cssnano.
- Stylelint enforces code style via `stylelint-config-standard-less`.

---

## Key Features

- **Grid system** with responsive support and mixin-based configuration
- **Flex mixin** with gap parameter support
- **Responsive helpers** (`.hide`, `.mb`, etc.) with container query rules
- **Typography** utilities
- **Form** base styles
- **Mixins library** organized by category

---

## Changelog Summary

| Version | Date | Highlights |
|---------|------|-----------|
| 0.0.7 | 2026-05-07 | Grid mixin update, `@container` support, CSS vars, responsive `.hide`/`.mb` |
| 0.0.6 | 2026-04-14 | `gap` param on flex mixin, removed color vars |
| 0.0.5 | 2025-08-28 | Renamed to **boatless**, demo file added |
| 0.0.4 | 2025-06-18 | Removed unnecessary `index.js` |
| 0.0.3 | 2025-06-18 | npmignore, grid responsive, structure update |
| 0.0.2 | 2025-06-11 | Grid system, test files, mixin dispatch, PostCSS fix |
| 0.0.1 | 2025-06-01 | Initial structure, LESS compile toolchain |

---

## Contributing & Issues

- Bug reports: https://github.com/manulasnier/boatless/issues
- This project is licensed under **GNU GPL v3.0**
