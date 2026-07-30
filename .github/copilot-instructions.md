# Copilot instructions — boatless

**boatless** is a standalone, open-source **LESS toolkit** published on npm: utility
classes, mixins, a grid system and typography helpers for web integrators.

There is **no PHP, no database, no jQuery and no application code** in this
repository. The only JavaScript is build configuration (`webpack.config.js`,
`postcss.config.js`), and it is not published to npm. Do not suggest framework,
server-side or DOM code here.

Full project overview: [CLAUDE.md](../CLAUDE.md).
Commit messages: [.github/instructions/commit-message.instructions.md](instructions/commit-message.instructions.md).

## Structure

| Path | Role |
|---|---|
| `boat.less` | Single entry point, declared as `main` in `package.json` — imports every partial |
| `less/_var.less` | LESS variables and CSS custom properties — breakpoints live here |
| `less/_mixins.less` | Reusable mixins |
| `less/_layout.less` | Layout, grid (`.gcols`), container queries |
| `less/_components.less` | UI components |
| `less/_typography.less` | Typography |
| `less/_forms.less` | Form base styles |
| `less/_helpers.less` | Utility classes (`.mb*`, `.hide*`) |
| `test/` | Demo only — `index.html`, `_dev/demo.less`; excluded from the npm package |
| `test/dist/` | **Generated output — never edit by hand** |

Import order in `boat.less` is significant: `_var` and `_mixins` must come first.
Adding a partial means adding an `@import` there.

## Hard rules

- **LESS only** — never SASS.
- **Never edit** `test/dist/`, `node_modules/`, or `package-lock.json` by hand.
- **Never hardcode a breakpoint value** — read it from `less/_var.less`.
- 4 spaces, `lf` line endings, UTF-8, final newline (see `.editorconfig`).
- Stylelint must pass — the build fails on error (`failOnError: true`).

## LESS conventions

- **Variables in `_var.less`**, never hardcoded values in other partials.
- **Mixin calls go last** in a block, after every CSS property — they must win on
  declaration order.
- **Declaration order by force**: positioning/layout → box model → typography →
  visual → animations → mixin calls.
- **Nesting limited to 3 levels.** Beyond that, extract a component.
- **One property per line.** Compact single-line at-rule bodies are tolerated in
  the generated column/span mixins of `_layout.less` where they aid scanning;
  nowhere else.
- **CSS custom properties are preferred** for anything a consumer may want to
  re-theme — the point is to let them override a variable rather than a rule.
- `!important` is expected and correct in utility classes (`_helpers.less`, the
  typography overrides) since they exist to win. Avoid it in `_components.less`
  and `_forms.less`.

## Responsive

Two parallel systems, kept symmetrical — a media-query variant and a container-query
variant for each helper:

```less
// media query variant
@bp-px:    ~"bp-@{bp-name}";
@bp-value: @@bp-px;
@media (max-width: @bp-value) { … }

// container query variant
@container (max-width: @bp-value) { … }
```

**Never write a bare variable in an at-rule prelude** (`@media @bp-query`): it is
deprecated in less 4.8, and the documented `@media @{bp-query}` replacement is not
parsed by `postcss-less` 6, which breaks Stylelint. Always build the condition from
the `@bp-*` pixel values as shown above.

Use **prefix range notation** — `(max-width: 767px)`, never `(width <= 767px)`.
This is enforced by `media-feature-range-notation: "prefix"` in `.stylelintrc`.

## Build

```bash
npm run dev      # unminified, source maps, → test/dist/*.css
npm run watch    # same, watching
npm run build    # production: PostCSS + autoprefixer + cssnano → test/dist/*-min.css
```

PostCSS only runs meaningfully on the production build. `output.clean` wipes
`test/dist/` on every run, so dev and production outputs replace each other —
rebuild in dev mode before opening `test/index.html`.

Dependencies are pinned to **caret ranges**. Never reintroduce `"latest"`: it lets
`package.json` and `package-lock.json` drift apart silently, which is what broke
this build once already.

## Definition of done for a style change

1. `npm run dev` compiles with **no warnings and no Stylelint errors**.
2. `npm run build` compiles clean too.
3. If the change is meant to be a refactor, diff the compiled CSS against the
   previous output and confirm it is unchanged.
4. Public API changes (new class, renamed variable) are added to `CHANGELOG.md`
   under the current version, following Keep a Changelog.
