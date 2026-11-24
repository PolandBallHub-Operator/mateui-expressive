# Matecha 🧉 Expressive Web — Specification

Version: **3.6.0** · Component name: **MateCha** · Baseline: **`@material/web` v2.5.0 (`all.js`)**

Key words **MUST**, **SHOULD** and **MAY** are used as in RFC 2119.

---

## 1. Positioning

Matecha is a **from-scratch, drop-in replacement** for Google's Material Web Components (MWC) that provides
**API compatibility** (same tag names, attributes, properties, methods, events, slots, parts and design tokens) while
being **independently implemented** as dependency-free Web Components. It is not a fork and contains no `@material/web`
source code. Only the public interface is shared.

## 1.1 Goals

1. **Compatibility.** A page that works with `@material/web` v2.5.0 MUST keep working after replacing the import with
   `matecha-3.6.0-all.js`, without markup changes.
2. **Expressive design.** Visuals and motion follow the MateUI HTML reference (Material 3 Expressive). They MUST NOT be
   simplified, and MUST NOT use Tailwind or ad-hoc gradients.
3. **General purpose.** Every component is a reusable, standards-based Web Component. None is tied to a particular page.
4. **Colour compatibility.** `--md-sys-color-*` tokens and Material Theme Builder output keep working.
5. **Release quality.** No minimal-size constraint. Plain Web Components; no Lit, tslib or network imports.

## 2. Packaging

| File | Content |
| --- | --- |
| `matecha-3.6.0-all.js` | Complete bundle (ES module, side-effect import). |
| `matecha-3_6_0-all_part1.js` | Core, primitives, buttons, selection controls, slider. |
| `matecha-3_6_0-all_part2.js` | Progress, chips, tabs, list, fields, menus, dialog, additions, `MateCha` global. |

Loading the module registers every element with `customElements.define` (skipping names already defined) and
defines `window.MateCha` and `window.MateChaComponents`. The bundle has no exports.

## 3. Compatibility contract

For each `@material/web` v2.5.0 element Matecha MUST preserve:

- the **tag name**;
- **attributes and properties** (names, types, defaults, reflection) — including `aria-*` forwarding;
- **public methods** (`focus()`, `blur()`, `click()`, `show()`, `close()`, `select()`, `reportValidity()`, …);
- **events** (`input`, `change`, `open`/`opened`/`close`/`closed`, `cancel`, `remove`, `close-menu`, …), with the same
  bubbling/composition/cancelability;
- **slots** and **`part`** names;
- **form association** (`ElementInternals`, `formResetCallback`, `formStateRestoreCallback`, validity);
- **CSS custom properties** `--md-<component>-*` and `--md-sys-*`.

Matecha is an independent implementation: it MAY (and does) differ in shadow DOM internals and rendering. Consumers SHOULD NOT rely on private structure.

### 3.1 Material Web elements (44)

`md-ripple` · `md-focus-ring` · `md-elevation` · `md-icon` · `md-divider` ·
`md-elevated-button` · `md-filled-button` · `md-filled-tonal-button` · `md-outlined-button` · `md-text-button` ·
`md-icon-button` · `md-filled-icon-button` · `md-filled-tonal-icon-button` · `md-outlined-icon-button` ·
`md-fab` · `md-branded-fab` · `md-checkbox` · `md-radio` · `md-switch` · `md-slider` ·
`md-linear-progress` · `md-circular-progress` ·
`md-chip-set` · `md-assist-chip` · `md-filter-chip` · `md-input-chip` · `md-suggestion-chip` ·
`md-tabs` · `md-primary-tab` · `md-secondary-tab` · `md-list` · `md-list-item` · `md-item` ·
`md-filled-field` · `md-outlined-field` · `md-filled-text-field` · `md-outlined-text-field` ·
`md-filled-select` · `md-outlined-select` · `md-select-option` ·
`md-menu` · `md-menu-item` · `md-sub-menu` · `md-dialog`

### 3.2 Expressive additions (not in Material Web)

| Element | Purpose |
| --- | --- |
| `md-connected-button-group` / `md-connected-button` | Connected buttons; selected item widens and reveals its label. |
| `md-split-button` | Main action + chevron toggling a slotted `md-menu`. |
| `md-segmented-button-set` / `md-segmented-button` | Segmented single/multi choice (`md-outlined-*` aliases). |
| `md-fab-menu` / `md-fab-menu-item` | FAB expanding into staggered action pills. |
| `md-navigation-bar` / `md-navigation-tab` | Bottom/side navigation with pill indicator, badges, horizontal layout. |
| `md-navigation-drawer` (+ `-item`, `-header`, `-divider`) | Modal or standard drawer. |
| `md-top-app-bar` | Small / center-aligned / medium / large app bar. |
| `md-snackbar` | Transient message with queue and promise result. |
| `md-tooltip` | Plain and rich tooltip. |
| `md-card` | Filled / elevated / outlined / tonal card, optionally interactive. |
| `md-badge`, `md-avatar` | Status badge; avatar with tone variants. |
| `md-loading-indicator` | Morphing-shape loader. |
| `md-toolbar` | Floating or standard pill toolbar with optional `fab` slot. |
| `md-swipe-item` / `md-swipe-action` | Swipe-to-reveal row with capsule actions. |
| `md-search-bar` | Pill search field (form-associated). |
| `md-switch-bar` | Full-width settings "main switch" pill (form-associated); same width as `md-list` / `md-card`. |
| `md-top-popup` | Card sliding down from the top edge; slots `icon`, `headline`, content, `actions`; swipe up / auto dismiss. |
| `md-pull-to-refresh` | Pull-down refresh container; `variant="expressive"` (loading indicator) or `"classic"` (round arc). Event `refresh`. |
| `md-navigation-rail` / `md-navigation-rail-item` | Vertical rail; `expanded` toggles collapsed (96 px) / expanded; slots `menu`, `fab`; event `navigation-rail-toggle`. |
| `md-search-view` | Docked or fullscreen search screen (Compose SearchBar/SearchView); `anchor`, slots, `--md-search-view-*` tokens. |

New elements MUST follow the same conventions as compatible ones: `md-` prefix, kebab-case attributes mirrored by
camelCase properties, `part` names, `--md-<component>-*` tokens, and standard DOM events.

### 3.3 Additional attributes on compatible elements

| Element | Attribute | Meaning |
| --- | --- | --- |
| `md-linear-progress`, `md-circular-progress` | `wavy`, `thick` | Wavy path; 6.5 vs 3.5 stroke. |
| `md-list` | `flat` | Classic flat list instead of grouped cards. |
| `md-menu` | `variant="pink"` | Tertiary-container popup menu. |
| `md-dialog` | `fullscreen` | Full-screen slide-up dialog. |
| `md-*-button` | `shape="square"` | Fixed square shape (pressed state morphs back). |
| `md-slider` | `size="xs|s|m|l|xl"`, `track-height` | Active track height 16/24/40/56/96 px or any px value (`--md-slider-track-height`); handle = track + 16 px. |
| `md-slider` | `vertical` | Vertical orientation; give the element a `height`. |
| `md-slider` | `icon` slot, `icon-position="start|end"` | Icon inside the track (hidden when the track is thinner than 32 px). |
| `md-slider` | `wavy`, `centered`, `origin` | Wavy active track (stroke ≤ 20 px, animated); fill from the centre / from `origin`. |
| `md-list-item`, `md-card` | slot `swipe-actions`, `swipe-open`, `tap-toggle` | Swipe-to-reveal actions; events `swipe-open` / `swipe-close`. |
| `md-search-bar` | `size="xs|s|m|l|xl"`, `bar-height` | Height 40 / 48 / 56 / 64 / 72 px or any px value (`--md-search-bar-container-height`). |
| `md-search-view` | `trigger` | CSS selector / element ids that open the view on click; `show(fromElement)`. |
| `md-navigation-bar` | `horizontal` | Wide layout: icon + label inside the pill. |
| `md-dialog` | `stacked` | Full-width stacked action buttons (Android 16 permission dialog). |
| `md-top-app-bar` | `back`, `back-label`, `circle-leading` | Built-in back button (event `back`); circular background behind the leading button. |
| `md-*-button` | `block` | Full width, 48 px high (`--md-block-button-height`). |
| `md-switch` | `no-icons` | Hide the check icon that is shown on the selected handle by default (`icons` still adds the ✕ on the unselected handle). |

## 4. Design language

### 4.1 Motion tokens

```css
--mate-spring-fast:    cubic-bezier(.34, 1.56, .64, 1);
--mate-spring-spatial: cubic-bezier(.28, 1.35, .48, 1);
--mate-ease-decel:     cubic-bezier(.05, .7, .1, 1);
--mate-ease-accel:     cubic-bezier(.3, 0, .8, .15);
```

- **Shape morph on press.** Buttons, icon buttons, FABs, chips, list items, nav pills etc. swap border-radius while the
  pointer/keyboard is held (class `hold`, released after 70 ms). Typical: pill 20 px → 12 px; selected 12 px → 20 px.
  Radius transition `.32s cubic-bezier(.2, 0, 0, 1)`.
- **Spring entrance.** Menus, dialogs, tooltips, snackbar scale/translate in with `--mate-spring-fast` (.3–.38 s).
- **Reduced motion.** `prefers-reduced-motion: reduce` disables transitions/animations where practical and stops wavy
  animation.

### 4.2 Component metrics (reference values)

| Component | Spec |
| --- | --- |
| Button | 40 px high, 14 px/500, radius 20 → 12 pressed. |
| Chip | 32 px high, radius 8 → 16 pressed, 1 px `outline-variant`; selected = `secondary-container`. |
| Switch | 52×32 pill, spring thumb. |
| Slider | Thick track, detached vertical pill handle. |
| Progress | Strokes 3.5 / 6.5; wavy amplitude ≈ 2.4–2.6 (linear), 2.1–2.2 (circular); `phase += .08` per 60 fps frame. |
| Navigation pill | 64×32 (horizontal: auto×40); shrinks to 54 px on press. |
| Menu | Radius 20, 8 px padding, items radius 12, spring scale-in from anchor corner. |
| Dialog | Radius 28, 24 px padding, headline 22 px/500, scrim 52 %. |
| Outlined field | 1 px outline, radius 6, notch label, 2 px primary on focus. |

## 5. Colour system

1. Tokens are injected once as `<style id="matecha-tokens">` at the start of `<head>` using `:where()` (specificity 0),
   so any page, Material Theme Builder, or inline `:root` rule wins.
2. `--md-sys-color-*` roles resolve to the MateUI palette (`--mate-*`) or to built-in fixed values; dark values apply with
   `prefers-color-scheme: dark`, `[data-theme="dark"]`, or `[data-theme="light"]` to force light.
3. Components MUST consume `--md-sys-color-*` (never raw hex) so that all palettes apply.

### 5.1 `MateCha` global

```ts
interface MateCha {
  version: string;
  readonly state: { seed: string; variant: Variant; dark: boolean; custom: boolean };
  schemeFromSeed(seedHex: string, isDark: boolean, variant?: Variant): { hct; effectiveChroma: number; tokens: Record<string,string>; sys: Record<string,string> };
  applyTheme(o?: { seed?: string; variant?: Variant; dark?: boolean | 'auto' }): State;
  setSeed(hex: string, variant?: Variant): State;
  setVariant(v: Variant): State;
  setDark(d: boolean | 'auto'): State;
  toggleDark(): State;
  resetTheme(): void;                     // removes inline tokens and data-theme / data-variant
  toast(message: string, o?: { action?: string; duration?: number; closeButton?: boolean }): Promise<'action'|'dismiss'|'timeout'|'replaced'>;
  hctToHex(h: number, c: number, t: number): string;
  rgbToHct(r: number, g: number, b: number): { hue: number; chroma: number; tone: number };
  hexToRgb(hex: string): { r: number; g: number; b: number };
  rgbToHex(r: number, g: number, b: number): string;
}
type Variant = 'tonal' | 'expressive' | 'vibrant';
```

`applyTheme` sets `data-theme` and `data-variant` on `<html>`, writes `--mate-*` and derived `--md-sys-color-*`
properties inline, and dispatches a bubbling `mate-theme-change` event on `<html>` (`detail: { seed, variant, dark }`).

## 6. Runtime behaviour

- **Reactivity.** Properties and attributes are mirrored; updates are batched in a microtask. Properties assigned before
  upgrade are applied on upgrade.
- **Focus.** Interactive elements use `delegatesFocus` where Material Web does. `md-focus-ring` is visible for keyboard
  modality only.
- **Forms.** Form-associated elements (`formAssociated = true`) implement `form`, `labels`, `validity`,
  `validationMessage`, `willValidate`, `checkValidity()`, `reportValidity()`, `setCustomValidity()`,
  `formResetCallback`, `formStateRestoreCallback`, `formDisabledCallback`.
- **Overlays.** `md-menu`, `md-tooltip` use the Popover API (top layer) when available and `position: fixed`
  otherwise; they reposition on scroll/resize and flip vertically when space is insufficient. `md-dialog` uses the native
  `<dialog>` modal.
- **Keyboard.** Arrow/Home/End navigation in tabs, lists, menus, chip sets, navigation bar, toolbar; `Escape` closes
  menus, dialogs, drawers, tooltips; type-ahead in menus and selects.
- **Accessibility.** Native roles (`tablist`, `menu`, `listbox`, `dialog`/`alertdialog`, `progressbar`, `toolbar`, …) and
  `aria-*` attributes are set on the inner interactive element; host `aria-*` attributes are forwarded.

## 7. Configuration

| Global | Default | Effect |
| --- | --- | --- |
| `window.MATECHA_NO_FONTS` | `undefined` | When truthy, Material Symbols Rounded and Inter are not injected. |

Icon font: `--md-icon-font` (default `"Material Symbols Rounded"`). Typeface tokens: `--md-ref-typeface-plain`,
`--md-ref-typeface-brand`.

## 8. Conformance

An implementation conforms to Matecha 3.0.0 if, for every element in §3.1, it satisfies §3 and, for every element in
§3.2, it provides the documented tag and API. Version numbers follow Semantic Versioning; the compatibility baseline
(`@material/web` 2.5.0) changes only in a MAJOR release.

## 9. Licensing

Apache License 2.0. The public API follows Material Web Components © Google LLC (Apache-2.0); no MWC source code is included.
See `LICENSE` and `NOTICE`.
