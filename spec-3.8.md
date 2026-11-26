# Matecha 🧉 Expressive Web — Component Catalog

Version **3.8.0** · Component name **MateCha** · Baseline `@material/web` 2.5.0

A from-scratch, drop-in replacement for Google's Material Web Components. It brings Jetpack Compose Material 3 and Material 3 Expressive to the web as plain, dependency-free Web Components.

## What is Matecha?

Matecha (component name **MateCha**) is an independent implementation that is API-compatible with Material Web Components v2.5.0: the same tag names, attributes, properties, methods, events, slots, parts and `--md-sys-*` design tokens.

It was written from scratch as plain Web Components, with no Lit, no tslib and no Google source code. Visuals and motion follow Material 3 Expressive: spring motion, shape morphing on press, wavy progress and a detached-handle slider.

If your site already uses `@material/web`, swap the import and your markup keeps working. Matecha is not an official Google product and is not affiliated with Google LLC.

| Material Web elements | Expressive additions | Dependencies | Latest version |
| --- | --- | --- | --- |
| 44 | 25+ | 0 | 3.8.0 |

## Usage

Add one script tag. Loading the module registers every element and defines `window.MateCha`.

```html
<script type="module" src="https://cdn.jsdelivr.net/gh/PolandBallHub-Operator/mateui-expressive@main/matecha-3.8.0_B-all.js"></script>
```

Then use the components like any HTML element.

```html
<md-filled-button>Save</md-filled-button>
<md-outlined-text-field label="Name" value="Matecha"></md-outlined-text-field>
<md-linear-progress wavy value="0.4"></md-linear-progress>
<md-switch selected></md-switch>
```

> JavaScript files from **3.1.0 onward will never be removed**. Version 3.0.0 was removed because of a buffer overflow issue.

Theming uses the `MateCha` global, and plain Material tokens keep working.

```js
MateCha.setSeed('#65558F', 'expressive'); // 'tonal' | 'expressive' | 'vibrant'
MateCha.setDark(true);                    // true | false | 'auto'
MateCha.toast('Saved', { action: 'Undo' });

:root { --md-sys-color-primary: #6750a4; }
```

## What's new in 3.8.0

- [FAB toolbar](#fab-toolbar): a FAB that expands into a toolbar of actions (`md-fab-toolbar`)
- [Time picker](#time-picker): dial, keyboard and wheel input, 12 or 24 hour (`md-time-picker`)
- [Date picker](#date-picker): calendar and text input, localised through Intl (`md-date-picker`)
- [Toolbars](#toolbars): the `md-toolbar-fab` pill FAB between icons, and `distribute` for even spacing
- [Segmented buttons](#segmented-buttons): `variant="outlined"` on the set
- [Loading indicator](#loading-indicator): motion re-timed from the Material reference animation

## Contents

- **Actions**
  - [Buttons](#buttons)
  - [Connected button group](#connected-button-group)
  - [Split button](#split-button)
  - [Icon buttons](#icon-buttons)
  - [Floating action buttons](#floating-action-buttons)
  - [FAB menu](#fab-menu)
  - [FAB toolbar](#fab-toolbar)
  - [Toggle button](#toggle-button)
  - [Swipe to reveal](#swipe-to-reveal)
- **Communication**
  - [Badges](#badges)
  - [Dialogs](#dialogs)
  - [Loading indicator](#loading-indicator)
  - [Progress indicators](#progress-indicators)
  - [Pull to refresh](#pull-to-refresh)
  - [Snackbar](#snackbar)
  - [Tooltips](#tooltips)
  - [Top popup](#top-popup)
- **Containment**
  - [App bars](#app-bars)
  - [Avatars](#avatars)
  - [Cards](#cards)
  - [Divider](#divider)
  - [Lists](#lists)
  - [Menus](#menus)
  - [Bottom sheets](#bottom-sheets)
  - [Carousel](#carousel)
  - [Bottom app bar](#bottom-app-bar)
  - [Toolbars](#toolbars)
  - [Item](#item)
- **Navigation**
  - [Navigation bar](#navigation-bar)
  - [Navigation drawer](#navigation-drawer)
  - [Navigation rail](#navigation-rail)
  - [Tabs](#tabs)
- **Selection**
  - [Segmented buttons](#segmented-buttons)
  - [Checkbox](#checkbox)
  - [Chips](#chips)
  - [Radio](#radio)
  - [Sliders](#sliders)
  - [Switch](#switch)
  - [Switch bar](#switch-bar)
  - [Date picker](#date-picker)
  - [Time picker](#time-picker)
- **Text inputs**
  - [Text field group](#text-field-group)
  - [Search](#search)
  - [Select](#select)
  - [Text fields](#text-fields)
- **Foundations**
  - [Icons](#icons)
  - [Ripple, focus ring, elevation](#ripple-focus-ring-elevation)
- **Guides**
  - [Theming](#theming)
  - [Design language](#design-language)
  - [Forms and behaviour](#forms-and-behaviour)
  - [Migration and configuration](#migration-and-configuration)
  - [Element index](#element-index)

---

# Actions

## Buttons

Five button types, with icons, square shape and full-width block. Shapes morph on press.

Elements: `<md-elevated-button>` `<md-filled-button>` `<md-filled-tonal-button>` `<md-outlined-button>` `<md-text-button>`

### Types

```html
<md-elevated-button>Elevated</md-elevated-button>
<md-filled-button>Filled</md-filled-button>
<md-filled-tonal-button>Tonal</md-filled-tonal-button>
<md-outlined-button>Outlined</md-outlined-button>
<md-text-button>Text</md-text-button>
```

### Icon and disabled

```html
<md-filled-button>
  <md-icon slot="icon">add</md-icon>
  Add
</md-filled-button>
<md-outlined-button disabled>Disabled</md-outlined-button>
```

### shape="square"

```html
<md-filled-button shape="square">Square</md-filled-button>
<md-filled-tonal-button shape="square">Square</md-filled-tonal-button>
<md-outlined-button shape="square">Square</md-outlined-button>
```

### block (3.5.0)

```html
<md-filled-button block style="width:100%">Full width</md-filled-button>
<md-outlined-button block style="width:100%">Full width</md-outlined-button>
```

### Sizes xs to xl (3.7.0)

```html
<md-filled-button size="xs">XS</md-filled-button>
<md-filled-button size="s">S</md-filled-button>
<md-filled-button size="m">M</md-filled-button>
<md-filled-button size="l">L</md-filled-button>
<md-filled-button size="xl">XL</md-filled-button>
```

### API notes

`size` sets the height to 32 / 40 / 56 / 96 / 136 dp for every button, icon button and split button; padding, icon and label scale with it. `block` makes a button full width and 48 px high (`--md-block-button-height`). It is set automatically inside a `stacked` dialog.

## Connected button group

Connected buttons: the selected item widens and reveals its label.

Elements: `<md-connected-button-group>` `<md-connected-button>`

### Group

```html
<md-connected-button-group>
  <md-connected-button selected>Day</md-connected-button>
  <md-connected-button>Week</md-connected-button>
  <md-connected-button>Month</md-connected-button>
</md-connected-button-group>
```

## Split button

A main action plus a chevron that toggles a slotted menu.

Elements: `<md-menu-item>` `<md-split-button>`

### Split button

```html
<md-split-button>
  <md-menu slot="menu">
    <md-menu-item>
      <div slot="headline">Save as draft</div>
    </md-menu-item>
    <md-menu-item>
      <div slot="headline">Schedule</div>
    </md-menu-item>
  </md-menu>
  Publish
</md-split-button>
```

### Sizes (3.7.0)

```html
<md-split-button size="xs">XS</md-split-button>
<md-split-button size="s">S</md-split-button>
<md-split-button size="m">M</md-split-button>
```

### API notes

`size` works on split buttons too (3.7.0).

## Icon buttons

Standard, filled, tonal and outlined icon buttons, plus toggle.

Elements: `<md-icon-button>` `<md-filled-icon-button>` `<md-filled-tonal-icon-button>` `<md-outlined-icon-button>`

### Variants

```html
<md-icon-button>
  <md-icon>favorite</md-icon>
</md-icon-button>
<md-filled-icon-button>
  <md-icon>favorite</md-icon>
</md-filled-icon-button>
<md-filled-tonal-icon-button>
  <md-icon>favorite</md-icon>
</md-filled-tonal-icon-button>
<md-outlined-icon-button>
  <md-icon>favorite</md-icon>
</md-outlined-icon-button>
<md-icon-button toggle>
  <md-icon>star</md-icon>
  <md-icon slot="selected">star</md-icon>
</md-icon-button>
```

### Sizes xs to xl (3.7.0)

```html
<md-filled-tonal-icon-button size="xs">
  <md-icon>favorite</md-icon>
</md-filled-tonal-icon-button>
<md-filled-tonal-icon-button size="s">
  <md-icon>favorite</md-icon>
</md-filled-tonal-icon-button>
<md-filled-tonal-icon-button size="m">
  <md-icon>favorite</md-icon>
</md-filled-tonal-icon-button>
<md-filled-tonal-icon-button size="l">
  <md-icon>favorite</md-icon>
</md-filled-tonal-icon-button>
<md-filled-tonal-icon-button size="xl">
  <md-icon>favorite</md-icon>
</md-filled-tonal-icon-button>
```

## Floating action buttons

FAB, small FAB, extended FAB and branded FAB.

Elements: `<md-fab>` `<md-branded-fab>`

### FABs

```html
<md-fab aria-label="Edit">
  <md-icon slot="icon">edit</md-icon>
</md-fab>
<md-fab size="small" aria-label="Edit">
  <md-icon slot="icon">edit</md-icon>
</md-fab>
<md-fab label="Compose">
  <md-icon slot="icon">edit</md-icon>
</md-fab>
<md-branded-fab aria-label="Brand">
  <md-icon slot="icon">palette</md-icon>
</md-branded-fab>
```

### Sizes

```html
<md-fab size="small" aria-label="Small">
  <md-icon slot="icon">add</md-icon>
</md-fab>
<md-fab size="medium" aria-label="Medium">
  <md-icon slot="icon">add</md-icon>
</md-fab>
<md-fab size="large" aria-label="Large">
  <md-icon slot="icon">add</md-icon>
</md-fab>
<md-branded-fab size="large" aria-label="Large brand">
  <md-icon slot="icon">palette</md-icon>
</md-branded-fab>
```

### API notes

`size`: small · medium (default) · large. Add `label` for an extended FAB.

## FAB menu

A FAB that expands into staggered action pills.

Elements: `<md-fab-menu>` `<md-fab-menu-item>`

### FAB menu

```html
<md-fab-menu>
  <md-fab-menu-item label="Photo">
    <md-icon slot="icon">image</md-icon>
  </md-fab-menu-item>
  <md-fab-menu-item label="Note">
    <md-icon slot="icon">note</md-icon>
  </md-fab-menu-item>
</md-fab-menu>
```

## FAB toolbar

A FAB that expands into a toolbar of actions, upwards or sideways. New in 3.8.0.

Elements: `<md-fab-toolbar>`

### Vertical (opens upwards)

```html
<div style="width:100%;height:320px;display:flex;align-items:flex-end;justify-content:center">
  <md-fab-toolbar>
    <md-fab slot="fab" variant="tertiary" aria-label="Add">
      <md-icon slot="icon">add</md-icon>
    </md-fab>
    <md-icon-button aria-label="Edit">
      <md-icon>edit</md-icon>
    </md-icon-button>
    <md-icon-button aria-label="Share">
      <md-icon>share</md-icon>
    </md-icon-button>
    <md-icon-button aria-label="Delete">
      <md-icon>delete</md-icon>
    </md-icon-button>
  </md-fab-toolbar>
</div>
```

### Horizontal

```html
<div style="width:100%;display:flex;justify-content:flex-end">
  <md-fab-toolbar horizontal>
    <md-fab slot="fab" variant="tertiary" aria-label="Add">
      <md-icon slot="icon">add</md-icon>
    </md-fab>
    <md-icon-button aria-label="Edit">
      <md-icon>edit</md-icon>
    </md-icon-button>
    <md-icon-button aria-label="Share">
      <md-icon>share</md-icon>
    </md-icon-button>
    <md-icon-button aria-label="Delete">
      <md-icon>delete</md-icon>
    </md-icon-button>
  </md-fab-toolbar>
</div>
```

### Variants with auto-close

```html
<div style="width:100%;height:320px;display:flex;align-items:flex-end;justify-content:space-around">
  <md-fab-toolbar auto-close>
    <md-fab slot="fab" variant="tertiary" aria-label="Add">
      <md-icon slot="icon">add</md-icon>
    </md-fab>
    <md-icon-button aria-label="Edit">
      <md-icon>edit</md-icon>
    </md-icon-button>
    <md-icon-button aria-label="Share">
      <md-icon>share</md-icon>
    </md-icon-button>
    <md-icon-button aria-label="Delete">
      <md-icon>delete</md-icon>
    </md-icon-button>
  </md-fab-toolbar>
  <md-fab-toolbar auto-close variant="tonal">
    <md-fab slot="fab" variant="tertiary" aria-label="Add">
      <md-icon slot="icon">add</md-icon>
    </md-fab>
    <md-icon-button aria-label="Edit">
      <md-icon>edit</md-icon>
    </md-icon-button>
    <md-icon-button aria-label="Share">
      <md-icon>share</md-icon>
    </md-icon-button>
    <md-icon-button aria-label="Delete">
      <md-icon>delete</md-icon>
    </md-icon-button>
  </md-fab-toolbar>
  <md-fab-toolbar auto-close variant="filled">
    <md-fab slot="fab" variant="tertiary" aria-label="Add">
      <md-icon slot="icon">add</md-icon>
    </md-fab>
    <md-icon-button aria-label="Edit">
      <md-icon>edit</md-icon>
    </md-icon-button>
    <md-icon-button aria-label="Share">
      <md-icon>share</md-icon>
    </md-icon-button>
    <md-icon-button aria-label="Delete">
      <md-icon>delete</md-icon>
    </md-icon-button>
  </md-fab-toolbar>
</div>
```

### Open from code

```html
<div style="width:100%;height:320px;display:flex;align-items:flex-end;justify-content:space-between">
  <md-outlined-button onclick="ft1.show()">Show toolbar</md-outlined-button>
  <md-fab-toolbar id="ft1">
    <md-fab slot="fab" variant="tertiary" aria-label="Add">
      <md-icon slot="icon">add</md-icon>
    </md-fab>
    <md-icon-button aria-label="Edit">
      <md-icon>edit</md-icon>
    </md-icon-button>
    <md-icon-button aria-label="Share">
      <md-icon>share</md-icon>
    </md-icon-button>
    <md-icon-button aria-label="Delete">
      <md-icon>delete</md-icon>
    </md-icon-button>
  </md-fab-toolbar>
</div>
```

### API notes

`variant`: vibrant (default) · tonal · filled. `horizontal` opens the toolbar to the side instead of upwards. `expanded` opens it; `auto-close` closes it again after an action is chosen. Slots: `fab` (the FAB) and the default slot (actions). Methods: `toggle()`, `show()`, `close()`. Events: cancelable `toggle` with `detail.expanded`, and `expanded-change`. A click on the FAB toggles it, and Escape or a press outside closes it. Tokens: `--md-fab-toolbar-container-color`, `--md-fab-toolbar-icon-color`.

## Toggle button

Off is a pill, on is a rounded square. Pressing morphs the shape. New in 3.7.0.

Elements: `<md-toggle-button>`

### Variants

```html
<md-toggle-button variant="filled">Off</md-toggle-button>
<md-toggle-button variant="filled" selected>On</md-toggle-button>
<md-toggle-button variant="tonal">Off</md-toggle-button>
<md-toggle-button variant="tonal" selected>On</md-toggle-button>
<md-toggle-button variant="outlined">Off</md-toggle-button>
<md-toggle-button variant="outlined" selected>On</md-toggle-button>
<md-toggle-button variant="elevated">Off</md-toggle-button>
<md-toggle-button variant="elevated" selected>On</md-toggle-button>
```

### Sizes xs to xl

```html
<md-toggle-button size="xs">XS</md-toggle-button>
<md-toggle-button size="s">S</md-toggle-button>
<md-toggle-button size="m">M</md-toggle-button>
<md-toggle-button size="l">L</md-toggle-button>
<md-toggle-button size="xl">XL</md-toggle-button>
```

### API notes

`variant`: filled · tonal · outlined · elevated. `size`: xs · s · m · l · xl. Use `selected` for the on state.

## Swipe to reveal

A row that reveals capsule actions on swipe.

Elements: `<md-swipe-item>`

### Swipe item

```html
<md-swipe-item style="width:100%">
  <div style="padding:18px">Swipe left</div>
  <md-swipe-action slot="actions" label="Delete">
    <md-icon>delete</md-icon>
  </md-swipe-action>
  <md-swipe-action slot="actions" label="Archive">
    <md-icon>archive</md-icon>
  </md-swipe-action>
</md-swipe-item>
```

### Action variants (3.6.0)

```html
<md-swipe-item style="width:100%">
  <div style="padding:18px">Swipe left</div>
  <md-swipe-action slot="actions" label="Pin">
    <md-icon>push_pin</md-icon>
  </md-swipe-action>
  <md-swipe-action slot="actions" label="Move" variant="tertiary">
    <md-icon>drive_file_move</md-icon>
  </md-swipe-action>
  <md-swipe-action slot="actions" label="Delete" variant="error">
    <md-icon>delete</md-icon>
  </md-swipe-action>
</md-swipe-item>
```

### API notes

Actions go in the `actions` slot. `no-tap-toggle` disables tap-to-open. `md-swipe-action` supports `variant="tertiary"` and `variant="error"` (3.6.0). In 3.6.0 the animation moved to a shared controller and a tap toggles the row.

---

# Communication

## Badges

Small status badges, with or without a value.

Elements: `<md-badge>`

### Badge

```html
<md-badge value="3"></md-badge>
<md-badge value="99+"></md-badge>
<md-badge></md-badge>
```

## Dialogs

Basic, fullscreen and stacked dialogs built on the native dialog element.

Elements: `<md-dialog>`

### Basic

```html
<md-filled-button onclick="dl1.show()">Open dialog</md-filled-button>
<md-dialog id="dl1">
  <div slot="headline">Discard draft?</div>
  <form slot="content" method="dialog">Your changes will be lost.</form>
  <div slot="actions">
    <md-text-button onclick="dl1.close()">Cancel</md-text-button>
    <md-text-button onclick="dl1.close()">Discard</md-text-button>
  </div>
</md-dialog>
```

### Fullscreen

```html
<md-outlined-button onclick="dl2.show()">Open fullscreen</md-outlined-button>
<md-dialog id="dl2" fullscreen>
  <div slot="headline">Fullscreen</div>
  <div slot="content">A full-screen slide-up dialog.</div>
  <div slot="actions">
    <md-text-button onclick="dl2.close()">Close</md-text-button>
  </div>
</md-dialog>
```

### Stacked (3.5.0)

```html
<md-outlined-button onclick="dl3.show()">Open stacked</md-outlined-button>
<md-dialog id="dl3" stacked>
  <div slot="headline">Stacked</div>
  <div slot="content">Vertical full-width actions.</div>
  <div slot="actions">
    <md-filled-button onclick="dl3.close()">Confirm</md-filled-button>
    <md-text-button onclick="dl3.close()">Cancel</md-text-button>
  </div>
</md-dialog>
```

### API notes

Also: `type` (alert for an alertdialog), `quick`, `no-focus-trap`, `return-value`; any element with `dialog-action` closes it. `stacked` centres the headline, sets the panel to `--md-dialog-container-width` and gives slotted buttons the `block` attribute.

## Loading indicator

A morphing-shape loader. The motion follows the Material reference animation since 3.8.0.

Elements: `<md-loading-indicator>`

### Loading indicator

```html
<md-loading-indicator></md-loading-indicator>
```

### Contained and sized

```html
<md-loading-indicator contained></md-loading-indicator>
<md-loading-indicator style="--md-loading-indicator-size:72px"></md-loading-indicator>
<md-loading-indicator contained style="--md-loading-indicator-size:96px"></md-loading-indicator>
```

### API notes

3.8.0 re-times the loader from the Material reference video: it cycles through 7 shapes, spends 667 ms on each (a 4.67 s loop), turns about 139° per shape, and morphs with a quick spring that slightly overshoots. `contained` adds a rounded container, and `--md-loading-indicator-size` sets the size (default 48 px).

## Progress indicators

Linear and circular, determinate or indeterminate, with wavy and thick options.

Elements: `<md-linear-progress>` `<md-circular-progress>`

### Linear

```html
<md-linear-progress value="0.6" class="sw"></md-linear-progress>
<md-linear-progress indeterminate class="sw"></md-linear-progress>
<md-linear-progress wavy thick value="0.5" class="sw"></md-linear-progress>
```

### Circular

```html
<md-circular-progress value="0.6"></md-circular-progress>
<md-circular-progress indeterminate></md-circular-progress>
<md-circular-progress wavy thick value="0.7"></md-circular-progress>
```

### API notes

`wavy` draws a wavy path; `thick` uses a 6.5 stroke instead of 3.5. Wavy animation stops under `prefers-reduced-motion`.

## Pull to refresh

Wrap scrollable content; drag down at the top to refresh. New in 3.5.0.

Elements: `<md-pull-to-refresh>`

### Expressive and classic

```html
<md-pull-to-refresh style="height:240px;width:100%" onrefresh="setTimeout(()=>
  this.done(),1500)">
  <md-list flat>
    <md-list-item>
      <div slot="headline">Drag down with touch or mouse</div>
    </md-list-item>
    <md-list-item>
      <div slot="headline">Item 2</div>
    </md-list-item>
    <md-list-item>
      <div slot="headline">Item 3</div>
    </md-list-item>
  </md-list>
</md-pull-to-refresh>
<md-pull-to-refresh variant="classic" style="height:240px;width:100%" onrefresh="setTimeout(()=>
  this.done(),1500)">
  <md-list flat>
    <md-list-item>
      <div slot="headline">classic variant</div>
    </md-list-item>
    <md-list-item>
      <div slot="headline">Item 2</div>
    </md-list-item>
  </md-list>
</md-pull-to-refresh>
```

### API notes

Attributes: `refreshing`, `disabled`, `threshold` (72 px), `variant` (`expressive` | `classic`). Methods: `refresh()`, `done()`. Events: `pull-ready`, cancelable `refresh` with `detail.done()`.

## Snackbar

Transient messages with a queue and a promise result.

Elements: `<md-snackbar>`

### MateCha.toast()

```html
<md-filled-button onclick="MateCha.toast('Saved',{action:'Undo',closeButton:true}).then(r=>console.log(r))">Show snackbar</md-filled-button>
```

### md-snackbar element

```html
<md-filled-button onclick="sn1.open=true">Show</md-filled-button>
<md-snackbar id="sn1" message="Message archived" action-label="Undo" close-button></md-snackbar>
```

### API notes

`md-snackbar` attributes: `open`, `message`, `action-label`, `close-button`, `duration` (4000 ms), `quick`; slots `heading`, `action` and the default slot. Several snackbars queue. The promise from MateCha.toast resolves to `action`, `dismiss`, `timeout` or `replaced`.

## Tooltips

Plain and rich tooltips attached with the for attribute.

Elements: `<md-tooltip>`

### Plain

```html
<md-icon-button id="tt">
  <md-icon>info</md-icon>
</md-icon-button>
<md-tooltip for="tt">Plain tooltip</md-tooltip>
```

### Rich

```html
<md-icon-button id="tt2">
  <md-icon>help</md-icon>
</md-icon-button>
<md-tooltip for="tt2" variant="rich" heading="Rich tooltip">Supporting text goes here.</md-tooltip>
```

### API notes

`for` is the id of the anchor. Also: `variant` (plain | rich), `trigger`, `placement`, `delay` (500 ms), `open`, `heading`.

## Top popup

A card that slides down from the top edge. Swipe up to dismiss. New in 3.5.0.

Elements: `<md-top-popup>`

### Top popup

```html
<md-filled-tonal-button onclick="tp.show()">Show top popup</md-filled-tonal-button>
<md-top-popup id="tp" duration="5000">
  <md-icon slot="icon">fullscreen</md-icon>
  <div slot="headline">Viewing full screen</div>
  Swipe up to exit.
  <div slot="actions">
    <md-text-button dialog-action="ok">Got it</md-text-button>
  </div>
</md-top-popup>
```

### API notes

Attributes: `open`, `modal`, `quick`, `no-swipe-dismiss`, `duration` (0 = no auto-dismiss), `return-value`. Methods: `show()`, `close()`, `toggle()`. Events: `open`, `opened`, `close`, `closed`, cancelable `cancel`. Buttons in the `actions` slot default to the primary colour (3.6.0).

---

# Containment

## App bars

Top app bars in small, center-aligned, medium and large sizes, with a built-in circled back button.

Elements: `<md-top-app-bar>`

### Small and center-aligned

```html
<md-top-app-bar style="width:100%" headline="Small">
  <md-icon-button slot="leading">
    <md-icon>menu</md-icon>
  </md-icon-button>
</md-top-app-bar>
<md-top-app-bar style="width:100%" type="center-aligned" headline="Center"></md-top-app-bar>
```

### Medium

```html
<md-top-app-bar style="width:100%" type="medium" headline="Medium"></md-top-app-bar>
<md-top-app-bar style="width:100%" type="large" headline="Large"></md-top-app-bar>
```

### Back button and circle leading (3.5.0)

```html
<md-top-app-bar style="width:100%" headline="Settings" back></md-top-app-bar>
<md-top-app-bar style="width:100%" headline="Profile" circle-leading>
  <md-icon-button slot="leading">
    <md-icon>menu</md-icon>
  </md-icon-button>
</md-top-app-bar>
```

### Search, subtitle, centered (3.7.0)

```html
<md-top-app-bar style="width:100%" type="search" search-placeholder="Search mail">
  <md-icon-button slot="leading">
    <md-icon>menu</md-icon>
  </md-icon-button>
</md-top-app-bar>
<md-top-app-bar style="width:100%" headline="Inbox" subtitle="12 unread"></md-top-app-bar>
<md-top-app-bar style="width:100%" type="large" centered headline="Large centered"></md-top-app-bar>
```

### API notes

`type`: small · center-aligned · medium · large · search. `subtitle`, `centered` and `search-placeholder` are new in 3.7.0. `back`, `back-label` (default “Back”) and `circle-leading` were added in 3.5.0. The `back` event bubbles, is composed and is cancelable. Tokens: `--md-top-app-bar-leading-size`, `-leading-container-color`, `-leading-icon-color`.

## Avatars

Avatars with initials or icons and four tones.

Elements: `<md-avatar>`

### Tones

```html
<md-avatar>AB</md-avatar>
<md-avatar tone="lavender">CD</md-avatar>
<md-avatar tone="pink">EF</md-avatar>
<md-avatar tone="soft">
  <md-icon>person</md-icon>
</md-avatar>
```

### API notes

`tone`: purple (default) · lavender · pink · soft. `src` and `alt` show an image.

## Cards

Filled, elevated, outlined and tonal cards, optionally interactive.

Elements: `<md-card>` `<md-swipe-action>`

### Variants

```html
<md-card variant="filled" style="padding:16px;width:180px">Filled</md-card>
<md-card variant="elevated" style="padding:16px;width:180px">Elevated</md-card>
<md-card variant="outlined" style="padding:16px;width:180px">Outlined</md-card>
<md-card variant="tonal" interactive style="padding:16px;width:180px">Tonal, interactive</md-card>
```

### Swipe actions (3.6.0)

```html
<md-card tap-toggle style="padding:16px;width:260px">
  Tap or swipe
  <md-swipe-action slot="swipe-actions" label="Delete" variant="error">
    <md-icon>delete</md-icon>
  </md-swipe-action>
</md-card>
```

## Divider

A thin line that separates content.

Elements: `<md-divider>`

### Divider

```html
<div style="width:100%">
  <p>Above</p>
  <md-divider></md-divider>
  <p>Below</p>
</div>
```

## Lists

Grouped cards by default; add flat for a classic list.

Elements: `<md-list>` `<md-list-item>`

### Grouped

```html
<md-list style="width:100%">
  <md-list-item>
    <md-icon slot="start">person</md-icon>
    <div slot="headline">Contacts</div>
    <div slot="supporting-text">12 people</div>
  </md-list-item>
  <md-list-item>
    <md-icon slot="start">folder</md-icon>
    <div slot="headline">Files</div>
    <div slot="supporting-text">340 items</div>
  </md-list-item>
  <md-list-item type="button">
    <md-icon slot="start">settings</md-icon>
    <div slot="headline">Settings</div>
    <md-icon slot="actions">chevron_right</md-icon>
  </md-list-item>
</md-list>
```

### Flat

```html
<md-list flat style="width:100%">
  <md-list-item>
    <div slot="headline">Flat A</div>
  </md-list-item>
  <md-divider></md-divider>
  <md-list-item>
    <div slot="headline">Flat B</div>
  </md-list-item>
</md-list>
```

### Swipe actions (3.6.0)

```html
<md-list style="width:100%">
  <md-list-item tap-toggle>
    <div slot="headline">Tap or swipe me</div>
    <div slot="supporting-text">Reveals actions</div>
    <md-swipe-action slot="swipe-actions" label="Archive" variant="tertiary">
      <md-icon>archive</md-icon>
    </md-swipe-action>
    <md-swipe-action slot="swipe-actions" label="Delete" variant="error">
      <md-icon>delete</md-icon>
    </md-swipe-action>
  </md-list-item>
  <md-list-item>
    <div slot="headline">Plain item</div>
  </md-list-item>
</md-list>
```

### API notes

The `swipe-actions` slot (3.6.0) reveals capsule actions with a spring and stagger animation. `tap-toggle` lets a tap open them. Events: `swipe-open`, `swipe-close`.

## Menus

Menus with sub-menus and a tertiary “pink” variant.

Elements: `<md-menu>` `<md-sub-menu>`

### Menu

```html
<md-filled-button id="m1" onclick="menu1.open=!menu1.open">Menu</md-filled-button>
<md-menu id="menu1" anchor="m1">
  <md-menu-item>
    <div slot="headline">Cut</div>
  </md-menu-item>
  <md-menu-item>
    <div slot="headline">Copy</div>
  </md-menu-item>
  <md-sub-menu>
    <md-menu-item slot="item">
      <div slot="headline">More</div>
    </md-menu-item>
    <md-menu slot="menu">
      <md-menu-item>
        <div slot="headline">Sub A</div>
      </md-menu-item>
    </md-menu>
  </md-sub-menu>
</md-menu>
```

### variant="pink"

```html
<md-filled-tonal-button id="m2" onclick="menu2.open=!menu2.open">Pink menu</md-filled-tonal-button>
<md-menu id="menu2" anchor="m2" variant="pink">
  <md-menu-item>
    <div slot="headline">Share</div>
  </md-menu-item>
  <md-menu-item>
    <div slot="headline">Rename</div>
  </md-menu-item>
</md-menu>
```

### API notes

`anchor` is the id of the anchor element. Also: `open`, `positioning` (popover by default), `anchor-corner` (end-start), `menu-corner` (start-start), `x-offset`, `y-offset`, `quick`, `stay-open-on-outside-click`, `stay-open-on-focusout`, `skip-restore-focus`, `default-focus` (first-item), `typeahead-delay` (200 ms), `match-anchor-width`, `clamp-width`. Menus are positioned in the top layer and flip when space is short.

## Bottom sheets

Modal or standard sheets with a drag handle and partial or expanded heights. New in 3.7.0.

Elements: `<md-bottom-sheet>`

### Modal

```html
<md-filled-button onclick="bs1.show()">Open modal sheet</md-filled-button>
<md-bottom-sheet id="bs1">
  <div style="padding:0 24px 24px">
    <h3 style="margin:0 0 8px;font-weight:500">Share</h3>
    <md-list flat>
      <md-list-item>
        <md-icon slot="start">link</md-icon>
        <div slot="headline">Copy link</div>
      </md-list-item>
      <md-list-item>
        <md-icon slot="start">mail</md-icon>
        <div slot="headline">Email</div>
      </md-list-item>
    </md-list>
    <md-text-button dialog-action="close">Close</md-text-button>
  </div>
</md-bottom-sheet>
```

### Standard (no scrim)

```html
<md-outlined-button onclick="bs2.toggle()">Toggle standard sheet</md-outlined-button>
<md-bottom-sheet id="bs2" standard>
  <div style="padding:0 24px 24px">Drag the handle up to expand, down to collapse or dismiss.</div>
</md-bottom-sheet>
```

### API notes

Attributes: `open`, `standard`, `expanded`, `no-drag-handle`, `quick`. Methods: `show()`, `close()`, `toggle()`. Events: `open`, `opened`, `close`, `closed`, `cancel`, `expand`, `collapse`. Any element with `dialog-action` closes the sheet. Tokens: `--md-bottom-sheet-container-color`, `-container-shape`, `-partial-height`, `-expanded-gap`, `-max-width`.

## Carousel

Drag or swipe through items. Four layouts. New in 3.7.0.

Elements: `<md-carousel>` `<md-carousel-item>`

### Multi-browse (default)

```html
<md-carousel variant="multi-browse" style="width:100%;height:200px">
  <md-carousel-item label="Item 1">
    <div style="background:var(--md-sys-color-primary-container);color:var(--md-sys-color-on-primary-container);display:grid;place-items:center;font-size:28px">1</div>
  </md-carousel-item>
  <md-carousel-item label="Item 2">
    <div style="background:var(--md-sys-color-secondary-container);color:var(--md-sys-color-on-secondary-container);display:grid;place-items:center;font-size:28px">2</div>
  </md-carousel-item>
  <md-carousel-item label="Item 3">
    <div style="background:var(--md-sys-color-tertiary-container);color:var(--md-sys-color-on-tertiary-container);display:grid;place-items:center;font-size:28px">3</div>
  </md-carousel-item>
  <md-carousel-item label="Item 4">
    <div style="background:var(--md-sys-color-primary-container);color:var(--md-sys-color-on-primary-container);display:grid;place-items:center;font-size:28px">4</div>
  </md-carousel-item>
  <md-carousel-item label="Item 5">
    <div style="background:var(--md-sys-color-secondary-container);color:var(--md-sys-color-on-secondary-container);display:grid;place-items:center;font-size:28px">5</div>
  </md-carousel-item>
</md-carousel>
```

### Hero

```html
<md-carousel variant="hero" style="width:100%;height:200px">
  <md-carousel-item label="Item 1">
    <div style="background:var(--md-sys-color-primary-container);color:var(--md-sys-color-on-primary-container);display:grid;place-items:center;font-size:28px">1</div>
  </md-carousel-item>
  <md-carousel-item label="Item 2">
    <div style="background:var(--md-sys-color-secondary-container);color:var(--md-sys-color-on-secondary-container);display:grid;place-items:center;font-size:28px">2</div>
  </md-carousel-item>
  <md-carousel-item label="Item 3">
    <div style="background:var(--md-sys-color-tertiary-container);color:var(--md-sys-color-on-tertiary-container);display:grid;place-items:center;font-size:28px">3</div>
  </md-carousel-item>
  <md-carousel-item label="Item 4">
    <div style="background:var(--md-sys-color-primary-container);color:var(--md-sys-color-on-primary-container);display:grid;place-items:center;font-size:28px">4</div>
  </md-carousel-item>
  <md-carousel-item label="Item 5">
    <div style="background:var(--md-sys-color-secondary-container);color:var(--md-sys-color-on-secondary-container);display:grid;place-items:center;font-size:28px">5</div>
  </md-carousel-item>
</md-carousel>
```

### Uncontained

```html
<md-carousel variant="uncontained" style="width:100%;height:200px" item-width="180">
  <md-carousel-item label="Item 1">
    <div style="background:var(--md-sys-color-primary-container);color:var(--md-sys-color-on-primary-container);display:grid;place-items:center;font-size:28px">1</div>
  </md-carousel-item>
  <md-carousel-item label="Item 2">
    <div style="background:var(--md-sys-color-secondary-container);color:var(--md-sys-color-on-secondary-container);display:grid;place-items:center;font-size:28px">2</div>
  </md-carousel-item>
  <md-carousel-item label="Item 3">
    <div style="background:var(--md-sys-color-tertiary-container);color:var(--md-sys-color-on-tertiary-container);display:grid;place-items:center;font-size:28px">3</div>
  </md-carousel-item>
  <md-carousel-item label="Item 4">
    <div style="background:var(--md-sys-color-primary-container);color:var(--md-sys-color-on-primary-container);display:grid;place-items:center;font-size:28px">4</div>
  </md-carousel-item>
  <md-carousel-item label="Item 5">
    <div style="background:var(--md-sys-color-secondary-container);color:var(--md-sys-color-on-secondary-container);display:grid;place-items:center;font-size:28px">5</div>
  </md-carousel-item>
</md-carousel>
```

### Full-screen

```html
<md-carousel variant="full-screen" style="width:100%;height:200px">
  <md-carousel-item label="Item 1">
    <div style="background:var(--md-sys-color-primary-container);color:var(--md-sys-color-on-primary-container);display:grid;place-items:center;font-size:28px">1</div>
  </md-carousel-item>
  <md-carousel-item label="Item 2">
    <div style="background:var(--md-sys-color-secondary-container);color:var(--md-sys-color-on-secondary-container);display:grid;place-items:center;font-size:28px">2</div>
  </md-carousel-item>
  <md-carousel-item label="Item 3">
    <div style="background:var(--md-sys-color-tertiary-container);color:var(--md-sys-color-on-tertiary-container);display:grid;place-items:center;font-size:28px">3</div>
  </md-carousel-item>
  <md-carousel-item label="Item 4">
    <div style="background:var(--md-sys-color-primary-container);color:var(--md-sys-color-on-primary-container);display:grid;place-items:center;font-size:28px">4</div>
  </md-carousel-item>
  <md-carousel-item label="Item 5">
    <div style="background:var(--md-sys-color-secondary-container);color:var(--md-sys-color-on-secondary-container);display:grid;place-items:center;font-size:28px">5</div>
  </md-carousel-item>
</md-carousel>
```

### API notes

`variant`: multi-browse · hero · uncontained · full-screen. Also `active-index`, `item-width` (uncontained, default 200) and `gap` (default 8). Methods: `next()`, `prev()`, `scrollToIndex(i)`. Event: `change` with `detail.index`. Items are `md-carousel-item` with a `label`; images fill the item.

## Bottom app bar

Action buttons with a FAB slot. New in 3.7.0.

Elements: `<md-bottom-app-bar>`

### FAB at the end

```html
<md-bottom-app-bar style="width:100%">
  <md-icon-button>
    <md-icon>search</md-icon>
  </md-icon-button>
  <md-icon-button>
    <md-icon>delete</md-icon>
  </md-icon-button>
  <md-icon-button>
    <md-icon>archive</md-icon>
  </md-icon-button>
  <md-fab slot="fab" size="small" aria-label="Add">
    <md-icon slot="icon">add</md-icon>
  </md-fab>
</md-bottom-app-bar>
```

### FAB in the centre

```html
<md-bottom-app-bar fab-position="center" style="width:100%">
  <md-icon-button>
    <md-icon>home</md-icon>
  </md-icon-button>
  <md-icon-button>
    <md-icon>search</md-icon>
  </md-icon-button>
  <md-fab slot="fab" size="small" aria-label="Add">
    <md-icon slot="icon">add</md-icon>
  </md-fab>
  <md-icon-button>
    <md-icon>favorite</md-icon>
  </md-icon-button>
  <md-icon-button>
    <md-icon>settings</md-icon>
  </md-icon-button>
</md-bottom-app-bar>
```

### API notes

`fab-position`: end (default) or center. `fixed` pins the bar to the viewport. `hide` slides it away, and `hide-on-scroll` with `scroll-target` does it automatically.

## Toolbars

Floating or standard pill toolbar with an optional fab slot.

Elements: `<md-toolbar>` `<md-toolbar-fab>`

### Vibrant (default)

```html
<md-toolbar variant="vibrant">
  <md-icon-button>
    <md-icon>format_bold</md-icon>
  </md-icon-button>
  <md-icon-button>
    <md-icon>format_italic</md-icon>
  </md-icon-button>
  <md-icon-button>
    <md-icon>format_underlined</md-icon>
  </md-icon-button>
</md-toolbar>
```

### Other variants

```html
<md-toolbar variant="standard">
  <md-icon-button>
    <md-icon>format_bold</md-icon>
  </md-icon-button>
  <md-icon-button>
    <md-icon>format_italic</md-icon>
  </md-icon-button>
  <md-icon-button>
    <md-icon>format_underlined</md-icon>
  </md-icon-button>
</md-toolbar>
<md-toolbar variant="primary">
  <md-icon-button>
    <md-icon>format_bold</md-icon>
  </md-icon-button>
  <md-icon-button>
    <md-icon>format_italic</md-icon>
  </md-icon-button>
  <md-icon-button>
    <md-icon>format_underlined</md-icon>
  </md-icon-button>
</md-toolbar>
<md-toolbar variant="tertiary">
  <md-icon-button>
    <md-icon>format_bold</md-icon>
  </md-icon-button>
  <md-icon-button>
    <md-icon>format_italic</md-icon>
  </md-icon-button>
  <md-icon-button>
    <md-icon>format_underlined</md-icon>
  </md-icon-button>
</md-toolbar>
<md-toolbar variant="surface">
  <md-icon-button>
    <md-icon>format_bold</md-icon>
  </md-icon-button>
  <md-icon-button>
    <md-icon>format_italic</md-icon>
  </md-icon-button>
  <md-icon-button>
    <md-icon>format_underlined</md-icon>
  </md-icon-button>
</md-toolbar>
<md-toolbar variant="error">
  <md-icon-button>
    <md-icon>format_bold</md-icon>
  </md-icon-button>
  <md-icon-button>
    <md-icon>format_italic</md-icon>
  </md-icon-button>
  <md-icon-button>
    <md-icon>format_underlined</md-icon>
  </md-icon-button>
</md-toolbar>
```

### Vertical

```html
<md-toolbar vertical>
  <md-icon-button>
    <md-icon>format_bold</md-icon>
  </md-icon-button>
  <md-icon-button>
    <md-icon>format_italic</md-icon>
  </md-icon-button>
</md-toolbar>
```

### With a FAB

```html
<md-toolbar>
  <md-icon-button>
    <md-icon>search</md-icon>
  </md-icon-button>
  <md-icon-button>
    <md-icon>delete</md-icon>
  </md-icon-button>
  <md-icon-button>
    <md-icon>archive</md-icon>
  </md-icon-button>
  <md-fab slot="fab" size="small" aria-label="Add">
    <md-icon slot="icon">add</md-icon>
  </md-fab>
</md-toolbar>
```

### Toolbar FAB (3.8.0)

```html
<md-toolbar>
  <md-icon-button aria-label="Search">
    <md-icon>search</md-icon>
  </md-icon-button>
  <md-icon-button aria-label="Delete">
    <md-icon>delete</md-icon>
  </md-icon-button>
  <md-toolbar-fab label="Add">
    <md-icon>add</md-icon>
  </md-toolbar-fab>
  <md-icon-button aria-label="Archive">
    <md-icon>archive</md-icon>
  </md-icon-button>
  <md-icon-button aria-label="More">
    <md-icon>more_vert</md-icon>
  </md-icon-button>
</md-toolbar>
<md-toolbar vertical>
  <md-icon-button aria-label="Search">
    <md-icon>search</md-icon>
  </md-icon-button>
  <md-toolbar-fab label="Add">
    <md-icon>add</md-icon>
  </md-toolbar-fab>
  <md-icon-button aria-label="Delete">
    <md-icon>delete</md-icon>
  </md-icon-button>
</md-toolbar>
```

### distribute (3.8.0)

```html
<md-toolbar distribute style="width:100%">
  <md-icon-button aria-label="Home">
    <md-icon>home</md-icon>
  </md-icon-button>
  <md-icon-button aria-label="Search">
    <md-icon>search</md-icon>
  </md-icon-button>
  <md-toolbar-fab label="Add">
    <md-icon>add</md-icon>
  </md-toolbar-fab>
  <md-icon-button aria-label="Favorites">
    <md-icon>favorite</md-icon>
  </md-icon-button>
  <md-icon-button aria-label="Settings">
    <md-icon>settings</md-icon>
  </md-icon-button>
</md-toolbar>
```

### API notes

`variant`: vibrant · standard · primary · tertiary · surface · error. `vertical` lays it out as a column. Slots: default (actions) and `fab`. New in 3.8.0: `distribute` stretches the toolbar to its container and spaces the actions evenly, and `md-toolbar-fab` is the highlighted pill FAB that sits between the icons (it turns upright when the toolbar is `vertical`). Tokens: `--md-toolbar-fab-container-color`, `--md-toolbar-fab-icon-color`. To expand a FAB into a toolbar, see FAB toolbar.

## Item

The layout primitive behind list items: leading, headline, supporting text and trailing content.

Elements: `<md-item>`

### Slots

```html
<md-item style="width:100%">
  <div slot="overline">Overline</div>
  <div slot="headline">Headline</div>
  <div slot="supporting-text">Supporting text</div>
  <md-icon slot="start">person</md-icon>
  <div slot="end">100+</div>
</md-item>
```

### API notes

Slots: `start`, `overline`, `headline`, `supporting-text`, `trailing-supporting-text`, `end`, `container` and the default slot. `md-list-item` adds `type`, `href`, `target` and `disabled` on top.

---

# Navigation

## Navigation bar

Bottom or side navigation with a pill indicator and badges.

Elements: `<md-navigation-bar>` `<md-navigation-tab>`

### Navigation bar

```html
<md-navigation-bar style="width:100%">
  <md-navigation-tab label="Home" active>
    <md-icon slot="inactive-icon">home</md-icon>
    <md-icon slot="active-icon">home</md-icon>
  </md-navigation-tab>
  <md-navigation-tab label="Search">
    <md-icon slot="inactive-icon">search</md-icon>
    <md-icon slot="active-icon">search</md-icon>
  </md-navigation-tab>
  <md-navigation-tab label="Library">
    <md-icon slot="inactive-icon">library_music</md-icon>
    <md-icon slot="active-icon">library_music</md-icon>
  </md-navigation-tab>
</md-navigation-bar>
```

### Horizontal (3.6.0)

```html
<md-navigation-bar horizontal style="width:100%">
  <md-navigation-tab label="Home" active>
    <md-icon slot="inactive-icon">home</md-icon>
    <md-icon slot="active-icon">home</md-icon>
  </md-navigation-tab>
  <md-navigation-tab label="Search">
    <md-icon slot="inactive-icon">search</md-icon>
    <md-icon slot="active-icon">search</md-icon>
  </md-navigation-tab>
  <md-navigation-tab label="Library">
    <md-icon slot="inactive-icon">library_music</md-icon>
    <md-icon slot="active-icon">library_music</md-icon>
  </md-navigation-tab>
</md-navigation-bar>
```

### API notes

`horizontal` puts the label inside the pill (“Horizontal Wide Nav Bar”). Badges anchor to the icon (fixed in 3.6.0).

## Navigation drawer

Modal or standard drawer with header, items and dividers.

Elements: `<md-navigation-drawer>` `<md-navigation-drawer-item>` `<md-navigation-drawer-header>` `<md-navigation-drawer-divider>`

### Drawer

```html
<md-filled-tonal-button onclick="drw.open=!drw.open">Toggle drawer</md-filled-tonal-button>
<md-navigation-drawer id="drw">
  <md-navigation-drawer-header>Matecha</md-navigation-drawer-header>
  <md-navigation-drawer-item label="Inbox" active>
    <md-icon slot="icon">inbox</md-icon>
  </md-navigation-drawer-item>
  <md-navigation-drawer-divider></md-navigation-drawer-divider>
  <md-navigation-drawer-item label="Sent">
    <md-icon slot="icon">send</md-icon>
  </md-navigation-drawer-item>
</md-navigation-drawer>
```

### API notes

`open` toggles the drawer. It is modal by default; `standard` makes it a persistent drawer and `keep-open` stops it closing on item click. Items take `label`, `href`, `active` and an `icon` slot.

## Navigation rail

A vertical navigation bar. Press the menu button to expand it from 96 px to full width; labels move inside the pill. New in 3.6.0.

Elements: `<md-navigation-rail>` `<md-navigation-rail-item>`

### Expandable rail

```html
<md-navigation-rail id="rail1" style="height:420px">
  <md-fab slot="fab" size="small" label="Create" aria-label="Create">
    <md-icon slot="icon">edit</md-icon>
  </md-fab>
  <md-navigation-rail-item label="Home" active>
    <md-icon slot="inactive-icon">home</md-icon>
    <md-icon slot="active-icon">home</md-icon>
  </md-navigation-rail-item>
  <md-navigation-rail-item label="Search">
    <md-icon slot="inactive-icon">search</md-icon>
    <md-icon slot="active-icon">search</md-icon>
  </md-navigation-rail-item>
  <md-navigation-rail-item label="Library">
    <md-icon slot="inactive-icon">library_music</md-icon>
    <md-icon slot="active-icon">library_music</md-icon>
  </md-navigation-rail-item>
</md-navigation-rail>
```

### Start expanded, no menu button

```html
<md-navigation-rail expanded no-menu item-align="center" style="height:360px">
  <md-navigation-rail-item label="Inbox" active>
    <md-icon slot="inactive-icon">inbox</md-icon>
    <md-icon slot="active-icon">inbox</md-icon>
  </md-navigation-rail-item>
  <md-navigation-rail-item label="Sent">
    <md-icon slot="inactive-icon">send</md-icon>
    <md-icon slot="active-icon">send</md-icon>
  </md-navigation-rail-item>
  <md-navigation-rail-item label="Trash">
    <md-icon slot="inactive-icon">delete</md-icon>
    <md-icon slot="active-icon">delete</md-icon>
  </md-navigation-rail-item>
</md-navigation-rail>
```

### API notes

The built-in menu button toggles `expanded`; you can also call `toggle()`, `show()` or `collapse()`, or set `expanded`. Slots: `menu` (replaces the button), `fab` (becomes extended when expanded, using its `label`) and the items. Other attributes: `no-menu`, `item-align` (start | center | end). Cancelable event: `navigation-rail-toggle` with `detail.expanded`. Items take `label`, `badge-value`, `show-badge` and the same `inactive-icon` / `active-icon` slots as navigation tabs. Tokens: `--md-navigation-rail-collapsed-width`, `-expanded-width`.

## Tabs

Primary and secondary tabs.

Elements: `<md-tabs>` `<md-primary-tab>` `<md-secondary-tab>`

### Primary

```html
<md-tabs style="width:100%">
  <md-primary-tab>Video</md-primary-tab>
  <md-primary-tab>Photos</md-primary-tab>
  <md-primary-tab>Music</md-primary-tab>
</md-tabs>
```

### Secondary

```html
<md-tabs style="width:100%">
  <md-secondary-tab>Overview</md-secondary-tab>
  <md-secondary-tab>Specs</md-secondary-tab>
  <md-secondary-tab>Reviews</md-secondary-tab>
</md-tabs>
```

---

# Selection

## Segmented buttons

Single or multi choice in a segmented set. md-outlined-* aliases exist.

Elements: `<md-segmented-button-set>` `<md-segmented-button>` `<md-outlined-segmented-button-set>` `<md-outlined-segmented-button>`

### Set

```html
<md-segmented-button-set>
  <md-segmented-button selected label="Map"></md-segmented-button>
  <md-segmented-button label="List"></md-segmented-button>
  <md-segmented-button label="Grid"></md-segmented-button>
</md-segmented-button-set>
```

### Multiselect

```html
<md-segmented-button-set multiselect>
  <md-segmented-button selected label="Bold"></md-segmented-button>
  <md-segmented-button selected label="Italic"></md-segmented-button>
  <md-segmented-button label="Underline"></md-segmented-button>
</md-segmented-button-set>
```

### md-outlined-* aliases

```html
<md-outlined-segmented-button-set>
  <md-outlined-segmented-button selected label="Day"></md-outlined-segmented-button>
  <md-outlined-segmented-button label="Week"></md-outlined-segmented-button>
  <md-outlined-segmented-button label="Month"></md-outlined-segmented-button>
</md-outlined-segmented-button-set>
```

### variant="outlined" (3.8.0)

```html
<md-segmented-button-set variant="outlined">
  <md-segmented-button selected label="Day"></md-segmented-button>
  <md-segmented-button label="Week"></md-segmented-button>
  <md-segmented-button label="Month"></md-segmented-button>
</md-segmented-button-set>
<md-segmented-button-set variant="outlined" multiselect>
  <md-segmented-button selected label="Bold"></md-segmented-button>
  <md-segmented-button selected label="Italic"></md-segmented-button>
  <md-segmented-button label="Underline"></md-segmented-button>
</md-segmented-button-set>
```

### API notes

`multiselect` allows several selected segments. `md-outlined-segmented-button-set` and `md-outlined-segmented-button` are aliases kept for Material Web compatibility. `variant="outlined"` on the set (3.8.0) gives the same outlined look with a check mark on the selected segment, so the outlined style no longer needs the aliases. A button can also take `outlined` on its own.

## Checkbox

Checked, unchecked, indeterminate and disabled.

Elements: `<md-checkbox>`

### States

```html
<label>
  <md-checkbox checked></md-checkbox>
  Checked
</label>
<label>
  <md-checkbox></md-checkbox>
  Unchecked
</label>
<label>
  <md-checkbox indeterminate></md-checkbox>
  Indeterminate
</label>
<label>
  <md-checkbox disabled></md-checkbox>
  Disabled
</label>
```

## Chips

Assist, filter, input and suggestion chips in a chip set.

Elements: `<md-chip-set>` `<md-assist-chip>` `<md-filter-chip>` `<md-input-chip>` `<md-suggestion-chip>`

### Chip set

```html
<md-chip-set>
  <md-assist-chip label="Assist">
    <md-icon slot="icon">event</md-icon>
  </md-assist-chip>
  <md-filter-chip label="Filter" selected></md-filter-chip>
  <md-filter-chip label="Filter"></md-filter-chip>
  <md-input-chip label="Input" removable></md-input-chip>
  <md-suggestion-chip label="Suggestion"></md-suggestion-chip>
</md-chip-set>
```

## Radio

Radio buttons grouped by name.

Elements: `<md-radio>`

### Radio group

```html
<label>
  <md-radio name="r" value="a" checked></md-radio>
  A
</label>
<label>
  <md-radio name="r" value="b"></md-radio>
  B
</label>
<label>
  <md-radio name="r" value="c"></md-radio>
  C
</label>
```

## Sliders

Thick track, detached handle. Sizes, vertical and icon were added in 3.5.0.

Elements: `<md-slider>`

### Basic, range, ticks

```html
<md-slider labeled value="40" class="sw"></md-slider>
<md-slider labeled range value-start="20" value-end="70" class="sw"></md-slider>
<md-slider ticks step="10" value="50" class="sw"></md-slider>
```

### Sizes xs to xl

```html
<md-slider size="xs" value="40" class="sw"></md-slider>
<md-slider size="s" value="50" class="sw"></md-slider>
<md-slider size="m" value="60" class="sw"></md-slider>
<md-slider size="l" value="70" class="sw">
  <md-icon slot="icon">volume_up</md-icon>
</md-slider>
<md-slider size="xl" value="80" class="sw">
  <md-icon slot="icon">brightness_6</md-icon>
</md-slider>
```

### Vertical and icon position

```html
<md-slider vertical size="m" value="60" style="height:200px">
  <md-icon slot="icon">volume_up</md-icon>
</md-slider>
<md-slider size="l" icon-position="start" value="30" style="width:260px">
  <md-icon slot="icon">light_mode</md-icon>
</md-slider>
```

### Wavy, centered, origin (3.6.0)

```html
<md-slider wavy value="60" class="sw"></md-slider>
<md-slider centered value="70" class="sw"></md-slider>
<md-slider origin="30" value="70" class="sw"></md-slider>
```

### Thin and pixel sizes (3.7.0)

```html
<md-slider size="xxs" value="40" class="sw"></md-slider>
<md-slider size="56px" value="60" class="sw"></md-slider>
<md-slider track-height="30" value="50" class="sw"></md-slider>
```

### API notes

`size="xxs"` is a 4 px track, and any pixel value works (`size="56px"`); `track-height` takes any pixel value too. `wavy` animates the active track (stroke up to 20 px). `centered` fills from the centre and `origin` from a chosen value (3.6.0). Vertical sliders need a `height`. `size`: xs 16 · s 24 · m 40 · l 56 · xl 96 px. `track-height` overrides it. Tokens: `--md-slider-track-height`, `-icon-color`, `-active-icon-color`.

## Switch

A 52×32 pill with a spring thumb.

Elements: `<md-switch>`

### Switches

```html
<md-switch selected></md-switch>
<md-switch></md-switch>
<md-switch icons selected></md-switch>
<md-switch disabled></md-switch>
```

### no-icons

```html
<md-switch selected></md-switch>
<md-switch selected no-icons></md-switch>
<md-switch icons></md-switch>
```

### API notes

The selected handle shows a check by default; `no-icons` hides it, and `icons` adds a ✕ on the unselected handle.

## Switch bar

A full-width main-switch pill; the whole bar toggles. New in 3.5.0.

Elements: `<md-switch-bar>`

### Switch bar

```html
<md-switch-bar label="Use Live Caption" selected style="width:100%">
  <span slot="supporting-text">Captions appear automatically</span>
</md-switch-bar>
<md-switch-bar label="Dark mode" style="width:100%"></md-switch-bar>
```

### API notes

Form-associated. Attributes: `selected`, `disabled`, `required`, `label`, `name`, `value` (default “on”). Events: `input`, `change`. Tokens: `--md-switch-bar-container-height`, `-container-shape`, `-selected-container-color` and more.

---

## Date picker

Pick a date from a calendar or type it in. Localised through Intl, with min and max. New in 3.8.0.

Elements: `<md-date-picker>`

### Modal

```html
<md-filled-button onclick="dp1.show()">
  <md-icon slot="icon">calendar_month</md-icon>
  Pick a date
</md-filled-button>
<md-date-picker id="dp1" value="2026-11-27" min="2026-01-01" max="2026-12-31" onchange="dpo.textContent=event.detail.value"></md-date-picker>
<code id="dpo">2026-11-27</code>
```

### Inline calendar

```html
<md-date-picker inline value="2026-11-27"></md-date-picker>
```

### Text input mode

```html
<md-date-picker inline mode="input" value="2026-11-27"></md-date-picker>
```

### Japanese locale, week starts on Monday

```html
<md-date-picker inline locale="ja" first-day="1" value="2026-11-27"></md-date-picker>
```

### API notes

`value` is `YYYY-MM-DD`; `min` and `max` use the same form and disable the days outside the range. `mode`: calendar (default) · input. Tapping the month label opens a year grid, and the pencil button switches to typing a date in the order of the locale. `first-day` (0 = Sunday) overrides the first weekday and `locale` the language. `inline`, `open`, `show()`, `close()`, `quick`, `ok-label` and `cancel-label` behave as on the time picker. Events: `input` while choosing, `change` on OK and cancelable `cancel`, with `detail.value` and `detail.date`. Tokens: the shared `--md-picker-*` tokens (container colour, shape, shadow, scrim colour, width and action colour).

## Time picker

Pick a time on a dial, with the keyboard or with a scroll wheel. Modal or inline, 12 or 24 hour. New in 3.8.0.

Elements: `<md-time-picker>`

### Modal

```html
<md-filled-button onclick="tp1.show()">
  <md-icon slot="icon">schedule</md-icon>
  Pick a time
</md-filled-button>
<md-time-picker id="tp1" value="09:30" onchange="tpo.textContent=event.detail.value"></md-time-picker>
<code id="tpo">09:30</code>
```

### Inline dial, 24 hour

```html
<md-time-picker inline format="24" value="14:45"></md-time-picker>
```

### Keyboard input, 12 hour

```html
<md-time-picker inline mode="input" format="12" value="07:05"></md-time-picker>
```

### Wheel

```html
<md-time-picker inline mode="wheel" format="24" value="18:20"></md-time-picker>
```

### API notes

`value` is `HH:mm` in 24 hour form. `format`: 24 · 12 (default follows the locale). `mode`: dial (default) · input · wheel. The built-in button switches between the dial and keyboard input. `inline` shows the picker in the page instead of as a modal; `open`, `show()` and `close()` control the modal and `quick` skips the animation. `ok-label` and `cancel-label` rename the actions and `locale` overrides the page language. Properties: `hours` and `minutes`. Events: `input` while choosing, `change` on OK and cancelable `cancel`, each with `detail.value` (plus `hours` and `minutes`). The modal also emits `open`, `opened`, `close` and `closed`. Tokens: `--md-time-picker-box-color`, `--md-time-picker-box-shape`, `--md-time-picker-dial-color`, `--md-time-picker-period-selected-color`, plus the shared `--md-picker-container-color`, `--md-picker-container-shape`, `--md-picker-container-shadow`, `--md-picker-scrim-color`, `--md-picker-width` and `--md-picker-action-color`.

# Text inputs

## Text field group

Stacks filled text fields into one connected block. New in 3.7.0.

Elements: `<md-filled-text-field>` `<md-text-field-group>`

### Connected fields

```html
<md-text-field-group style="width:100%">
  <md-filled-text-field label="First name"></md-filled-text-field>
  <md-filled-text-field label="Last name"></md-filled-text-field>
  <md-filled-text-field label="Email" type="email"></md-filled-text-field>
</md-text-field-group>
```

### API notes

Outer corners are 16 px and inner corners 4 px, with a 2 px gap. Fields get a `data-pos` of single, top, mid or bot.

## Search

A pill search bar and the expanded search view (3.5.0), docked or fullscreen.

Elements: `<md-search-bar>` `<md-search-view>`

### Search bar

```html
<md-search-bar placeholder="Search" style="width:100%"></md-search-bar>
```

### Sizes xs to xl (3.6.0)

```html
<md-search-bar size="xs" placeholder="xs · 40 px" style="width:100%"></md-search-bar>
<md-search-bar size="s" placeholder="s · 48 px" style="width:100%"></md-search-bar>
<md-search-bar size="m" placeholder="m · 56 px" style="width:100%"></md-search-bar>
<md-search-bar size="l" placeholder="l · 64 px" style="width:100%"></md-search-bar>
<md-search-bar size="xl" placeholder="xl · 72 px" style="width:100%"></md-search-bar>
```

### Search view

```html
<md-search-bar id="sb2" placeholder="Click to open search" style="width:320px"></md-search-bar>
<md-search-view anchor="sb2">
  <md-icon slot="leading-icon">search</md-icon>
  <md-list flat>
    <md-list-item>
      <div slot="headline">Recent: Matecha</div>
    </md-list-item>
    <md-list-item>
      <div slot="headline">Recent: Compose</div>
    </md-list-item>
  </md-list>
</md-search-view>
```

### Trigger from any element (3.6.0)

```html
<md-filled-tonal-button id="trg">
  <md-icon slot="icon">search</md-icon>
  Search
</md-filled-tonal-button>
<md-search-view trigger="#trg">
  <md-icon slot="leading-icon">search</md-icon>
  <md-list flat>
    <md-list-item>
      <div slot="headline">Expands from the button</div>
    </md-list-item>
  </md-list>
</md-search-view>
```

### API notes

`trigger` takes a CSS selector or element ids and opens the view on click; the expand animation starts from the trigger. `show(fromElement)` opens it from code. `bar-height` sets any pixel height on `md-search-bar`. `md-search-view` opens when its `anchor` is clicked or focused. Events: `open`, `opened`, `close`, `closed`, `input`, `search`, `clear`. Escape closes.

## Select

Filled and outlined select with options.

Elements: `<md-filled-select>` `<md-outlined-select>` `<md-select-option>`

### Selects

```html
<md-filled-select label="Fruit">
  <md-select-option value="a" selected>
    <div slot="headline">Apple</div>
  </md-select-option>
  <md-select-option value="b">
    <div slot="headline">Banana</div>
  </md-select-option>
</md-filled-select>
<md-outlined-select label="Fruit">
  <md-select-option value="a">
    <div slot="headline">Apple</div>
  </md-select-option>
  <md-select-option value="b">
    <div slot="headline">Banana</div>
  </md-select-option>
</md-outlined-select>
```

## Text fields

Filled and outlined text fields, plus the low-level field elements.

Elements: `<md-filled-field>` `<md-outlined-field>` `<md-outlined-text-field>`

### Filled

```html
<md-filled-text-field label="Name" value="Matecha"></md-filled-text-field>
<md-filled-text-field label="Email" type="email" error error-text="Invalid" value="x"></md-filled-text-field>
<md-filled-text-field label="Bio" type="textarea" rows="3"></md-filled-text-field>
```

### Outlined

```html
<md-outlined-text-field label="Name" value="Matecha">
  <md-icon slot="leading-icon">person</md-icon>
</md-outlined-text-field>
<md-outlined-text-field label="Limit" supporting-text="Max 10" maxlength="10"></md-outlined-text-field>
<md-outlined-text-field label="Disabled" disabled></md-outlined-text-field>
```

### Fields

```html
<md-filled-field label="Field" populated style="width:220px">
  <span>Content</span>
</md-filled-field>
<md-outlined-field label="Field" populated style="width:220px">
  <span>Content</span>
</md-outlined-field>
```

---

# Foundations

## Icons

Material Symbols Rounded via md-icon. Set window.MATECHA_NO_FONTS to skip the font.

Elements: `<md-icon>`

### Icons

```html
<md-icon>favorite</md-icon>
<md-icon>settings</md-icon>
<md-icon>rocket_launch</md-icon>
<md-icon>palette</md-icon>
```

## Ripple, focus ring, elevation

The primitives every component is built from.

Elements: `<md-ripple>` `<md-focus-ring>` `<md-elevation>`

### Elevation and ripple

```html
<div style="position:relative;width:160px;height:96px;border-radius:16px;background:var(--scl);display:grid;place-items:center;--md-elevation-level:3">
  <md-elevation></md-elevation>
  <md-ripple></md-ripple>
  Press me
</div>
```

### Focus ring

```html
<button style="position:relative;padding:10px 18px;border-radius:12px;border:1px solid var(--ol);background:none;color:var(--fg);font:inherit">
  Reach with Tab
  <md-focus-ring></md-focus-ring>
</button>
```

### API notes

`md-elevation` takes `inset`, `inset-start` and `inset-end`, and reads `--md-elevation-level`. `md-ripple` shows press feedback without a wave unless you add `wave`. `md-focus-ring` appears for keyboard focus only.

---

# Guides

## Theming

Dynamic colour from any seed, three schemes, dark mode and Material Theme Builder compatibility, all through the MateCha global.

### Seed, scheme and dark mode

```html
<label style="display:flex;align-items:center;gap:10px">
  Seed
  <input type="color" value="#6750a4" oninput="MateCha.setSeed(this.value)" style="width:44px;height:44px;border:0;padding:0;background:none;cursor:pointer">
</label>
<md-filled-tonal-button onclick="MateCha.setVariant('tonal')">tonal</md-filled-tonal-button>
<md-filled-tonal-button onclick="MateCha.setVariant('expressive')">expressive</md-filled-tonal-button>
<md-filled-tonal-button onclick="MateCha.setVariant('vibrant')">vibrant</md-filled-tonal-button>
<md-outlined-button onclick="MateCha.setDark(true)">Dark</md-outlined-button>
<md-outlined-button onclick="MateCha.setDark(false)">Light</md-outlined-button>
<md-outlined-button onclick="MateCha.setDark('auto')">Auto</md-outlined-button>
<md-text-button onclick="MateCha.resetTheme()">Reset</md-text-button>
```

### Colour roles

```html
<div class="sws">
  <div style="background:var(--md-sys-color-primary);color:var(--md-sys-color-on-primary)">primary</div>
  <div style="background:var(--md-sys-color-primary-container);color:var(--md-sys-color-on-primary-container)">primary-container</div>
  <div style="background:var(--md-sys-color-secondary-container);color:var(--md-sys-color-on-secondary-container)">secondary-container</div>
  <div style="background:var(--md-sys-color-tertiary-container);color:var(--md-sys-color-on-tertiary-container)">tertiary-container</div>
  <div style="background:var(--md-sys-color-surface-container-high);color:var(--md-sys-color-on-surface)">surface-container-high</div>
  <div style="background:var(--md-sys-color-error-container);color:var(--md-sys-color-on-error-container)">error-container</div>
</div>
```

### Live state

```html
<pre class="code" id="ths" style="width:100%"></pre>
```

### Reference

Tokens are injected once as `` at the start of the head, using `:where()`, so any page rule, Material Theme Builder output or inline `:root` rule wins. Components read `--md-sys-color-*` only. Dark values apply with `prefers-color-scheme: dark`, `[data-theme="dark"]`, or `[data-theme="light"]` to force light.

| Member | Meaning |
| --- | --- |
| `version`, `state` | Version string; read-only `{ seed, variant, dark, custom }`. |
| `applyTheme({ seed, variant, dark })` | Sets `data-theme` and `data-variant` on html, writes `--mate-*` and derived `--md-sys-color-*` inline. |
| `setSeed(hex, variant?)`, `setVariant(v)` | Variant is tonal, expressive or vibrant. |
| `setDark(true \| false \| 'auto')`, `toggleDark()` | Force or follow the system. |
| `resetTheme()` | Removes inline tokens and the data attributes. |
| `schemeFromSeed(hex, isDark, variant?)` | Returns `{ hct, effectiveChroma, tokens, sys }` without applying it. |
| `toast(message, { action, duration, closeButton })` | Promise of action, dismiss, timeout or replaced. |
| `hctToHex`, `rgbToHct`, `hexToRgb`, `rgbToHex` | Colour helpers. |

Event: `mate-theme-change` bubbles on html with `detail: { seed, variant, dark }`. Plain Material tokens keep working: `:root { --md-sys-color-primary: #6750a4; }`.

## Design language

Motion tokens, press morphing and the reference metrics that every Matecha component follows.

### Motion tokens

```html
<div class="mvrow" style="justify-content:space-between">
  <span>Press Play to compare the four easing curves</span>
  <md-filled-tonal-button onclick="this.closest('.stage').querySelectorAll('.mv').forEach(e=>e.classList.toggle('go'))">Play</md-filled-tonal-button>
</div>
<div class="mvrow">
  <code>--mate-spring-fast</code>
  <div class="mv" style="transition-timing-function:cubic-bezier(.34,1.56,.64,1)"></div>
</div>
<div class="mvrow">
  <code>--mate-spring-spatial</code>
  <div class="mv" style="transition-timing-function:cubic-bezier(.28,1.35,.48,1)"></div>
</div>
<div class="mvrow">
  <code>--mate-ease-decel</code>
  <div class="mv" style="transition-timing-function:cubic-bezier(.05,.7,.1,1)"></div>
</div>
<div class="mvrow">
  <code>--mate-ease-accel</code>
  <div class="mv" style="transition-timing-function:cubic-bezier(.3,0,.8,.15)"></div>
</div>
```

### Shape morph on press

```html
<md-filled-button>Press and hold</md-filled-button>
<md-filled-tonal-button>Press and hold</md-filled-tonal-button>
<md-toggle-button>Toggle</md-toggle-button>
<md-filter-chip label="Chip"></md-filter-chip>
<md-icon-button>
  <md-icon>favorite</md-icon>
</md-icon-button>
```

### Reference

Buttons, icon buttons, FABs, chips, list items and navigation pills swap their border radius while the pointer or keyboard is held (class `hold`, released after 70 ms). Typical: pill 20 px to 12 px, selected 12 px to 20 px, with a radius transition of `.32s cubic-bezier(.2, 0, 0, 1)`. Menus, dialogs, tooltips and snackbars scale and translate in with `--mate-spring-fast` over .3 to .38 s.

| Token | Value |
| --- | --- |
| `--mate-spring-fast` | cubic-bezier(.34, 1.56, .64, 1) |
| `--mate-spring-spatial` | cubic-bezier(.28, 1.35, .48, 1) |
| `--mate-ease-decel` | cubic-bezier(.05, .7, .1, 1) |
| `--mate-ease-accel` | cubic-bezier(.3, 0, .8, .15) |

| Component | Reference metrics |
| --- | --- |
| Button | 40 px high, 14 px / 500, radius 20 to 12 pressed |
| Chip | 32 px high, radius 8 to 16 pressed, 1 px outline-variant; selected uses secondary-container |
| Switch | 52×32 pill, spring thumb |
| Slider | Thick track, detached vertical pill handle |
| Progress | Strokes 3.5 and 6.5; wavy amplitude about 2.4 to 2.6 (linear) and 2.1 to 2.2 (circular) |
| Navigation pill | 64×32 (horizontal: auto×40); shrinks to 54 px on press |
| Menu | Radius 20, 8 px padding, item radius 12, spring scale-in from the anchor corner |
| Dialog | Radius 28, 24 px padding, headline 22 px / 500, scrim 52 % |
| Outlined field | 1 px outline, radius 6, notched label, 2 px primary on focus |

`prefers-reduced-motion: reduce` disables transitions and animations where practical and stops the wavy animation.

## Forms and behaviour

Form-associated elements, keyboard navigation, overlays and accessibility.

### Form association

```html
<form style="display:flex;flex-direction:column;gap:16px;width:100%" onsubmit="event.preventDefault();document.getElementById('fout').textContent=JSON.stringify(Object.fromEntries(new FormData(this)),null,2)">
  <md-filled-text-field name="name" label="Name" required></md-filled-text-field>
  <md-outlined-select name="fruit" label="Fruit">
    <md-select-option value="apple" selected>
      <div slot="headline">Apple</div>
    </md-select-option>
    <md-select-option value="banana">
      <div slot="headline">Banana</div>
    </md-select-option>
  </md-outlined-select>
  <label>
    <md-checkbox name="agree" value="yes"></md-checkbox>
    I agree
  </label>
  <label>
    <md-switch name="news" value="on"></md-switch>
    Newsletter
  </label>
  <md-slider name="volume" value="30"></md-slider>
  <div style="display:flex;gap:12px">
    <md-filled-button type="submit">Submit</md-filled-button>
    <md-outlined-button type="reset">Reset</md-outlined-button>
  </div>
  <pre class="code" id="fout">Submit to see the form data</pre>
</form>
```

### Reference

**Forms.** Form-associated elements implement `form`, `labels`, `validity`, `validationMessage`, `willValidate`, `checkValidity()`, `reportValidity()`, `setCustomValidity()`, `formResetCallback`, `formStateRestoreCallback` and `formDisabledCallback`.

**Reactivity.** Properties and attributes are mirrored and updates are batched in a microtask. Properties assigned before an element upgrades are applied on upgrade.

**Focus.** Interactive elements use `delegatesFocus` where Material Web does. `md-focus-ring` is visible for keyboard modality only.

**Overlays.** `md-menu` and `md-tooltip` use the Popover API (top layer) when available and `position: fixed` otherwise; they reposition on scroll and resize and flip vertically when space is short. `md-dialog` uses the native dialog element in modal mode.

**Keyboard.** Arrow, Home and End navigate tabs, lists, menus, chip sets, the navigation bar and toolbars. Escape closes menus, dialogs, drawers and tooltips. Menus and selects support type-ahead.

**Accessibility.** Native roles (tablist, menu, listbox, dialog or alertdialog, progressbar, toolbar and more) and aria attributes are set on the inner interactive element, and host aria attributes are forwarded.

## Migration and configuration

Swap the import, keep your markup. Packaging, compatibility contract and configuration.

### Reference

**Swap the import.** A page that works with Material Web 2.5.0 keeps working without markup changes.

```html
<!-- before -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@material/web/all.js"></script>
<!-- after -->
<script type="module" src="https://cdn.jsdelivr.net/gh/PolandBallHub-Operator/mateui-expressive@main/matecha-3.8.0_B-all.js"></script>
```

**Compatibility contract.** For every Material Web 2.5.0 element Matecha preserves:

- the tag name;
- attributes and properties (names, types, defaults, reflection) including aria forwarding;
- public methods such as `focus()`, `show()`, `close()`, `select()` and `reportValidity()`;
- events (`input`, `change`, `open`, `opened`, `close`, `closed`, `cancel`, `remove`, `close-menu`) with the same bubbling, composition and cancelability;
- slots and part names;
- form association;
- the `--md-component-*` and `--md-sys-*` custom properties.

Shadow DOM internals differ by design, so rely on documented parts and tokens rather than private structure.

**Packaging.**

| File | Content |
| --- | --- |
| `matecha-3.8.0_B-all.js` | Complete bundle (ES module, side-effect import) |
| `matecha-3_8_0-all_part1.js` | Core (tokens, MateElement), primitives, buttons, selection controls, slider |
| `matecha-3_8_0-all_part2.js` | Progress, chips, tabs, list, fields, menus, dialog, Expressive additions and the MateCha global |
| `matecha-3_8_0-all_part3.js` | 3.5.0 – 3.6.0 additions: switch bar, top popup, pull to refresh, search view, navigation rail |
| `matecha-3_8_0-all_part4.js` | 3.7.0 additions: toggle button, bottom app bar, bottom sheet, carousel, text field group |
| `matecha-3_8_0-all_part5.js` | 3.8.0 additions: FAB toolbar, toolbar FAB, time picker, date picker |

Loading the module registers every element with `customElements.define`, skipping names that are already defined, and defines `window.MateCha` and `window.MateChaComponents`. The bundle has no exports.

**Configuration.** Set this before loading the script to skip the Material Symbols Rounded and Inter font links:

```html
window.MATECHA_NO_FONTS = true;
```

Icon font token: `--md-icon-font` (default "Material Symbols Rounded"). Typeface tokens: `--md-ref-typeface-plain` and `--md-ref-typeface-brand`.

**Browser support.** Evergreen browsers with Custom Elements, Shadow DOM, ElementInternals, adoptedStyleSheets and CSS color-mix(): Chrome and Edge 111+, Safari 16.4+, Firefox 113+.

**Licence.** Apache License 2.0. The public API follows Material Web Components © Google LLC (Apache-2.0); no Material Web source code is included.

## Element index

Every element in the specification, with the page that demonstrates it and whether it is registered in this browser.

### Elements

| Element | Origin | Demo page |
| --- | --- | --- |
| `md-ripple` | Material Web 2.5.0 | Ripple, focus ring, elevation |
| `md-focus-ring` | Material Web 2.5.0 | Ripple, focus ring, elevation |
| `md-elevation` | Material Web 2.5.0 | Ripple, focus ring, elevation |
| `md-icon` | Material Web 2.5.0 | Icons |
| `md-divider` | Material Web 2.5.0 | Divider |
| `md-elevated-button` | Material Web 2.5.0 | Buttons |
| `md-filled-button` | Material Web 2.5.0 | Buttons |
| `md-filled-tonal-button` | Material Web 2.5.0 | Buttons |
| `md-outlined-button` | Material Web 2.5.0 | Buttons |
| `md-text-button` | Material Web 2.5.0 | Buttons |
| `md-icon-button` | Material Web 2.5.0 | Icon buttons |
| `md-filled-icon-button` | Material Web 2.5.0 | Icon buttons |
| `md-filled-tonal-icon-button` | Material Web 2.5.0 | Icon buttons |
| `md-outlined-icon-button` | Material Web 2.5.0 | Icon buttons |
| `md-fab` | Material Web 2.5.0 | Floating action buttons |
| `md-branded-fab` | Material Web 2.5.0 | Floating action buttons |
| `md-checkbox` | Material Web 2.5.0 | Checkbox |
| `md-radio` | Material Web 2.5.0 | Radio |
| `md-switch` | Material Web 2.5.0 | Switch |
| `md-slider` | Material Web 2.5.0 | Sliders |
| `md-linear-progress` | Material Web 2.5.0 | Progress indicators |
| `md-circular-progress` | Material Web 2.5.0 | Progress indicators |
| `md-chip-set` | Material Web 2.5.0 | Chips |
| `md-assist-chip` | Material Web 2.5.0 | Chips |
| `md-filter-chip` | Material Web 2.5.0 | Chips |
| `md-input-chip` | Material Web 2.5.0 | Chips |
| `md-suggestion-chip` | Material Web 2.5.0 | Chips |
| `md-tabs` | Material Web 2.5.0 | Tabs |
| `md-primary-tab` | Material Web 2.5.0 | Tabs |
| `md-secondary-tab` | Material Web 2.5.0 | Tabs |
| `md-list` | Material Web 2.5.0 | Lists |
| `md-list-item` | Material Web 2.5.0 | Lists |
| `md-item` | Material Web 2.5.0 | Item |
| `md-filled-field` | Material Web 2.5.0 | Text fields |
| `md-outlined-field` | Material Web 2.5.0 | Text fields |
| `md-filled-text-field` | Material Web 2.5.0 | Text field group |
| `md-outlined-text-field` | Material Web 2.5.0 | Text fields |
| `md-filled-select` | Material Web 2.5.0 | Select |
| `md-outlined-select` | Material Web 2.5.0 | Select |
| `md-select-option` | Material Web 2.5.0 | Select |
| `md-menu` | Material Web 2.5.0 | Menus |
| `md-menu-item` | Material Web 2.5.0 | Split button |
| `md-sub-menu` | Material Web 2.5.0 | Menus |
| `md-dialog` | Material Web 2.5.0 | Dialogs |
| `md-connected-button-group` | Expressive | Connected button group |
| `md-connected-button` | Expressive | Connected button group |
| `md-split-button` | Expressive | Split button |
| `md-segmented-button-set` | Expressive | Segmented buttons |
| `md-segmented-button` | Expressive | Segmented buttons |
| `md-outlined-segmented-button-set` | Expressive | Segmented buttons |
| `md-outlined-segmented-button` | Expressive | Segmented buttons |
| `md-fab-menu` | Expressive | FAB menu |
| `md-fab-menu-item` | Expressive | FAB menu |
| `md-navigation-bar` | Expressive | Navigation bar |
| `md-navigation-tab` | Expressive | Navigation bar |
| `md-navigation-drawer` | Expressive | Navigation drawer |
| `md-navigation-drawer-item` | Expressive | Navigation drawer |
| `md-navigation-drawer-header` | Expressive | Navigation drawer |
| `md-navigation-drawer-divider` | Expressive | Navigation drawer |
| `md-top-app-bar` | Expressive | App bars |
| `md-snackbar` | Expressive | Snackbar |
| `md-tooltip` | Expressive | Tooltips |
| `md-card` | Expressive | Cards |
| `md-badge` | Expressive | Badges |
| `md-avatar` | Expressive | Avatars |
| `md-loading-indicator` | Expressive | Loading indicator |
| `md-toolbar` | Expressive | Toolbars |
| `md-swipe-item` | Expressive | Swipe to reveal |
| `md-swipe-action` | Expressive | Cards |
| `md-search-bar` | Expressive | Search |
| `md-switch-bar` | Expressive | Switch bar |
| `md-top-popup` | Expressive | Top popup |
| `md-pull-to-refresh` | Expressive | Pull to refresh |
| `md-toggle-button` | Expressive | Toggle button |
| `md-bottom-sheet` | Expressive | Bottom sheets |
| `md-carousel` | Expressive | Carousel |
| `md-carousel-item` | Expressive | Carousel |
| `md-bottom-app-bar` | Expressive | Bottom app bar |
| `md-text-field-group` | Expressive | Text field group |
| `md-navigation-rail` | Expressive | Navigation rail |
| `md-navigation-rail-item` | Expressive | Navigation rail |
| `md-search-view` | Expressive | Search |
| `md-fab-toolbar` | Expressive | FAB toolbar |
| `md-toolbar-fab` | Expressive | Toolbars |
| `md-time-picker` | Expressive | Time picker |
| `md-date-picker` | Expressive | Date picker |

---

Matecha 3.8.0 · Apache License 2.0 · API compatibility follows Material Web Components © Google LLC. "Material Design" and "Material Web" are trademarks of Google LLC and are used only to describe compatibility.
