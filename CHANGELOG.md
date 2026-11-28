# Changelog

## 3.8.0

### Added
- `md-fab-toolbar` (FAB that expands into a toolbar) and `md-toolbar-fab`; `md-toolbar[distribute]`.
- `md-time-picker` (24 h dial, 12 h + AM/PM, keyboard input, wheel) and `md-date-picker` (calendar, year grid, text input; `Intl` localisation).
- `md-segmented-button-set[variant="outlined"]` (classic Material 3 segmented button).

### Fixed
- `md-menu-item` / `md-select-option`: a leading icon (`slot="start"`) was stacked above the headline instead of sitting beside it (the shared row layout was renamed by mistake).

### Changed
- `md-loading-indicator`: 7 shapes, 667 ms per shape, ~139° rotation per shape with a fast – slow – fast curve and a short spring morph, measured from the Material reference animation.

## 3.7.0

### Added
- Material button sizes XS / S / M / L / XL (32 / 40 / 56 / 96 / 136 dp) for buttons, icon buttons and split buttons.
- `md-toggle-button` (off = pill, on = rounded square; filled / tonal / outlined / elevated).
- `md-outlined-segmented-button(-set)`: classic Material 3 outlined segmented button with check icon.
- `md-bottom-sheet`, `md-carousel` / `md-carousel-item`, `md-bottom-app-bar`, `md-text-field-group`.
- `md-top-app-bar`: `type="search"`, subtitle, centred large / medium titles.
- `md-slider`: `size="xxs"` (4 px) and pixel sizes (`size="56px"`).
- Expressive text fields (16 px shapes, soft outline, no underline).

### Changed
- Press shapes: round buttons become a sharper rounded rectangle, square buttons become rounder.
- Wavy slider: wave thickness equals the normal track thickness (thin and thick tracks).
- `md-navigation-bar[horizontal]` / rail: spring FLIP animation of the pill, tab position and label.

### Fixed
- `md-swipe-action` and `md-switch-bar` press animation looked like frames ("paper theatre"): radius was animated from 999 px.
- Fields reserved space for leading / trailing icons even when none was slotted.

## 3.6.0

### Added
- `md-slider`: `wavy` (animated wavy active track) and `centered` / `origin` (fill from the centre).
- `md-navigation-rail` / `md-navigation-rail-item`: collapsed and expanded vertical navigation with `menu` and `fab` slots and badges.
- `md-list-item` and `md-card`: `swipe-actions` slot (swipe or `tap-toggle`); capsule actions use spring + stagger animation; `md-swipe-action` variants `tertiary` / `error`.
- `md-search-view`: `trigger` (open from any element, expand animation starts from the trigger), `show(fromElement)`.
- `md-search-bar`: `size` (xs–xl) and `bar-height`.
- `md-top-popup`: buttons in the `actions` slot default to the primary colour.

### Fixed
- Vertical `md-slider` could not be dragged with touch (now driven by pointer position).
- `md-fab-menu` blocked touches on the area where its items appear while collapsed.
- `md-dialog[stacked]` buttons are fully rounded pills (were rounded rectangles).
- `md-navigation-bar[horizontal]` places the label inside the pill (HTML "Horizontal Wide Nav Bar"); badges anchor to the icon.
- `md-swipe-item`: tap toggles (as in the HTML); animation moved to a shared controller.

## 3.5.0

### Added
- `md-dialog[stacked]` — full-width stacked action buttons (Android 16 permission dialog); `block` attribute on buttons.
- `md-top-popup` — popup that slides down from the top edge (icon / headline / content / actions, swipe-up dismiss, `duration`, `modal`).
- `md-slider`: thick tracks (`size`, `track-height`, `--md-slider-track-height`), `vertical`, `icon` slot (`icon-position`).
- `md-pull-to-refresh` — pull to refresh with the M3E loading indicator (`expressive`) or the traditional round arc (`classic`).
- `md-switch-bar` — the settings "main switch" pill (e.g. *Use Live Caption*).
- `md-top-app-bar`: `back` (built-in back button, event `back`) and `circle-leading` (circular back button).
- `md-search-view` — docked / fullscreen search screen, user-customisable through slots, attributes and tokens.
- `md-switch`: check icon on the selected handle by default (`no-icons` to hide), ✕ on the unselected handle with `icons`; exact 52×32 geometry.

### Fixed
- `md-radio` froze the page (endless self re-render in `_uncheckOthers`).
- Elevated shadow no longer stays after a long press (hover lift only on hover-capable devices; press state is always released).
- Press feedback now matches the MateUI HTML: no expanding ripple wave (opt-in `<md-ripple wave>`), per-component press effects.

## 3.0.0
- First release: API-compatible, from-scratch Material 3 Expressive implementation of all 44 `@material/web` 2.5.0 elements plus Expressive additions.
