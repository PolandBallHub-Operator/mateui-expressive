# Matecha 🧉 Expressive Web

[![License](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](#license)
[![Version](https://img.shields.io/badge/Version-3.8.0-purple.svg)](#quick-start)
[![Design](https://img.shields.io/badge/Material%203-Expressive-6750A4.svg)](#features)
[![API](https://img.shields.io/badge/API%20compatible-%40material%2Fweb%202.5.0-orange.svg)](#relationship-to-material-web-not-a-fork)
[![Implementation](https://img.shields.io/badge/Implementation-From%20scratch-yellow.svg)](#relationship-to-material-web-not-a-fork)
[![Dependencies](https://img.shields.io/badge/Dependencies-0-brightgreen.svg)](#features)
[![Web Components](https://img.shields.io/badge/Web%20Components-Custom%20Elements-green.svg)](#components)
[![Components](https://img.shields.io/badge/Components-86-blueviolet.svg)](#components)
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
<script type="module" src="./matecha-3.8.0-all.js"></script>
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
- **42 additional components** that Material Web does not ship (navigation bar/drawer, snackbar, tooltip, card,
  split button, FAB menu, toolbar, swipe item, switch bar, top popup, pull-to-refresh, search view, time / date picker,
  FAB toolbar, …).
- Forms (`ElementInternals`), keyboard navigation, focus ring, ARIA and `prefers-reduced-motion` are supported.

## Quick start

```html
<script type="module" src="./matecha-3.8.0-all.js"></script>

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

## What's new in 3.8.0

| Feature | Usage |
| --- | --- |
| FAB toolbar | `<md-fab-toolbar>` — a FAB that expands into a toolbar; `<md-toolbar-fab>` is the FAB used inside a toolbar |
| Distributed toolbar | `<md-toolbar distribute>` — spreads the toolbar's items evenly |
| Time picker | `<md-time-picker>` — 24 h dial, 12 h + AM/PM, keyboard input, mouse wheel |
| Date picker | `<md-date-picker>` — calendar, year grid, text input; localised through `Intl` |
| Classic segmented button | `<md-segmented-button-set variant="outlined">` — classic Material 3 segmented button |
| Loading indicator refined | `md-loading-indicator`: 7 shapes, 667 ms per shape, ~139° rotation per shape with a fast – slow – fast curve and a short spring morph, measured from the Material reference animation |
| Menu / select icon fix | A leading icon (`slot="start"`) in `md-menu-item` / `md-select-option` now sits beside the headline instead of above it |

```html
<md-time-picker></md-time-picker>
<md-date-picker></md-date-picker>

<md-toolbar distribute>…</md-toolbar>

<md-segmented-button-set variant="outlined">
  <md-segmented-button label="Day"></md-segmented-button>
  <md-segmented-button label="Week" selected></md-segmented-button>
  <md-segmented-button label="Month"></md-segmented-button>
</md-segmented-button-set>
```

See [`CHANGELOG.md`](./CHANGELOG.md).

## What's new in 3.7.0

| Feature | Usage |
| --- | --- |
| Material button sizes | `size="xs\|s\|m\|l\|xl"` = 32 / 40 / 56 / 96 / 136 dp on `md-*-button`, `md-*-icon-button`, `md-split-button`, `md-toggle-button` |
| Press shape rules (same for every button) | round (pill) button → pressed = sharper rounded rectangle; square button (`shape="square"`, selected toggle) → pressed = rounder |
| Toggle button | `<md-toggle-button variant="filled\|tonal\|outlined\|elevated" size="m">` — off = pill, on = rounded square |
| Thinner / px sliders | `size="xxs"` (4 px, e.g. players), `size="56px"` or `size="56"`; wave thickness = normal track thickness |
| Outlined segmented button | `<md-outlined-segmented-button-set>` — Material 3 outlined, dividers, check on selected |
| Bottom sheet | `<md-bottom-sheet open>` — modal / `standard`, drag handle, partial / `expanded`, swipe to dismiss |
| Carousel | `<md-carousel variant="multi-browse\|hero\|uncontained\|full-screen">` + `<md-carousel-item>` |
| Bottom app bar | `<md-bottom-app-bar fab-position="end\|center">` (`fixed`, `hide-on-scroll`) |
| Top app bar types | `type="small\|center-aligned\|medium\|large\|search"`, `subtitle`, `centered` (large/medium) |
| Expressive text fields | 16 px shapes, soft outline, no underline; `<md-text-field-group>` stacks fields as one block |
| Smoother "Horizontal Wide" navigation | `md-navigation-bar[horizontal]` / rail: shape + label animate when switching layout |
| "Paper-theatre" press fixed | `md-swipe-action` and `md-switch-bar` now morph smoothly like the md buttons |

## What's new in 3.6.0

| Feature | Usage |
| --- | --- |
| Wavy slider | `<md-slider wavy>` — animated wavy active track (works with `size`, `range`, `vertical`) |
| Centered slider | `<md-slider centered min="-50" max="50">` — fills from the centre (optional `origin`) |
| Vertical slider fixed | `<md-slider vertical>` now drags reliably with touch and mouse |
| Navigation rail | `<md-navigation-rail expanded>` + `<md-navigation-rail-item>` — collapsed (icon pill + label) / expanded (icon + label in the pill), `menu` and `fab` slots, badges |
| Horizontal wide navigation bar | `<md-navigation-bar horizontal>` — labels inside the pill (as in the MateUI HTML) |
| Swipe actions on list items and cards | `<md-list-item>` / `<md-card>` with `<md-swipe-action slot="swipe-actions">` (`tap-toggle`, `swipe-open`); capsule actions animate in like buttons |
| Search view from any element | `<md-search-view trigger="#btn1, #btn2" fullscreen>` or `view.show(buttonElement)` |
| Search bar height | `<md-search-bar size="xs\|s\|m\|l\|xl">`, `bar-height="72"` or `--md-search-bar-container-height` |
| Stacked dialog buttons are pills | `<md-dialog stacked>` (buttons: 48 px high, fully rounded) |
| Top popup actions use the primary colour | any button style placed in the `actions` slot (`--md-top-popup-action-*`) |
| FAB menu no longer blocks touches while collapsed | `<md-fab-menu>` |

## What's new in 3.5.0

| Feature | Usage |
| --- | --- |
| Full-width stacked dialog buttons (Android 16 permission style) | `<md-dialog stacked>` — buttons in the `actions` slot become full-width |
| Top popup (slides down from the top) | `<md-top-popup open>` — `icon` / `headline` / content / `actions` slots, swipe up to dismiss, `duration`, `modal` |
| Switch: ✕ on the unselected handle | `<md-switch icons>` (✓ is shown on the selected handle by default; `no-icons` hides it) |
| Thick slider with adjustable height | `<md-slider size="xs\|s\|m\|l\|xl">`, `track-height="72"` or `--md-slider-track-height`; optional `icon` slot and `icon-position="start\|end"` |
| Vertical slider | `<md-slider vertical style="height:220px">` (also works with `size`, `range`, `labeled`, `ticks`) |
| Pull to refresh | `<md-pull-to-refresh>` (`variant="expressive"` loading indicator, or `variant="classic"` round arc) — listen to `refresh`, call `event.detail.done()` |
| Settings "main switch" pill | `<md-switch-bar label="Use Live Caption" selected>` — same width as `md-list` / `md-card` |
| Circled back button in the top bar | `<md-top-app-bar back circle-leading headline="Live Caption">` (listen to `back`) |
| Search screen (Compose `SearchBar` / `SearchView`) | `<md-search-view anchor="bar-id">` docked, or `fullscreen`; slots `leading-icon`, `trailing-icon`, results, `empty`; tokens `--md-search-view-*` |

```html
<md-dialog stacked open>
  <md-icon slot="icon">photo_library</md-icon>
  <div slot="headline">Allow Gallery to access photos and videos on this device?</div>
  <div slot="actions">
    <md-filled-button dialog-action="limited">Allow limited access</md-filled-button>
    <md-filled-button dialog-action="all">Allow all</md-filled-button>
    <md-filled-button dialog-action="deny">Don't allow</md-filled-button>
  </div>
</md-dialog>

<md-pull-to-refresh style="height:480px" id="feed">…</md-pull-to-refresh>
<script>feed.addEventListener('refresh', e => load().then(e.detail.done));</script>

<md-search-bar id="bar" alignment="start" placeholder="What are you looking for?"></md-search-bar>
<md-search-view anchor="bar" placeholder="What are you looking for?">…results…</md-search-view>
```

See [`CHANGELOG.md`](./CHANGELOG.md).

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
`md-search-bar`, **(3.5.0)** `md-switch-bar`, `md-top-popup`, `md-pull-to-refresh`, `md-search-view`,
**(3.6.0)** `md-navigation-rail`, `md-navigation-rail-item`,
**(3.7.0)** `md-toggle-button`, `md-bottom-sheet`, `md-carousel`, `md-carousel-item`, `md-bottom-app-bar`,
`md-text-field-group`,
**(3.8.0)** `md-fab-toolbar`, `md-toolbar-fab`, `md-time-picker`, `md-date-picker`.

See [`SPECIFICATION.md`](./SPECIFICATION.md) for the full contract.

## Repository layout

```
matecha-3.8.0-all.js          # complete bundle (part1 – part4)
matecha-3_8_0-all_part1.js    # core, primitives, buttons, selection controls, slider
matecha-3_8_0-all_part2.js    # progress … dialog, expressive additions, MateCha global
matecha-3_8_0-all_part3.js    # 3.5–3.6: switch bar, top popup, pull-to-refresh, search view, navigation rail
matecha-3_8_0-all_part4.js    # 3.7–3.8: toggle button, bottom app bar, bottom sheet, carousel, text field group, FAB toolbar, time / date picker
SPECIFICATION.md
CHANGELOG.md
NOTICE
LICENSE
```

Rebuild the bundle:

```sh
cat matecha-3_8_0-all_part1.js matecha-3_8_0-all_part2.js matecha-3_8_0-all_part3.js matecha-3_8_0-all_part4.js > matecha-3.8.0-all.js
```

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
