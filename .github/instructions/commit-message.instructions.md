# Commit message instructions — boatless

Write every commit message in **English**, following **Conventional Commits**.

This file is the single source of truth for commit messages in this repository.
It is wired into VS Code Copilot through
`github.copilot.chat.commitMessageGeneration.instructions` in
[.vscode/settings.json](../../.vscode/settings.json), and mirrored as a git
template in [.gitmessage](../../.gitmessage).

## Format

```
type(scope): description

Optional body explaining WHY the change was made.
```

## Rules

| Element | Rule |
|---|---|
| Language | **English** — always |
| Type | required, lowercase |
| Scope | optional, in parentheses, lowercase |
| Description | imperative mood ("add", not "added" / "adds"), lowercase initial, **no trailing period** |
| Subject length | 72 characters max |
| Body | separated from subject by a blank line, wrapped at 72 columns, explains **why** rather than **how** |

## Allowed types

| Type | Use for |
|---|---|
| `feat` | New mixin, helper, component or public class |
| `fix` | Bug fix in the generated CSS or in the build |
| `refactor` | Restructuring with no change to the compiled CSS output |
| `style` | Formatting or indentation only, no functional impact |
| `perf` | Smaller or faster output |
| `docs` | README, CHANGELOG, CLAUDE.md, instruction files |
| `build` | webpack, PostCSS, Stylelint config, npm dependencies |
| `ci` | GitHub Actions workflows |
| `test` | Demo files under `test/` |
| `chore` | Housekeeping that fits nothing above |
| `revert` | Reverting a previous commit |

No other type is allowed.

## Scopes

Prefer the LESS partial or config area actually touched:

| Scope | Maps to |
|---|---|
| `vars` | `less/_var.less` |
| `mixins` | `less/_mixins.less` |
| `layout` | `less/_layout.less` (grid, `.gcols`, containers) |
| `helpers` | `less/_helpers.less` (`.mb`, `.hide`, utilities) |
| `components` | `less/_components.less` |
| `forms` | `less/_forms.less` |
| `typography` | `less/_typography.less` |
| `demo` | `test/index.html`, `test/_dev/demo.less` |
| `deps` | `package.json`, `package-lock.json` |
| `webpack` | `webpack.config.js`, `postcss.config.js`, `.stylelintrc` |

Omit the scope when the change is cross-cutting. Never invent a scope for a
directory that does not exist in this repository.

## Valid examples

```
feat(mixins): add gap parameter to the flex mixin
feat(layout): add container query variants for column mixins
fix(helpers): correct breakpoint order in the .hide generator
fix(layout): use prefix range notation for media features
refactor(layout): align media query mixins with the container pattern
build(deps): pin devDependencies to caret ranges
build(webpack): replace clean-webpack-plugin with output.clean
docs: document the container query grid in the README
style(forms): normalise indentation to 4 spaces
ci: trigger the doc rebuild on push to main
```

With an explanatory body:

```
fix(layout): use explicit max-width in media query mixins

A bare @variable in an at-rule prelude is deprecated in less 4.8, but the
documented @{variable} replacement is not parsed by postcss-less 6, which
breaks Stylelint. Building the query from @bp-* values satisfies both and
leaves the compiled CSS byte-identical.
```

## Avoid

```
update files                          ← no type, not descriptive
Fix: Corrected The Bug.               ← capitalised type and description, trailing period
feat(Security): add CSRF protection   ← capitalised scope, scope absent from this project
feat(php): add helper                 ← there is no PHP in this repository
misc                                  ← not descriptive
added new mixin                        ← past tense, use the imperative "add"
```

## Granularity

One commit = one coherent change. Do not mix a `feat` and a `fix` in the same
commit — split them. When a dependency bump forces a source change, the source
change is the subject and the bump belongs in the body.
