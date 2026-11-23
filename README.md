# Matecha 🧉 Expressive Web

- https://polandballhub-operator.github.io/mateui-expressive/

[![License](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](#license)
[![Version](https://img.shields.io/badge/Version-3.1.0-purple.svg)](#quick-start)
[![Design](https://img.shields.io/badge/Material%203-Expressive-6750A4.svg)](#features)
[![API](https://img.shields.io/badge/API%20compatible-%40material%2Fweb%202.5.0-orange.svg)](#relationship-to-material-web-not-a-fork)
[![Implementation](https://img.shields.io/badge/Implementation-From%20scratch-yellow.svg)](#relationship-to-material-web-not-a-fork)
[![Dependencies](https://img.shields.io/badge/Dependencies-0-brightgreen.svg)](#features)
[![Web Components](https://img.shields.io/badge/Web%20Components-Custom%20Elements-green.svg)](#components)
[![Components](https://img.shields.io/badge/Components-70-blueviolet.svg)](#components)
[![Browsers](https://img.shields.io/badge/Browsers-Chrome%20111%2B%20%7C%20Safari%2016.4%2B%20%7C%20Firefox%20113%2B-lightgrey.svg)](#browser-support)

**A from-scratch, drop-in replacement for Google's Material Web Components (MWC) — API-compatible, Material 3 Expressive.**

Matecha (component name: **MateCha**) is an **independent, from-scratch implementation** that is **API-compatible with
MWC**: the same tag names, attributes, properties, methods, events, slots, parts and `--md-sys-*` /
`--md-<component>-*` design tokens. Internally it is written as plain Web Components with its own rendering, styling and
motion, in the Material 3 *Expressive* design language: spring motion, shape morphing on press, wavy progress, a
52×32 pill switch, a detached-handle slider and more.

> If your site already uses `@material/web`, swap the import. Your markup keeps working.

```html
<!-- before -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@material/web/all.js"></script>
<!-- after -->
<script type="module" src="./matecha-3.0.0-all.js"></script>
```

---

## Relationship to Material Web (not a fork)

Matecha is **not a fork** of [Material Web Components](https://github.com/material-components/material-web)
(`@material/web`, Apache-2.0, © Google LLC). It is a **clean, from-scratch re-implementation** of the same public
interface, so that sites built for MWC v2.5.0 can switch with no markup changes.

- **What is shared:** the public API surface only — element names, attribute/property names, event names, slot and part
  names, and design-token names — kept identical for compatibility.
- **What is not shared:** the implementation. Matecha contains no Lit, no tslib and no `@material/web` runtime code;
  rendering, styling, motion and behaviour are written independently.
- **Not affiliated:** this project is **not** an official Google or Material Design product and is not endorsed by,
  affiliated with, or sponsored by Google LLC.
- **Attribution:** the compatible API follows Google's MWC v2.5.0 design and is credited in [`NOTICE`](./NOTICE).
- **Trademarks:** "Material Design", "Material Web" and related names belong to Google LLC and are used only to describe
  compatibility.

## Features

- **Drop-in compatible** with all 44 custom elements of `@material/web` v2.5.0 (`all.js`).
- **Expressive design & motion** from the MateUI reference: press-morph shapes, spring easing, wavy linear/circular
  progress, morphing loading indicator, connected button groups, and more.
- **From scratch & dependency-free**: plain Web Components, no Lit, no tslib, no build step.
- **Token compatible**: `--md-sys-color-*` resolve to the MateUI palette (`--mate-*`) and fall back to a built-in M3
  scheme. Material Theme Builder output overrides them (tokens are declared with `:where()` — zero specificity).
- **Dynamic colour built in**: HCT-based tonal / expressive / vibrant schemes from any seed colour (`MateCha`).
- **25+ additional components** that Material Web does not ship (navigation bar/drawer, snackbar, tooltip, card,
  split button, FAB menu, toolbar, swipe item, …).
- Forms (`ElementInternals`), keyboard navigation, focus ring, ARIA and `prefers-reduced-motion` are supported.

## Quick start

```html
<script type="module" src="./matecha-3.0.0-all.js"></script>

<md-filled-button>Save</md-filled-button>
<md-outlined-text-field label="Name" value="Matecha"></md-outlined-text-field>
<md-linear-progress wavy value="0.4"></md-linear-progress>
<md-switch selected></md-switch>
```

### Theming

```js
MateCha.setSeed('#65558F', 'expressive'); // 'tonal' | 'expressive' | 'vibrant'
MateCha.setDark(true);                    // true | false | 'auto'
MateCha.toggleDark();
MateCha.resetTheme();                     // back to built-in / page tokens
MateCha.toast('Saved', { action: 'Undo' }).then(reason => console.log(reason));
```

Or use plain Material tokens — they keep working:

```css
:root { --md-sys-color-primary: #6750a4; }
```

### Options

| Global | Effect |
| --- | --- |
| `window.MATECHA_NO_FONTS = true` | Do not inject Google Fonts links (Material Symbols Rounded, Inter). Set it **before** loading the script. |

## Components

**Compatible with `@material/web` 2.5.0** — `md-ripple`, `md-focus-ring`, `md-elevation`, `md-icon`, `md-divider`,
`md-elevated-button`, `md-filled-button`, `md-filled-tonal-button`, `md-outlined-button`, `md-text-button`,
`md-icon-button`, `md-filled-icon-button`, `md-filled-tonal-icon-button`, `md-outlined-icon-button`, `md-fab`,
`md-branded-fab`, `md-checkbox`, `md-radio`, `md-switch`, `md-slider`, `md-linear-progress`,
`md-circular-progress`, `md-chip-set`, `md-assist-chip`, `md-filter-chip`, `md-input-chip`, `md-suggestion-chip`,
`md-tabs`, `md-primary-tab`, `md-secondary-tab`, `md-list`, `md-list-item`, `md-item`, `md-filled-field`,
`md-outlined-field`, `md-filled-text-field`, `md-outlined-text-field`, `md-filled-select`, `md-outlined-select`,
`md-select-option`, `md-menu`, `md-menu-item`, `md-sub-menu`, `md-dialog`.

**Expressive additions** — `md-connected-button-group`, `md-connected-button`, `md-split-button`,
`md-segmented-button-set`, `md-segmented-button` (+ `md-outlined-*` aliases), `md-fab-menu`, `md-fab-menu-item`,
`md-navigation-bar`, `md-navigation-tab`, `md-navigation-drawer`, `md-navigation-drawer-item`,
`md-navigation-drawer-header`, `md-navigation-drawer-divider`, `md-top-app-bar`, `md-snackbar`, `md-tooltip`,
`md-card`, `md-badge`, `md-avatar`, `md-loading-indicator`, `md-toolbar`, `md-swipe-item`, `md-swipe-action`,
`md-search-bar`.

See [`SPECIFICATION.md`](./SPECIFICATION.md) for the full contract.

## Repository layout

```
matecha-3.1.0-all.js          # complete
SPECIFICATION.md
NOTICE
LICENSE
```

This bundle is no longer supported!

## Differences from `@material/web`

- **Visuals and motion are Expressive**, not baseline M3 (e.g. buttons morph from pill to rounded square on press;
  lists render as grouped cards unless `md-list[flat]`; tabs use a surface-container background).
- **Internals are different** (by design — it is a from-scratch implementation): shadow DOM structure is Matecha's own. Use documented `part` names and `--md-*`
  tokens rather than relying on private internals.
- **Not implemented / out of scope**: Material Web's Lit-specific internals (`ReactiveElement` lifecycle hooks,
  decorators, `mixin-*` helpers) are not exposed.

## Known limitations

- 3.0.0 is a first release. Automated checks currently cover syntax and element registration only; please report
  rendering or behaviour differences found in real browsers.
- Overlay positioning (menu, tooltip) relies on the Popover API when available and falls back to fixed positioning.
- Material Symbols Rounded and Inter are loaded from Google Fonts unless `MATECHA_NO_FONTS` is set.

## Browser support

Evergreen browsers with Custom Elements, Shadow DOM, `ElementInternals`, `adoptedStyleSheets` and CSS
`color-mix()`. Recommended: Chrome/Edge 111+, Safari 16.4+, Firefox 113+.

## Contributing

Issues and pull requests are welcome. Please keep API compatibility with `@material/web` v2.5.0 (tag names,
attributes, events, slots, tokens), do not introduce third-party runtime dependencies, and **do not copy source code from
`@material/web`** — contributions must be original work written against the public API. By contributing you agree
that your contribution is licensed under Apache-2.0.

## License

Apache License 2.0 — see [`LICENSE`](./LICENSE) and [`NOTICE`](./NOTICE).
API compatibility follows Material Web Components © Google LLC (also Apache-2.0).
