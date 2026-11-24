/**
 * @license
 * matecha 3.6.0 — Material 3 Expressive web components
 * API-compatible with @material/web v2.5.0 (all.js): same tag names, attributes, properties, methods, events,
 * slots, parts and --md-sys-* / --md-<component>-* tokens. From-scratch, dependency-free implementation.
 * Visual design & motion come from the MateUI HTML (spring motion, shape morphing on press, 52x32 pill switch,
 * detached-handle slider, wavy progress, ...).  Drop-in:  import './matecha-3.6.0-all.js'
 *
 * Sections
 *  00 Core (tokens, MateElement)        01 Ripple · FocusRing · Elevation · Icon · Divider
 *  02 Buttons · IconButtons · FAB       03 Checkbox · Radio · Switch · Slider (thick, vertical, wavy, centered, icon)
 *  04 Progress (linear / circular, wavy) 05 Chips (assist/filter/input/suggestion, chip-set)
 *  06 Tabs (primary/secondary)          07 List · List item (swipe actions) · Item
 *  08 Fields · Text fields · Select · Search bar (sizes)
 *  09 Menu · Menu item · Sub-menu       10 Dialog (+ fullscreen, stacked actions)
 *  11 Expressive additions: connected button group, split button, segmented buttons, FAB menu, navigation bar (+ horizontal wide),
 *     navigation drawer, top app bar (circled back button), snackbar, tooltip (plain/rich), card (swipe actions), badge, avatar,
 *     loading indicator, toolbar, swipe item
 *  12 Switch bar   13 Top popup   14 Pull to refresh (expressive / classic)   15 Search view (docked / fullscreen / any trigger)
 *  16 Navigation rail (collapsed / expanded)
 *  Global: window.MateCha  (HCT dynamic colour: setSeed / setDark / setVariant / applyTheme / resetTheme / toast)
 *          window.MateChaComponents (tag registry)
 */

/* ==========================================================================
   00. Core
   ========================================================================== */
const css = (strings, ...vals) => strings.reduce((a, s, i) => a + s + (i < vals.length ? vals[i] : ''), '');

/* ---- Tokens: --md-sys-color-* resolve to the MateUI palette (--mate-*) and fall back to built-in M3 purple ---- */
const MATE_LIGHT = {
  'bg-outer': '#E8E1F2', 'surface-bg': '#F6F1FA', 'surface-card': '#FFFFFF', 'surface-container': '#EFE9F6', 'surface-container-high': '#E8E0F2', 'surface-nav': '#F3EDF7',
  'primary': '#65558F', 'on-primary': '#FFFFFF', 'primary-container': '#E8DEF8', 'on-primary-container': '#21005D', 'secondary-container': '#E5DDF4',
  'tertiary-pink': '#F6ADFF', 'on-tertiary-pink': '#36003E', 'floating-purple': '#CBB7FF', 'on-floating-purple': '#2B175A',
  'text-primary': '#1D1B20', 'text-secondary': '#49454F', 'text-muted': '#79747E', 'outline': '#79747E', 'outline-variant': '#CAC4D0',
  'switch-track-off': '#E6E0E9', 'switch-thumb-off': '#79747E', 'dialog-bg': '#ECE6F0', 'snackbar-bg': '#322F35', 'snackbar-text': '#F5EFF7', 'seg-active-bg': '#5A5366', 'seg-active-text': '#FFFFFF',
  'shadow-back': '0 2px 6px rgba(45,29,82,.12)', 'shadow-floating': '0 6px 18px rgba(45,29,82,.18),0 2px 6px rgba(45,29,82,.10)',
  'shadow-menu': '0 8px 24px rgba(33,0,93,.16),0 2px 8px rgba(33,0,93,.08)', 'shadow-dialog': '0 16px 36px rgba(29,27,32,.22)'
};
const MATE_DARK = {
  'bg-outer': '#0F0D13', 'surface-bg': '#141218', 'surface-card': '#1D1B20', 'surface-container': '#211F26', 'surface-container-high': '#2B2930', 'surface-nav': '#1D1B20',
  'primary': '#D0BCFF', 'on-primary': '#381E72', 'primary-container': '#4F378B', 'on-primary-container': '#EADDFF', 'secondary-container': '#4A4458',
  'tertiary-pink': '#F2B8FF', 'on-tertiary-pink': '#52005E', 'floating-purple': '#4F378B', 'on-floating-purple': '#EADDFF',
  'text-primary': '#E6E0E9', 'text-secondary': '#CAC4D0', 'text-muted': '#938F99', 'outline': '#938F99', 'outline-variant': '#49454F',
  'switch-track-off': '#36343B', 'switch-thumb-off': '#938F99', 'dialog-bg': '#2B2930', 'snackbar-bg': '#E6E0E9', 'snackbar-text': '#322F35', 'seg-active-bg': '#4A4458', 'seg-active-text': '#E8DEF8',
  'shadow-back': '0 2px 8px rgba(0,0,0,.45)', 'shadow-floating': '0 6px 20px rgba(0,0,0,.55),0 2px 6px rgba(0,0,0,.35)',
  'shadow-menu': '0 8px 28px rgba(0,0,0,.60),0 2px 8px rgba(0,0,0,.40)', 'shadow-dialog': '0 18px 40px rgba(0,0,0,.70)'
};
const SYS_LIGHT = {
  'secondary': '#625B71', 'on-secondary': '#FFFFFF', 'on-secondary-container': '#1D192B', 'tertiary': '#7D5260', 'on-tertiary': '#FFFFFF',
  'error': '#B3261E', 'on-error': '#FFFFFF', 'error-container': '#F9DEDC', 'on-error-container': '#410E0B',
  'surface-dim': '#DED8E1', 'surface-bright': '#FEF7FF', 'surface-container-lowest': 'var(--mate-surface-card)', 'surface-container-low': '#F7F2FA', 'surface-container-highest': 'var(--mate-switch-track-off)',
  'surface-variant': '#E7E0EC', 'inverse-primary': '#D0BCFF', 'scrim': '#000000', 'shadow': '#2D1D52', 'surface-tint': 'var(--mate-primary)'
};
const SYS_DARK = {
  'secondary': '#CCC2DC', 'on-secondary': '#332D41', 'on-secondary-container': '#E8DEF8', 'tertiary': '#EFB8C8', 'on-tertiary': '#492532',
  'error': '#F2B8B5', 'on-error': '#601410', 'error-container': '#8C1D18', 'on-error-container': '#F9DEDC',
  'surface-dim': '#141218', 'surface-bright': '#3B383E', 'surface-container-lowest': 'var(--mate-bg-outer)', 'surface-container-low': '#1D1B20', 'surface-container-highest': 'var(--mate-switch-track-off)',
  'surface-variant': '#49454F', 'inverse-primary': '#6750A4', 'scrim': '#000000', 'shadow': '#000000', 'surface-tint': 'var(--mate-primary)'
};
const SYS_MAP = {
  'primary': 'var(--mate-primary)', 'on-primary': 'var(--mate-on-primary)', 'primary-container': 'var(--mate-primary-container)', 'on-primary-container': 'var(--mate-on-primary-container)',
  'secondary-container': 'var(--mate-secondary-container)', 'tertiary-container': 'var(--mate-tertiary-pink)', 'on-tertiary-container': 'var(--mate-on-tertiary-pink)',
  'surface': 'var(--mate-surface-bg)', 'background': 'var(--mate-surface-bg)', 'on-surface': 'var(--mate-text-primary)', 'on-background': 'var(--mate-text-primary)', 'on-surface-variant': 'var(--mate-text-secondary)',
  'surface-container': 'var(--mate-surface-container)', 'surface-container-high': 'var(--mate-surface-container-high)',
  'outline': 'var(--mate-outline)', 'outline-variant': 'var(--mate-outline-variant)', 'inverse-surface': 'var(--mate-snackbar-bg)', 'inverse-on-surface': 'var(--mate-snackbar-text)',
  'floating': 'var(--mate-floating-purple)', 'on-floating': 'var(--mate-on-floating-purple)'
};
const MATE_MOTION = '--mate-spring-fast:cubic-bezier(.34,1.56,.64,1);--mate-spring-spatial:cubic-bezier(.28,1.35,.48,1);--mate-ease-decel:cubic-bezier(.05,.7,.1,1);--mate-ease-accel:cubic-bezier(.3,0,.8,.15);';
const decl = (obj, pre) => Object.entries(obj).map(([k, v]) => `--${pre}${k}:${v};`).join('');
const tokenCSS = () => {
  const L = decl(MATE_LIGHT, 'mate-'), D = decl(MATE_DARK, 'mate-');
  const SL = decl(SYS_LIGHT, 'md-sys-color-'), SD = decl(SYS_DARK, 'md-sys-color-'), SM = decl(SYS_MAP, 'md-sys-color-');
  const FONT = '--md-ref-typeface-plain:Inter,-apple-system,BlinkMacSystemFont,sans-serif;--md-ref-typeface-brand:Inter,-apple-system,BlinkMacSystemFont,sans-serif;--md-icon-font:"Material Symbols Rounded","Material Symbols Outlined";';
  // :where() → zero specificity: any page / Material Theme Builder / MateUI :root rule wins.
  return `:where(:root){${L}${SL}${SM}${MATE_MOTION}${FONT}color-scheme:light dark}` +
    `@media (prefers-color-scheme:dark){:where(:root:not([data-theme=light])){${D}${SD}}}` +
    `:where([data-theme=dark]){${D}${SD}}:where([data-theme=light]){${L}${SL}}`;
};
(function injectTokens() {
  if (typeof document === 'undefined' || document.getElementById('matecha-tokens')) return;
  const st = document.createElement('style'); st.id = 'matecha-tokens'; st.textContent = tokenCSS();
  document.head.insertBefore(st, document.head.firstChild);
  if (!window.MATECHA_NO_FONTS && !document.querySelector('link[href*="Material+Symbols"],link[href*="Material%20Symbols"]')) {
    const l = document.createElement('link'); l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,400..600,0..1,0'; document.head.appendChild(l);
    const f = document.createElement('link'); f.rel = 'stylesheet'; f.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'; document.head.appendChild(f);
  }
})();

const SYMBOL_CSS = `.sym{font-family:var(--md-icon-font);font-weight:normal;font-style:normal;font-size:var(--md-icon-size,24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-flex;align-items:center;justify-content:center;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;transition:transform .35s var(--mate-spring-fast)}`;

/* ---- helpers ---- */
const kebab = s => s.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
const hasOwn = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
const copyAria = (host, inner) => { const names = host.constructor.ariaAttrs || []; for (const a of names) { const v = host.getAttribute(a); if (v !== null) inner.setAttribute(a, v); } };
const _chain = C => { const out = []; for (let k = C; k && k !== HTMLElement && k !== Object; k = Object.getPrototypeOf(k)) out.unshift(k); return out; };
const sheetCache = new Map();
const toSheet = text => {
  if (sheetCache.has(text)) return sheetCache.get(text);
  let s = null;
  if (typeof CSSStyleSheet !== 'undefined' && 'replaceSync' in CSSStyleSheet.prototype) { s = new CSSStyleSheet(); s.replaceSync(text); } else s = text;
  sheetCache.set(text, s); return s;
};
const BASE_CSS = ':host{box-sizing:border-box}:host([hidden]){display:none!important}*,*::before,*::after{box-sizing:border-box}';

/** Minimal reactive base. Subclasses declare `static props`, `static styles`, `build()` (once) and `update()` (on change). */
class MateElement extends HTMLElement {
  static props = {};
  static styles = '';
  static formAssociated = false;
  static delegatesFocus = false;
  static get observedAttributes() { return Object.keys(MateElement._prep(this).attrs); }
  static _prep(C) {
    if (hasOwn(C, '_info')) return C._info;
    const props = {}, styles = [];
    for (const k of _chain(C)) { if (hasOwn(k, 'props')) Object.assign(props, k.props); if (hasOwn(k, 'styles') && k.styles) styles.push(k.styles); }
    const attrs = {};
    for (const [n, d] of Object.entries(props)) attrs[d.attribute || kebab(n)] = n;
    for (const k of _chain(C)) {
      if (!hasOwn(k, 'props')) continue;
      for (const n of Object.keys(k.props)) {
        if (hasOwn(k.prototype, n)) continue;
        Object.defineProperty(k.prototype, n, { configurable: true, enumerable: true, get() { return this._p[n]; }, set(v) { this._setProp(n, v, false); } });
      }
    }
    return (C._info = { props, attrs, styles: [BASE_CSS, ...styles] });
  }
  constructor() {
    super();
    const C = this.constructor, info = MateElement._prep(C);
    this._info = info; this._p = {}; this._built = false; this._q = false; this._reflect = new Set(); this._reflecting = null;
    for (const [n, d] of Object.entries(info.props)) this._p[n] = d.type === Boolean ? !!d.default : d.type === Number ? (d.default ?? 0) : (d.default ?? '');
    this.attachShadow({ mode: 'open', delegatesFocus: !!C.delegatesFocus });
    const sheets = info.styles.map(toSheet);
    if (sheets.every(s => typeof s !== 'string') && 'adoptedStyleSheets' in this.shadowRoot) this.shadowRoot.adoptedStyleSheets = sheets;
    else { const st = document.createElement('style'); st.textContent = info.styles.join('\n'); this.shadowRoot.appendChild(st); }
    if (C.formAssociated && this.attachInternals) this._internals = this.attachInternals();
    // properties set before the element was upgraded
    for (const n of Object.keys(info.props)) if (hasOwn(this, n)) { const v = this[n]; delete this[n]; this._setProp(n, v, false); }
  }
  _setProp(n, raw, fromAttr) {
    const d = this._info.props[n]; let v;
    if (d.type === Boolean) v = fromAttr ? raw !== null : !!raw;
    else if (d.type === Number) { v = raw == null ? (d.default ?? 0) : Number(raw); if (Number.isNaN(v)) v = d.default ?? 0; }
    else v = raw == null ? (fromAttr ? (d.default ?? '') : '') : String(raw);
    const old = this._p[n]; if (old === v) return;
    this._p[n] = v;
    if (!fromAttr && d.reflect) this._reflect.add(n);
    this._schedule();
  }
  attributeChangedCallback(name, old, val) {
    if (old === val) return;
    const n = this._info.attrs[name]; if (!n || this._reflecting === n) return;
    this._setProp(n, val, true);
  }
  _schedule() { if (this._q) return; this._q = true; queueMicrotask(() => { this._q = false; if (this._built && this.isConnected) this._doUpdate(); }); }
  _doUpdate() {
    if (this._reflect.size) {
      for (const n of this._reflect) {
        const d = this._info.props[n], a = d.attribute || kebab(n), v = this._p[n]; this._reflecting = n;
        if (d.type === Boolean) this.toggleAttribute(a, v); else if (v === '' || v == null) this.removeAttribute(a); else this.setAttribute(a, String(v));
        this._reflecting = null;
      }
      this._reflect.clear();
    }
    this.update && this.update();
  }
  connectedCallback() {
    if (!this._built) { this._built = true; this.build && this.build(); }
    this._doUpdate();
  }
  requestUpdate() { this._schedule(); }
  $(sel) { return this.shadowRoot.querySelector(sel); }
  $$(sel) { return Array.from(this.shadowRoot.querySelectorAll(sel)); }
  emit(name, init) { const ev = init && 'detail' in init ? new CustomEvent(name, init) : new Event(name, init); this.dispatchEvent(ev); return ev; }
  redispatch(e) { const ev = new Event(e.type, e); this.dispatchEvent(ev); return ev; }
  /** Expressive press morph (HTML `.is-hold`): shape swaps for the pointer-down duration (+70ms). */
  bindHold(target, cls = 'hold') {
    const off = () => { clearTimeout(this._holdT); this._holdT = setTimeout(() => target.classList.remove(cls), 70); };
    const on = e => {
      clearTimeout(this._holdT); target.classList.add(cls);
      if (e && e.type === 'pointerdown') {
        const up = () => { off(); document.removeEventListener('pointerup', up, true); document.removeEventListener('pointercancel', up, true); };
        document.addEventListener('pointerup', up, true); document.addEventListener('pointercancel', up, true);
      }
    };
    target.addEventListener('pointerdown', on);
    ['pointerup', 'pointercancel', 'pointerleave', 'dragstart', 'contextmenu', 'lostpointercapture'].forEach(t => target.addEventListener(t, off));
    target.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') on(); });
    target.addEventListener('keyup', off); target.addEventListener('blur', off);
  }
}
const defineElement = (name, C) => {
  MateElement._prep(C);
  if (typeof customElements !== 'undefined' && !customElements.get(name)) customElements.define(name, C);
};
const MOTION = '.32s cubic-bezier(.2,0,0,1)';

/* ==========================================================================
   01. Primitives — md-ripple · md-focus-ring · md-elevation · md-icon · md-divider
   ========================================================================== */
const _controlOf = el => {
  if (el.hasAttribute('for')) { const r = el.getRootNode(); return (r.getElementById ? r.getElementById(el.getAttribute('for')) : null) || document.getElementById(el.getAttribute('for')); }
  return el.parentElement || (el.getRootNode() && el.getRootNode().host) || null;
};

class MdRipple extends MateElement {
  static props = { disabled: { type: Boolean, reflect: true } };
  static styles = css`
:host{display:flex;position:absolute;inset:0;border-radius:inherit;overflow:hidden;pointer-events:none;-webkit-tap-highlight-color:transparent;
--_hover:var(--md-ripple-hover-opacity,.08);--_press:var(--md-ripple-pressed-opacity,.08);--_c:var(--md-ripple-hover-color,var(--md-sys-color-on-surface))}
:host([disabled]){display:none}
.layer{position:absolute;inset:0;border-radius:inherit;background:var(--_c);opacity:0;transition:opacity .15s linear}
.layer.hover{opacity:var(--_hover)}.layer.press{opacity:var(--_press);transition-duration:.05s}
.wave{position:absolute;border-radius:50%;background:radial-gradient(closest-side,var(--md-ripple-pressed-color,var(--_c)) max(calc(100% - 70px),65%),transparent 100%);opacity:0;transform:scale(.2);will-change:transform,opacity}`;
  build() {
    this.shadowRoot.innerHTML = '<div class="layer"></div>';
    this._layer = this.$('.layer'); this._hover = false; this._press = false;
    this._bind = () => {
      const c = _controlOf(this); if (c === this._ctl) return;
      this._unbind(); this._ctl = c; if (!c) return;
      const on = (t, f) => { c.addEventListener(t, f); (this._offs = this._offs || []).push(() => c.removeEventListener(t, f)); };
      on('pointerenter', e => { if (e.pointerType !== 'touch') { this._hover = true; this._sync(); } });
      on('pointerleave', () => { this._hover = false; this._release(); this._sync(); });
      on('pointerdown', e => {
        if (this.disabled || e.button > 0) return; this._start(e);
        const up = () => { this._release(); document.removeEventListener('pointerup', up, true); document.removeEventListener('pointercancel', up, true); };
        document.addEventListener('pointerup', up, true); document.addEventListener('pointercancel', up, true);
      });
      on('pointerup', () => this._release()); on('pointercancel', () => this._release()); on('contextmenu', () => this._release()); on('lostpointercapture', () => this._release());
      on('keydown', e => { if (e.key === 'Enter' || e.key === ' ') this._start(null); });
      on('keyup', () => this._release());
    };
  }
  _unbind() { (this._offs || []).forEach(f => f()); this._offs = []; }
  connected() { }
  connectedCallback() { super.connectedCallback(); this._bind(); }
  disconnectedCallback() { this._unbind(); this._ctl = null; }
  update() { this._bind(); }
  _sync() { this._layer.classList.toggle('hover', this._hover && !this.disabled); this._layer.classList.toggle('press', this._press && !this.disabled); }
  _start(e) {
    /* MateUI HTML has no expanding wave: a press only shows the state layer + the component's own shape/transform effect.
       The wave is opt-in via <md-ripple wave> and is kept small and short. */
    if (!this.hasAttribute('wave')) { this._press = true; this._sync(); return; }
    const r = this.getBoundingClientRect(), size = Math.max(r.width, r.height), x = e ? e.clientX - r.left : r.width / 2, y = e ? e.clientY - r.top : r.height / 2;
    const far = Math.hypot(Math.max(x, r.width - x), Math.max(y, r.height - y)), d = Math.min(Math.max(far * 2, size), size * 1.15);
    const w = document.createElement('span'); w.className = 'wave'; w.style.cssText = `width:${d}px;height:${d}px;left:${x - d / 2}px;top:${y - d / 2}px`;
    this.shadowRoot.appendChild(w); this._press = true; this._sync();
    const a = w.animate([{ transform: 'scale(.2)', opacity: 1 }, { transform: 'scale(1)', opacity: 1 }], { duration: 220, easing: 'cubic-bezier(.05,.7,.1,1)', fill: 'forwards' });
    (this._waves = this._waves || []).push({ w, a, t: performance.now() });
  }
  _release() {
    this._press = false; this._sync();
    for (const o of (this._waves || [])) {
      if (o.done) continue; o.done = true;
      const go = () => { const f = o.w.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, easing: 'linear', fill: 'forwards' }); f.onfinish = () => o.w.remove(); };
      o.a.finished.then(go, go);
    }
    this._waves = (this._waves || []).filter(o => !o.done);
  }
}
defineElement('md-ripple', MdRipple);

let _kbModality = false;
if (typeof document !== 'undefined') {
  document.addEventListener('keydown', e => { if (!e.metaKey && !e.altKey && !e.ctrlKey) _kbModality = true; }, true);
  ['pointerdown', 'mousedown', 'touchstart'].forEach(t => document.addEventListener(t, () => { _kbModality = false; }, true));
}
class MdFocusRing extends MateElement {
  static props = { visible: { type: Boolean, reflect: true }, inward: { type: Boolean, reflect: true } };
  static styles = css`
:host{position:absolute;inset:0;display:none;pointer-events:none;border-radius:inherit;animation-name:ring;animation-duration:.6s;animation-timing-function:var(--mate-spring-fast);
--_w:var(--md-focus-ring-width,3px);--_c:var(--md-focus-ring-color,var(--md-sys-color-secondary));--_off:var(--md-focus-ring-offset,2px)}
:host([visible]){display:flex}
.ring{position:absolute;inset:calc(-1*var(--_off));outline:var(--_w) solid var(--_c);border-radius:inherit}
:host([inward]) .ring{inset:0;outline-offset:calc(-1*var(--_w))}
@keyframes ring{0%{opacity:0;transform:scale(.94)}100%{opacity:1;transform:scale(1)}}
@media(forced-colors:active){.ring{outline-color:CanvasText}}`;
  build() {
    this.shadowRoot.innerHTML = '<div class="ring"></div>'; this.setAttribute('aria-hidden', 'true');
    this._bind = () => {
      const c = _controlOf(this); if (c === this._ctl) return; this._unbind(); this._ctl = c; if (!c) return;
      const on = (t, f) => { c.addEventListener(t, f); (this._offs = this._offs || []).push(() => c.removeEventListener(t, f)); };
      on('focusin', () => { this.visible = _kbModality || (() => { try { return c.matches(':focus-visible'); } catch (e) { return false; } })(); });
      on('focusout', () => { this.visible = false; });
      on('pointerdown', () => { this.visible = false; });
    };
  }
  _unbind() { (this._offs || []).forEach(f => f()); this._offs = []; }
  connectedCallback() { super.connectedCallback(); this._bind(); }
  disconnectedCallback() { this._unbind(); this._ctl = null; }
  update() { this._bind(); }
}
defineElement('md-focus-ring', MdFocusRing);

class MdElevation extends MateElement {
  static styles = css`
:host,.shadow,.shadow::before,.shadow::after{border-radius:inherit;inset:0;position:absolute;transition-duration:inherit;transition-property:inherit;transition-timing-function:inherit}
:host{display:flex;pointer-events:none;transition-property:box-shadow,opacity}
.shadow::before,.shadow::after{content:"";transition-property:box-shadow,opacity;--_l:var(--md-elevation-level,0);--_sc:var(--md-elevation-shadow-color,var(--md-sys-color-shadow,#000))}
.shadow::before{box-shadow:0 calc(1px*(var(--_l) + clamp(0,var(--_l) - 3,2))) calc(1px*(2*var(--_l) + 2*clamp(0,var(--_l),1))) 0 color-mix(in srgb,var(--_sc) calc(18% + 2%*var(--_l)),transparent)}
.shadow::after{box-shadow:0 0 calc(1px*(1.5*var(--_l))) calc(1px*clamp(0,var(--_l) - 3,2)*-.5) color-mix(in srgb,var(--_sc) 12%,transparent)}`;
  build() { this.shadowRoot.innerHTML = '<span class="shadow"></span>'; this.setAttribute('aria-hidden', 'true'); }
}
defineElement('md-elevation', MdElevation);

class MdIcon extends MateElement {
  static styles = css`
:host{font-family:var(--md-icon-font);font-weight:normal;font-style:normal;font-size:var(--md-icon-size,24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-flex;align-items:center;justify-content:center;white-space:nowrap;word-wrap:normal;direction:ltr;flex-shrink:0;
width:var(--md-icon-size,24px);height:var(--md-icon-size,24px);-webkit-font-smoothing:antialiased;font-variation-settings:'FILL' var(--md-icon-fill,0),'wght' var(--md-icon-weight,400),'GRAD' 0,'opsz' 24;user-select:none;transition:font-variation-settings .25s var(--mate-spring-fast),transform .3s var(--mate-spring-fast)}
::slotted(svg){fill:currentColor;width:100%;height:100%}`;
  build() { this.shadowRoot.innerHTML = '<slot></slot>'; if (!this.hasAttribute('aria-hidden')) this.setAttribute('aria-hidden', 'true'); }
}
defineElement('md-icon', MdIcon);

class MdDivider extends MateElement {
  static props = { inset: { type: Boolean, reflect: true }, insetStart: { type: Boolean, attribute: 'inset-start', reflect: true }, insetEnd: { type: Boolean, attribute: 'inset-end', reflect: true } };
  static styles = css`
:host{box-sizing:border-box;color:var(--md-divider-color,var(--md-sys-color-outline-variant));display:flex;height:var(--md-divider-thickness,1px);width:100%}
:host([inset]),:host([inset-start]){padding-inline-start:16px}:host([inset]),:host([inset-end]){padding-inline-end:16px}
.divider{height:100%;width:100%;border-top:var(--md-divider-thickness,1px) solid;border-radius:inherit}`;
  build() { this.shadowRoot.innerHTML = '<div class="divider"></div>'; this.setAttribute('role', 'separator'); }
}
defineElement('md-divider', MdDivider);

/* ==========================================================================
   02. Buttons — md-elevated/filled/filled-tonal/outlined/text-button
       md-icon-button · md-filled-icon-button · md-filled-tonal-icon-button · md-outlined-icon-button
       md-fab · md-branded-fab
       HTML spec: 40px height, pill radius 20px that morphs to 12px while pressed (.is-hold), 14px/500,
       toggle selected = square 12px (pressed 20px); transitions radius .32s cubic-bezier(.2,0,0,1), colours .25s.
   ========================================================================== */
const BTN_CSS = css`
:host{display:inline-flex;vertical-align:top;outline:none;-webkit-tap-highlight-color:transparent;min-width:0}
:host([block]){display:flex;width:100%;--_h:var(--md-block-button-height,48px);--_r:var(--md-block-button-shape,calc(var(--_h)/2))}
:host([disabled]),:host([soft-disabled]){pointer-events:none;cursor:default}
.btn{-webkit-touch-callout:none;touch-action:manipulation;position:relative;display:inline-flex;align-items:center;justify-content:center;gap:var(--_gap,8px);width:100%;min-width:0;height:var(--_h,40px);padding:0 var(--_px,20px);margin:0;border:0;
background:var(--_bg,transparent);color:var(--_fg);border-radius:var(--_r,20px);font:500 14px/20px var(--md-ref-typeface-plain,Inter,sans-serif);letter-spacing:.01em;text-decoration:none;text-transform:none;cursor:pointer;user-select:none;-webkit-user-select:none;outline:none;
white-space:nowrap;vertical-align:top;-webkit-appearance:none;appearance:none;overflow:visible;
transition:border-radius .32s cubic-bezier(.2,0,0,1),background-color .25s,color .25s,width .38s var(--mate-spring-fast),padding .38s var(--mate-spring-fast),transform .3s var(--mate-ease-decel),box-shadow .25s}
.btn.hold{border-radius:var(--_rp,12px)}
:host([has-icon]:not([trailing-icon])) .btn{padding-inline-start:var(--_pxi,16px)}
:host([has-icon][trailing-icon]) .btn{padding-inline-end:var(--_pxi,16px)}
:host([toggle]) .btn{background:var(--_ubg,var(--_bg,transparent));color:var(--_ufg,var(--_fg))}
:host([toggle][selected]) .btn{background:var(--_sbg,var(--_bg,transparent));color:var(--_sfg,var(--_fg));border-radius:var(--_rs,12px)}
:host([toggle][selected]) .btn.hold{border-radius:var(--_rsp,20px)}
:host([toggle]:not([selected])) .btn.hold{border-radius:var(--_rp,12px)}
:host([shape=square]) .btn{border-radius:var(--_rs,12px)}:host([shape=square]) .btn.hold{border-radius:var(--_rsp,20px)}
.label{position:relative;display:inline-flex;align-items:center;overflow:hidden;text-overflow:ellipsis}
.icon{position:relative;display:none;align-items:center;justify-content:center;color:var(--_ic,inherit)}
:host([has-icon]) .icon{display:inline-flex}
:host([trailing-icon]) .icon{order:2}
::slotted([slot=icon]),slot[name=icon]::slotted(*){font-size:var(--md-button-icon-size,18px);width:var(--md-button-icon-size,18px);height:var(--md-button-icon-size,18px);--md-icon-size:var(--md-button-icon-size,18px);display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}
.outline{position:absolute;inset:0;border-radius:inherit;border:var(--_bw,0) solid var(--_bd,transparent);pointer-events:none;transition:border-color .25s}
md-elevation{--md-elevation-level:var(--_el,0);transition-duration:.25s}
@media(hover:hover) and (pointer:fine){.btn:hover md-elevation{--md-elevation-level:var(--_elh,var(--_el,0))}}
.btn.hold md-elevation,.btn:active md-elevation{--md-elevation-level:var(--_elp,var(--_el,0))}
:host([disabled]) .btn,:host([soft-disabled]) .btn{background:var(--_dbg,transparent);color:color-mix(in srgb,var(--md-sys-color-on-surface) 38%,transparent);box-shadow:none}
:host([disabled]) .outline,:host([soft-disabled]) .outline{border-color:color-mix(in srgb,var(--md-sys-color-on-surface) 12%,transparent)}
:host([disabled]) md-elevation,:host([soft-disabled]) md-elevation{--md-elevation-level:0}
:host([disabled]) .label,:host([disabled]) .icon{opacity:1}
@media(forced-colors:active){.btn{border:1px solid ButtonText}}`;

const btnVars = (n, o) => css`
:host{--md-ripple-pressed-opacity:var(--md-${n}-pressed-state-layer-opacity,0);--_r:var(--md-${n}-container-shape,20px);--_rp:var(--md-${n}-pressed-container-shape,12px);--_rs:var(--md-${n}-selected-container-shape,12px);--_rsp:var(--md-${n}-selected-pressed-container-shape,20px);
--_h:var(--md-${n}-container-height,40px);--_bg:var(--md-${n}-container-color,${o.bg});--_fg:var(--md-${n}-label-text-color,${o.fg});--_ic:var(--md-${n}-icon-color,${o.ic || 'inherit'});
--_ubg:var(--md-${n}-unselected-container-color,${o.ubg || o.bg});--_ufg:var(--md-${n}-unselected-label-text-color,${o.ufg || o.fg});
--_sbg:var(--md-${n}-selected-container-color,${o.sbg || o.bg});--_sfg:var(--md-${n}-selected-label-text-color,${o.sfg || o.fg});
--_dbg:${o.dbg || 'transparent'};--_px:${o.px || '20px'};--_pxi:16px;--_bw:${o.bw || '0'};--_bd:var(--md-${n}-outline-color,${o.bd || 'transparent'});--_el:${o.el || 0};--_elh:${o.elh || o.el || 0};
--md-ripple-hover-color:var(--md-${n}-hover-state-layer-color,${o.fg});--md-ripple-pressed-color:var(--md-${n}-pressed-state-layer-color,${o.fg})}
:host([toggle]:not([selected])){--md-ripple-hover-color:${o.ufg || o.fg};--md-ripple-pressed-color:${o.ufg || o.fg}}
:host([toggle][selected]){--md-ripple-hover-color:${o.sfg || o.fg};--md-ripple-pressed-color:${o.sfg || o.fg}}`;

class MdButtonBase extends MateElement {
  static formAssociated = true;
  static delegatesFocus = true;
  static ariaAttrs = ['aria-label', 'aria-describedby', 'aria-labelledby', 'aria-expanded', 'aria-haspopup', 'aria-controls'];
  static props = {
    disabled: { type: Boolean, reflect: true }, softDisabled: { type: Boolean, attribute: 'soft-disabled', reflect: true },
    href: { type: String, reflect: true }, download: { type: String, reflect: true }, target: { type: String, reflect: true },
    trailingIcon: { type: Boolean, attribute: 'trailing-icon', reflect: true }, hasIcon: { type: Boolean, attribute: 'has-icon', reflect: true },
    type: { type: String, reflect: true, default: 'submit' }, value: { type: String, reflect: true }, name: { type: String, reflect: true },
    toggle: { type: Boolean, reflect: true }, selected: { type: Boolean, reflect: true }, shape: { type: String, reflect: true }
  };
  static styles = BTN_CSS;
  contentHTML() { return '<span class="icon"><slot name="icon"></slot></span><span class="label"><slot></slot></span>'; }
  _mount() {
    const link = !!this.href, tag = link ? 'a' : 'button';
    this._isLink = link;
    this.shadowRoot.querySelectorAll('.btn').forEach(n => n.remove());
    const w = document.createElement('div');
    w.innerHTML = `<${tag} class="btn" part="button"${link ? '' : ' type="button"'}><md-focus-ring part="focus-ring"></md-focus-ring><md-elevation part="elevation"></md-elevation><span class="outline"></span><md-ripple part="ripple"></md-ripple>${this.contentHTML()}</${tag}>`;
    this._btn = w.firstElementChild; this.shadowRoot.appendChild(this._btn);
    this.bindHold(this._btn);
    const slot = this._btn.querySelector('slot[name=icon]');
    if (slot) { const sync = () => { this.hasIcon = slot.assignedNodes().length > 0 || this._iconAttr; }; slot.addEventListener('slotchange', sync); sync(); }
    this._ariaDirty = true;
  }
  build() {
    this._iconAttr = false; this._mount();
    this.addEventListener('click', e => this._onClick(e), true);
  }
  _onClick(e) {
    if (this.disabled || this.softDisabled) { e.stopImmediatePropagation(); e.preventDefault(); return; }
    if (this._isLink) return;
    if (this.toggle) { this.selected = !this.selected; this.emit('input', { bubbles: true, composed: true }); this.emit('change', { bubbles: true }); }
    const f = this.form; if (!f) return;
    if (this.type === 'submit') { this._internals.setFormValue(this.value || null); requestAnimationFrame(() => { f.requestSubmit(); this._internals.setFormValue(null); }); }
    else if (this.type === 'reset') f.reset();
  }
  update() {
    if (this._isLink !== !!this.href) this._mount();
    const b = this._btn;
    if (this._isLink) {
      this.disabled || this.softDisabled ? b.removeAttribute('href') : b.setAttribute('href', this.href);
      this.target ? b.setAttribute('target', this.target) : b.removeAttribute('target'); this.download ? b.setAttribute('download', this.download) : b.removeAttribute('download');
    } else { b.disabled = this.disabled; }
    b.setAttribute('aria-disabled', String(this.disabled || this.softDisabled));
    if (this.toggle) b.setAttribute('aria-pressed', String(this.selected)); else b.removeAttribute('aria-pressed');
    if (this._ariaDirty) { copyAria(this, b); this._ariaDirty = false; }
  }
  get form() { return this._internals ? this._internals.form : null; }
  get labels() { return this._internals ? this._internals.labels : []; }
  focus(o) { this._btn && this._btn.focus(o); }
  blur() { this._btn && this._btn.blur(); }
  click() { this._btn ? this._btn.click() : super.click(); }
  attributeChangedCallback(n, o, v) { if (n.startsWith('aria-')) { this._ariaDirty = true; this._schedule(); return; } super.attributeChangedCallback(n, o, v); }
  static get observedAttributes() { return [...super.observedAttributes, ...MdButtonBase.ariaAttrs]; }
}
class MdElevatedButton extends MdButtonBase { static styles = btnVars('elevated-button', { bg: 'var(--md-sys-color-surface-container-low)', fg: 'var(--md-sys-color-primary)', ic: 'var(--md-sys-color-primary)', sbg: 'var(--md-sys-color-primary)', sfg: 'var(--md-sys-color-on-primary)', dbg: 'color-mix(in srgb,var(--md-sys-color-on-surface) 12%,transparent)', el: 1, elh: 2 }); }
class MdFilledButton extends MdButtonBase { static styles = btnVars('filled-button', { bg: 'var(--md-sys-color-primary)', fg: 'var(--md-sys-color-on-primary)', ubg: 'var(--md-sys-color-surface-container)', ufg: 'var(--md-sys-color-on-surface)', sbg: 'var(--md-sys-color-primary)', sfg: 'var(--md-sys-color-on-primary)', dbg: 'color-mix(in srgb,var(--md-sys-color-on-surface) 12%,transparent)', elh: 1 }); }
class MdFilledTonalButton extends MdButtonBase { static styles = btnVars('filled-tonal-button', { bg: 'var(--md-sys-color-secondary-container)', fg: 'var(--md-sys-color-on-secondary-container)', sbg: 'var(--md-sys-color-secondary)', sfg: 'var(--md-sys-color-on-secondary)', dbg: 'color-mix(in srgb,var(--md-sys-color-on-surface) 12%,transparent)', elh: 1 }); }
class MdOutlinedButton extends MdButtonBase { static styles = btnVars('outlined-button', { bg: 'transparent', fg: 'var(--md-sys-color-primary)', ic: 'var(--md-sys-color-primary)', sbg: 'var(--md-sys-color-inverse-surface)', sfg: 'var(--md-sys-color-inverse-on-surface)', bw: '1px', bd: 'var(--md-sys-color-outline)' }); }
class MdTextButton extends MdButtonBase { static styles = btnVars('text-button', { bg: 'transparent', fg: 'var(--md-sys-color-primary)', ic: 'var(--md-sys-color-primary)', sbg: 'var(--md-sys-color-primary-container)', sfg: 'var(--md-sys-color-on-primary-container)', px: '12px' }) + css`:host([has-icon]:not([trailing-icon])) .btn{padding-inline-start:12px}:host([has-icon][trailing-icon]) .btn{padding-inline-end:12px}`; }
MdTextButton.styles = MdTextButton.styles + css`
:host{--_rp:var(--md-text-button-pressed-container-shape,20px)}
:host(:not([toggle])) .btn.hold{background:var(--md-text-button-pressed-container-color,var(--md-sys-color-primary-container))}`;
defineElement('md-elevated-button', MdElevatedButton); defineElement('md-filled-button', MdFilledButton);
defineElement('md-filled-tonal-button', MdFilledTonalButton); defineElement('md-outlined-button', MdOutlinedButton); defineElement('md-text-button', MdTextButton);

/* ---- Icon buttons ---- */
const IBTN_CSS = css`
:host{display:inline-flex;vertical-align:top;outline:none;-webkit-tap-highlight-color:transparent;width:var(--_w,40px);height:var(--_w,40px);--_gap:0}
:host([disabled]),:host([soft-disabled]){pointer-events:none}
.btn{-webkit-touch-callout:none;touch-action:manipulation;position:relative;display:inline-flex;align-items:center;justify-content:center;width:100%;height:100%;padding:0;margin:0;border:0;background:var(--_bg,transparent);color:var(--_fg);border-radius:var(--_r,20px);cursor:pointer;outline:none;text-decoration:none;
font-size:var(--md-icon-button-icon-size,24px);transition:border-radius .32s cubic-bezier(.2,0,0,1),background-color .25s,color .25s,transform .3s var(--mate-ease-decel)}
.btn.hold{border-radius:var(--_rp,12px)}
:host([toggle]) .btn{background:var(--_ubg,var(--_bg,transparent));color:var(--_ufg,var(--_fg))}
:host([toggle][selected]) .btn{background:var(--_sbg,var(--_bg,transparent));color:var(--_sfg,var(--_fg));border-radius:var(--_rs,12px)}
:host([toggle][selected]) .btn.hold{border-radius:var(--_rsp,20px)}
:host([toggle]:not([selected])) .btn.hold{border-radius:var(--_rp,12px)}
.icon{position:relative;display:inline-flex;align-items:center;justify-content:center;--md-icon-size:var(--md-icon-button-icon-size,24px)}
.icon.sel{display:none}:host([toggle][selected]) .icon.sel.has{display:inline-flex}:host([toggle][selected]) .icon.def.alt{display:none}
::slotted(*){font-size:var(--md-icon-button-icon-size,24px);--md-icon-size:var(--md-icon-button-icon-size,24px)}
:host([flip-icon-in-rtl]:dir(rtl)) .icon{transform:scaleX(-1)}
.outline{position:absolute;inset:0;border-radius:inherit;border:var(--_bw,0) solid var(--_bd,transparent);pointer-events:none}
:host([disabled]) .btn,:host([soft-disabled]) .btn{background:var(--_dbg,transparent);color:color-mix(in srgb,var(--md-sys-color-on-surface) 38%,transparent)}
:host([disabled]) .outline{border-color:color-mix(in srgb,var(--md-sys-color-on-surface) 12%,transparent)}`;
const ibVars = (n, o) => css`
:host{--md-ripple-pressed-opacity:var(--md-${n}-pressed-state-layer-opacity,0);--_r:var(--md-${n}-container-shape,20px);--_rp:var(--md-${n}-pressed-container-shape,12px);--_rs:var(--md-${n}-selected-container-shape,12px);--_rsp:var(--md-${n}-selected-pressed-container-shape,20px);
--_w:var(--md-${n}-container-width,40px);--_bg:${o.bg};--_fg:var(--md-${n}-icon-color,${o.fg});--_ubg:${o.ubg || o.bg};--_ufg:var(--md-${n}-unselected-icon-color,${o.ufg || o.fg});
--_sbg:var(--md-${n}-selected-container-color,${o.sbg || o.bg});--_sfg:var(--md-${n}-selected-icon-color,${o.sfg || o.fg});--_dbg:${o.dbg || 'transparent'};--_bw:${o.bw || '0'};--_bd:${o.bd || 'transparent'};
--md-ripple-hover-color:${o.fg};--md-ripple-pressed-color:${o.fg}}
:host([toggle]:not([selected])){--md-ripple-hover-color:${o.ufg || o.fg};--md-ripple-pressed-color:${o.ufg || o.fg}}
:host([toggle][selected]){--md-ripple-hover-color:${o.sfg || o.fg};--md-ripple-pressed-color:${o.sfg || o.fg}}`;
const DIS12 = 'color-mix(in srgb,var(--md-sys-color-on-surface) 12%,transparent)';

class MdIconButtonBase extends MdButtonBase {
  static props = { flipIconInRtl: { type: Boolean, attribute: 'flip-icon-in-rtl', reflect: true }, ariaLabelSelected: { type: String, attribute: 'aria-label-selected' } };
  static styles = IBTN_CSS;
  contentHTML() { return '<span class="icon def"><slot></slot></span><span class="icon sel"><slot name="selected"></slot></span>'; }
  _mount() {
    super._mount();
    const s = this._btn.querySelector('slot[name=selected]'), d = this._btn.querySelector('.icon.sel'), df = this._btn.querySelector('.icon.def');
    const sync = () => { const has = s.assignedNodes().length > 0; d.classList.toggle('has', has); df.classList.toggle('alt', has); };
    s.addEventListener('slotchange', sync); sync();
  }
  update() {
    super.update();
    if (this.toggle && this.selected && this.ariaLabelSelected) this._btn.setAttribute('aria-label', this.ariaLabelSelected);
    else if (this._ariaDirty === false && this.getAttribute('aria-label')) this._btn.setAttribute('aria-label', this.getAttribute('aria-label'));
  }
  get hasIcon() { return true; } set hasIcon(v) { }
}
class MdIconButton extends MdIconButtonBase { static styles = ibVars('icon-button', { bg: 'transparent', fg: 'var(--md-sys-color-on-surface-variant)', sfg: 'var(--md-sys-color-primary)' }); }
class MdFilledIconButton extends MdIconButtonBase { static styles = ibVars('filled-icon-button', { bg: 'var(--md-sys-color-primary)', fg: 'var(--md-sys-color-on-primary)', ubg: 'var(--md-sys-color-surface-container)', ufg: 'var(--md-sys-color-primary)', dbg: DIS12 }); }
class MdFilledTonalIconButton extends MdIconButtonBase { static styles = ibVars('filled-tonal-icon-button', { bg: 'var(--md-sys-color-primary-container)', fg: 'var(--md-sys-color-on-primary-container)', ubg: 'var(--md-sys-color-surface-container)', ufg: 'var(--md-sys-color-on-surface-variant)', sbg: 'var(--md-sys-color-primary-container)', sfg: 'var(--md-sys-color-on-primary-container)', dbg: DIS12 }); }
class MdOutlinedIconButton extends MdIconButtonBase { static styles = ibVars('outlined-icon-button', { bg: 'transparent', fg: 'var(--md-sys-color-on-surface-variant)', sbg: 'var(--md-sys-color-inverse-surface)', sfg: 'var(--md-sys-color-inverse-on-surface)', bw: '1px', bd: 'var(--md-sys-color-outline)' }); }
MdIconButton.styles = MdIconButton.styles + css`
:host{--_rp:var(--md-icon-button-pressed-container-shape,20px)}
.btn{transition:border-radius .32s cubic-bezier(.2,0,0,1),background-color .25s,color .25s,transform .3s var(--mate-spring-fast)}
:host(:not([toggle])) .btn.hold{background:var(--md-icon-button-pressed-container-color,var(--md-sys-color-primary-container));transform:rotate(var(--md-icon-button-pressed-rotation,35deg))}
:host([toggle]) .btn.hold{transform:rotate(var(--md-icon-button-pressed-toggle-rotation,24deg)) scale(.9)}`;
defineElement('md-icon-button', MdIconButton); defineElement('md-filled-icon-button', MdFilledIconButton);
defineElement('md-filled-tonal-icon-button', MdFilledTonalIconButton); defineElement('md-outlined-icon-button', MdOutlinedIconButton);

/* ---- FAB ---- */
class MdFabBase extends MdButtonBase {
  static props = { variant: { type: String, reflect: true, default: 'surface' }, size: { type: String, reflect: true, default: 'medium' }, label: { type: String, reflect: true }, lowered: { type: Boolean, reflect: true } };
  static styles = css`
:host{display:inline-flex;vertical-align:top;--md-ripple-pressed-opacity:0;--_h:56px;--_r:16px;--_rp:28px;--_ic-size:24px;
--_bg:var(--md-fab-container-color,var(--md-sys-color-surface-container-high));--_fg:var(--md-fab-icon-color,var(--md-sys-color-primary));--_sh:var(--mate-shadow-floating)}
:host([variant=primary]){--_bg:var(--md-fab-primary-container-color,var(--md-sys-color-floating));--_fg:var(--md-fab-primary-icon-color,var(--md-sys-color-on-floating))}
:host([variant=secondary]){--_bg:var(--md-fab-secondary-container-color,var(--md-sys-color-secondary-container));--_fg:var(--md-sys-color-on-secondary-container)}
:host([variant=tertiary]){--_bg:var(--md-fab-tertiary-container-color,var(--md-sys-color-tertiary-container));--_fg:var(--md-sys-color-on-tertiary-container)}
:host([size=small]){--_h:40px;--_r:12px;--_rp:20px}:host([size=large]){--_h:96px;--_r:28px;--_rp:48px;--_ic-size:36px}
:host([lowered]){--_sh:var(--mate-shadow-back)}
.btn{height:var(--_h);min-width:var(--_h);width:auto;padding:0;gap:0;background:var(--_bg);color:var(--_fg);border-radius:var(--_r);box-shadow:var(--_sh);font-weight:600;letter-spacing:0}
.btn.hold{border-radius:var(--_rp)}
:host([variant=tertiary]) .btn{transition:border-radius .35s var(--mate-spring-fast),background-color .25s,color .25s,transform .35s var(--mate-spring-fast)}
:host([variant=tertiary]) .btn.hold{border-radius:32px;transform:rotate(90deg)}
:host([label]:not([label=""])) .btn{padding:0 20px}:host([label]:not([label=""])[size=small]) .btn{padding:0 16px}
.icon{display:inline-flex;--md-icon-size:var(--_ic-size)}
::slotted([slot=icon]){font-size:var(--_ic-size);--md-icon-size:var(--_ic-size);width:var(--_ic-size);height:var(--_ic-size)}
.label{max-width:0;opacity:0;margin:0;transition:max-width .38s var(--mate-spring-fast),opacity .2s,margin .3s}
:host([label]:not([label=""])) .label{max-width:260px;opacity:1;margin-inline-start:10px}
md-elevation{display:none}
:host([disabled]) .btn{box-shadow:none;background:${DIS12}}
`;
  _mount() { super._mount(); this._lbl = this._btn.querySelector('.label'); }
  contentHTML() { return '<span class="icon"><slot name="icon"></slot><slot name="icon-fallback"></slot></span><span class="label"></span>'; }
  update() { super.update(); this._lbl.textContent = this.label || ''; this.hasIcon = true; if (this.label) this._btn.setAttribute('aria-label', this.getAttribute('aria-label') || this.label); }
  get hasIcon() { return true; } set hasIcon(v) { }
}
class MdFab extends MdFabBase { }
class MdBrandedFab extends MdFabBase { static props = { size: { type: String, reflect: true, default: 'medium' } }; }
defineElement('md-fab', MdFab); defineElement('md-branded-fab', MdBrandedFab);

/* ==========================================================================
   03. Selection controls — md-checkbox · md-radio · md-switch · md-slider
   ========================================================================== */
class MdFormControl extends MateElement {
  static formAssociated = true;
  static delegatesFocus = true;
  static ariaAttrs = ['aria-label', 'aria-describedby', 'aria-labelledby'];
  get form() { return this._internals ? this._internals.form : null; }
  get labels() { return this._internals ? this._internals.labels : []; }
  get validity() { return this._internals.validity; }
  get validationMessage() { return this._internals.validationMessage; }
  get willValidate() { return this._internals.willValidate; }
  checkValidity() { return this._internals.checkValidity(); }
  reportValidity() { return this._internals.reportValidity(); }
  setCustomValidity(m) { this._custom = m || ''; this._validate(); }
  _validate() { }
  formDisabledCallback(d) { this.disabled = d; }
  focus(o) { this._in && this._in.focus(o); }
  blur() { this._in && this._in.blur(); }
  attributeChangedCallback(n, o, v) { if (n.startsWith('aria-')) { this._ariaDirty = true; this._schedule(); return; } super.attributeChangedCallback(n, o, v); }
  static get observedAttributes() { return [...super.observedAttributes, 'aria-label', 'aria-describedby', 'aria-labelledby']; }
}

/* ---- Checkbox ---- */
class MdCheckbox extends MdFormControl {
  static props = { checked: { type: Boolean, reflect: true }, indeterminate: { type: Boolean, reflect: true }, disabled: { type: Boolean, reflect: true }, required: { type: Boolean, reflect: true }, error: { type: Boolean, reflect: true }, value: { type: String, default: 'on' }, name: { type: String, reflect: true } };
  static styles = css`
:host{display:inline-flex;vertical-align:top;position:relative;width:var(--md-checkbox-state-layer-size,40px);height:var(--md-checkbox-state-layer-size,40px);outline:none;-webkit-tap-highlight-color:transparent;cursor:pointer;
--_sz:var(--md-checkbox-container-size,18px);--_r:var(--md-checkbox-container-shape,2px);--_off:var(--md-checkbox-outline-color,var(--md-sys-color-on-surface-variant));--_on:var(--md-checkbox-selected-container-color,var(--md-sys-color-primary));--_mark:var(--md-checkbox-selected-icon-color,var(--md-sys-color-on-primary))}
:host([disabled]){cursor:default;pointer-events:none}
:host([error]){--_off:var(--md-sys-color-error);--_on:var(--md-sys-color-error);--_mark:var(--md-sys-color-on-error)}
.state{position:absolute;inset:0;border-radius:50%;display:flex;align-items:center;justify-content:center;--md-ripple-hover-color:var(--_off);--md-ripple-pressed-color:var(--_on)}
.state md-ripple{border-radius:50%}
.box{position:relative;width:var(--_sz);height:var(--_sz);border-radius:var(--_r);border:2px solid var(--_off);background:transparent;display:flex;align-items:center;justify-content:center;
transition:background-color .2s,border-color .2s,transform .3s var(--mate-spring-fast),border-radius .3s var(--mate-spring-fast)}
:host(:active) .box{transform:scale(.86);border-radius:5px}
:host([checked]) .box,:host([indeterminate]) .box{background:var(--_on);border-color:var(--_on)}
svg{position:absolute;inset:-2px;width:calc(100% + 4px);height:calc(100% + 4px);fill:none;stroke:var(--_mark);stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;pointer-events:none}
.tick{stroke-dasharray:14;stroke-dashoffset:14;transition:stroke-dashoffset .3s var(--mate-ease-decel)}
.dash{stroke-dasharray:10;stroke-dashoffset:10;transition:stroke-dashoffset .25s var(--mate-ease-decel)}
:host([checked]:not([indeterminate])) .tick{stroke-dashoffset:0;transition-delay:.05s}:host([indeterminate]) .dash{stroke-dashoffset:0}
:host([disabled]) .box{border-color:color-mix(in srgb,var(--md-sys-color-on-surface) 38%,transparent)}
:host([disabled][checked]) .box,:host([disabled][indeterminate]) .box{background:color-mix(in srgb,var(--md-sys-color-on-surface) 38%,transparent);border-color:transparent}
:host([disabled]) svg{stroke:var(--md-sys-color-surface)}
md-focus-ring{border-radius:50%;--md-focus-ring-offset:0px}
input{appearance:none;-webkit-appearance:none;position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:inherit;z-index:1}`;
  build() {
    this.shadowRoot.innerHTML = '<div class="state"><md-ripple for="in"></md-ripple><md-focus-ring for="in" part="focus-ring"></md-focus-ring><div class="box"><svg viewBox="0 0 18 18"><path class="tick" d="M5 9.4 7.9 12.3 13 6.2"/><path class="dash" d="M5.2 9h7.6"/></svg></div></div><input id="in" type="checkbox">';
    this._in = this.$('input'); this._ariaDirty = true; this._custom = '';
    this._in.addEventListener('click', e => { if (this.disabled) return; this.checked = this._in.checked; this.indeterminate = false; this._sync(); });
    this._in.addEventListener('change', e => { e.stopPropagation(); this.redispatch(e); });
  }
  _validate() { const v = this.required && !this.checked; this._internals.setValidity(v ? { valueMissing: true } : this._custom ? { customError: true } : {}, v ? 'Please check this box if you want to proceed.' : this._custom, this._in); }
  _sync() { this._internals.setFormValue(this.checked ? this.value || 'on' : null); this._validate(); }
  update() {
    const i = this._in; i.checked = this.checked; i.indeterminate = this.indeterminate; i.disabled = this.disabled; i.required = this.required;
    i.setAttribute('aria-checked', this.indeterminate ? 'mixed' : String(this.checked));
    if (this._ariaDirty) { copyAria(this, i); this._ariaDirty = false; }
    this._sync();
  }
  formResetCallback() { this.checked = this.hasAttribute('checked'); this.indeterminate = false; }
  formStateRestoreCallback(s) { this.checked = s === 'true'; }
}
defineElement('md-checkbox', MdCheckbox);

/* ---- Radio ---- */
class MdRadio extends MdFormControl {
  static props = { checked: { type: Boolean, reflect: true }, disabled: { type: Boolean, reflect: true }, required: { type: Boolean, reflect: true }, value: { type: String, default: 'on' }, name: { type: String, reflect: true } };
  static styles = css`
:host{display:inline-flex;vertical-align:top;position:relative;width:var(--md-radio-state-layer-size,40px);height:var(--md-radio-state-layer-size,40px);outline:none;-webkit-tap-highlight-color:transparent;cursor:pointer;
--_off:var(--md-radio-icon-color,var(--md-sys-color-on-surface-variant));--_on:var(--md-radio-selected-icon-color,var(--md-sys-color-primary))}
:host([disabled]){cursor:default;pointer-events:none}
.state{position:absolute;inset:0;border-radius:50%;display:flex;align-items:center;justify-content:center;--md-ripple-hover-color:var(--_off);--md-ripple-pressed-color:var(--_on)}
.state md-ripple{border-radius:50%}
.ring{position:relative;width:var(--md-radio-icon-size,20px);height:var(--md-radio-icon-size,20px);border-radius:50%;border:2px solid var(--_off);display:flex;align-items:center;justify-content:center;transition:border-color .2s,transform .3s var(--mate-spring-fast)}
:host(:active) .ring{transform:scale(.88)}
.dot{width:10px;height:10px;border-radius:50%;background:var(--_on);transform:scale(0);transition:transform .36s var(--mate-spring-fast)}
:host([checked]) .ring{border-color:var(--_on)}:host([checked]) .dot{transform:scale(1)}
:host([disabled]) .ring{border-color:color-mix(in srgb,var(--md-sys-color-on-surface) 38%,transparent)}:host([disabled]) .dot{background:color-mix(in srgb,var(--md-sys-color-on-surface) 38%,transparent)}
md-focus-ring{border-radius:50%;--md-focus-ring-offset:0px}
input{appearance:none;-webkit-appearance:none;position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:inherit;z-index:1}`;
  build() {
    this.shadowRoot.innerHTML = '<div class="state"><md-ripple for="in"></md-ripple><md-focus-ring for="in" part="focus-ring"></md-focus-ring><div class="ring"><div class="dot"></div></div></div><input id="in" type="radio">';
    this._in = this.$('input'); this._ariaDirty = true; this._custom = '';
    this._in.addEventListener('click', () => { if (this.disabled) return; if (!this.checked) { this.checked = true; this._uncheckOthers(); this.emit('input', { bubbles: true, composed: true }); this.emit('change', { bubbles: true }); } this._in.checked = true; });
    this._in.addEventListener('change', e => e.stopPropagation());
    this._in.addEventListener('input', e => e.stopPropagation());
    this._in.addEventListener('keydown', e => this._key(e));
  }
  get _group() {
    if (!this.name) return [this];
    const root = this.getRootNode(), f = this.form;
    return Array.from(root.querySelectorAll ? root.querySelectorAll('md-radio') : []).filter(r => r.name === this.name && r.form === f);
  }
  _uncheckOthers() { for (const r of this._group) { if (r === this) continue; if (r.checked) r.checked = false; r._schedule(); } }
  _key(e) {
    const k = e.key; if (!['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'].includes(k)) return;
    const g = this._group.filter(r => !r.disabled); if (g.length < 2) return;
    e.preventDefault(); const rtl = getComputedStyle(this).direction === 'rtl';
    const fwd = k === 'ArrowDown' || (k === 'ArrowRight' && !rtl) || (k === 'ArrowLeft' && rtl);
    const i = g.indexOf(this), n = g[(i + (fwd ? 1 : -1) + g.length) % g.length];
    n.focus(); n._in.click();
  }
  _validate() {
    const none = this.required && !this._group.some(r => r.checked);
    this._internals.setValidity(none ? { valueMissing: true } : this._custom ? { customError: true } : {}, none ? 'Please select one of these options.' : this._custom, this._in);
  }
  update() {
    const i = this._in; i.checked = this.checked; i.disabled = this.disabled; i.required = this.required;
    const g = this._group, any = g.some(r => r.checked); i.tabIndex = this.checked || (!any && g.find(r => !r.disabled) === this) ? 0 : -1;
    i.setAttribute('aria-checked', String(this.checked));
    if (this._ariaDirty) { copyAria(this, i); this._ariaDirty = false; }
    this._internals.setFormValue(this.checked ? this.value || 'on' : null); this._validate();
    if (this.checked) this._uncheckOthers();
  }
  formResetCallback() { this.checked = this.hasAttribute('checked'); }
  formStateRestoreCallback(s) { this.checked = s === 'true'; }
}
defineElement('md-radio', MdRadio);

/* ---- Switch ---- HTML: 52x32 pill, 2px outline border, 16px thumb → 24px selected, squish on press (28x24 / 30x24) */
class MdSwitch extends MdFormControl {
  static props = { selected: { type: Boolean, reflect: true }, icons: { type: Boolean, reflect: true }, noIcons: { type: Boolean, attribute: 'no-icons', reflect: true }, showOnlySelectedIcon: { type: Boolean, attribute: 'show-only-selected-icon', reflect: true }, disabled: { type: Boolean, reflect: true }, required: { type: Boolean, reflect: true }, value: { type: String, default: 'on' }, name: { type: String, reflect: true } };
  static styles = css`
:host{display:inline-flex;vertical-align:top;position:relative;outline:none;-webkit-tap-highlight-color:transparent;cursor:pointer;
--_tw:var(--md-switch-track-width,52px);--_th:var(--md-switch-track-height,32px);
--_toff:var(--md-switch-track-color,var(--md-sys-color-surface-container-highest));--_oline:var(--md-switch-track-outline-color,var(--md-sys-color-outline));
--_ton:var(--md-switch-selected-track-color,var(--md-sys-color-primary));--_hoff:var(--md-switch-handle-color,var(--md-sys-color-outline));--_hon:var(--md-switch-selected-handle-color,var(--md-sys-color-on-primary));
--_ioff:var(--md-switch-icon-color,var(--md-sys-color-surface-container-highest));--_ion:var(--md-switch-selected-icon-color,var(--md-sys-color-primary))}
:host([disabled]){cursor:default;pointer-events:none}
.track{box-sizing:border-box;position:relative;width:var(--_tw);height:var(--_th);border-radius:999px;background:var(--_toff);border:2px solid var(--_oline);display:inline-flex;align-items:center;flex-shrink:0;
transition:background-color .28s ease,border-color .28s ease}
.thumb{position:absolute;top:50%;left:6px;width:16px;height:16px;margin-top:-8px;border-radius:999px;background:var(--_hoff);color:var(--_ioff);display:flex;align-items:center;justify-content:center;
transition:left .36s var(--mate-spring-fast),width .3s var(--mate-spring-fast),height .3s var(--mate-spring-fast),margin-top .3s var(--mate-spring-fast),background-color .25s ease,color .25s ease}
:host([icons]) .thumb{left:2px;width:24px;height:24px;margin-top:-12px}
:host([icons]:active) .thumb,:host([icons].pressing) .thumb{left:0;width:28px;height:28px;margin-top:-14px}
.thumb md-ripple{inset:-8px;border-radius:50%;--md-ripple-hover-color:var(--_oline);--md-ripple-pressed-color:var(--_oline)}
md-focus-ring{border-radius:999px}
.icon{position:absolute;display:flex;align-items:center;justify-content:center;width:16px;height:16px;opacity:0;transform:scale(.5);transition:opacity .2s,transform .3s var(--mate-spring-fast);pointer-events:none}
.icon svg{display:block;width:16px;height:16px;fill:currentColor}
:host([icons]) .icon.off{opacity:1;transform:none}:host([icons][selected]) .icon.off{opacity:0;transform:scale(.5)}
:host([selected]:not([no-icons])) .icon.on,:host([icons][selected]) .icon.on{opacity:1;transform:none}:host([show-only-selected-icon]:not([selected])) .icon.off{opacity:0}
:host([show-only-selected-icon]:not([selected])) .thumb{left:6px;width:16px;height:16px;margin-top:-8px}
:host(:active) .thumb,:host(.pressing) .thumb{left:0;width:28px;height:28px;margin-top:-14px}
:host([selected]) .track{background:var(--_ton);border-color:var(--_ton)}
:host([selected]) .thumb{left:22px;width:24px;height:24px;margin-top:-12px;background:var(--_hon);color:var(--_ion)}
:host([selected]:active) .thumb,:host([selected].pressing) .thumb{left:20px;width:28px;height:28px;margin-top:-14px}
:host([disabled]) .track{background:color-mix(in srgb,var(--md-sys-color-surface-container-highest) 12%,transparent);border-color:color-mix(in srgb,var(--md-sys-color-on-surface) 12%,transparent)}
:host([disabled]) .thumb{background:color-mix(in srgb,var(--md-sys-color-on-surface) 38%,transparent)}
:host([disabled][selected]) .track{background:color-mix(in srgb,var(--md-sys-color-on-surface) 12%,transparent);border-color:transparent}
:host([disabled][selected]) .thumb{background:var(--md-sys-color-surface)}
input{appearance:none;-webkit-appearance:none;position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:inherit;z-index:1}`;
  build() {
    this.shadowRoot.innerHTML = '<div class="track" part="track"><div class="thumb" part="handle"><md-ripple for="in"></md-ripple><span class="icon on"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></span><span class="icon off"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></span></div><md-focus-ring for="in" part="focus-ring"></md-focus-ring></div><input id="in" type="checkbox" role="switch">';
    this._in = this.$('input'); this._ariaDirty = true; this._custom = '';
    this._in.addEventListener('click', () => { if (this.disabled) return; this.selected = this._in.checked; this._sync(); });
    this._in.addEventListener('change', e => { e.stopPropagation(); this.redispatch(e); });
    const press = on => () => this.classList.toggle('pressing', on);
    this._in.addEventListener('pointerdown', press(true)); ['pointerup', 'pointercancel', 'pointerleave'].forEach(t => this._in.addEventListener(t, press(false)));
  }
  _validate() { const v = this.required && !this.selected; this._internals.setValidity(v ? { valueMissing: true } : this._custom ? { customError: true } : {}, v ? 'Please turn this switch on if you want to proceed.' : this._custom, this._in); }
  _sync() { this._internals.setFormValue(this.selected ? this.value || 'on' : null); this._validate(); }
  update() {
    const i = this._in; i.checked = this.selected; i.disabled = this.disabled; i.required = this.required;
    if (this._ariaDirty) { copyAria(this, i); this._ariaDirty = false; }
    this._sync();
  }
  formResetCallback() { this.selected = this.hasAttribute('selected'); }
  formStateRestoreCallback(s) { this.selected = s === 'true'; }
}
defineElement('md-switch', MdSwitch);

/* ---- Slider ---- HTML: 36px high, 16px track, 4x32 detached handle pill (6x36 pressed), 4px gap (6px pressed), 4px tick dots */
class MdSlider extends MdFormControl {
  static props = {
    min: { type: Number, default: 0, reflect: true }, max: { type: Number, default: 100, reflect: true }, value: { type: Number, default: 50 },
    valueStart: { type: Number, attribute: 'value-start', default: NaN }, valueEnd: { type: Number, attribute: 'value-end', default: NaN },
    valueLabel: { type: String, attribute: 'value-label' }, valueLabelStart: { type: String, attribute: 'value-label-start' }, valueLabelEnd: { type: String, attribute: 'value-label-end' },
    ariaLabelStart: { type: String, attribute: 'aria-label-start' }, ariaValueTextStart: { type: String, attribute: 'aria-valuetext-start' }, ariaLabelEnd: { type: String, attribute: 'aria-label-end' }, ariaValueTextEnd: { type: String, attribute: 'aria-valuetext-end' },
    step: { type: Number, default: 1, reflect: true }, ticks: { type: Boolean, reflect: true }, labeled: { type: Boolean, reflect: true }, range: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true }, required: { type: Boolean, reflect: true }, name: { type: String, reflect: true },
    nameStart: { type: String, attribute: 'name-start' }, nameEnd: { type: String, attribute: 'name-end' },
    size: { type: String, reflect: true }, vertical: { type: Boolean, reflect: true }, trackHeight: { type: Number, attribute: 'track-height', default: 0 },
    iconPosition: { type: String, attribute: 'icon-position', reflect: true }, hasIcon: { type: Boolean, attribute: 'has-icon', reflect: true },
    wavy: { type: Boolean, reflect: true }, centered: { type: Boolean, reflect: true }, origin: { type: Number, default: NaN }
  };
  static styles = css`
:host{display:inline-flex;vertical-align:top;position:relative;min-width:200px;flex:1 1 auto;height:var(--_sh);outline:none;-webkit-tap-highlight-color:transparent;touch-action:none;
--_a:var(--md-slider-active-track-color,var(--md-sys-color-primary));--_i:var(--md-slider-inactive-track-color,var(--md-sys-color-primary-container));--_h:var(--md-slider-handle-color,var(--md-sys-color-primary));
--_tw:16px;--_gx:6px;--_th:var(--_thx,var(--md-slider-track-height,var(--md-slider-active-track-height,var(--_thsz,16px))));--_hh:calc(var(--_th) + 16px);--_sh:calc(var(--_hh) + 4px);--_ro:min(calc(var(--_th)/2),max(8px,calc(var(--_th)*.3)))}
:host([size=xs]){--_thsz:16px}:host([size=s]){--_thsz:24px}:host([size=m]){--_thsz:40px}:host([size=l]){--_thsz:56px}:host([size=xl]){--_thsz:96px}
:host([disabled]){pointer-events:none;--_a:color-mix(in srgb,var(--md-sys-color-on-surface) 38%,transparent);--_i:color-mix(in srgb,var(--md-sys-color-on-surface) 12%,transparent);--_h:color-mix(in srgb,var(--md-sys-color-on-surface) 38%,transparent)}
.slider{position:relative;flex:1;height:100%;--f0:0;--f1:.5}
.slider.dragging{--_gx:9px}
.track{position:absolute;inset:0}
.seg{position:absolute;top:50%;height:var(--_th);margin-top:calc(var(--_th)/-2);overflow:hidden;transition:height .25s var(--mate-spring-fast),border-radius .25s var(--mate-spring-fast)}
.x1{--X:calc(var(--_tw)/2 + var(--f1)*(100% - var(--_tw)))}
.slider{--X1:calc(var(--_tw)/2 + var(--f1)*(100% - var(--_tw)));--X0:calc(var(--_tw)/2 + var(--f0)*(100% - var(--_tw)));--Xh:var(--X1)}
.active{background:var(--_a);left:0;width:max(0px,calc(var(--X1) - var(--_gx)));border-radius:var(--_ro) 2px 2px var(--_ro)}
.slider.range .active{left:calc(var(--X0) + var(--_gx));width:max(0px,calc(var(--X1) - var(--X0) - 2*var(--_gx)));border-radius:2px}
.inactive.r{background:var(--_i);left:calc(var(--X1) + var(--_gx));right:0;border-radius:2px var(--_ro) var(--_ro) 2px}
.inactive.l{background:var(--_i);left:0;width:max(0px,calc(var(--X0) - var(--_gx)));border-radius:var(--_ro) 2px 2px var(--_ro);display:none}
.slider.range .inactive.l{display:block}
.enddot{position:absolute;right:6px;top:50%;width:4px;height:4px;margin-top:-2px;border-radius:50%;background:var(--md-sys-color-on-surface-variant);pointer-events:none;transition:opacity .15s}
.ticks{position:absolute;inset:0;pointer-events:none}
.tick{position:absolute;top:50%;width:4px;height:4px;margin:-2px 0 0 -2px;border-radius:50%;background:var(--md-sys-color-on-primary-container);transition:background-color .15s ease,opacity .15s}
.tick.passed{background:var(--md-sys-color-on-primary)}.tick.hide{opacity:0}
.handle{position:absolute;top:50%;left:var(--Xh);width:4px;height:var(--_hh);margin:calc(var(--_hh)/-2) 0 0 -2px;border-radius:2px;background:var(--_h);
transition:width .28s var(--mate-spring-fast),height .28s var(--mate-spring-fast),border-radius .28s var(--mate-spring-fast),margin .28s var(--mate-spring-fast)}
.handle.s{left:var(--X0);display:none}.slider.range .handle.s{display:block}
.slider.dragging .handle{width:6px;height:calc(var(--_hh) + 4px);margin:calc((var(--_hh) + 4px)/-2) 0 0 -3px;border-radius:3px}
.label{position:absolute;left:50%;bottom:calc(100% + 10px);min-width:28px;height:28px;padding:0 10px;border-radius:14px;background:var(--md-sys-color-inverse-surface);color:var(--md-sys-color-inverse-on-surface);display:flex;align-items:center;justify-content:center;font:500 12px/16px var(--md-ref-typeface-plain,Inter,sans-serif);
transform:translateX(-50%) scale(.4);transform-origin:50% 100%;opacity:0;pointer-events:none;transition:transform .32s var(--mate-spring-fast),opacity .15s;white-space:nowrap}
:host(:not([labeled])) .label{display:none}
.slider.dragging .label,.slider.kfocus .label{transform:translateX(-50%) scale(1);opacity:1}
.in{position:absolute;inset:0;width:100%;height:100%;margin:0;padding:0;opacity:0;cursor:pointer;-webkit-appearance:none;appearance:none;background:transparent;z-index:1}
.in::-webkit-slider-runnable-track{height:var(--_sh);-webkit-appearance:none}.in::-webkit-slider-thumb{-webkit-appearance:none;width:var(--_tw);height:var(--_sh);opacity:0}
.in::-moz-range-thumb{width:var(--_tw);height:var(--_sh);opacity:0;border:0}.in::-moz-range-track{background:transparent}
.slider.range .in{pointer-events:none}.slider.range .in::-webkit-slider-thumb{pointer-events:auto}.slider.range .in::-moz-range-thumb{pointer-events:auto}
.in.s{display:none}.slider.range .in.s{display:block}
md-focus-ring{inset:calc((var(--_sh) - var(--_hh))/2 - 2px) 0;border-radius:calc(var(--_hh)/2)}
.iconbox{position:absolute;top:50%;right:max(8px,calc((var(--_th) - 24px)/2 + 4px));width:24px;height:24px;margin-top:-12px;display:none;align-items:center;justify-content:center;pointer-events:none;z-index:0;
color:var(--md-slider-icon-color,var(--md-sys-color-on-primary-container));transition:color .2s ease;--md-icon-size:24px}
.iconbox ::slotted(*){font-size:24px}
:host([has-icon]) .iconbox{display:flex}.iconbox.small{display:none!important}.iconbox.on-active{color:var(--md-slider-active-icon-color,var(--md-sys-color-on-primary))}
:host([icon-position=start]) .iconbox{right:auto;left:max(8px,calc((var(--_th) - 24px)/2 + 4px))}
:host([has-icon]) .enddot{display:none}
:host([vertical]){width:var(--_sh);height:200px;min-width:0;min-height:96px;flex:none}
:host([vertical]) .slider{position:absolute;left:50%;top:50%;width:var(--_vl,200px);height:var(--_sh);transform:translate(-50%,-50%) rotate(-90deg)}
:host([vertical]) .iconbox{transform:rotate(90deg)}
:host([vertical]) .label{transform:translateX(-50%) rotate(90deg) scale(.4)}
:host([vertical]) .slider.dragging .label,:host([vertical]) .slider.kfocus .label{transform:translateX(-50%) rotate(90deg) scale(1)}
:host([vertical]) .in{pointer-events:none}
.slider.centered .active{left:calc(var(--X0) + var(--_gx));width:max(0px,calc(var(--X1) - var(--X0) - 2*var(--_gx)));border-radius:2px}
.slider.centered .inactive.l{display:block}
.wave{display:none;position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible;pointer-events:none}
.wave path{fill:none;stroke:var(--_a);stroke-linecap:round;stroke-linejoin:round}
:host([wavy]) .wave{display:block}:host([wavy]) .seg.active{background:transparent}
:host([wavy]) .inactive{height:min(calc(var(--_th)*.5),10px);margin-top:calc(min(calc(var(--_th)*.5),10px)/-2);border-radius:999px!important}`;
  build() {
    this.shadowRoot.innerHTML = '<div class="slider" part="slider"><div class="track"><div class="seg inactive l"></div><div class="seg active"></div><div class="seg inactive r"><span class="enddot"></span></div><svg class="wave" aria-hidden="true"><path/></svg><div class="ticks"></div><div class="iconbox" part="icon"><slot name="icon"></slot></div>' +
      '<div class="handle s"><div class="label ls"></div></div><div class="handle e"><div class="label le"></div></div></div>' +
      '<input class="in s" type="range" part="input-start"><input class="in e" type="range" part="input-end"></div>';
    this._root = this.$('.slider'); this._inS = this.$('.in.s'); this._inE = this.$('.in.e'); this._in = this._inE; this._ticks = this.$('.ticks');
    this._ariaDirty = true; this._tickKey = '';
    const isl = this.$('slot[name=icon]'); const fi = () => { this.hasIcon = isl.assignedNodes().length > 0; }; isl.addEventListener('slotchange', fi); fi();
    const ro = new ResizeObserver(() => { if (this.vertical) this._root.style.setProperty('--_vl', this.clientHeight + 'px'); this._layoutTicks(); }); ro.observe(this); this._ro = ro;
    const onInput = which => e => {
      const i = which === 's' ? this._inS : this._inE, v = Number(i.value);
      if (this.range) {
        const s = this._start(), en = this._end();
        if (which === 's') { const nv = Math.min(v, en); this.valueStart = nv; i.value = nv; } else { const nv = Math.max(v, s); this.valueEnd = nv; i.value = nv; }
      } else this.value = v;
      this._sync(); this._paint();
    };
    this._inS.addEventListener('input', onInput('s')); this._inE.addEventListener('input', onInput('e'));
    for (const i of [this._inS, this._inE]) {
      i.addEventListener('change', e => { e.stopPropagation(); this.redispatch(e); });
      i.addEventListener('pointerdown', () => { this._root.classList.add('dragging'); this._paint(); });
      i.addEventListener('focus', () => { if (_kbModality) this._root.classList.add('kfocus'); });
      i.addEventListener('blur', () => this._root.classList.remove('kfocus'));
    }
    const up = () => this._root.classList.remove('dragging'); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
    this._up = up;
    /* vertical: the native range input is rotated, which is unreliable for touch; drive the value from pointer position instead */
    const root = this._root;
    root.addEventListener('pointerdown', e => {
      if (!this.vertical || this.disabled || e.button > 0) return; e.preventDefault();
      try { root.setPointerCapture(e.pointerId); } catch (er) { }
      this._vd = { id: e.pointerId, which: 'e' }; root.classList.add('dragging'); this._vmove(e, true);
    });
    root.addEventListener('pointermove', e => { if (this._vd && this._vd.id === e.pointerId) this._vmove(e, false); });
    const vend = e => { const d = this._vd; if (!d || d.id !== e.pointerId) return; this._vd = null; root.classList.remove('dragging'); this._paint(); (d.which === 's' ? this._inS : this._inE).dispatchEvent(new Event('change', { bubbles: true })); };
    root.addEventListener('pointerup', vend); root.addEventListener('pointercancel', vend);
  }
  _vmove(e, first) {
    const r = this.getBoundingClientRect(), tw = 16, h = Math.max(1, r.height - tw), min = this.min, max = this.max, step = this.step || 1;
    const f = Math.min(1, Math.max(0, 1 - (e.clientY - r.top - tw / 2) / h)); const v = this._clamp(min + Math.round(f * (max - min) / step) * step);
    if (this.range && first) { const s = this._start(), en = this._end(); this._vd.which = v <= s ? 's' : v >= en ? 'e' : (Math.abs(v - s) <= Math.abs(v - en) ? 's' : 'e'); }
    const i = this.range && this._vd.which === 's' ? this._inS : this._inE;
    if (Number(i.value) !== v) { i.value = v; i.dispatchEvent(new Event('input', { bubbles: true, composed: true })); }
  }
  disconnectedCallback() { if (this._wr) { cancelAnimationFrame(this._wr); this._wr = 0; } if (this._ro) this._ro.disconnect(); window.removeEventListener('pointerup', this._up); window.removeEventListener('pointercancel', this._up); }
  connectedCallback() { super.connectedCallback(); if (this._ro) this._ro.observe(this); window.addEventListener('pointerup', this._up); }
  _clamp(v) { return Math.min(this.max, Math.max(this.min, v)); }
  _start() { return this._clamp(Number.isNaN(this.valueStart) ? this.min + (this.max - this.min) * .25 : this.valueStart); }
  _end() { return this._clamp(Number.isNaN(this.valueEnd) ? this.min + (this.max - this.min) * .75 : this.valueEnd); }
  _frac(v) { const r = this.max - this.min; return r > 0 ? (v - this.min) / r : 0; }
  _labelOf(which, v) { const t = which === 's' ? this.valueLabelStart : which === 'e' ? (this.range ? this.valueLabelEnd : this.valueLabel) : ''; return t || String(v); }
  _sync() {
    const n = this._internals; if (!n) return;
    if (this.range) { const fd = new FormData(); fd.append(this.nameStart || this.name || '', String(this._start())); fd.append(this.nameEnd || this.name || '', String(this._end())); n.setFormValue(fd); }
    else n.setFormValue(String(this.value));
  }
  _paint() {
    const r = this._root, range = this.range, cen = this.centered && !range, val = this._clamp(this.value);
    const o = cen ? this._clamp(Number.isNaN(this.origin) ? (this.min + this.max) / 2 : this.origin) : this.min;
    const a = range ? this._start() : cen ? Math.min(o, val) : this.min, b = range ? this._end() : cen ? Math.max(o, val) : val, hv = range ? b : val;
    r.style.setProperty('--f0', this._frac(a)); r.style.setProperty('--f1', this._frac(b)); r.style.setProperty('--fh', this._frac(hv));
    cen ? r.style.setProperty('--Xh', 'calc(var(--_tw)/2 + var(--fh)*(100% - var(--_tw)))') : r.style.removeProperty('--Xh');
    this.$('.label.le').textContent = this._labelOf('e', hv); this.$('.label.ls').textContent = this._labelOf('s', a);
    const dot = this.$('.enddot'); dot.style.opacity = this._frac(hv) > .965 ? 0 : 1;
    const t = this._ticks.children; for (const k of t) { const f = Number(k.dataset.f); k.classList.toggle('passed', f >= this._frac(a) - 1e-9 && f <= this._frac(b) + 1e-9); }
    const ib = this.$('.iconbox');
    if (this.hasIcon) {
      const th = this.$('.seg.active').offsetHeight || 0, w = r.clientWidth, f = this._frac(hv), gx = r.classList.contains('dragging') ? 9 : 6, pad = Math.max(8, (th - 24) / 2 + 4), x1 = 8 + f * (w - 16);
      ib.classList.toggle('small', th < 32); ib.classList.toggle('on-active', this.iconPosition === 'start' ? (x1 - gx) > (pad + 12) : (x1 - gx) > (w - pad - 12));
    }
    this._layoutTicks(true); this._paintWave();
  }
  _swp(x0, x1, cy, amp, f, ph) {
    if (x1 <= x0 + 1) return `M ${x0.toFixed(1)} ${cy} L ${(x0 + .1).toFixed(1)} ${cy}`;
    let d = ''; for (let x = x0; x <= x1; x += 2) { const env = Math.min(1, (x - x0) / 10, (x1 - x) / 10); d += (x === x0 ? 'M ' : ' L ') + `${x.toFixed(1)} ${(cy + Math.sin(x * f - ph) * amp * env).toFixed(1)}`; }
    return d + ` L ${x1.toFixed(1)} ${cy}`;
  }
  _paintWave() {
    const r = this._root; if (!r || !this.wavy) return; const w = r.clientWidth, h = r.clientHeight; if (!w) return;
    const th = Math.min(this.$('.seg.active').offsetHeight || 16, 20), tw = 16, gx = r.classList.contains('dragging') ? 9 : 6, X = f => tw / 2 + f * (w - tw);
    const f0 = parseFloat(r.style.getPropertyValue('--f0')) || 0, f1 = parseFloat(r.style.getPropertyValue('--f1')) || 0, two = this.range || this.centered;
    const xa = (two ? X(f0) + gx : 0) + th / 2; let xb = X(f1) - gx - th / 2; if (xb < xa) xb = xa;
    const amp = Math.min(th * .35, Math.max(2, (h - th - 4) / 2)), still = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    const p = this.$('.wave path'); p.setAttribute('stroke-width', th); p.setAttribute('d', this._swp(xa, xb, h / 2, amp, Math.PI * 2 / Math.max(40, Math.min(th * 3.5, 64)), still ? 0 : performance.now() / 1000 * 3.5));
  }
  _waveLoop() {
    if (!this.wavy) { if (this._wr) { cancelAnimationFrame(this._wr); this._wr = 0; } return; }
    this._paintWave(); if (this._wr || !this.isConnected) return;
    if (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const step = () => { if (!this.isConnected || !this.wavy) { this._wr = 0; return; } this._paintWave(); this._wr = requestAnimationFrame(step); }; this._wr = requestAnimationFrame(step);
  }
  _layoutTicks(soft) {
    const w = this._root ? this._root.clientWidth : 0; if (!w) return;
    const range = this.range, f1 = this._frac(range ? this._end() : this._clamp(this.value)), f0 = this._frac(range ? this._start() : this.min), tw = 16;
    const x = f => tw / 2 + f * (w - tw), gap = this._root.classList.contains('dragging') ? 11 : 8;
    for (const k of this._ticks.children) {
      const f = Number(k.dataset.f), px = x(f); k.style.left = px + 'px';
      k.classList.toggle('hide', Math.abs(px - x(f1)) < gap || (range && Math.abs(px - x(f0)) < gap));
    }
  }
  update() {
    const range = this.range, min = this.min, max = this.max, step = this.step || 1;
    for (const i of [this._inS, this._inE]) { i.min = min; i.max = max; i.step = step; i.disabled = this.disabled; i.setAttribute('aria-orientation', this.vertical ? 'vertical' : 'horizontal'); }
    this.trackHeight > 0 ? this.style.setProperty('--_thx', this.trackHeight + 'px') : this.style.removeProperty('--_thx');
    if (this.vertical) this._root.style.setProperty('--_vl', this.clientHeight + 'px'); else this._root.style.removeProperty('--_vl');
    this._root.classList.toggle('range', range); this._root.classList.toggle('centered', this.centered && !range);
    if (range) { this._inS.value = this._start(); this._inE.value = this._end(); } else this._inE.value = this._clamp(this.value);
    this._inE.setAttribute('aria-label', (range ? this.ariaLabelEnd : '') || this.getAttribute('aria-label') || '');
    this._inS.setAttribute('aria-label', this.ariaLabelStart || this.getAttribute('aria-label') || '');
    const vt = range ? this.ariaValueTextEnd : ''; vt ? this._inE.setAttribute('aria-valuetext', vt) : this._inE.removeAttribute('aria-valuetext');
    this.ariaValueTextStart ? this._inS.setAttribute('aria-valuetext', this.ariaValueTextStart) : this._inS.removeAttribute('aria-valuetext');
    const key = [this.ticks, min, max, step].join('|');
    if (key !== this._tickKey) {
      this._tickKey = key; this._ticks.innerHTML = '';
      const n = Math.floor((max - min) / step);
      if (this.ticks && n > 0 && n <= 400) { const fr = document.createDocumentFragment(); for (let i = 0; i <= n; i++) { const d = document.createElement('span'); d.className = 'tick'; d.dataset.f = String(i * step / (max - min)); fr.appendChild(d); } this._ticks.appendChild(fr); }
    }
    this._sync(); this._paint(); this._waveLoop();
  }
  focus(o) { this._inE.focus(o); }
  formResetCallback() { this.value = Number(this.getAttribute('value') ?? 50); }
  formStateRestoreCallback(s) { if (!this.range) this.value = Number(s); }
}
defineElement('md-slider', MdSlider);

/* ==========================================================================
   PART 2 — continues matecha-3.6.0-all_part1.js (same scope: css / MateElement / defineElement ...)
   Concatenate:  cat matecha-3_6_0-all_part1.js matecha-3_6_0-all_part2.js matecha-3_6_0-all_part3.js > matecha-3.6.0-all.js
   ========================================================================== */

/* ==========================================================================
   04. Progress — md-linear-progress · md-circular-progress
       HTML spec: SVG strokes 3.5 / 6.5, round caps, wavy = sine path with 8px edge envelope, phase += .08 / frame,
       track = primary-container, end dot r=2.2, circular r=18 in a 48 box, rotating arc 70°…210°.
       Extra (expressive) attributes:  wavy · thick
   ========================================================================== */
const _ticker = (() => {
  const set = new Set(); let raf = 0, last = 0;
  const api = {
    phase: 0, now: 0,
    add(f) { set.add(f); if (!raf) raf = requestAnimationFrame(loop); },
    del(f) { set.delete(f); }
  };
  const loop = t => {
    const dt = Math.min(64, t - (last || t)); last = t;
    api.phase += (dt / 16.667) * 0.08; api.now = t;
    set.forEach(f => f(api.phase, t));
    if (set.size) raf = requestAnimationFrame(loop); else { raf = 0; last = 0; }
  };
  return api;
})();
const _reduceMotion = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const _clamp01 = v => Math.min(1, Math.max(0, v));
const _easeInOut = e => e < .5 ? 2 * e * e : 1 - Math.pow(-2 * e + 2, 2) / 2;
const _easeOut = e => 1 - Math.pow(1 - e, 3);

const _wavyLine = (x0, x1, cy, amp, f, ph) => {
  if (x1 <= x0 + 2) return `M ${x0.toFixed(2)} ${cy} L ${(x0 + 2).toFixed(2)} ${cy}`;
  let d = '';
  for (let x = x0; x <= x1; x += 2) {
    const env = Math.min(1, (x - x0) / 8, (x1 - x) / 8);
    const y = cy + Math.sin(x * f - ph) * amp * env;
    d += (x === x0 ? 'M ' : ' L ') + `${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return d + ` L ${x1.toFixed(2)} ${cy}`;
};
const _wavyArc = (cx, cy, baseR, startDeg, sweepDeg, waves, amp, ph) => {
  let d = ''; const steps = Math.max(32, Math.ceil(Math.abs(sweepDeg) / 3));
  for (let i = 0; i <= steps; i++) {
    const t = i / steps, rad = ((startDeg + sweepDeg * t) * Math.PI) / 180;
    const env = amp > 0 ? Math.sin(t * Math.PI) : 0;
    const r = baseR + Math.sin(t * Math.PI * 2 * waves - ph) * amp * env;
    d += (i === 0 ? 'M ' : ' L ') + `${(cx + Math.cos(rad) * r).toFixed(2)} ${(cy + Math.sin(rad) * r).toFixed(2)}`;
  }
  return d;
};
const _FOUR = ['var(--md-sys-color-primary)', 'var(--md-sys-color-primary-container)', 'var(--md-sys-color-tertiary)', 'var(--md-sys-color-tertiary-container)'];
const _fourColor = (n, i) => `var(--md-${n}-progress-four-color-index-${i},${_FOUR[i]})`;

class MdProgressBase extends MateElement {
  static ariaAttrs = ['aria-label', 'aria-labelledby', 'aria-describedby'];
  static props = {
    value: { type: Number, reflect: true, default: 0 }, max: { type: Number, reflect: true, default: 1 },
    indeterminate: { type: Boolean, reflect: true }, fourColor: { type: Boolean, attribute: 'four-color', reflect: true },
    wavy: { type: Boolean, reflect: true }, thick: { type: Boolean, reflect: true }
  };
  static get observedAttributes() { return [...super.observedAttributes, ...MdProgressBase.ariaAttrs]; }
  attributeChangedCallback(n, o, v) { if (n.startsWith('aria-')) { this._ariaDirty = true; this._schedule(); return; } super.attributeChangedCallback(n, o, v); }
  get _frac() { const m = this.max || 1; return _clamp01(this.value / m); }
  _animated() { return (this.indeterminate || this.wavy) && !_reduceMotion(); }
  _sync() {
    if (!this._frame) this._frame = (ph, t) => this._draw(ph, t);
    if (this._animated() && this.isConnected) _ticker.add(this._frame); else _ticker.del(this._frame);
    this._draw(_ticker.phase, performance.now());
  }
  connectedCallback() { super.connectedCallback(); this._sync(); }
  disconnectedCallback() { if (this._frame) _ticker.del(this._frame); }
  _aria() {
    const p = this._root; if (!p) return;
    p.setAttribute('role', 'progressbar'); p.setAttribute('aria-valuemin', '0'); p.setAttribute('aria-valuemax', String(this.max));
    if (this.indeterminate) p.removeAttribute('aria-valuenow'); else p.setAttribute('aria-valuenow', String(this.value));
    if (this._ariaDirty) { p.removeAttribute('aria-label'); copyAria(this, p); this._ariaDirty = false; }
  }
}

class MdLinearProgress extends MdProgressBase {
  static props = { buffer: { type: Number, reflect: true, default: 0 } };
  static styles = css`
:host{display:flex;position:relative;width:100%;min-width:80px;overflow:visible;
--_pc:var(--md-linear-progress-active-indicator-color,var(--md-sys-color-primary));--_tc:var(--md-linear-progress-track-color,var(--md-sys-color-primary-container));--_bc:var(--md-linear-progress-buffer-color,color-mix(in srgb,var(--md-sys-color-primary) 35%,transparent))}
.progress{position:relative;width:100%;overflow:visible}
svg{display:block;width:100%;overflow:visible}
line,path{fill:none;stroke-linecap:round}
.track{stroke:var(--_tc)}.buf{stroke:var(--_bc)}.act{stroke:var(--_pc)}.dot{fill:var(--_pc)}
:host([indeterminate]) .dot{display:none}
@media(forced-colors:active){.track{stroke:CanvasText;opacity:.4}.act{stroke:Highlight}}`;
  build() {
    this.shadowRoot.innerHTML = '<div class="progress" part="progress"><svg><line class="track"/><line class="buf"/><path class="act"/><circle class="dot"/></svg></div>';
    this._root = this.$('.progress'); this._svg = this.$('svg'); this._track = this.$('.track'); this._buf = this.$('.buf'); this._act = this.$('.act'); this._dot = this.$('.dot');
    this._w = 240; this._ariaDirty = true;
    if (typeof ResizeObserver !== 'undefined') { this._ro = new ResizeObserver(() => { const w = this.clientWidth; if (w && w !== this._w) { this._w = w; this._draw(_ticker.phase, performance.now()); } }); this._ro.observe(this); }
  }
  update() { this._aria(); this._sync(); }
  _draw(ph, t) {
    if (!this._svg) return;
    const W = this.clientWidth || this._w || 240, sw = this.thick ? 8 : 4, wavy = this.wavy && !_reduceMotion() || (this.wavy && _reduceMotion());
    const H = wavy ? Math.max(20, sw + 12) : sw, cy = H / 2, pad = sw / 2, xs = pad, xe = Math.max(xs + 1, W - pad);
    const s = this._svg; s.setAttribute('viewBox', `0 0 ${W} ${H}`); s.setAttribute('height', H);
    for (const l of [this._track, this._buf]) { l.setAttribute('y1', cy); l.setAttribute('y2', cy); l.setAttribute('stroke-width', sw); }
    this._act.setAttribute('stroke-width', sw);
    const amp = this.thick ? 2.6 : 2.4, freq = this.thick ? .22 : .24, gap = Math.max(8, sw + 2);
    const path = (a, b) => wavy ? _wavyLine(a, b, cy, amp, freq, this._ph(ph)) : `M ${a.toFixed(2)} ${cy} L ${Math.max(b, a + .01).toFixed(2)} ${cy}`;
    this._buf.setAttribute('x1', xs); this._buf.setAttribute('x2', xs); this._buf.style.display = 'none';
    let a, b, color = null;
    if (this.indeterminate) {
      const T = 2000, p = (t % T) / T, head = _easeOut(_clamp01(p / .72)), tail = p < .28 ? 0 : _easeInOut(_clamp01((p - .28) / .72));
      a = xs + (xe - xs) * tail; b = xs + (xe - xs) * Math.max(head, tail + .02);
      this._track.setAttribute('x1', xs); this._track.setAttribute('x2', xe);
      if (this.fourColor) color = _fourColor('linear', Math.floor(t / T) % 4);
    } else {
      const f = this._frac; a = xs; b = xs + (xe - xs) * f;
      this._track.setAttribute('x1', wavy ? Math.min(xe, b + gap) : xs); this._track.setAttribute('x2', xe);
      const bf = _clamp01((this.buffer || 0) / (this.max || 1));
      if (bf > 0) { this._buf.style.display = ''; this._buf.setAttribute('x1', xs); this._buf.setAttribute('x2', xs + (xe - xs) * bf); }
      this._track.style.display = (wavy && b + gap >= xe) ? 'none' : '';
    }
    if (this.indeterminate) this._track.style.display = '';
    this._act.setAttribute('d', path(a, b)); this._act.style.stroke = color || '';
    this._dot.setAttribute('cx', xe); this._dot.setAttribute('cy', cy); this._dot.setAttribute('r', Math.min(2.2, sw / 2 - .4));
    this._dot.style.fill = color || '';
  }
  _ph(ph) { return this.wavy && _reduceMotion() ? 0 : ph; }
}
defineElement('md-linear-progress', MdLinearProgress);

class MdCircularProgress extends MdProgressBase {
  static styles = css`
:host{display:inline-flex;vertical-align:top;position:relative;width:var(--md-circular-progress-size,48px);height:var(--md-circular-progress-size,48px);
--_pc:var(--md-circular-progress-active-indicator-color,var(--md-sys-color-primary));--_tc:var(--md-circular-progress-track-color,var(--md-sys-color-primary-container))}
.progress{position:absolute;inset:0}
svg{display:block;width:100%;height:100%;overflow:visible}
circle,path{fill:none;stroke-linecap:round}
.track{stroke:var(--_tc)}.act{stroke:var(--_pc)}
@media(forced-colors:active){.track{stroke:CanvasText;opacity:.4}.act{stroke:Highlight}}`;
  build() {
    this.shadowRoot.innerHTML = '<div class="progress" part="progress"><svg viewBox="0 0 48 48"><circle class="track" cx="24" cy="24" r="18"/><path class="act"/></svg></div>';
    this._root = this.$('.progress'); this._track = this.$('.track'); this._act = this.$('.act'); this._ariaDirty = true;
  }
  update() { this._aria(); this._sync(); }
  _draw(ph, t) {
    if (!this._act) return;
    const sw = this.thick ? 6.5 : 3.5, wavy = this.wavy, waves = 4, amp = this.thick ? 2.2 : 2.1, wph = wavy && _reduceMotion() ? 0 : ph;
    this._track.setAttribute('stroke-width', sw); this._act.setAttribute('stroke-width', sw);
    let start, sweep, color = null;
    if (this.indeterminate) {
      start = -90 + ((ph * 18) % 360); sweep = 70 + 140 * (.5 + .5 * Math.sin(ph * .55));
      if (this.fourColor) color = _fourColor('circular', Math.floor(ph / 9) % 4);
    } else { start = -90; sweep = Math.max(.5, this._frac * 360); }
    let d = _wavyArc(24, 24, 18, start, Math.min(sweep, 359.9), wavy ? waves : 0, wavy ? amp : 0, wph);
    this._act.setAttribute('d', d); this._act.style.stroke = color || '';
  }
}
defineElement('md-circular-progress', MdCircularProgress);

/* ==========================================================================
   05. Chips — md-chip-set · md-assist-chip · md-filter-chip · md-input-chip · md-suggestion-chip
       HTML spec (.x-chip): 32px, radius 8px → 16px while pressed, 1px outline-variant, 14px/500; filter selected =
       secondary-container with check icon sliding in (width 0 → 18px, .3s spring-fast).
   ========================================================================== */
const CHECK_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
const CLOSE_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';
const CHIP_CSS = css`
:host{display:inline-flex;vertical-align:top;outline:none;-webkit-tap-highlight-color:transparent;
--_r:var(--md-chip-container-shape,8px);--_rp:var(--md-chip-pressed-container-shape,16px);--_h:var(--md-chip-container-height,32px);
--_bg:var(--md-chip-container-color,transparent);--_fg:var(--md-chip-label-text-color,var(--md-sys-color-on-surface-variant));--_ic:var(--md-chip-icon-color,var(--md-sys-color-primary));
--_bd:var(--md-chip-outline-color,var(--md-sys-color-outline-variant));--_bw:var(--md-chip-outline-width,1px);--_el:0;--_elh:1;
--md-ripple-hover-color:var(--_fg);--md-ripple-pressed-opacity:0;--md-ripple-pressed-color:var(--_fg)}
:host([disabled]),:host([soft-disabled]){pointer-events:none}
:host([elevated]){--_bg:var(--md-chip-elevated-container-color,var(--md-sys-color-surface-container-low));--_bw:0px;--_el:1;--_elh:2}
.chip{position:relative;display:inline-flex;align-items:center;box-sizing:border-box;height:var(--_h);border-radius:var(--_r);background:var(--_bg);color:var(--_fg);
font:500 14px/20px var(--md-ref-typeface-plain,Inter,sans-serif);letter-spacing:.01em;
transition:border-radius .32s cubic-bezier(.2,0,0,1),background-color .25s,color .25s,box-shadow .25s}
.chip.hold{border-radius:var(--_rp)}
.outline{position:absolute;inset:0;border-radius:inherit;border:var(--_bw) solid var(--_bd);pointer-events:none;transition:border-color .25s}
md-elevation{--md-elevation-level:var(--_el);transition-duration:.25s}
@media(hover:hover) and (pointer:fine){.chip:hover md-elevation{--md-elevation-level:var(--_elh)}}
.chip.hold md-elevation{--md-elevation-level:var(--_el)}
.action{position:relative;display:inline-flex;align-items:center;height:100%;box-sizing:border-box;border:0;margin:0;padding:0 12px;background:none;color:inherit;font:inherit;letter-spacing:inherit;
text-decoration:none;cursor:pointer;outline:none;border-radius:inherit;white-space:nowrap;-webkit-appearance:none;appearance:none;user-select:none;-webkit-user-select:none;flex:1;min-width:0}
.icon,.sel-icon{display:none;align-items:center;justify-content:center;flex:none;overflow:hidden;color:var(--_ic);width:var(--md-chip-icon-size,18px);height:var(--md-chip-icon-size,18px);margin-inline-end:8px}
:host([has-icon]) .icon{display:inline-flex}
.icon ::slotted(*),.sel-icon ::slotted(*),.sel-icon svg{width:var(--md-chip-icon-size,18px);height:var(--md-chip-icon-size,18px);font-size:var(--md-chip-icon-size,18px);--md-icon-size:var(--md-chip-icon-size,18px);fill:currentColor}
.label{overflow:hidden;text-overflow:ellipsis}
.remove{position:relative;display:none;align-items:center;justify-content:center;align-self:center;width:24px;height:24px;margin-inline:-4px 8px;padding:0;border:0;border-radius:50%;background:none;color:inherit;cursor:pointer;outline:none;flex:none}
.remove svg{width:18px;height:18px;fill:currentColor}
:host([removable]) .remove,:host([has-remove]) .remove{display:inline-flex}
.remove:hover{background:color-mix(in srgb,currentColor 10%,transparent)}
:host([has-remove]) .action,:host([removable]) .action{padding-inline-end:8px}
:host([disabled]) .chip,:host([soft-disabled]) .chip{color:color-mix(in srgb,var(--md-sys-color-on-surface) 38%,transparent);background:var(--_dbg,transparent)}
:host([disabled]) .outline,:host([soft-disabled]) .outline{border-color:color-mix(in srgb,var(--md-sys-color-on-surface) 12%,transparent)}
:host([disabled][elevated]) .chip{background:color-mix(in srgb,var(--md-sys-color-on-surface) 12%,transparent)}
:host([disabled]) md-elevation,:host([soft-disabled]) md-elevation{--md-elevation-level:0}
:host([disabled]) .icon{opacity:.38}
@media(forced-colors:active){.chip{border:1px solid ButtonText}}`;

class MdChip extends MateElement {
  static delegatesFocus = true;
  static ariaAttrs = ['aria-label', 'aria-describedby', 'aria-labelledby', 'aria-expanded', 'aria-haspopup', 'aria-controls'];
  static props = {
    disabled: { type: Boolean, reflect: true }, softDisabled: { type: Boolean, attribute: 'soft-disabled', reflect: true },
    alwaysFocusable: { type: Boolean, attribute: 'always-focusable', reflect: true }, label: { type: String, reflect: true },
    elevated: { type: Boolean, reflect: true }, href: { type: String, reflect: true }, target: { type: String, reflect: true }, download: { type: String },
    hasIcon: { type: Boolean, attribute: 'has-icon', reflect: true }
  };
  static styles = CHIP_CSS;
  static get observedAttributes() { return [...super.observedAttributes, ...MdChip.ariaAttrs]; }
  attributeChangedCallback(n, o, v) { if (n.startsWith('aria-')) { this._ariaDirty = true; this._schedule(); return; } super.attributeChangedCallback(n, o, v); }
  get _hasRemove() { return false; }
  get _removeOnly() { return false; }
  get _interactive() { return true; }
  actionHTML() { return ''; }
  _mount() {
    const link = !!this.href && this._interactive && !this._removeOnly, tag = link ? 'a' : this._removeOnly ? 'span' : 'button';
    this._isLink = link; this._tag = tag;
    this.shadowRoot.querySelectorAll('.chip').forEach(n => n.remove());
    const w = document.createElement('div');
    w.innerHTML = `<div class="chip" part="container"><md-focus-ring part="focus-ring"></md-focus-ring><md-elevation part="elevation"></md-elevation><span class="outline"></span>` +
      `<${tag} class="action primary" part="action"${tag === 'button' ? ' type="button"' : ''}><md-ripple part="ripple"></md-ripple>` +
      `<span class="icon"><slot name="icon"></slot></span>${this.actionHTML()}<span class="label" part="label"><slot name="label"></slot><span class="txt"></span><slot></slot></span></${tag}>` +
      `<button class="remove" part="remove-button" type="button" tabindex="-1" aria-label="Remove"><slot name="remove-button">${CLOSE_SVG}</slot></button></div>`;
    this._chip = w.firstElementChild; this.shadowRoot.appendChild(this._chip);
    this._primary = this._chip.querySelector('.primary'); this._remove = this._chip.querySelector('.remove'); this._txt = this._chip.querySelector('.txt');
    this.bindHold(this._chip);
    const slot = this._chip.querySelector('slot[name=icon]');
    slot.addEventListener('slotchange', () => { this.hasIcon = slot.assignedNodes().length > 0; }); this.hasIcon = slot.assignedNodes().length > 0;
    this._remove.addEventListener('click', e => { e.stopPropagation(); this._fireRemove(); });
    this._ariaDirty = true;
  }
  build() {
    this._mount();
    this.addEventListener('click', e => this._click(e), true);
    this.addEventListener('keydown', e => this._key(e));
  }
  _fireRemove() { if (this.disabled || this.softDisabled) return; const ev = this.emit('remove', { bubbles: true, composed: true, cancelable: true }); if (!ev.defaultPrevented) this.remove(); }
  _click(e) { if (this.disabled || this.softDisabled) { e.stopImmediatePropagation(); e.preventDefault(); } }
  _key(e) { }
  update() {
    if (this._isLink !== (!!this.href && this._interactive && !this._removeOnly)) this._mount();
    this._txt.textContent = this.label || '';
    const p = this._primary, dis = this.disabled || this.softDisabled;
    if (this._isLink) {
      dis ? p.removeAttribute('href') : p.setAttribute('href', this.href);
      this.target ? p.setAttribute('target', this.target) : p.removeAttribute('target'); this.download ? p.setAttribute('download', this.download) : p.removeAttribute('download');
    } else if (this._tag === 'button') p.disabled = this.disabled && !this.alwaysFocusable;
    p.setAttribute('aria-disabled', String(dis));
    if (this.disabled && this.alwaysFocusable === false && this._tag === 'button') p.tabIndex = -1; else if (this._tabbable === false) p.tabIndex = -1; else p.removeAttribute('tabindex');
    this._remove.disabled = this.disabled; this._remove.tabIndex = this._hasRemove ? 0 : -1;
    this.toggleAttribute('has-remove', this._hasRemove);
    if (this._ariaDirty) { for (const a of MdChip.ariaAttrs) { const v = this.getAttribute(a); v !== null ? p.setAttribute(a, v) : p.removeAttribute(a); } this._ariaDirty = false; }
  }
  setTabbable(b) { this._tabbable = b; this._schedule(); }
  focus(o) { (this._removeOnly ? this._remove : this._primary).focus(o); }
  blur() { this._primary && this._primary.blur(); }
}

class MdAssistChip extends MdChip { }
class MdSuggestionChip extends MdChip { }
class MdFilterChip extends MdChip {
  static props = { selected: { type: Boolean, reflect: true }, removable: { type: Boolean, reflect: true }, hasSelectedIcon: { type: Boolean, attribute: 'has-selected-icon', reflect: true } };
  static styles = css`
:host{--_selbg:var(--md-filter-chip-selected-container-color,var(--md-sys-color-secondary-container));--_selfg:var(--md-filter-chip-selected-label-text-color,var(--md-sys-color-on-primary-container))}
.sel-icon{display:inline-flex;width:0;margin-inline-end:0;opacity:0;transition:width .3s var(--mate-spring-fast),margin .3s,opacity .2s}
:host([selected]) .sel-icon{width:var(--md-chip-icon-size,18px);margin-inline-end:8px;opacity:1}
:host([selected]) .chip{background:var(--_selbg);color:var(--_selfg);--md-ripple-hover-color:var(--_selfg);--md-ripple-pressed-opacity:0;--md-ripple-pressed-color:var(--_selfg);--_ic:var(--_selfg)}
:host([selected]) .outline{border-color:transparent}
:host([selected][elevated]) .chip{background:var(--_selbg)}
:host([selected]:not([has-selected-icon])) .icon.hide-when-sel{display:none}
:host([disabled][selected]) .chip{background:color-mix(in srgb,var(--md-sys-color-on-surface) 12%,transparent)}`;
  actionHTML() { return `<span class="sel-icon"><slot name="selected-icon">${CHECK_SVG}</slot></span>`; }
  _mount() { super._mount(); this._primary.setAttribute('role', 'option'); }
  get _hasRemove() { return this.removable; }
  _click(e) {
    super._click(e); if (e.defaultPrevented && (this.disabled || this.softDisabled)) return;
    if (e.composedPath().includes(this._remove)) return;
    if (this._isLink) return;
    this.selected = !this.selected; this.emit('input', { bubbles: true, composed: true }); this.emit('change', { bubbles: true });
  }
  _key(e) { if (this.removable && (e.key === 'Backspace' || e.key === 'Delete')) { e.preventDefault(); this._fireRemove(); } }
  update() { super.update(); this._primary.setAttribute('aria-selected', String(this.selected)); this._primary.setAttribute('aria-checked', String(this.selected)); this._primary.setAttribute('role', 'checkbox'); }
  get isRemovable() { return this.removable; }
}
class MdInputChip extends MdChip {
  static props = { selected: { type: Boolean, reflect: true }, removeOnly: { type: Boolean, attribute: 'remove-only', reflect: true }, avatar: { type: Boolean, reflect: true } };
  static styles = css`
:host{--_selbg:var(--md-input-chip-selected-container-color,var(--md-sys-color-secondary-container));--_selfg:var(--md-input-chip-selected-label-text-color,var(--md-sys-color-on-secondary-container))}
:host([selected]) .chip{background:var(--_selbg);color:var(--_selfg);--md-ripple-hover-color:var(--_selfg);--md-ripple-pressed-opacity:0;--md-ripple-pressed-color:var(--_selfg)}
:host([selected]) .outline{border-color:transparent}
:host([avatar]) .chip{border-radius:var(--md-input-chip-avatar-shape,16px)}
:host([avatar]) .icon{margin-inline-start:-4px;width:24px;height:24px;border-radius:50%}
:host([avatar]) .icon ::slotted(*){width:24px;height:24px;border-radius:50%;font-size:24px;--md-icon-size:24px}
:host([has-icon]:not([avatar])) .action{padding-inline-start:8px}
:host([remove-only]) .action{cursor:default;padding-inline-end:4px}
:host([remove-only]) md-ripple{display:none}`;
  get _hasRemove() { return true; }
  get _removeOnly() { return this.removeOnly; }
  _click(e) {
    super._click(e); if (e.defaultPrevented) return;
    if (e.composedPath().includes(this._remove) || this.removeOnly || this._isLink) return;
    this.selected = !this.selected; this.emit('input', { bubbles: true, composed: true }); this.emit('change', { bubbles: true });
  }
  _key(e) { if (e.key === 'Backspace' || e.key === 'Delete') { e.preventDefault(); this._fireRemove(); } }
  update() { super.update(); if (this._tag === 'button') this._primary.setAttribute('aria-pressed', String(this.selected)); }
}
defineElement('md-assist-chip', MdAssistChip); defineElement('md-suggestion-chip', MdSuggestionChip);
defineElement('md-filter-chip', MdFilterChip); defineElement('md-input-chip', MdInputChip);

class MdChipSet extends MateElement {
  static styles = css`:host{display:flex;flex-wrap:wrap;gap:8px;align-items:center}`;
  build() {
    this.shadowRoot.innerHTML = '<slot></slot>'; this.setAttribute('role', 'toolbar');
    this.shadowRoot.querySelector('slot').addEventListener('slotchange', () => this._roving());
    this.addEventListener('keydown', e => this._key(e)); this.addEventListener('focusin', e => this._focusin(e)); this.addEventListener('remove', () => setTimeout(() => this._roving(), 0));
  }
  get chips() { return Array.from(this.children).filter(c => c instanceof MdChip); }
  _live() { return this.chips.filter(c => !c.disabled || c.alwaysFocusable); }
  _roving(cur) {
    const live = this._live(), t = cur && live.includes(cur) ? cur : (live.find(c => c._tabbable !== false && this._last === c) || live[0]);
    this.chips.forEach(c => c.setTabbable(c === t));
  }
  _focusin(e) { const c = e.target.closest && e.target.closest('md-assist-chip,md-filter-chip,md-input-chip,md-suggestion-chip'); if (c) { this._last = c; this._roving(c); } }
  _key(e) {
    const k = e.key; if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(k)) return;
    const live = this._live(), cur = live.findIndex(c => c === e.target || c.contains(e.target)); if (cur < 0) return;
    const rtl = getComputedStyle(this).direction === 'rtl'; let n = cur;
    if (k === 'Home') n = 0; else if (k === 'End') n = live.length - 1;
    else n = (cur + ((k === 'ArrowRight') !== rtl ? 1 : -1) + live.length) % live.length;
    e.preventDefault(); live[n].setTabbable(true); live[n].focus(); this._last = live[n]; this._roving(live[n]);
  }
}
defineElement('md-chip-set', MdChipSet);

/* ==========================================================================
   06. Tabs — md-tabs · md-primary-tab · md-secondary-tab
       HTML spec (.x-tabs/.x-tab): container surface-container, radius 12 12 0 0, bottom outline-variant;
       active indicator grows width 0 → 36px (primary) / 100% (secondary) in .35s decel; active icon FILL 1.
   ========================================================================== */
class MdTabBase extends MateElement {
  static delegatesFocus = true;
  static ariaAttrs = ['aria-label', 'aria-controls', 'aria-describedby'];
  static props = {
    active: { type: Boolean, reflect: true }, hasIcon: { type: Boolean, attribute: 'has-icon', reflect: true },
    iconOnly: { type: Boolean, attribute: 'icon-only', reflect: true }, inlineIcon: { type: Boolean, attribute: 'inline-icon', reflect: true }, selected: { type: Boolean }
  };
  static get observedAttributes() { return [...super.observedAttributes, ...MdTabBase.ariaAttrs]; }
  static styles = css`
:host{display:inline-flex;flex:1 0 auto;min-width:0;outline:none;-webkit-tap-highlight-color:transparent;position:relative;
--_fg:var(--md-primary-tab-label-text-color,var(--md-sys-color-on-surface-variant));--_afg:var(--md-primary-tab-active-label-text-color,var(--md-sys-color-primary));
--_ind:var(--md-primary-tab-active-indicator-color,var(--md-sys-color-primary));--_indw:var(--md-primary-tab-active-indicator-width,36px);--_indr:3px 3px 0 0;--_indh:var(--md-primary-tab-active-indicator-height,3px);
--_pad:12px 16px 14px;--md-ripple-hover-color:var(--_fg);--md-ripple-pressed-opacity:0;--md-ripple-pressed-color:var(--_afg)}
:host([disabled]){pointer-events:none;opacity:.38}
.tab{position:relative;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;width:100%;min-height:var(--md-primary-tab-container-height,48px);box-sizing:border-box;padding:var(--_pad);margin:0;border:0;background:none;
color:var(--_fg);font:500 13px/20px var(--md-ref-typeface-plain,Inter,sans-serif);letter-spacing:.01em;cursor:pointer;outline:none;overflow:visible;-webkit-appearance:none;appearance:none;text-align:center;white-space:nowrap;transition:color .25s}
:host([active]) .tab{color:var(--_afg)}
:host([has-icon]) .tab{min-height:var(--md-primary-tab-with-icon-and-label-text-container-height,64px)}
:host([has-icon][inline-icon]) .tab,:host([has-icon][inline-icon][icon-only]) .tab{flex-direction:row;gap:8px;min-height:48px}
:host([icon-only]) .tab{min-height:48px}
.icon{display:none;align-items:center;justify-content:center;width:24px;height:24px}
:host([has-icon]) .icon{display:inline-flex}
.icon ::slotted(*){font-size:24px;--md-icon-size:24px}
:host([active]) .icon ::slotted(*){--md-icon-fill:1;--md-icon-weight:500}
:host([icon-only]) .label{display:none}
.indicator{position:absolute;bottom:-1px;left:50%;height:var(--_indh);width:0;border-radius:var(--_indr);background:var(--_ind);transform:translateX(-50%);transition:width .35s var(--mate-ease-decel),opacity .2s;pointer-events:none}
:host([active]) .indicator{width:var(--_indw)}
.rippleBox{position:absolute;inset:0;border-radius:inherit;overflow:hidden;pointer-events:none}`;
  build() {
    this.shadowRoot.innerHTML = '<button class="tab" part="button" role="tab" type="button"><span class="rippleBox"><md-ripple part="ripple"></md-ripple></span><md-focus-ring part="focus-ring" inward></md-focus-ring><span class="icon"><slot name="icon"></slot></span><span class="label"><slot></slot></span><span class="indicator" part="indicator"></span></button>';
    this._btn = this.$('.tab'); const slot = this.$('slot[name=icon]');
    const sync = () => { this.hasIcon = slot.assignedNodes().length > 0; }; slot.addEventListener('slotchange', sync); sync();
    this._ariaDirty = true;
  }
  get isTab() { return true; }
  get selected() { return this.active; } set selected(v) { this.active = !!v; }
  attributeChangedCallback(n, o, v) { if (n.startsWith('aria-')) { this._ariaDirty = true; this._schedule(); return; } super.attributeChangedCallback(n, o, v); }
  update() {
    this._btn.setAttribute('aria-selected', String(this.active)); this._btn.tabIndex = this.active ? 0 : -1;
    this._btn.disabled = !!this.hasAttribute('disabled');
    if (this._ariaDirty) { copyAria(this, this._btn); this._ariaDirty = false; }
    if (this.hasAttribute('tab-focusable')) this._btn.tabIndex = 0;
  }
  focus(o) { this._btn && this._btn.focus(o); }
  blur() { this._btn && this._btn.blur(); }
}
class MdPrimaryTab extends MdTabBase { }
class MdSecondaryTab extends MdTabBase {
  static styles = css`
:host{--_fg:var(--md-secondary-tab-label-text-color,var(--md-sys-color-on-surface-variant));--_afg:var(--md-secondary-tab-active-label-text-color,var(--md-sys-color-on-surface));
--_ind:var(--md-secondary-tab-active-indicator-color,var(--md-sys-color-primary));--_indw:100%;--_indr:0;--_indh:var(--md-secondary-tab-active-indicator-height,3px);--_pad:16px 16px;--md-ripple-pressed-opacity:0;--md-ripple-pressed-color:var(--_afg)}
:host .tab{flex-direction:row;gap:8px;font-size:14px;min-height:48px}
.indicator{width:0;transition:width .35s var(--mate-ease-decel)}`;
}
defineElement('md-primary-tab', MdPrimaryTab); defineElement('md-secondary-tab', MdSecondaryTab);

class MdTabs extends MateElement {
  static props = { activeTabIndex: { type: Number, attribute: 'active-tab-index', reflect: true, default: -1 }, autoActivate: { type: Boolean, attribute: 'auto-activate', reflect: true } };
  static styles = css`
:host{display:flex;position:relative;width:100%;box-sizing:border-box;background:var(--md-tabs-container-color,var(--md-sys-color-surface-container));border-radius:var(--md-tabs-container-shape,12px 12px 0 0);box-shadow:inset 0 -1px 0 var(--md-divider-color,var(--md-sys-color-outline-variant))}
.tabs{display:flex;flex:1;overflow-x:auto;overflow-y:hidden;scrollbar-width:none;scroll-behavior:smooth;border-radius:inherit;align-items:stretch}
.tabs::-webkit-scrollbar{display:none}
::slotted(*){flex:1 0 auto}`;
  build() {
    this.shadowRoot.innerHTML = '<div class="tabs" role="tablist" part="tablist"><slot></slot></div>';
    this._slot = this.$('slot'); this._scroller = this.$('.tabs'); this._idx = -1;
    this._slot.addEventListener('slotchange', () => this._init());
    this.addEventListener('click', e => this._click(e)); this.addEventListener('keydown', e => this._key(e)); this.addEventListener('focusin', e => this._focus(e));
  }
  get tabs() { return this._slot.assignedElements({ flatten: true }).filter(e => e.isTab); }
  get activeTab() { return this.tabs.find(t => t.active) || this.tabs[this.activeTabIndex] || null; }
  set activeTab(t) { const i = this.tabs.indexOf(t); if (i >= 0) this.activeTabIndex = i; }
  _init() {
    const tabs = this.tabs; if (!tabs.length) return;
    if (this.activeTabIndex < 0 || this.activeTabIndex >= tabs.length) { const a = tabs.findIndex(t => t.active); this._p.activeTabIndex = a >= 0 ? a : 0; }
    this._apply(false);
  }
  update() { if (this._slot) this._apply(true); }
  _apply(scroll) {
    const tabs = this.tabs, i = this.activeTabIndex; tabs.forEach((t, n) => { t.active = n === i; });
    if (scroll && tabs[i]) this._scrollTo(tabs[i]);
  }
  _scrollTo(tab) {
    const s = this._scroller; if (!s || s.scrollWidth <= s.clientWidth) return;
    const l = tab.offsetLeft - s.offsetLeft, r = l + tab.offsetWidth; const target = l - (s.clientWidth - tab.offsetWidth) / 2; s.scrollTo({ left: target, behavior: _reduceMotion() ? 'auto' : 'smooth' });
  }
  scrollToTab(tab) { this._scrollTo(tab || this.activeTab); }
  _activate(tab, user) {
    const i = this.tabs.indexOf(tab); if (i < 0 || i === this.activeTabIndex || tab.disabled || tab.hasAttribute('disabled')) return;
    if (user) { const ev = this.emit('change', { bubbles: true, cancelable: true }); }
    this.activeTabIndex = i;
  }
  _click(e) { const t = e.target.closest && e.target.closest('md-primary-tab,md-secondary-tab') || this.tabs.find(x => x === e.target); if (t && t.isTab) this._activate(t, true); }
  _focus(e) { if (this.autoActivate) { const t = this.tabs.find(x => x === e.target); if (t) this._activate(t, true); } }
  _key(e) {
    const tabs = this.tabs.filter(t => !t.hasAttribute('disabled')); if (!tabs.length) return;
    const cur = tabs.findIndex(t => t === e.target); if (cur < 0) return; let n = cur; const rtl = getComputedStyle(this).direction === 'rtl';
    switch (e.key) {
      case 'ArrowRight': n = (cur + (rtl ? -1 : 1) + tabs.length) % tabs.length; break;
      case 'ArrowLeft': n = (cur + (rtl ? 1 : -1) + tabs.length) % tabs.length; break;
      case 'Home': n = 0; break; case 'End': n = tabs.length - 1; break; default: return;
    }
    e.preventDefault(); tabs.forEach(t => t.setAttribute('tab-focusable', '')); tabs[n].focus();
    tabs.forEach(t => { if (t !== tabs[n]) t.removeAttribute('tab-focusable'); }); tabs[n].setAttribute('tab-focusable', '');
    if (this.autoActivate) this._activate(tabs[n], true);
  }
}
defineElement('md-tabs', MdTabs);


/* ---- shared swipe-to-reveal controller (md-list-item · md-card · md-swipe-item) ----
   HTML spec (.mate-swipe-row): the row slides by the actions' width with --mate-spring-spatial (.38s); action capsules scale .6 → 1 and
   fade in with --mate-spring-fast, staggered .02s / .05s / .08s; a press morphs them to a 16px radius. Tap on an open row closes it. */
const SWIPE_CSS = `
.sw{position:relative;touch-action:pan-y}
.swa{position:absolute;inset-block:0;inset-inline-end:0;display:flex;align-items:center;gap:6px;padding-inline:8px 2px;z-index:1}
.swa ::slotted(*){transform:scale(.6);opacity:0;transition:transform .38s var(--mate-spring-fast),opacity .25s ease;transition-delay:var(--_d,0s)}
.swa ::slotted([data-open]){transform:none;opacity:1}
.swx{position:relative;z-index:2;transform:translateX(var(--_x,0px))}
.swx.drag{transition:none!important}
@media(prefers-reduced-motion:reduce){.swa ::slotted(*){transition:none}}`;
class _SwipeCtl {
  constructor(host, o) {
    this.h = host; this.main = o.main; this.act = o.actions; this.cb = o.onChange; this.tap = o.tap || (() => false); this.can = o.can || (() => true);
    this.open = false; this.x = 0; this.d = null; this.swallow = false; const m = this.main;
    m.addEventListener('dragstart', e => e.preventDefault());
    m.addEventListener('pointerdown', e => { if (!this.can() || e.button > 0) return; this.d = { x0: e.clientX, y0: e.clientY, base: this.open ? -this.w() : 0, moved: false, id: e.pointerId }; });
    m.addEventListener('pointermove', e => {
      const d = this.d; if (!d || d.id !== e.pointerId) return; const dx = e.clientX - d.x0, dy = e.clientY - d.y0;
      if (!d.moved) { if (Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) { this.d = null; return; } if (Math.abs(dx) < 6) return; d.moved = true; m.classList.add('drag'); try { m.setPointerCapture(d.id); } catch (er) { } }
      const w = this.w(); this.set(Math.max(-w - 16, Math.min(16, d.base + (this.rtl() ? -dx : dx))));
    });
    const up = e => {
      const d = this.d; if (!d || d.id !== e.pointerId) return; this.d = null; m.classList.remove('drag');
      if (d.moved) { this.swallow = true; setTimeout(() => { this.swallow = false; }, 0); const w = this.w(), x = Math.abs(this.x); this.setOpen(d.base ? x > w * .6 : x > w * .35, true); }
    };
    m.addEventListener('pointerup', up); m.addEventListener('pointercancel', up);
    m.addEventListener('click', e => {
      if (this.swallow) { e.stopPropagation(); e.preventDefault(); return; } if (!this.can()) return;
      if (this.open) { e.stopPropagation(); e.preventDefault(); this.setOpen(false, true); } else if (this.tap()) { e.stopPropagation(); e.preventDefault(); this.setOpen(true, true); }
    }, true);
  }
  rtl() { return getComputedStyle(this.h).direction === 'rtl'; }
  w() { return this.act.offsetWidth || 0; }
  set(x) { this.x = x; this.main.style.setProperty('--_x', `${this.rtl() ? -x : x}px`); }
  apply(open) { if (this.d && this.d.moved) return; this.open = open; this.set(open ? -this.w() : 0); }
  setOpen(v, user) { this.open = v; this.set(v ? -this.w() : 0); if (user && this.cb) this.cb(v); }
}
const _swipeActions = (slot, open) => slot.assignedElements({ flatten: true }).forEach((a, i) => { a.toggleAttribute('data-open', open); a.style.setProperty('--_d', open ? `${(.02 + i * .03).toFixed(2)}s` : '0s'); });

/* ==========================================================================
   07. List — md-list · md-list-item · md-item
       HTML spec (.mate-card-group / .mate-card): grouped cards, 2px gaps, outer radius 22px / inner 4px,
       press morph → 14px / 10px / 8px, 40px round leading avatar, 15px/500 title, 13px secondary text.
       md-list[flat] restores the classic flat Material list.
   ========================================================================== */
const ITEM_LAYOUT = `
.row{position:relative;display:flex;align-items:center;gap:var(--md-list-item-gap,14px);min-height:var(--md-list-item-one-line-container-height,56px);box-sizing:border-box;width:100%}
.body{flex:1;min-width:0;display:flex;flex-direction:column;justify-content:center;gap:2px;text-align:start}
.overline{display:none;font:500 11px/16px var(--md-ref-typeface-plain,Inter,sans-serif);letter-spacing:.5px;text-transform:uppercase;color:var(--md-sys-color-on-surface-variant)}
.headline{font:500 15px/20px var(--md-ref-typeface-plain,Inter,sans-serif);color:var(--md-list-item-label-text-color,var(--md-sys-color-on-surface));overflow:hidden;text-overflow:ellipsis}
.support{font:400 13px/18px var(--md-ref-typeface-plain,Inter,sans-serif);color:var(--md-list-item-supporting-text-color,var(--md-sys-color-on-surface-variant))}
.trail-support{font:500 12px/16px var(--md-ref-typeface-plain,Inter,sans-serif);color:var(--md-list-item-trailing-supporting-text-color,var(--md-sys-color-on-surface-variant));flex:none}
.start,.end{display:flex;align-items:center;flex:none;gap:10px;color:var(--md-list-item-leading-icon-color,var(--md-sys-color-on-surface-variant))}
.end{color:var(--md-list-item-trailing-icon-color,var(--md-sys-color-on-surface-variant))}
.start ::slotted([slot=start]){display:flex;align-items:center;justify-content:center}
.start ::slotted(md-icon),.end ::slotted(md-icon){--md-icon-size:24px}
.start ::slotted(img),.start ::slotted([slot=start][class~=avatar]){width:40px;height:40px;border-radius:50%;object-fit:cover}
.start:not(.has),.end:not(.has),.overline:not(.has),.support:not(.has),.trail-support:not(.has){display:none}
.overline.has{display:block}`;
class MdItem extends MateElement {
  static styles = css`:host{display:flex;position:relative;flex:1;text-align:start;box-sizing:border-box}` + ITEM_LAYOUT + `.container{display:flex;width:100%;padding:var(--md-item-padding,12px 16px)}`;
  build() {
    this.shadowRoot.innerHTML = '<slot name="container"></slot><div class="container"><div class="row"><div class="start"><slot name="start"></slot></div><div class="body"><div class="overline"><slot name="overline"></slot></div><div class="headline"><slot name="headline"></slot><slot></slot></div><div class="support"><slot name="supporting-text"></slot></div></div><div class="trail-support"><slot name="trailing-supporting-text"></slot></div><div class="end"><slot name="end"></slot></div></div></div>';
    this._slots();
  }
  _slots() {
    for (const [cls, name] of [['start', 'start'], ['end', 'end'], ['overline', 'overline'], ['support', 'supporting-text'], ['trail-support', 'trailing-supporting-text']]) {
      const s = this.$(`slot[name="${name}"]`), box = this.$('.' + cls); const f = () => box.classList.toggle('has', s.assignedNodes().length > 0); s.addEventListener('slotchange', f); f();
    }
  }
}
defineElement('md-item', MdItem);

class MdListItem extends MateElement {
  static delegatesFocus = true;
  static props = { type: { type: String, reflect: true, default: 'text' }, href: { type: String, reflect: true }, target: { type: String, reflect: true }, disabled: { type: Boolean, reflect: true }, swipeOpen: { type: Boolean, attribute: 'swipe-open', reflect: true }, tapToggle: { type: Boolean, attribute: 'tap-toggle' } };
  static styles = css`
:host{display:flex;position:relative;outline:none;-webkit-tap-highlight-color:transparent;--_r:var(--md-list-item-container-shape,22px);--_rp:14px;--_pos:var(--_r);
--_bg:var(--md-list-item-container-color,var(--md-sys-color-surface-container-lowest));--md-ripple-hover-color:var(--md-sys-color-on-surface);--md-ripple-pressed-opacity:0;--md-ripple-pressed-color:var(--md-sys-color-on-surface)}
:host([data-pos=top]){--_r:22px 22px 4px 4px;--_rp:14px 14px 8px 8px}:host([data-pos=mid]){--_r:4px;--_rp:10px}:host([data-pos=bot]){--_r:4px 4px 22px 22px;--_rp:8px 8px 14px 14px}:host([data-pos=single]){--_r:22px;--_rp:14px}
:host([data-flat]){--_r:0;--_rp:0;--_bg:var(--md-list-item-container-color,transparent)}
:host([disabled]){pointer-events:none;opacity:.38}
.item{position:relative;display:flex;width:100%;box-sizing:border-box;padding:var(--md-list-item-padding,14px 16px);border:0;margin:0;background:var(--_bg);color:inherit;border-radius:var(--_r);text-decoration:none;text-align:start;font:inherit;outline:none;overflow:hidden;-webkit-appearance:none;appearance:none;
transition:border-radius .35s var(--mate-spring-fast),background-color .25s}
.item.hold{border-radius:var(--_rp)}
:host([type=text]) .item{cursor:default}:host(:not([type=text])) .item{cursor:pointer}
:host(:not([type=text])) .item.hold,:host(:not([type=text])) .item:active{background:var(--md-list-item-pressed-container-color,var(--md-sys-color-surface-container))}
md-ripple{border-radius:inherit}
.sw{display:flex;width:100%;border-radius:var(--_r)}:host([has-swipe]) .sw{overflow:hidden}:host([has-swipe]) .sw.hold{border-radius:var(--_rp)}
.item{flex:1;transition:border-radius .35s var(--mate-spring-fast),background-color .25s,transform .38s var(--mate-spring-spatial)}` + ITEM_LAYOUT + SWIPE_CSS;
  build() {
    this.shadowRoot.innerHTML = '';
    this._mount();
  }
  _mount() {
    const type = this.type, tag = type === 'link' ? 'a' : type === 'button' ? 'button' : 'div'; this._tag = tag;
    this.shadowRoot.querySelectorAll('.sw').forEach(n => n.remove());
    const w = document.createElement('div');
    w.innerHTML = `<div class="sw" part="swipe"><div class="swa" part="swipe-actions"><slot name="swipe-actions"></slot></div><${tag} class="item swx" part="item"${tag === 'button' ? ' type="button"' : ''}><md-ripple part="ripple"></md-ripple><md-focus-ring part="focus-ring" inward></md-focus-ring><div class="row"><div class="start"><slot name="start"></slot></div><div class="body"><div class="overline"><slot name="overline"></slot></div><div class="headline"><slot name="headline"></slot><slot></slot></div><div class="support"><slot name="supporting-text"></slot></div></div><div class="trail-support"><slot name="trailing-supporting-text"></slot></div><div class="end"><slot name="end"></slot></div></div></${tag}></div>`;
    this._sw = w.firstElementChild; this._item = this._sw.querySelector('.item'); this.shadowRoot.appendChild(this._sw); this._slots();
    if (type !== 'text') this.bindHold(this._item);
    this.bindHold(this._sw); this._initSwipe();
  }
  _slots() { MdItem.prototype._slots.call(this); }
  _initSwipe() {
    const s = this.$('slot[name=swipe-actions]');
    this._swipe = new _SwipeCtl(this, { main: this._item, actions: this.$('.swa'), can: () => this.hasAttribute('has-swipe'), tap: () => this.tapToggle, onChange: o => { this.swipeOpen = o; this.emit(o ? 'swipe-open' : 'swipe-close', { bubbles: true }); } });
    const f = () => this.toggleAttribute('has-swipe', s.assignedNodes().length > 0); s.addEventListener('slotchange', () => { f(); this._schedule(); }); f();
  }
  get isListItem() { return true; }
  update() {
    const want = this.type === 'link' ? 'a' : this.type === 'button' ? 'button' : 'div'; if (want !== this._tag) this._mount();
    const it = this._item;
    if (this._tag === 'a') { this.disabled ? it.removeAttribute('href') : it.setAttribute('href', this.href); this.target ? it.setAttribute('target', this.target) : it.removeAttribute('target'); }
    if (this._tag === 'button') it.disabled = this.disabled;
    it.setAttribute('role', this.type === 'text' ? 'listitem' : 'listitem'); this.setAttribute('role', 'listitem');
    if (this._swipe) { this._swipe.apply(this.swipeOpen); _swipeActions(this.$('slot[name=swipe-actions]'), this.swipeOpen); }
    it.tabIndex = this.type === 'text' ? -1 : (this._tabbable === false ? -1 : 0);
    this.type === 'text' ? it.removeAttribute('aria-disabled') : it.setAttribute('aria-disabled', String(this.disabled));
  }
  focus(o) { this._item && this._item.focus(o); }
}
defineElement('md-list-item', MdListItem);

class MdList extends MateElement {
  static props = { flat: { type: Boolean, reflect: true } };
  static styles = css`
:host{display:flex;flex-direction:column;gap:2px;background:var(--md-list-container-color,transparent);padding:var(--md-list-padding,0);margin:0;position:relative}
:host([flat]){gap:0;padding:8px 0;background:var(--md-list-container-color,var(--md-sys-color-surface))}`;
  build() {
    this.shadowRoot.innerHTML = '<slot></slot>'; this.setAttribute('role', 'list');
    this.shadowRoot.querySelector('slot').addEventListener('slotchange', () => this._pos());
    this.addEventListener('keydown', e => this._key(e));
  }
  update() { this._pos(); }
  get items() { return Array.from(this.children).filter(c => c.isListItem || c.tagName === 'MD-ITEM' || c.hasAttribute('md-list-item')); }
  _pos() {
    const items = this.items.filter(i => i.isListItem), n = items.length;
    items.forEach((it, i) => { it.toggleAttribute('data-flat', this.flat); if (this.flat) it.removeAttribute('data-pos'); else it.setAttribute('data-pos', n === 1 ? 'single' : i === 0 ? 'top' : i === n - 1 ? 'bot' : 'mid'); });
    const act = items.filter(i => i.type !== 'text' && !i.disabled); items.forEach(i => { i._tabbable = act[0] === i; i._schedule(); });
  }
  _act() { return this.items.filter(i => i.isListItem && i.type !== 'text' && !i.disabled); }
  _move(d) {
    const a = this._act(); if (!a.length) return null; let c = a.findIndex(i => i._tabbable); const cur = a.findIndex(i => i === document.activeElement || i.matches(':focus-within') || i.shadowRoot.activeElement); if (cur >= 0) c = cur;
    const n = a[(Math.max(c, 0) + d + a.length) % a.length]; a.forEach(i => { i._tabbable = i === n; i._schedule(); }); n.focus(); return n;
  }
  activateNextItem() { return this._move(1); }
  activatePreviousItem() { return this._move(-1); }
  _key(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); this.activateNextItem(); } else if (e.key === 'ArrowUp') { e.preventDefault(); this.activatePreviousItem(); }
    else if (e.key === 'Home') { e.preventDefault(); const a = this._act(); if (a[0]) { a.forEach(i => { i._tabbable = i === a[0]; i._schedule(); }); a[0].focus(); } }
    else if (e.key === 'End') { e.preventDefault(); const a = this._act(), l = a[a.length - 1]; if (l) { a.forEach(i => { i._tabbable = i === l; i._schedule(); }); l.focus(); } }
  }
}
defineElement('md-list', MdList);

/* ==========================================================================
   08. Fields — md-filled-field · md-outlined-field · md-filled-text-field · md-outlined-text-field
       HTML spec (.mate-outlined-field): 1px --md-sys-color-outline border, 6px radius, 15px input, floating label 11px
       with a real notch in the outline; focus = 2px primary; error = --md-sys-color-error.
   ========================================================================== */
const FIELD_BASE_CSS = css`
:host{display:inline-flex;vertical-align:top;min-width:var(--md-field-min-width,210px);max-width:100%;text-align:start;
--_lc:var(--md-field-label-text-color,var(--md-sys-color-on-surface-variant));--_fc:var(--md-field-focus-label-text-color,var(--md-sys-color-primary));--_ec:var(--md-sys-color-error);
--_ic:var(--md-field-input-text-color,var(--md-sys-color-on-surface));--_sc:var(--md-field-supporting-text-color,var(--md-sys-color-on-surface-variant));--_h:var(--md-field-container-height,56px);
--_font:400 15px/22px var(--md-ref-typeface-plain,Inter,sans-serif)}
:host([disabled]){pointer-events:none}
.field{position:relative;display:flex;flex-direction:column;flex:1;min-width:0;font:var(--_font)}
.box{position:relative;display:flex;align-items:stretch;min-height:var(--_h);box-sizing:border-box;border-radius:var(--_r)}
.start,.end{display:none;align-items:center;flex:none;color:var(--md-field-icon-color,var(--md-sys-color-on-surface-variant));padding:0 12px;z-index:1}
:host([has-start]) .start,:host([has-end]) .end{display:flex}
.start ::slotted(*),.end ::slotted(*){--md-icon-size:24px}
.middle{position:relative;display:flex;flex:1;min-width:0;align-items:center;padding:0 16px;z-index:1}
:host([has-start]) .middle{padding-inline-start:0}:host([has-end]) .middle{padding-inline-end:0}
.content{flex:1;min-width:0;display:flex;align-items:center;color:var(--_ic);position:relative;z-index:1}
:host([resizable]) .content{align-items:stretch}
.label{position:absolute;inset-inline:0;top:50%;max-width:100%;transform:translateY(-50%);pointer-events:none;color:var(--_lc);font:var(--_font);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transform-origin:left center;
transition:transform .3s var(--mate-spring-fast),top .3s var(--mate-spring-fast),font-size .2s,color .2s;z-index:2}
:host(:dir(rtl)) .label{transform-origin:right center}
:host([focused]) .label{color:var(--_fc)}
:host([error]) .label,:host([error][focused]) .label{color:var(--_ec)}
:host([required]) .label::after{content:'*'}
.supporting{display:flex;justify-content:space-between;gap:16px;padding:4px 16px 0;font:400 12px/16px var(--md-ref-typeface-plain,Inter,sans-serif);color:var(--_sc);min-height:0}
.supporting:empty{display:none}
:host([error]) .supporting{color:var(--_ec)}
.counter{flex:none;margin-inline-start:auto}
:host([disabled]) .label,:host([disabled]) .content,:host([disabled]) .supporting{opacity:.38}
:host([disabled]) .start,:host([disabled]) .end{opacity:.38}`;

class MdFieldBase extends MateElement {
  static props = {
    disabled: { type: Boolean, reflect: true }, error: { type: Boolean, reflect: true }, focused: { type: Boolean, reflect: true }, label: { type: String },
    populated: { type: Boolean, reflect: true }, required: { type: Boolean, reflect: true }, resizable: { type: Boolean, reflect: true },
    supportingText: { type: String, attribute: 'supporting-text' }, errorText: { type: String, attribute: 'error-text' },
    count: { type: Number, default: -1 }, max: { type: Number, default: -1 },
    hasStart: { type: Boolean, attribute: 'has-start', reflect: true }, hasEnd: { type: Boolean, attribute: 'has-end', reflect: true }
  };
  static styles = FIELD_BASE_CSS;
  chrome() { return ''; }
  build() {
    this.shadowRoot.innerHTML = `<div class="field" part="field"><div class="box" part="container">${this.chrome()}<div class="start"><slot name="start"></slot></div><div class="middle"><span class="label" part="label"></span><div class="content"><slot></slot></div></div><div class="end"><slot name="end"></slot></div></div><div class="supporting" part="supporting"><span class="msg"></span><span class="counter"></span></div></div>`;
    this._label = this.$('.label'); this._msg = this.$('.msg'); this._cnt = this.$('.counter');
    for (const [n, a] of [['start', 'hasStart'], ['end', 'hasEnd']]) { const s = this.$(`slot[name=${n}]`); const f = () => { this[a] = s.assignedNodes().length > 0; }; s.addEventListener('slotchange', f); f(); }
    if (typeof ResizeObserver !== 'undefined') { this._ro = new ResizeObserver(() => this._measure()); this._ro.observe(this._label); }
  }
  get floated() { return this.focused || this.populated; }
  _measure() { }
  update() {
    this._label.textContent = this.label || ''; this.toggleAttribute('floated', this.floated); this.toggleAttribute('has-label', !!this.label);
    this._msg.textContent = this.error && this.errorText ? this.errorText : (this.supportingText || '');
    this._cnt.textContent = this.count >= 0 && this.max >= 0 ? `${this.count} / ${this.max}` : '';
    this._measure();
  }
  reannounceError() { }
}

class MdFilledField extends MdFieldBase {
  static styles = css`
:host{--_r:var(--md-filled-field-container-shape,6px 6px 0 0);--_bg:var(--md-filled-field-container-color,var(--md-sys-color-surface-container-highest));--_ind:var(--md-filled-field-active-indicator-color,var(--md-sys-color-on-surface-variant))}
.bg{position:absolute;inset:0;border-radius:inherit;background:var(--_bg);transition:background-color .25s}
:host(:hover) .bg{background:color-mix(in srgb,var(--_bg),var(--md-sys-color-on-surface) 6%)}
:host([disabled]) .bg{background:color-mix(in srgb,var(--md-sys-color-on-surface) 4%,transparent)}
.ind{position:absolute;inset-inline:0;bottom:0;height:1px;background:var(--_ind);transition:height .2s,background-color .2s}
.ind::after{content:'';position:absolute;inset-inline:0;bottom:0;height:0;background:var(--md-sys-color-primary);transform:scaleX(0);transition:transform .3s var(--mate-ease-decel),height .2s}
:host([focused]) .ind{height:1px}:host([focused]) .ind::after{height:2px;transform:scaleX(1)}
:host([error]) .ind,:host([error]) .ind::after{background:var(--md-sys-color-error)}
.middle{padding-top:0}
.label{top:50%}
:host([floated]) .label{top:8px;transform:translateY(0) scale(.75);width:133%;inset-inline-end:auto}
:host([floated][has-label]) .content{padding-top:18px}
:host([has-label]) .content{min-height:var(--_h)}
:host([floated][has-label]) .content{align-items:flex-end;padding-bottom:8px;padding-top:24px}
:host([floated][has-label][resizable]) .content{align-items:stretch}`;
  chrome() { return '<div class="bg"></div><div class="ind"></div>'; }
}
class MdOutlinedField extends MdFieldBase {
  static styles = css`
:host{--_r:var(--md-outlined-field-container-shape,6px);--_oc:var(--md-outlined-field-outline-color,var(--md-sys-color-outline));--_ow:var(--md-outlined-field-outline-width,1px);--_nw:0px}
.outline{position:absolute;inset:0;display:flex;border-radius:inherit;pointer-events:none;color:var(--_oc);z-index:0}
.o-s,.o-n,.o-e{box-sizing:border-box;border:var(--_ow) solid currentColor;transition:border-color .2s,border-width .15s}
.o-s{width:12px;border-inline-end:0;border-start-start-radius:var(--_r);border-end-start-radius:var(--_r)}
.o-n{flex:none;width:var(--_nw);border-inline:0;transition:width .25s var(--mate-spring-fast),border-color .2s,border-width .15s}
.o-e{flex:1;border-inline-start:0;border-start-end-radius:var(--_r);border-end-end-radius:var(--_r)}
:host([floated][has-label]) .o-n{border-top-color:transparent}
:host(:hover) .outline{color:var(--md-outlined-field-hover-outline-color,var(--md-sys-color-on-surface))}
:host([focused]) .outline{color:var(--md-sys-color-primary)}
:host([focused]) .o-s,:host([focused]) .o-n,:host([focused]) .o-e{border-width:2px}
:host([error]) .outline,:host([error][focused]) .outline{color:var(--md-sys-color-error)}
:host([disabled]) .outline{color:color-mix(in srgb,var(--md-sys-color-on-surface) 12%,transparent)}
.label{top:50%}
:host([floated]) .label{top:0;transform:translateY(-50%) scale(.75);width:133%;inset-inline-end:auto;padding-inline:0;z-index:2}
:host([floated]) .label{margin-inline-start:-4px;padding-inline:4px}
.middle{padding-top:0}
:host(.shaped){--_r:var(--md-outlined-field-container-shape,6px)}
:host([has-start]) .label,:host([has-start]) .middle{}
`;
  chrome() { return '<div class="outline"><div class="o-s"></div><div class="o-n"></div><div class="o-e"></div></div>'; }
  _measure() {
    if (!this._label) return; const on = this.floated && this.label;
    const w = on ? this._label.scrollWidth * .75 + 8 : 0; this.style.setProperty('--_nw', on ? `${Math.ceil(w)}px` : '0px');
    const hs = this.hasStart && !this.floated ? 0 : 0;
    this.$('.o-s').style.width = this.hasStart ? `${12 + this.$('.start').offsetWidth}px` : '12px';
    this._label.style.insetInlineStart = this.hasStart ? `${this.$('.start').offsetWidth + 0}px` : '';
  }
}
defineElement('md-filled-field', MdFilledField); defineElement('md-outlined-field', MdOutlinedField);

/* ---- text field ---- */
class MdTextFieldBase extends MateElement {
  static formAssociated = true;
  static delegatesFocus = true;
  static ariaAttrs = ['aria-label', 'aria-describedby', 'aria-labelledby', 'aria-controls', 'aria-expanded', 'aria-haspopup', 'aria-activedescendant', 'aria-autocomplete', 'aria-invalid'];
  static fieldTag = 'md-outlined-field';
  static props = {
    disabled: { type: Boolean, reflect: true }, error: { type: Boolean, reflect: true }, errorText: { type: String, attribute: 'error-text' },
    label: { type: String }, required: { type: Boolean, reflect: true }, value: { type: String }, prefixText: { type: String, attribute: 'prefix-text' }, suffixText: { type: String, attribute: 'suffix-text' },
    hasLeadingIcon: { type: Boolean, attribute: 'has-leading-icon', reflect: true }, hasTrailingIcon: { type: Boolean, attribute: 'has-trailing-icon', reflect: true },
    supportingText: { type: String, attribute: 'supporting-text' }, textDirection: { type: String, attribute: 'text-direction' },
    rows: { type: Number, default: 2 }, cols: { type: Number, default: 20 }, inputMode: { type: String, attribute: 'inputmode' },
    max: { type: String }, maxLength: { type: Number, attribute: 'maxlength', default: -1 }, min: { type: String }, minLength: { type: Number, attribute: 'minlength', default: -1 },
    noSpinner: { type: Boolean, attribute: 'no-spinner', reflect: true }, pattern: { type: String }, placeholder: { type: String },
    readOnly: { type: Boolean, attribute: 'readonly', reflect: true }, multiple: { type: Boolean, reflect: true }, step: { type: String },
    type: { type: String, default: 'text', reflect: true }, autocomplete: { type: String }, name: { type: String, reflect: true }
  };
  static get observedAttributes() { return [...super.observedAttributes, ...MdTextFieldBase.ariaAttrs]; }
  static styles = css`
:host{display:inline-flex;outline:none;vertical-align:top;-webkit-tap-highlight-color:transparent}
:host([disabled]){pointer-events:none}
.tf{display:flex;flex:1;min-width:0}
md-filled-field,md-outlined-field{flex:1;min-width:0}
.input{flex:1;min-width:0;width:100%;align-self:stretch;margin:0;padding:0;border:0;outline:none;background:transparent;color:inherit;font:inherit;letter-spacing:inherit;text-align:inherit;caret-color:var(--md-sys-color-primary);-webkit-appearance:none;appearance:none;text-overflow:ellipsis;resize:none}
textarea.input{padding:16px 0;min-height:calc(var(--md-field-container-height,56px) - 0px);resize:none;overflow:auto;line-height:22px}
:host([resizable]) textarea.input{resize:vertical}
.input::placeholder{color:var(--md-field-placeholder-color,var(--md-sys-color-on-surface-variant));opacity:1}
.input::selection{background:color-mix(in srgb,var(--md-sys-color-primary) 30%,transparent)}
.tf:not(.floated) .input.has-label::placeholder{color:transparent}
.affix{flex:none;color:var(--md-sys-color-on-surface-variant);opacity:0;transition:opacity .15s;white-space:nowrap;align-self:center}
.affix:empty{display:none}.prefix{padding-inline-end:2px}.suffix{padding-inline-start:2px}
.tf.floated .affix{opacity:1}
:host([error]) .input{caret-color:var(--md-sys-color-error)}
:host([no-spinner]) .input::-webkit-inner-spin-button,:host([no-spinner]) .input::-webkit-outer-spin-button{display:none}
:host([no-spinner]) .input[type=number]{-moz-appearance:textfield}
:host([disabled]) .input{color:inherit}`;
  build() {
    this.shadowRoot.innerHTML = '';
    this._ariaDirty = true; this._focused = false; this._nativeError = false; this._nativeErrorText = ''; this._customMsg = '';
    this._mount();
    this.addEventListener('invalid', e => { this._nativeError = true; this._nativeErrorText = this.validationMessage; this._schedule(); });
  }
  _mount() {
    const ta = this.type === 'textarea'; this._isTA = ta; this.shadowRoot.querySelectorAll('.tf').forEach(n => n.remove());
    const w = document.createElement('div'), F = this.constructor.fieldTag;
    w.innerHTML = `<div class="tf"><${F} part="field"><slot name="leading-icon" slot="start"></slot><span class="affix prefix"></span>${ta ? '<textarea class="input" part="input"></textarea>' : '<input class="input" part="input">'}<span class="affix suffix"></span><slot name="trailing-icon" slot="end"></slot></${F}></div>`;
    this._tf = w.firstElementChild; this.shadowRoot.appendChild(this._tf);
    this._field = this._tf.firstElementChild; this._in = this._tf.querySelector('.input'); this._pre = this._tf.querySelector('.prefix'); this._suf = this._tf.querySelector('.suffix');
    const i = this._in;
    i.addEventListener('input', e => { this._p.value = i.value; this._nativeError = false; this._after(); });
    i.addEventListener('change', e => { this._p.value = i.value; this.redispatch(e); this._after(); });
    i.addEventListener('select', e => this.redispatch(e));
    i.addEventListener('focus', () => { this._focused = true; this._schedule(); }); i.addEventListener('blur', () => { this._focused = false; this._schedule(); });
    i.addEventListener('keydown', e => { if (e.key === 'Enter' && !ta && !e.isComposing && !e.defaultPrevented) { const f = this.form; if (f) { const s = f.querySelector('[type=submit]'); if (s || f.querySelectorAll('input,md-filled-text-field,md-outlined-text-field').length === 1) f.requestSubmit(); } } });
    for (const [n, a] of [['leading-icon', 'hasLeadingIcon'], ['trailing-icon', 'hasTrailingIcon']]) { const s = this._tf.querySelector(`slot[name=${n}]`); const f = () => { this[a] = s.assignedNodes().length > 0; }; s.addEventListener('slotchange', f); f(); }
    this._ariaDirty = true; this._syncAll = true;
  }
  _after() { this._syncForm(); this._schedule(); }
  _syncForm() {
    if (!this._internals) return;
    this._internals.setFormValue(this.disabled ? null : this.value);
    const i = this._in; if (!i) return;
    i.setCustomValidity(this._customMsg || '');
    if (i.validity.valid) this._internals.setValidity({}); else this._internals.setValidity(i.validity, i.validationMessage || this._customMsg, i);
  }
  attributeChangedCallback(n, o, v) { if (n.startsWith('aria-')) { this._ariaDirty = true; this._schedule(); return; } super.attributeChangedCallback(n, o, v); }
  update() {
    if (this._isTA !== (this.type === 'textarea')) this._mount();
    const i = this._in, tf = this._tf, T = this.type || 'text';
    if (!this._isTA) { try { i.type = T; } catch (e) { i.type = 'text'; } } else { i.rows = this.rows; i.cols = this.cols; }
    if (i.value !== this.value) i.value = this.value;
    const set = (a, v) => (v === '' || v == null || v === false) ? i.removeAttribute(a) : i.setAttribute(a, v === true ? '' : String(v));
    i.disabled = this.disabled; i.required = this.required; i.readOnly = this.readOnly;
    set('placeholder', this.placeholder); set('pattern', this.pattern); set('min', this.min); set('max', this.max); set('step', this.step); set('autocomplete', this.autocomplete); set('inputmode', this.inputMode);
    set('maxlength', this.maxLength >= 0 ? this.maxLength : ''); set('minlength', this.minLength >= 0 ? this.minLength : ''); set('dir', this.textDirection); set('name', this.name);
    if (!this._isTA) i.multiple = this.multiple;
    i.classList.toggle('has-label', !!this.label);
    if (this._ariaDirty) { for (const a of MdTextFieldBase.ariaAttrs) { const v = this.getAttribute(a); v !== null ? i.setAttribute(a, v) : i.removeAttribute(a); } this._ariaDirty = false; }
    if (!this.getAttribute('aria-label')) i.setAttribute('aria-label', this.label || this.placeholder || ''); 
    this._pre.textContent = this.prefixText || ''; this._suf.textContent = this.suffixText || '';
    const f = this._field, err = this.error || this._nativeError, populated = !!(this.value) || (this.placeholder && false);
    f.disabled = this.disabled; f.error = err; f.focused = this._focused; f.label = this.label; f.populated = populated; f.required = this.required; f.resizable = this.resizable === true || this.hasAttribute('resizable');
    f.supportingText = this.supportingText; f.errorText = this.errorText || this._nativeErrorText; f.count = this.maxLength >= 0 ? this.value.length : -1; f.max = this.maxLength;
    if (this.error || this._nativeError) i.setAttribute('aria-invalid', 'true'); else i.removeAttribute('aria-invalid');
    tf.classList.toggle('floated', this._focused || populated);
    this._syncForm();
  }
  get form() { return this._internals ? this._internals.form : null; }
  get labels() { return this._internals ? this._internals.labels : []; }
  get validity() { return this._in ? (this._syncForm(), this._internals.validity) : null; }
  get validationMessage() { return this._internals ? this._internals.validationMessage : ''; }
  get willValidate() { return this._internals ? this._internals.willValidate : true; }
  checkValidity() { this._syncForm(); return this._internals.checkValidity(); }
  reportValidity() { this._syncForm(); const ok = this._internals.checkValidity(); if (!ok) { this._nativeError = true; this._nativeErrorText = this.validationMessage; this._schedule(); } return ok; }
  setCustomValidity(m) { this._customMsg = m || ''; this._syncForm(); }
  get selectionStart() { return this._in.selectionStart; } set selectionStart(v) { this._in.selectionStart = v; }
  get selectionEnd() { return this._in.selectionEnd; } set selectionEnd(v) { this._in.selectionEnd = v; }
  get selectionDirection() { return this._in.selectionDirection; } set selectionDirection(v) { this._in.selectionDirection = v; }
  get valueAsNumber() { return this._in.valueAsNumber; } set valueAsNumber(v) { this._in.valueAsNumber = v; this._p.value = this._in.value; this._after(); }
  get valueAsDate() { return this._in.valueAsDate; } set valueAsDate(v) { this._in.valueAsDate = v; this._p.value = this._in.value; this._after(); }
  select() { this._in.select(); }
  setRangeText(...a) { this._in.setRangeText(...a); this._p.value = this._in.value; this._after(); }
  setSelectionRange(s, e, d) { this._in.setSelectionRange(s, e, d); }
  showPicker() { this._in.showPicker && this._in.showPicker(); }
  stepDown(n) { this._in.stepDown(n); this._p.value = this._in.value; this._after(); }
  stepUp(n) { this._in.stepUp(n); this._p.value = this._in.value; this._after(); }
  focus(o) { this._in && this._in.focus(o); }
  blur() { this._in && this._in.blur(); }
  formResetCallback() { this._p.value = this.getAttribute('value') || ''; this._nativeError = false; this._after(); }
  formStateRestoreCallback(s) { this._p.value = String(s ?? ''); this._after(); }
  formDisabledCallback(d) { this.disabled = d; }
}
class MdFilledTextField extends MdTextFieldBase { static fieldTag = 'md-filled-field'; }
class MdOutlinedTextField extends MdTextFieldBase { static fieldTag = 'md-outlined-field'; }
defineElement('md-filled-text-field', MdFilledTextField); defineElement('md-outlined-text-field', MdOutlinedTextField);

/* ==========================================================================
   09. Menus — md-menu · md-menu-item · md-sub-menu
       HTML spec: card surface 20px radius, 8px padding, items 12px radius / 10px 12px, hover surface-container-high,
       spring-fast scale-in from the anchor corner (.32s), shadow-menu. variant="pink" = the HTML pink popup menu
       (tertiary container, 8px 0 padding, 12px 18px items, grey 14% hover). Sub-menus cascade to the side (6px gap).
   ========================================================================== */
const _supportsPopover = typeof HTMLElement !== 'undefined' && 'popover' in HTMLElement.prototype;
const _textOf = el => (el.typeaheadText != null && el.typeaheadText !== '') ? el.typeaheadText : ((el.querySelector && el.querySelector('[slot=headline]')) || el).textContent.trim();

class MdMenu extends MateElement {
  static props = {
    anchor: { type: String }, positioning: { type: String, default: 'popover' }, quick: { type: Boolean, reflect: true }, hasOverflow: { type: Boolean, attribute: 'has-overflow', reflect: true },
    open: { type: Boolean, reflect: true }, xOffset: { type: Number, attribute: 'x-offset', default: 0 }, yOffset: { type: Number, attribute: 'y-offset', default: 0 },
    typeaheadDelay: { type: Number, attribute: 'typeahead-delay', default: 200 }, anchorCorner: { type: String, attribute: 'anchor-corner', default: 'end-start' }, menuCorner: { type: String, attribute: 'menu-corner', default: 'start-start' },
    stayOpenOnOutsideClick: { type: Boolean, attribute: 'stay-open-on-outside-click', reflect: true }, stayOpenOnFocusout: { type: Boolean, attribute: 'stay-open-on-focusout', reflect: true },
    skipRestoreFocus: { type: Boolean, attribute: 'skip-restore-focus', reflect: true }, defaultFocus: { type: String, attribute: 'default-focus', default: 'first-item' },
    variant: { type: String, reflect: true }, matchAnchorWidth: { type: Boolean, attribute: 'match-anchor-width' }, clampWidth: { type: Boolean, attribute: 'clamp-width' }, role: { type: String, default: 'menu' }
  };
  static styles = css`
:host{display:contents}
.surface{position:fixed;left:0;top:0;margin:0;inset:auto;z-index:var(--md-menu-z-index,3000);display:none;flex-direction:column;gap:2px;box-sizing:border-box;min-width:var(--md-menu-min-width,112px);max-width:var(--md-menu-max-width,280px);max-height:min(560px,calc(100vh - 16px));
overflow-x:hidden;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin;outline:none;border:0;padding:8px;color:var(--md-menu-item-label-text-color,var(--md-sys-color-on-surface));
background:var(--md-menu-container-color,var(--md-sys-color-surface-container-lowest));border-radius:var(--md-menu-container-shape,20px);box-shadow:var(--md-menu-container-shadow,var(--mate-shadow-menu,0 8px 24px rgba(0,0,0,.2)));
transform-origin:var(--_o,top left);transform:scale(.82) translateY(-8px);opacity:0;transition:transform .32s var(--mate-spring-fast),opacity .2s ease;
--_ib:var(--md-menu-item-hover-color,var(--md-sys-color-surface-container-high));--_ir:12px;--_ip:10px 12px}
:host([has-overflow]) .surface{overflow:visible}
.surface.show{display:flex}.surface.open{transform:none;opacity:1}
:host([quick]) .surface{transition:none}
:host([variant=pink]) .surface{background:var(--md-menu-container-color,var(--md-sys-color-tertiary-container));color:var(--md-sys-color-on-tertiary-container);padding:8px 0;gap:0;border-radius:var(--md-menu-container-shape,20px);
--md-menu-item-label-text-color:var(--md-sys-color-on-tertiary-container);--md-menu-item-supporting-text-color:var(--md-sys-color-on-tertiary-container);--md-menu-item-icon-color:var(--md-sys-color-on-tertiary-container);
--_ib:rgba(128,128,128,.14);--_ir:0;--_ip:12px 18px}
.surface:not([popover]){}
@media(prefers-reduced-motion:reduce){.surface{transition:none}}`;
  build() {
    this.shadowRoot.innerHTML = `<div class="surface" part="menu" tabindex="-1"${_supportsPopover ? ' popover="manual"' : ''}><slot></slot></div>`;
    this._s = this.$('.surface'); this._shown = false; this._typed = ''; this._tt = 0;
    this._onKey = e => this._key(e); this._s.addEventListener('keydown', this._onKey);
    this._s.addEventListener('focusout', () => this._focusout());
    this.addEventListener('close-menu', e => { if (this._shown) this._requestClose(e.detail && e.detail.reason); });
    this._outside = e => { if (!this.open || this.stayOpenOnOutsideClick) return; const p = e.composedPath(), a = this._anchorEl(); if (p.includes(this._s) || p.includes(this) || (a && p.includes(a))) return; this._requestClose({ kind: 'click-outside' }); };
    this._reposition = () => { if (this._shown) this._place(); };
  }
  get anchorElement() { return this._anchorP || null; } set anchorElement(v) { this._anchorP = v; if (this._shown) this._place(); }
  _anchorEl() {
    if (this._anchorP) return this._anchorP;
    if (this.anchor) { const r = this.getRootNode(); return (r.getElementById && r.getElementById(this.anchor)) || document.getElementById(this.anchor); }
    return this.parentElement;
  }
  get items() {
    const out = [];
    for (const c of Array.from(this.children)) { if (c.isSubMenu) { const it = c.item; if (it) out.push(it); } else if (c.isMenuItem) out.push(c); }
    return out;
  }
  _enabled() { return this.items.filter(i => !i.disabled); }
  get surfaceElement() { return this._s; }
  show() { this.open = true; } close() { this.open = false; }
  update() {
    this._s.setAttribute('role', this.role || 'menu');
    if (this.open && !this._shown) this._doOpen(); else if (!this.open && this._shown) this._doClose();
  }
  disconnectedCallback() { if (this._shown) this._teardown(); }
  _requestClose(reason) { if (!this.open) return; this.open = false; this._lastReason = reason; this._doClose(); }
  _doOpen() {
    this._shown = true; clearTimeout(this._closeT); const s = this._s;
    this.emit('opening', { bubbles: true, composed: true });
    s.classList.add('show'); if (_supportsPopover) { try { s.showPopover(); } catch (e) { } }
    const a = this._anchorEl();
    this._place();
    document.addEventListener('pointerdown', this._outside, true); window.addEventListener('resize', this._reposition); window.addEventListener('scroll', this._reposition, true);
    void s.offsetWidth; s.classList.add('open');
    this._items().forEach(i => { i._tabbable = false; i._schedule && i._schedule(); });
    const en = this._enabled(); let t = this.initialFocusItem && !this.initialFocusItem.disabled ? this.initialFocusItem : (this.defaultFocus === 'last-item' ? en[en.length - 1] : en[0]);
    if (this.defaultFocus === 'none' && !this.initialFocusItem) t = null;
    if (this.defaultFocus === 'list-root' && !this.initialFocusItem) { s.focus({ preventScroll: true }); t = null; }
    if (t) { this._setActive(t); requestAnimationFrame(() => { t.focus({ preventScroll: true }); t.scrollIntoView && t.scrollIntoView({ block: 'nearest' }); }); } else if (this.items[0]) this._setActive(this.items[0], true);
    this._ot = setTimeout(() => this.emit('opened', { bubbles: true, composed: true }), this.quick ? 0 : 320);
  }
  _items() { return this.items; }
  _setActive(item, soft) { this.items.forEach(i => { i._tabbable = i === item; i._schedule && i._schedule(); }); }
  _doClose() {
    if (!this._shown) return; this._shown = false; clearTimeout(this._ot); const s = this._s;
    this.emit('closing', { bubbles: true, composed: true });
    s.classList.remove('open');
    const fin = () => { s.classList.remove('show'); if (_supportsPopover) { try { s.hidePopover(); } catch (e) { } } this.emit('closed', { bubbles: true, composed: true }); };
    this._teardown();
    const a = this._anchorEl(), r = this._lastReason;
    if (!this.skipRestoreFocus && a && a.focus && !(r && r.kind === 'click-outside')) { try { a.focus({ preventScroll: true }); } catch (e) { } }
    this._lastReason = null; this.initialFocusItem = null;
    if (this.quick || _reduceMotion()) fin(); else this._closeT = setTimeout(fin, 200);
  }
  _teardown() { document.removeEventListener('pointerdown', this._outside, true); window.removeEventListener('resize', this._reposition); window.removeEventListener('scroll', this._reposition, true); }
  _focusout() {
    if (this.stayOpenOnFocusout) return;
    setTimeout(() => { if (!this._shown) return; const ae = document.activeElement, a = this._anchorEl(); if (this.contains(ae) || (ae && this._s.contains(ae)) || (a && a.contains(ae)) || this.matches(':focus-within') || this._s.matches(':focus-within')) return; this._requestClose({ kind: 'focusout' }); }, 0);
  }
  _place() {
    const s = this._s, a = this._anchorEl(), vw = document.documentElement.clientWidth || innerWidth, vh = innerHeight, m = 8;
    const A = a ? a.getBoundingClientRect() : { left: vw / 2, right: vw / 2, top: vh / 2, bottom: vh / 2, width: 0, height: 0 };
    if (this.matchAnchorWidth) s.style.minWidth = `${A.width}px`; else s.style.minWidth = '';
    s.style.maxWidth = this.clampWidth ? `${A.width}px` : '';
    s.style.left = '0px'; s.style.top = '0px';
    const W = s.offsetWidth, H = s.offsetHeight, rtl = getComputedStyle(this).direction === 'rtl';
    const [ab, ai] = (this.anchorCorner || 'end-start').split('-'), [mb, mi] = (this.menuCorner || 'start-start').split('-');
    const at = (ab0, ai0) => ({ x: ((ai0 === 'start') !== rtl) ? A.left : A.right, y: ab0 === 'start' ? A.top : A.bottom });
    const calc = (ab0, mb0) => { const p = at(ab0, ai); const mx = (mi === 'start') !== rtl; return { x: (mx ? p.x : p.x - W) + this.xOffset * (rtl ? -1 : 1), y: (mb0 === 'start' ? p.y : p.y - H) + this.yOffset, px: p.x, py: p.y }; };
    let c = calc(ab, mb);
    if (c.y + H > vh - m || c.y < m) {
      const alt = calc(ab === 'start' ? 'end' : 'start', mb === 'start' ? 'end' : 'start');
      const overflow = v => Math.max(0, m - v.y) + Math.max(0, v.y + H - (vh - m));
      if (overflow(alt) < overflow(c)) c = alt;
    }
    const x = Math.max(m, Math.min(c.x, vw - W - m)), y = Math.max(m, Math.min(c.y, vh - H - m));
    s.style.left = `${Math.round(x)}px`; s.style.top = `${Math.round(y)}px`;
    s.style.setProperty('--_o', `${Math.max(0, Math.min(W, c.px - x))}px ${Math.max(0, Math.min(H, c.py - y))}px`);
  }
  _key(e) {
    if (e._mateHandled) return; const en = this._enabled(); if (!en.length && e.key !== 'Escape') return;
    const cur = en.findIndex(i => i === e.target || i.contains(e.target) || i === document.activeElement || (i.shadowRoot && i.shadowRoot.activeElement)); let n = -1;
    switch (e.key) {
      case 'ArrowDown': n = cur < 0 ? 0 : (cur + 1) % en.length; break;
      case 'ArrowUp': n = cur < 0 ? en.length - 1 : (cur - 1 + en.length) % en.length; break;
      case 'Home': n = 0; break; case 'End': n = en.length - 1; break;
      case 'Escape': e._mateHandled = true; e.preventDefault(); this._requestClose({ kind: 'keydown', key: 'Escape' }); return;
      case 'Tab': this._requestClose({ kind: 'keydown', key: 'Tab' }); return;
      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) { e._mateHandled = true; this._typeahead(e.key, en); }
        return;
    }
    e._mateHandled = true; e.preventDefault(); this._setActive(en[n]); en[n].focus(); en[n].scrollIntoView && en[n].scrollIntoView({ block: 'nearest' });
  }
  _typeahead(ch, en) {
    clearTimeout(this._tt); this._typed += ch.toLowerCase(); this._tt = setTimeout(() => { this._typed = ''; }, this.typeaheadDelay);
    const cur = en.findIndex(i => i._tabbable), order = [...en.slice(cur + 1), ...en.slice(0, cur + 1)];
    const hit = order.find(i => _textOf(i).toLowerCase().startsWith(this._typed)); if (hit) { this._setActive(hit); hit.focus(); }
  }
}
defineElement('md-menu', MdMenu);

class MdMenuItem extends MateElement {
  static delegatesFocus = true;
  static props = { disabled: { type: Boolean, reflect: true }, type: { type: String, reflect: true, default: 'menuitem' }, href: { type: String, reflect: true }, target: { type: String, reflect: true }, keepOpen: { type: Boolean, attribute: 'keep-open', reflect: true }, selected: { type: Boolean, reflect: true }, typeaheadText: { type: String, attribute: 'typeahead-text' } };
  static styles = css`
:host{display:flex;position:relative;outline:none;-webkit-tap-highlight-color:transparent;flex:none;min-width:0;--md-ripple-hover-color:var(--md-sys-color-on-surface);--md-ripple-pressed-opacity:0;--md-ripple-pressed-color:var(--md-sys-color-on-surface)}
:host([disabled]){pointer-events:none;opacity:.38}
.item{position:relative;display:flex;width:100%;box-sizing:border-box;padding:var(--md-menu-item-padding,var(--_ip,10px 12px));border:0;margin:0;background:transparent;color:inherit;border-radius:var(--md-menu-item-container-shape,var(--_ir,12px));text-decoration:none;text-align:start;
font:500 14px/20px var(--md-ref-typeface-plain,Inter,sans-serif);cursor:pointer;outline:none;overflow:hidden;transition:background-color .2s ease,color .2s ease}
:host([data-active]) .item{background:var(--_ib,var(--md-sys-color-surface-container-high))}
@media(hover:hover) and (pointer:fine){.item:hover{background:var(--_ib,var(--md-sys-color-surface-container-high))}}
:host([selected]) .item{background:var(--md-menu-item-selected-container-color,var(--md-sys-color-tertiary-container));color:var(--md-menu-item-selected-label-text-color,var(--md-sys-color-on-tertiary-container))}
.item .row{min-height:var(--md-menu-item-container-height,24px);gap:10px}
.item .headline{font:inherit;color:inherit}.item .support{color:var(--md-menu-item-supporting-text-color,var(--md-sys-color-on-surface-variant));font-size:12px;line-height:16px}
:host([selected]) .item .support{color:inherit}
.item .start,.item .end{color:var(--md-menu-item-icon-color,var(--md-sys-color-on-surface-variant))}
:host([selected]) .item .start,:host([selected]) .item .end{color:inherit}
.item .trail-support{color:inherit;opacity:.8}
md-ripple{border-radius:inherit}
:host([data-sub]) .item .end::after{content:'chevron_right';font-family:var(--md-icon-font);font-size:16px;margin-inline-start:auto}` + ITEM_LAYOUT.replace('.row{', '.row-x{');
  build() { this._tabbable = false; this._mount(); this.addEventListener('click', e => this._click(e)); this.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { if (e._mateHandled) return; e.preventDefault(); this._item.click(); } }); }
  get isMenuItem() { return true; }
  _mount() {
    const tag = this.type === 'link' ? 'a' : 'div'; this._tag = tag; this.shadowRoot.querySelectorAll('.item').forEach(n => n.remove());
    const w = document.createElement('div');
    w.innerHTML = `<${tag} class="item" part="item"><md-ripple part="ripple"></md-ripple><md-focus-ring part="focus-ring" inward></md-focus-ring><div class="row"><div class="start"><slot name="start"></slot></div><div class="body"><div class="overline"><slot name="overline"></slot></div><div class="headline"><slot name="headline"></slot><slot></slot></div><div class="support"><slot name="supporting-text"></slot></div></div><div class="trail-support"><slot name="trailing-supporting-text"></slot></div><div class="end"><slot name="end"></slot></div></div></${tag}>`;
    this._item = w.firstElementChild; this.shadowRoot.appendChild(this._item); MdItem.prototype._slots.call(this);
  }
  _click(e) {
    if (this.disabled) { e.stopImmediatePropagation(); e.preventDefault(); return; }
    if (this.hasAttribute('data-sub') || this.keepOpen) return;
    this.dispatchEvent(new CustomEvent('close-menu', { bubbles: true, composed: true, detail: { initiator: this, reason: { kind: 'click-selection' }, itemPath: [this] } }));
  }
  update() {
    if (this._tag !== (this.type === 'link' ? 'a' : 'div')) this._mount();
    const it = this._item, role = this.type === 'option' ? 'option' : this.type === 'link' ? 'menuitem' : 'menuitem'; it.setAttribute('role', role); this.setAttribute('role', 'presentation');
    if (this._tag === 'a') { this.disabled ? it.removeAttribute('href') : it.setAttribute('href', this.href || ''); this.target ? it.setAttribute('target', this.target) : it.removeAttribute('target'); }
    if (this.type === 'option') it.setAttribute('aria-selected', String(this.selected)); else it.removeAttribute('aria-selected');
    it.setAttribute('aria-disabled', String(this.disabled)); it.tabIndex = this._tabbable ? 0 : -1;
  }
  focus(o) { this._item && this._item.focus(o); }
}
defineElement('md-menu-item', MdMenuItem);

class MdSubMenu extends MateElement {
  static props = { anchorCorner: { type: String, attribute: 'anchor-corner', default: 'start-end' }, menuCorner: { type: String, attribute: 'menu-corner', default: 'start-start' }, hoverOpenDelay: { type: Number, attribute: 'hover-open-delay', default: 400 }, hoverCloseDelay: { type: Number, attribute: 'hover-close-delay', default: 400 } };
  static styles = css`:host{display:block;position:relative;flex:none}::slotted([slot=item]){display:flex;width:100%}`;
  build() {
    this.shadowRoot.innerHTML = '<slot name="item"></slot><slot name="menu"></slot>';
    this.addEventListener('pointerenter', () => { clearTimeout(this._ct); if (!this.menu || this.menu.open) return; this._ot = setTimeout(() => this.show(false), this.hoverOpenDelay); });
    this.addEventListener('pointerleave', () => { clearTimeout(this._ot); if (this.menu && this.menu.open) this._ct = setTimeout(() => this.close(true), this.hoverCloseDelay); });
    this.addEventListener('click', e => { const it = this.item; if (it && e.composedPath().includes(it) && this.menu && !this.menu.open) this.show(true); });
    this.addEventListener('keydown', e => {
      const rtl = getComputedStyle(this).direction === 'rtl', fwd = rtl ? 'ArrowLeft' : 'ArrowRight', back = rtl ? 'ArrowRight' : 'ArrowLeft', it = this.item, m = this.menu; if (!m) return;
      const inItem = e.composedPath().includes(it), inMenu = e.composedPath().includes(m) && !inItem;
      if (inItem && e.key === fwd && !e._mateHandled) { e._mateHandled = true; e.preventDefault(); this.show(true); }
      else if (inMenu && e.key === back && !e._mateHandled) { e._mateHandled = true; e.preventDefault(); this.close(true); }
      else if (inMenu && e.key === 'Escape' && !e._mateHandled) { e._mateHandled = true; e.stopPropagation(); this.close(true); }
    });
    this.shadowRoot.querySelector('slot[name=item]').addEventListener('slotchange', () => this._wire());
    this.shadowRoot.querySelector('slot[name=menu]').addEventListener('slotchange', () => this._wire());
  }
  get isSubMenu() { return true; }
  get item() { return this.shadowRoot.querySelector('slot[name=item]').assignedElements()[0] || null; }
  get menu() { return this.shadowRoot.querySelector('slot[name=menu]').assignedElements()[0] || null; }
  _wire() {
    const it = this.item, m = this.menu; if (it) it.setAttribute('data-sub', ''); if (!m || !it) return;
    m.anchorElement = it; m.anchorCorner = this.anchorCorner; m.menuCorner = this.menuCorner; m.xOffset = 6; m.skipRestoreFocus = true; m.defaultFocus = 'none'; m.setAttribute('role', 'menu'); it.setAttribute('aria-haspopup', 'menu');
    if (!m._subBound) { m._subBound = true; m.addEventListener('closed', () => it.removeAttribute('data-active')); }
  }
  update() { this._wire(); }
  show(focusFirst) { const m = this.menu, it = this.item; if (!m) return; m.defaultFocus = focusFirst ? 'first-item' : 'none'; it && it.setAttribute('data-active', ''); m.open = true; }
  close(focusItem) { const m = this.menu, it = this.item; if (!m) return; m.open = false; it && it.removeAttribute('data-active'); if (focusItem && it) { it.focus(); this.parentElement && this.parentElement._setActive && this.parentElement._setActive(it); } }
}
defineElement('md-sub-menu', MdSubMenu);

/* ==========================================================================
   08b. Select — md-filled-select · md-outlined-select · md-select-option
   ========================================================================== */
class MdSelectOption extends MdMenuItem {
  static props = { type: { type: String, reflect: true, default: 'option' }, value: { type: String, reflect: true }, displayText: { type: String, attribute: 'display-text' } };
  get isSelectOption() { return true; }
  get selectedOptionText() { return this.displayText || _textOf(this); }
}
defineElement('md-select-option', MdSelectOption);

const ARROW_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5z"/></svg>';
class MdSelectBase extends MateElement {
  static formAssociated = true; static delegatesFocus = true;
  static fieldTag = 'md-outlined-field';
  static props = {
    quick: { type: Boolean, reflect: true }, required: { type: Boolean, reflect: true }, errorText: { type: String, attribute: 'error-text' }, label: { type: String }, supportingText: { type: String, attribute: 'supporting-text' },
    error: { type: Boolean, reflect: true }, menuPositioning: { type: String, attribute: 'menu-positioning', default: 'popover' }, clampMenuWidth: { type: Boolean, attribute: 'clamp-menu-width' }, typeaheadDelay: { type: Number, attribute: 'typeahead-delay', default: 200 },
    hasLeadingIcon: { type: Boolean, attribute: 'has-leading-icon', reflect: true }, displayText: { type: String, attribute: 'display-text' }, menuAlign: { type: String, attribute: 'menu-align', default: 'start' },
    disabled: { type: Boolean, reflect: true }, name: { type: String, reflect: true }, value: { type: String }, selectedIndex: { type: Number, attribute: 'selected-index', default: -1 }, open: { type: Boolean }
  };
  static styles = css`
:host{display:inline-flex;vertical-align:top;outline:none;-webkit-tap-highlight-color:transparent;--md-menu-container-color:var(--md-select-menu-container-color,var(--md-sys-color-surface-container))}
:host([disabled]){pointer-events:none}
md-filled-field,md-outlined-field{flex:1;min-width:0;cursor:pointer}
.area{flex:1;min-width:0;display:flex;align-items:center;align-self:stretch;outline:none;cursor:pointer;color:inherit;user-select:none;-webkit-user-select:none}
.text{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.arrow{display:inline-flex;width:24px;height:24px;transition:transform .3s var(--mate-spring-fast);color:var(--md-sys-color-on-surface-variant)}
.arrow svg{width:24px;height:24px;fill:currentColor}
:host([data-open]) .arrow{transform:rotate(180deg)}
:host([disabled]) .area{cursor:default}`;
  build() {
    const F = this.constructor.fieldTag;
    this.shadowRoot.innerHTML = `<${F} class="field" part="field"><slot name="leading-icon" slot="start"></slot><div class="area" part="select-area" role="combobox" tabindex="0" aria-haspopup="listbox" aria-expanded="false"><span class="text"></span></div><span class="arrow" slot="end">${ARROW_SVG}</span></${F}><md-menu class="menu" role="listbox" match-anchor-width default-focus="none"><slot></slot></md-menu>`;
    this._field = this.$('.field'); this._area = this.$('.area'); this._text = this.$('.text'); this._menu = this.$('.menu'); this._menu.anchorElement = this._field; this._menu.stayOpenOnFocusout = false;
    this._focused = false; this._nativeError = false; this._nativeErrorText = ''; this._customMsg = ''; this._typed = ''; this._ariaDirty = true;
    const slot = this.$('slot:not([name])'); slot.addEventListener('slotchange', () => this._initSel());
    const s = this.$('slot[name=leading-icon]'); const f = () => { this.hasLeadingIcon = s.assignedNodes().length > 0; }; s.addEventListener('slotchange', f); f();
    this._area.addEventListener('click', () => this._toggle()); this._area.addEventListener('keydown', e => this._key(e));
    this._area.addEventListener('focus', () => { this._focused = true; this._schedule(); }); this._area.addEventListener('blur', () => { this._focused = false; this._schedule(); });
    this._menu.addEventListener('close-menu', e => { const it = e.detail && e.detail.initiator; if (it && it.isSelectOption && !it.disabled) { this._choose(it, true); } });
    for (const n of ['opening', 'opened', 'closing', 'closed']) this._menu.addEventListener(n, e => { if (e.target !== this._menu) return; e.stopPropagation(); if (n === 'opening') { this._p.open = true; this.toggleAttribute('data-open', true); this._area.setAttribute('aria-expanded', 'true'); } if (n === 'closing') { this._p.open = false; this.toggleAttribute('data-open', false); this._area.setAttribute('aria-expanded', 'false'); } this._schedule(); this.emit(n, { bubbles: false, composed: false }); });
    this.addEventListener('invalid', () => { this._nativeError = true; this._nativeErrorText = this.validationMessage; this._schedule(); });
  }
  get options() { return Array.from(this.children).filter(c => c.isSelectOption); }
  get selectedOptions() { const o = this.options[this.selectedIndex]; return o ? [o] : []; }
  _initSel() {
    const o = this.options; if (!o.length) { this._sync(); return; }
    let i = this.value ? o.findIndex(x => x.value === this.value) : -1; if (i < 0) i = o.findIndex(x => x.hasAttribute('selected') || x.selected); if (i < 0 && this.selectedIndex >= 0 && this.selectedIndex < o.length) i = this.selectedIndex;
    this._apply(i); this._schedule();
  }
  _apply(i) { const o = this.options; o.forEach((x, n) => { x.selected = n === i; x._schedule && x._schedule(); }); this._p.selectedIndex = i; this._p.value = i >= 0 ? (o[i].value ?? '') : ''; this._sync(); }
  _choose(opt, user) {
    const o = this.options, i = o.indexOf(opt); if (i < 0) return; const changed = i !== this.selectedIndex; this._apply(i); this._nativeError = false; this._schedule();
    if (user && changed) { this.emit('input', { bubbles: true, composed: true }); this.emit('change', { bubbles: true }); }
  }
  select(v) { const o = this.options.find(x => x.value === v); if (o) this._apply(this.options.indexOf(o)); this._schedule(); }
  selectIndex(i) { const o = this.options[i]; if (o) { this._apply(i); this._schedule(); } }
  reset() { const o = this.options; let i = o.findIndex(x => x.hasAttribute('selected')); this._apply(i); this._nativeError = false; this._schedule(); }
  _toggle() { if (this.disabled) return; this.open ? this._menu.close() : this._openMenu(); }
  _openMenu() { if (this.disabled) return; const o = this.options; this._menu.initialFocusItem = o[this.selectedIndex] || o.find(x => !x.disabled); this._menu.quick = this.quick; this._menu.positioning = this.menuPositioning; this._menu.clampWidth = this.clampMenuWidth; this._menu.anchorCorner = 'end-start'; this._menu.menuCorner = 'start-start'; this._menu.typeaheadDelay = this.typeaheadDelay; this._menu.yOffset = -1; this._menu.open = true; }
  get _opts() { return this.options.filter(x => !x.disabled); }
  _key(e) {
    if (this.disabled) return;
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) { e.preventDefault(); if (!this.open) this._openMenu(); return; }
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && !this.open) {
      clearTimeout(this._tt); this._typed += e.key.toLowerCase(); this._tt = setTimeout(() => { this._typed = ''; }, this.typeaheadDelay);
      const hit = this._opts.find(x => _textOf(x).toLowerCase().startsWith(this._typed)); if (hit) this._choose(hit, true);
    }
  }
  _sync() {
    if (!this._internals) return;
    const sel = this.options[this.selectedIndex]; this._internals.setFormValue(this.disabled ? null : (sel ? sel.value : null));
    if (this.required && !sel) this._internals.setValidity({ valueMissing: true }, 'Please select an item in the list.', this._area);
    else if (this._customMsg) this._internals.setValidity({ customError: true }, this._customMsg, this._area); else this._internals.setValidity({});
  }
  update() {
    const o = this.options, sel = o[this.selectedIndex];
    if (this.value && (!sel || sel.value !== this.value)) { const i = o.findIndex(x => x.value === this.value); if (i >= 0 && i !== this.selectedIndex) this._apply(i); }
    else if (!this.value && sel && sel.value) { /* value cleared */ this._apply(-1); }
    const cur = this.options[this.selectedIndex], txt = this.displayText || (cur ? cur.selectedOptionText : '');
    this._text.textContent = txt; const f = this._field;
    f.disabled = this.disabled; f.error = this.error || this._nativeError; f.focused = this._focused || this.open; f.label = this.label; f.populated = !!txt; f.required = this.required;
    f.supportingText = this.supportingText; f.errorText = this.errorText || this._nativeErrorText; f.count = -1; f.max = -1;
    const al = this.getAttribute('aria-label') || this.label; al ? this._area.setAttribute('aria-label', al) : this._area.removeAttribute('aria-label');
    this._area.setAttribute('aria-disabled', String(this.disabled)); this._area.tabIndex = this.disabled ? -1 : 0; this._area.setAttribute('aria-invalid', String(f.error));
    if (this._menu.open !== this.open && this._p.open !== undefined) { if (this.open) this._openMenu(); else this._menu.close(); }
    this._sync();
  }
  get form() { return this._internals ? this._internals.form : null; } get labels() { return this._internals ? this._internals.labels : []; }
  get validity() { return this._internals.validity; } get validationMessage() { return this._internals.validationMessage; } get willValidate() { return this._internals.willValidate; }
  checkValidity() { this._sync(); return this._internals.checkValidity(); }
  reportValidity() { this._sync(); const ok = this._internals.checkValidity(); if (!ok) { this._nativeError = true; this._nativeErrorText = this.validationMessage; this._schedule(); } return ok; }
  setCustomValidity(m) { this._customMsg = m || ''; this._sync(); }
  focus(o) { this._area && this._area.focus(o); } blur() { this._area && this._area.blur(); }
  formResetCallback() { this.reset(); } formStateRestoreCallback(s) { this.select(String(s)); } formDisabledCallback(d) { this.disabled = d; }
}
class MdFilledSelect extends MdSelectBase { static fieldTag = 'md-filled-field'; }
class MdOutlinedSelect extends MdSelectBase { static fieldTag = 'md-outlined-field'; }
defineElement('md-filled-select', MdFilledSelect); defineElement('md-outlined-select', MdOutlinedSelect);

/* ---- md-search-bar (HTML .x-search: 48px pill, surface-container-high, centered text) ---- */
class MdSearchBar extends MateElement {
  static formAssociated = true; static delegatesFocus = true;
  static props = { value: { type: String }, placeholder: { type: String, default: 'Search' }, disabled: { type: Boolean, reflect: true }, name: { type: String, reflect: true }, label: { type: String }, clearable: { type: Boolean, reflect: true, default: true }, alignment: { type: String, reflect: true, default: 'center' }, hasLeadingIcon: { type: Boolean, attribute: 'has-leading-icon', reflect: true }, hasTrailingIcon: { type: Boolean, attribute: 'has-trailing-icon', reflect: true }, size: { type: String, reflect: true }, barHeight: { type: Number, attribute: 'bar-height', default: 0 } };
  static styles = css`
:host{display:flex;width:100%;vertical-align:top;--_h:var(--_hx,var(--md-search-bar-container-height,var(--_hs,48px)))}
:host([size=xs]){--_hs:40px}:host([size=s]){--_hs:48px}:host([size=m]){--_hs:56px}:host([size=l]){--_hs:64px}:host([size=xl]){--_hs:72px}
:host([size=l]) .in,:host([size=xl]) .in{font-size:18px}
:host([disabled]){pointer-events:none;opacity:.38}
.bar{position:relative;display:flex;align-items:center;flex:1;gap:8px;min-width:0;height:var(--_h);box-sizing:border-box;padding:0 16px;border-radius:var(--md-search-bar-container-shape,calc(var(--_h)/2));background:var(--md-search-bar-container-color,var(--md-sys-color-surface-container-high));color:var(--md-sys-color-on-surface);
transition:border-radius .32s cubic-bezier(.2,0,0,1),background-color .25s,box-shadow .25s}
.bar:focus-within{box-shadow:inset 0 0 0 2px var(--md-sys-color-primary)}
.in{flex:1;min-width:0;height:100%;border:0;outline:none;background:transparent;color:inherit;font:400 16px/24px var(--md-ref-typeface-plain,Inter,sans-serif);padding:0;-webkit-appearance:none;appearance:none}
:host([alignment=center]) .in{text-align:center}:host([alignment=center]) .bar:focus-within .in{text-align:start}
.in::placeholder{color:var(--md-sys-color-on-surface-variant);opacity:1}
.lead,.trail{display:none;align-items:center;flex:none;color:var(--md-sys-color-on-surface-variant)}
:host([has-leading-icon]) .lead,:host([has-trailing-icon]) .trail{display:flex}
.clear{display:none;width:32px;height:32px;margin-inline-end:-8px;border:0;padding:0;border-radius:50%;background:none;color:var(--md-sys-color-on-surface-variant);cursor:pointer;align-items:center;justify-content:center;flex:none}
.clear svg{width:20px;height:20px;fill:currentColor}.clear:hover{background:color-mix(in srgb,var(--md-sys-color-on-surface) 8%,transparent)}
.bar.has .clear{display:inline-flex}:host(:not([clearable])) .clear{display:none!important}
.in::-webkit-search-cancel-button{display:none}`;
  build() {
    this.shadowRoot.innerHTML = `<div class="bar" part="container"><span class="lead"><slot name="leading-icon"></slot></span><input class="in" part="input" type="search" enterkeyhint="search" autocomplete="off"><button class="clear" type="button" aria-label="Clear" tabindex="-1">${CLOSE_SVG}</button><span class="trail"><slot name="trailing-icon"></slot></span></div>`;
    this._in = this.$('.in'); this._bar = this.$('.bar'); const i = this._in;
    i.addEventListener('input', () => { this._p.value = i.value; this._f(); this._schedule(); }); i.addEventListener('change', e => this.redispatch(e));
    i.addEventListener('keydown', e => { if (e.key === 'Enter') this.emit('search', { bubbles: true, composed: true }); else if (e.key === 'Escape' && this.value) { e.preventDefault(); this.clear(); } });
    this.$('.clear').addEventListener('click', () => { this.clear(); i.focus(); });
    for (const [n, a] of [['leading-icon', 'hasLeadingIcon'], ['trailing-icon', 'hasTrailingIcon']]) { const s = this.$(`slot[name=${n}]`); const f = () => { this[a] = s.assignedNodes().length > 0; }; s.addEventListener('slotchange', f); f(); }
    this.bindHold(this._bar, 'hold');
  }
  _f() { this._internals && this._internals.setFormValue(this.disabled ? null : this.value); }
  clear() { this._p.value = ''; this._in.value = ''; this._f(); this._schedule(); this.emit('input', { bubbles: true, composed: true }); this.emit('clear', { bubbles: true, composed: true }); }
  update() { this.barHeight > 0 ? this.style.setProperty('--_hx', this.barHeight + 'px') : this.style.removeProperty('--_hx'); const i = this._in; if (i.value !== this.value) i.value = this.value; i.placeholder = this.placeholder; i.disabled = this.disabled; this.name ? i.setAttribute('name', this.name) : i.removeAttribute('name'); const l = this.label || this.getAttribute('aria-label') || this.placeholder; l && i.setAttribute('aria-label', l); this._bar.classList.toggle('has', !!this.value); this._f(); }
  get form() { return this._internals ? this._internals.form : null; }
  focus(o) { this._in.focus(o); } blur() { this._in.blur(); } select() { this._in.select(); }
  formResetCallback() { this.value = this.getAttribute('value') || ''; } formStateRestoreCallback(s) { this.value = String(s ?? ''); } formDisabledCallback(d) { this.disabled = d; }
}
defineElement('md-search-bar', MdSearchBar);

/* ==========================================================================
   10. Dialog — md-dialog
       HTML spec: scrim rgba(15,13,19,.52) fades .25s; basic dialog 28px radius, 24px padding, title 22px/500, body 14px/1.5
       secondary, actions end-aligned gap 12; enters scale(.88) translateY(12px) → none in .35s spring-fast.
       `fullscreen` = HTML full-screen dialog: slides up translateY(100%) → 0 in .4s decel on --md-sys-color-surface.
   ========================================================================== */
class MdDialog extends MateElement {
  static props = {
    open: { type: Boolean, reflect: true }, quick: { type: Boolean, reflect: true }, returnValue: { type: String, attribute: 'return-value' },
    type: { type: String, reflect: true }, noFocusTrap: { type: Boolean, attribute: 'no-focus-trap', reflect: true }, fullscreen: { type: Boolean, reflect: true }, stacked: { type: Boolean, reflect: true }
  };
  static styles = css`
:host{display:contents}
dialog{position:fixed;inset:0;margin:0;padding:0;border:0;width:100%;height:100%;max-width:none;max-height:none;background:transparent;color:var(--md-sys-color-on-surface);overflow:visible;outline:none}
dialog:not([open]){display:none}
dialog::backdrop{background:transparent}
dialog[open]{display:flex;align-items:center;justify-content:center;box-sizing:border-box;padding:24px}
.scrim{position:fixed;inset:0;background:var(--md-dialog-scrim-color,color-mix(in srgb,var(--md-sys-color-scrim,#000) 52%,transparent));opacity:0;transition:opacity .25s ease}
.panel{position:relative;display:flex;flex-direction:column;box-sizing:border-box;min-width:280px;width:var(--md-dialog-container-width,auto);max-width:min(var(--md-dialog-container-max-width,560px),100%);max-height:min(var(--md-dialog-container-max-height,560px),100%);
background:var(--md-dialog-container-color,var(--mate-dialog-bg,var(--md-sys-color-surface-container-high)));color:var(--md-dialog-supporting-text-color,var(--md-sys-color-on-surface-variant));border-radius:var(--md-dialog-container-shape,28px);padding:24px;
box-shadow:var(--md-dialog-container-shadow,var(--mate-shadow-dialog,0 16px 36px rgba(0,0,0,.25)));transform:scale(.88) translateY(12px);opacity:0;
transition:transform .35s var(--mate-spring-fast),opacity .2s ease,background-color .25s ease}
.visible .scrim{opacity:1}.visible .panel{transform:none;opacity:1}
:host([quick]) .scrim,:host([quick]) .panel{transition:none}
.icon{display:none;justify-content:center;margin-bottom:16px;color:var(--md-dialog-icon-color,var(--md-sys-color-secondary));--md-icon-size:24px}.icon.has{display:flex}
.headline{display:none;margin:0 0 14px;font:500 22px/28px var(--md-ref-typeface-brand,Inter,sans-serif);color:var(--md-dialog-headline-color,var(--md-sys-color-on-surface))}.headline.has{display:block}
.icon.has~.headline{text-align:center}
.content{flex:1 1 auto;min-height:0;overflow-y:auto;overscroll-behavior:contain;font:400 14px/1.5 var(--md-ref-typeface-plain,Inter,sans-serif);border-block:1px solid transparent;margin-inline:-24px;padding-inline:24px;transition:border-color .2s}
.content.top{border-top-color:var(--md-sys-color-outline-variant)}.content.bottom{border-bottom-color:var(--md-sys-color-outline-variant)}
.actions{display:none;justify-content:flex-end;align-items:center;gap:12px;margin-top:24px;flex:none;flex-wrap:wrap}.actions.has{display:flex}
:host([stacked]) .actions{flex-direction:column;align-items:stretch;justify-content:flex-start;flex-wrap:nowrap;gap:8px}
:host([stacked]) .headline{text-align:center}:host([stacked]) .actions ::slotted(*){width:100%}
:host([stacked]) .actions ::slotted(:not([block])){display:flex;flex-direction:column;gap:8px}
:host([stacked]) .panel{width:var(--md-dialog-container-width,min(100%,360px))}
:host([fullscreen]) dialog[open]{padding:0}
:host([fullscreen]) .panel{width:100%;height:100%;max-width:none;max-height:none;border-radius:0;background:var(--md-sys-color-surface);transform:translateY(100%);opacity:1;transition:transform .4s var(--mate-ease-decel),background-color .25s}
:host([fullscreen]) .visible .panel{transform:none}
:host([fullscreen]) .actions{margin-top:auto;padding-top:16px}
@media(prefers-reduced-motion:reduce){.scrim,.panel{transition:none}}`;
  build() {
    this.shadowRoot.innerHTML = '<dialog part="dialog"><div class="scrim" part="scrim"></div><div class="panel" part="container"><div class="icon"><slot name="icon"></slot></div><h2 class="headline" part="headline" id="hl"><slot name="headline"></slot></h2><div class="content" part="content"><slot name="content"></slot><slot></slot></div><div class="actions" part="actions"><slot name="actions"></slot></div></div></dialog>';
    this._d = this.$('dialog'); this._panel = this.$('.panel'); this._content = this.$('.content'); this._shown = false;
    for (const [c, n] of [['.icon', 'icon'], ['.headline', 'headline'], ['.actions', 'actions']]) { const s = this.$(`slot[name=${n}]`), box = this.$(c); const f = () => box.classList.toggle('has', s.assignedNodes().length > 0); s.addEventListener('slotchange', f); f(); }
    this._d.addEventListener('cancel', e => { e.preventDefault(); this._cancel(); });
    this.$('.scrim').addEventListener('click', () => this._cancel());
    this._d.addEventListener('click', e => { if (e.target === this._d) this._cancel(); });
    this._d.addEventListener('keydown', e => { if (e.key === 'Escape') { e.preventDefault(); this._cancel(); } });
    this.addEventListener('submit', e => { const f = e.target; if (f && f.method === 'dialog') { e.preventDefault(); this.close(e.submitter ? (e.submitter.value || '') : ''); } });
    this.addEventListener('click', e => { const el = e.composedPath().find(n => n.hasAttribute && n.hasAttribute('dialog-action')); if (el && el.getAttribute('dialog-action') !== null) this.close(el.getAttribute('dialog-action')); });
    this._content.addEventListener('scroll', () => this._dividers());
    this.$('slot[name=actions]').addEventListener('slotchange', () => this._blockify());
    if (typeof ResizeObserver !== 'undefined') { this._ro = new ResizeObserver(() => this._dividers()); this._ro.observe(this._content); }
  }
  _blockify() {
    const B = 'md-text-button,md-filled-button,md-filled-tonal-button,md-outlined-button,md-elevated-button';
    for (const el of this.$('slot[name=actions]').assignedElements()) { if (el.matches(B)) el.toggleAttribute('block', this.stacked); else el.querySelectorAll(B).forEach(b => b.toggleAttribute('block', this.stacked)); }
  }
  _dividers() { const c = this._content; c.classList.toggle('top', c.scrollTop > 0); c.classList.toggle('bottom', c.scrollTop + c.clientHeight < c.scrollHeight - 1); }
  _cancel() { if (this.type === 'alert') return; const ev = this.emit('cancel', { cancelable: true }); if (!ev.defaultPrevented) this.close(); }
  show() { this.open = true; } close(v) { if (v !== undefined) this._p.returnValue = String(v); this.open = false; }
  update() {
    this._blockify();
    const d = this._d; d.setAttribute('role', this.type === 'alert' ? 'alertdialog' : 'dialog'); d.setAttribute('aria-modal', 'true');
    const hl = this.querySelector('[slot=headline]'); hl ? d.setAttribute('aria-labelledby', 'hl') : d.removeAttribute('aria-labelledby');
    if (this.open && !this._shown) this._show(); else if (!this.open && this._shown) this._hide();
  }
  _show() {
    this._shown = true; clearTimeout(this._ct); this.emit('open', { bubbles: true, composed: true });
    this._prev = document.activeElement; if (!this._d.open) { try { this.noFocusTrap ? this._d.show() : this._d.showModal(); } catch (e) { this._d.setAttribute('open', ''); } }
    this._d.classList.remove('visible'); void this._d.offsetWidth; requestAnimationFrame(() => { this._d.classList.add('visible'); this._dividers(); });
    const af = this.querySelector('[autofocus]'); if (af) af.focus && af.focus();
    clearTimeout(this._ot); this._ot = setTimeout(() => this.emit('opened', { bubbles: true, composed: true }), this.quick ? 0 : 350);
  }
  _hide() {
    this._shown = false; clearTimeout(this._ot); this.emit('close', { bubbles: true, composed: true });
    this._d.classList.remove('visible');
    const fin = () => { if (this._d.open) this._d.close(); if (this._prev && this._prev.focus && document.contains(this._prev)) { try { this._prev.focus({ preventScroll: true }); } catch (e) { } } this.emit('closed', { bubbles: true, composed: true }); };
    if (this.quick || _reduceMotion()) fin(); else this._ct = setTimeout(fin, 250);
  }
  get dialogElement() { return this._d; }
}
defineElement('md-dialog', MdDialog);

/* ==========================================================================
   MateCha global — dynamic colour (HCT engine from the MateUI HTML) + helpers.
   The engine only writes the same --mate-* tokens the HTML writes (and the matching --md-sys-color-*), so every
   Material Web token keeps working:  MateCha.setSeed('#65558F') · MateCha.setDark(true) · MateCha.setVariant('expressive')
   ========================================================================== */
const MateCha = (() => {
  const srgbToLinear = c => { const v = c / 255; return v <= .04045 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); };
  const linearToSrgb = v => { const c = Math.max(0, Math.min(1, v)); return Math.round((c <= .0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - .055) * 255); };
  const hexToRgb = hex => { const h = hex.replace('#', ''), n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16); return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }; };
  const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0')).join('').toUpperCase();
  const rgbToHct = (r, g, b) => {
    const lr = srgbToLinear(r), lg = srgbToLinear(g), lb = srgbToLinear(b);
    const x = lr * .4124564 + lg * .3575761 + lb * .1804375, y = lr * .2126729 + lg * .7151522 + lb * .0721750, z = lr * .0193339 + lg * .1191920 + lb * .9503041;
    const f = t => t > .008856 ? Math.cbrt(t) : (7.787 * t) + (16 / 116), fx = f(x / .95047), fy = f(y), fz = f(z / 1.08883);
    const a = 500 * (fx - fy), bl = 200 * (fy - fz); let hue = Math.atan2(bl, a) * 180 / Math.PI; if (hue < 0) hue += 360;
    return { hue, chroma: Math.hypot(a, bl), tone: Math.max(0, Math.min(100, 116 * fy - 16)) };
  };
  const hctToHex = (hue, chroma, tone) => {
    const t = Math.max(0, Math.min(100, tone)); if (t <= .5) return '#000000'; if (t >= 99.5) return '#FFFFFF';
    const rad = hue * Math.PI / 180; let lo = 0, hi = chroma, best = { r: 0, g: 0, b: 0 };
    for (let i = 0; i < 14; i++) {
      const mc = (lo + hi) / 2, a = Math.cos(rad) * mc, bl = Math.sin(rad) * mc, fy = (t + 16) / 116, fx = a / 500 + fy, fz = fy - bl / 200;
      const inv = q => (q * q * q > .008856) ? q * q * q : (q - 16 / 116) / 7.787, X = .95047 * inv(fx), Y = inv(fy), Z = 1.08883 * inv(fz);
      const lr = X * 3.2404542 + Y * -1.5371385 + Z * -.4985314, lg = X * -.9692660 + Y * 1.8760108 + Z * .0415560, lb = X * .0556434 + Y * -.2040259 + Z * 1.0572252;
      if ([lr, lg, lb].every(v => v >= -.001 && v <= 1.001)) { best = { r: linearToSrgb(lr), g: linearToSrgb(lg), b: linearToSrgb(lb) }; lo = mc; } else hi = mc;
    }
    return rgbToHex(best.r, best.g, best.b);
  };
  /** Same tonal / expressive / vibrant schemes as the MateUI HTML; additionally derives the fixed --md-sys-color-* roles. */
  function schemeFromSeed(seedHex, isDark, variant = 'tonal') {
    const { r, g, b } = hexToRgb(seedHex), hct = rgbToHct(r, g, b), h = hct.hue, ex = variant === 'expressive', ne = variant === 'vibrant', X = ex || ne;
    const baseC = ne ? Math.max(128, hct.chroma * 1.9) : ex ? Math.max(96, hct.chroma * 1.55) : Math.max(36, hct.chroma);
    const secC = ne ? Math.max(76, baseC * .68) : ex ? Math.max(54, baseC * .56) : Math.min(20, baseC * .36);
    const terC = ne ? Math.max(132, baseC * 1.15) : ex ? Math.max(108, baseC * 1.05) : Math.max(32, baseC * .72);
    const secH = ne ? (h + 34) % 360 : ex ? (h + 22) % 360 : h, terH = ne ? (h + 128) % 360 : ex ? (h + 92) % 360 : (h + 56) % 360;
    const nC = ne ? 18 : ex ? 13 : 6, nvC = ne ? 28 : ex ? 20 : 10;
    const P = t => hctToHex(h, baseC, t), S = t => hctToHex(secH, secC, t), T = t => hctToHex(terH, terC, t), N = t => hctToHex(h, nC, t), NV = t => hctToHex(h, nvC, t);
    const pick = (l, d) => isDark ? d : l;
    const tokens = isDark ? {
      '--mate-bg-outer': N(3), '--mate-surface-bg': N(6), '--mate-surface-card': N(12), '--mate-surface-container': N(15), '--mate-surface-container-high': N(20), '--mate-surface-nav': N(11),
      '--mate-primary': P(ne ? 76 : ex ? 78 : 80), '--mate-on-primary': P(14), '--mate-primary-container': P(ne ? 34 : ex ? 32 : 30), '--mate-on-primary-container': P(92), '--mate-secondary-container': S(ne ? 34 : ex ? 32 : 30),
      '--mate-tertiary-pink': T(ne ? 76 : ex ? 78 : 80), '--mate-on-tertiary-pink': T(14), '--mate-floating-purple': P(ne ? 38 : ex ? 35 : 32), '--mate-on-floating-purple': P(94),
      '--mate-text-primary': N(92), '--mate-text-secondary': NV(80), '--mate-text-muted': NV(62), '--mate-outline': NV(60), '--mate-outline-variant': NV(30), '--mate-switch-track-off': NV(24), '--mate-switch-thumb-off': NV(64),
      '--mate-dialog-bg': N(18), '--mate-snackbar-bg': N(92), '--mate-snackbar-text': N(16), '--mate-seg-active-bg': S(X ? 36 : 32), '--mate-seg-active-text': S(94)
    } : {
      '--mate-bg-outer': N(X ? 88 : 90), '--mate-surface-bg': N(X ? 95 : 96), '--mate-surface-card': N(100), '--mate-surface-container': N(X ? 91 : 93), '--mate-surface-container-high': N(X ? 87 : 90), '--mate-surface-nav': N(X ? 92 : 94),
      '--mate-primary': P(ne ? 46 : ex ? 44 : 40), '--mate-on-primary': P(100), '--mate-primary-container': P(ne ? 84 : ex ? 87 : 90), '--mate-on-primary-container': P(10), '--mate-secondary-container': S(ne ? 82 : ex ? 85 : 88),
      '--mate-tertiary-pink': T(ne ? 74 : ex ? 78 : 82), '--mate-on-tertiary-pink': T(10), '--mate-floating-purple': P(ne ? 74 : ex ? 77 : 80), '--mate-on-floating-purple': P(10),
      '--mate-text-primary': N(10), '--mate-text-secondary': NV(28), '--mate-text-muted': NV(46), '--mate-outline': NV(48), '--mate-outline-variant': NV(78), '--mate-switch-track-off': NV(88), '--mate-switch-thumb-off': NV(45),
      '--mate-dialog-bg': N(91), '--mate-snackbar-bg': N(18), '--mate-snackbar-text': N(96), '--mate-seg-active-bg': S(X ? 42 : 38), '--mate-seg-active-text': S(99)
    };
    const sys = {
      '--md-sys-color-secondary': pick(S(40), S(80)), '--md-sys-color-on-secondary': pick(S(100), S(20)), '--md-sys-color-on-secondary-container': pick(S(10), S(90)),
      '--md-sys-color-tertiary': pick(T(40), T(80)), '--md-sys-color-on-tertiary': pick(T(100), T(20)), '--md-sys-color-inverse-primary': pick(P(80), P(40)),
      '--md-sys-color-surface-variant': pick(NV(90), NV(30)), '--md-sys-color-surface-dim': pick(N(87), N(6)), '--md-sys-color-surface-bright': pick(N(98), N(24)),
      '--md-sys-color-surface-container-low': pick(N(96), N(10)), '--md-sys-color-surface-container-highest': pick(NV(88), NV(24))
    };
    return { hct, effectiveChroma: Math.round(baseC), tokens, sys };
  }
  const state = { seed: '#65558F', variant: 'tonal', dark: null, custom: false };
  const mq = typeof matchMedia !== 'undefined' ? matchMedia('(prefers-color-scheme: dark)') : null;
  const isDark = () => state.dark === null ? !!(mq && mq.matches) : state.dark;
  function apply(announce) {
    const root = document.documentElement, dark = isDark(); root.setAttribute('data-theme', dark ? 'dark' : 'light'); root.setAttribute('data-variant', state.variant);
    if (state.custom) { const s = schemeFromSeed(state.seed, dark, state.variant); for (const [k, v] of Object.entries({ ...s.tokens, ...s.sys })) root.style.setProperty(k, v); }
    root.dispatchEvent(new CustomEvent('mate-theme-change', { bubbles: true, detail: { seed: state.seed, variant: state.variant, dark } }));
  }
  if (mq && mq.addEventListener) mq.addEventListener('change', () => { if (state.dark === null) apply(); });
  const api = {
    version: '3.6.0', schemeFromSeed, hctToHex, rgbToHct, hexToRgb, rgbToHex, get state() { return { ...state, dark: isDark() }; },
    applyTheme(o = {}) { if (o.seed) { state.seed = o.seed; state.custom = true; } if (o.variant) state.variant = o.variant; if ('dark' in o) state.dark = o.dark === 'auto' ? null : !!o.dark; apply(); return api.state; },
    setSeed(hex, variant) { return api.applyTheme({ seed: hex, variant }); }, setVariant(v) { return api.applyTheme({ variant: v, seed: state.seed }); },
    setDark(d) { return api.applyTheme({ dark: d }); }, toggleDark() { return api.applyTheme({ dark: !isDark() }); },
    /** Remove everything MateCha wrote on <html>, restoring the built-in palette (or the page's own tokens). */
    resetTheme() { const root = document.documentElement; state.custom = false; state.dark = null; [...root.style].filter(p => p.startsWith('--mate-') || p.startsWith('--md-sys-color-')).forEach(p => root.style.removeProperty(p)); root.removeAttribute('data-theme'); root.removeAttribute('data-variant'); },
    toast(message, o = {}) { let sb = document.querySelector('md-snackbar[data-mate-toast]'); if (!sb) { sb = document.createElement('md-snackbar'); sb.setAttribute('data-mate-toast', ''); document.body.appendChild(sb); } return sb.show(message, o); }
  };
  return api;
})();
if (typeof window !== 'undefined') { window.MateCha = MateCha; }

/* ==========================================================================
   11. Expressive additions (components that exist in the MateUI HTML but not in @material/web 2.5.0)
       md-connected-button-group / md-connected-button · md-split-button · md-segmented-button-set / md-segmented-button
       md-fab-menu / md-fab-menu-item · md-navigation-bar / md-navigation-tab · md-navigation-drawer(+item/header/divider)
       md-top-app-bar · md-snackbar · md-tooltip · md-card · md-badge · md-avatar · md-loading-indicator
       md-toolbar · md-swipe-item / md-swipe-action
       All use --md-sys-color-* roles, so any Material Theme Builder / MateCha.setSeed() palette applies.
   ========================================================================== */
const _placeAround = (s, A, placement = 'bottom', gap = 8) => {
  const vw = document.documentElement.clientWidth || innerWidth, vh = innerHeight, m = 8, cl = (v, a, b) => Math.max(a, Math.min(v, b));
  s.style.left = '0px'; s.style.top = '0px'; const W = s.offsetWidth, H = s.offsetHeight, [side0, al = 'center'] = placement.split('-');
  const fit = sd => {
    let x, y;
    if (sd === 'bottom' || sd === 'top') { y = sd === 'bottom' ? A.bottom + gap : A.top - gap - H; x = al === 'start' ? A.left : al === 'end' ? A.right - W : A.left + (A.width - W) / 2; }
    else { x = sd === 'right' ? A.right + gap : A.left - gap - W; y = al === 'start' ? A.top : al === 'end' ? A.bottom - H : A.top + (A.height - H) / 2; }
    return { x, y };
  };
  const over = p => p.x < m || p.y < m || p.x + W > vw - m || p.y + H > vh - m;
  let sd = side0, p = fit(sd);
  if (over(p)) { const o = { bottom: 'top', top: 'bottom', left: 'right', right: 'left' }[sd], q = fit(o); if (!over(q)) { sd = o; p = q; } }
  const x = cl(p.x, m, Math.max(m, vw - W - m)), y = cl(p.y, m, Math.max(m, vh - H - m));
  s.style.left = `${Math.round(x)}px`; s.style.top = `${Math.round(y)}px`;
  const ox = sd === 'right' ? 0 : sd === 'left' ? W : cl(A.left + A.width / 2 - x, 0, W), oy = sd === 'bottom' ? 0 : sd === 'top' ? H : cl(A.top + Math.min(A.height, 40) / 2 - y, 0, H);
  s.style.setProperty('--_o', `${ox}px ${oy}px`); return sd;
};
const _onTopLayer = (s, on) => { if (!_supportsPopover) return; try { on ? s.showPopover() : s.hidePopover(); } catch (e) { } };
const _resolveFor = el => { if (el._anchorP) return el._anchorP; const id = el.getAttribute('for'); if (id) { const r = el.getRootNode(); return (r.getElementById && r.getElementById(id)) || document.getElementById(id); } return el.parentElement || (el.getRootNode() && el.getRootNode().host) || null; };

/* ---- Connected button group (HTML .cbg/.cb) ---- */
class MdConnectedButton extends MateElement {
  static delegatesFocus = true;
  static props = { selected: { type: Boolean, reflect: true }, disabled: { type: Boolean, reflect: true }, value: { type: String, reflect: true }, label: { type: String }, hasIcon: { type: Boolean, attribute: 'has-icon', reflect: true }, pos: { type: String, attribute: 'data-pos', reflect: true } };
  static styles = css`
:host{display:inline-flex;vertical-align:top;outline:none;-webkit-tap-highlight-color:transparent;--md-ripple-hover-color:var(--md-sys-color-on-surface);--md-ripple-pressed-opacity:0;--md-ripple-pressed-color:var(--md-sys-color-on-surface)}
:host([disabled]){pointer-events:none;opacity:.38}
.cb{position:relative;display:inline-flex;align-items:center;justify-content:center;height:var(--md-connected-button-container-height,40px);min-width:36px;padding:0 8px;border:0;margin:0;overflow:hidden;cursor:pointer;outline:none;
background:var(--md-connected-button-container-color,var(--md-sys-color-surface-container));color:var(--md-connected-button-label-text-color,var(--md-sys-color-on-surface));font:500 13px/20px var(--md-ref-typeface-plain,Inter,sans-serif);border-radius:6px;-webkit-appearance:none;appearance:none;
transition:padding .38s var(--mate-spring-fast),background-color .25s,color .25s,border-radius .32s cubic-bezier(.2,0,0,1)}
:host([data-pos=first]) .cb{border-radius:20px 6px 6px 20px}:host([data-pos=last]) .cb{border-radius:6px 20px 20px 6px}:host([data-pos=single]) .cb{border-radius:20px}
:host([selected]) .cb{background:var(--md-connected-button-selected-container-color,var(--md-sys-color-primary));color:var(--md-connected-button-selected-label-text-color,var(--md-sys-color-on-primary));padding:0 20px;border-radius:20px;--md-ripple-hover-color:var(--md-sys-color-on-primary);--md-ripple-pressed-opacity:0;--md-ripple-pressed-color:var(--md-sys-color-on-primary)}
.cb.hold{border-radius:12px!important}
.icon{display:none;align-items:center;justify-content:center;--md-icon-size:20px}:host([has-icon]) .icon{display:inline-flex}.icon ::slotted(*){font-size:20px}
.lbl{display:inline-block;max-width:0;opacity:0;white-space:nowrap;overflow:hidden;transition:max-width .38s var(--mate-spring-fast),opacity .2s,margin .3s}
:host([has-icon]) .lbl{margin-inline-start:0}
:host([selected]) .lbl,:host([show-label]) .lbl{max-width:90px;opacity:1}
:host([has-icon][selected]) .lbl,:host([has-icon][show-label]) .lbl{margin-inline-start:8px}
:host([show-label]) .cb{padding:0 12px}:host([show-label][selected]) .cb{padding:0 22px}
:host(:not([has-icon])) .lbl{max-width:none;opacity:1}`;
  build() {
    this.shadowRoot.innerHTML = '<button class="cb" part="button" type="button"><md-ripple part="ripple"></md-ripple><md-focus-ring part="focus-ring"></md-focus-ring><span class="icon"><slot name="icon"></slot></span><span class="lbl"><slot></slot><span class="t"></span></span></button>';
    this._b = this.$('.cb'); this.bindHold(this._b); const s = this.$('slot[name=icon]'); const f = () => { this.hasIcon = s.assignedNodes().length > 0; }; s.addEventListener('slotchange', f); f();
  }
  update() { this._b.disabled = this.disabled; this._b.setAttribute('aria-pressed', String(this.selected)); this.$('.t').textContent = this.label || ''; }
  focus(o) { this._b && this._b.focus(o); }
}
defineElement('md-connected-button', MdConnectedButton);
class MdConnectedButtonGroup extends MateElement {
  static props = { multiple: { type: Boolean, reflect: true }, showLabels: { type: Boolean, attribute: 'show-labels', reflect: true } };
  static styles = css`:host{display:inline-flex;align-items:center;gap:2px;vertical-align:top}`;
  build() { this.shadowRoot.innerHTML = '<slot></slot>'; this.setAttribute('role', 'group'); this.$('slot').addEventListener('slotchange', () => this._pos()); this.addEventListener('click', e => this._click(e)); }
  get buttons() { return Array.from(this.children).filter(c => c instanceof MdConnectedButton); }
  get value() { return this.buttons.filter(b => b.selected).map(b => b.value); }
  _pos() { const b = this.buttons, n = b.length; b.forEach((x, i) => { x.setAttribute('data-pos', n === 1 ? 'single' : i === 0 ? 'first' : i === n - 1 ? 'last' : 'mid'); x.toggleAttribute('show-label', this.showLabels); }); }
  update() { this._pos(); }
  _click(e) {
    const t = this.buttons.find(b => b === e.target || b.contains(e.target)); if (!t || t.disabled) return;
    if (this.multiple) t.selected = !t.selected; else { if (t.selected) return; this.buttons.forEach(b => { b.selected = b === t; }); }
    this.emit('change', { bubbles: true }); this.emit('input', { bubbles: true, composed: true });
  }
}
defineElement('md-connected-button-group', MdConnectedButtonGroup);

/* ---- Split button (HTML .mate-split-btn) ---- */
class MdSplitButton extends MateElement {
  static props = { variant: { type: String, reflect: true, default: 'filled' }, disabled: { type: Boolean, reflect: true }, open: { type: Boolean, reflect: true }, hasIcon: { type: Boolean, attribute: 'has-icon', reflect: true }, arrowLabel: { type: String, attribute: 'arrow-label' } };
  static styles = css`
:host{display:inline-flex;vertical-align:top;--_bg:var(--md-sys-color-primary);--_fg:var(--md-sys-color-on-primary);--_bd:transparent;--md-ripple-hover-color:var(--_fg);--md-ripple-pressed-opacity:0;--md-ripple-pressed-color:var(--_fg)}
:host([variant=tonal]){--_bg:var(--md-sys-color-secondary-container);--_fg:var(--md-sys-color-on-secondary-container)}
:host([variant=outlined]){--_bg:transparent;--_fg:var(--md-sys-color-primary);--_bd:var(--md-sys-color-outline-variant)}
:host([variant=elevated]){--_bg:var(--md-sys-color-surface-container-low);--_fg:var(--md-sys-color-primary)}
:host([disabled]){pointer-events:none;opacity:.38}
.split{display:inline-flex;align-items:center;gap:2px}
button{position:relative;display:inline-flex;align-items:center;justify-content:center;height:40px;border:0;margin:0;background:var(--_bg);color:var(--_fg);cursor:pointer;outline:none;overflow:hidden;font:500 14px/20px var(--md-ref-typeface-plain,Inter,sans-serif);letter-spacing:.01em;-webkit-appearance:none;appearance:none;
box-shadow:inset 0 0 0 1px var(--_bd);transition:border-radius .32s cubic-bezier(.2,0,0,1),background-color .25s,color .25s}
.main{gap:8px;padding:0 16px 0 18px;border-radius:20px 4px 4px 20px}.main.hold{border-radius:12px 4px 4px 12px}
.arrow{width:38px;border-radius:4px 20px 20px 4px}.arrow.hold{border-radius:4px 12px 12px 4px}
.arrow svg{width:20px;height:20px;fill:currentColor;transition:transform .35s var(--mate-spring-fast)}:host([open]) .arrow svg{transform:rotate(180deg)}
.icon{display:none;--md-icon-size:18px}:host([has-icon]) .icon{display:inline-flex}.icon ::slotted(*){font-size:18px}
:host(:dir(rtl)) .main{border-radius:4px 20px 20px 4px}:host(:dir(rtl)) .arrow{border-radius:20px 4px 4px 20px}`;
  build() {
    this.shadowRoot.innerHTML = `<div class="split" part="container"><button class="main" part="main" type="button"><md-ripple></md-ripple><md-focus-ring></md-focus-ring><span class="icon"><slot name="icon"></slot></span><span class="label"><slot></slot></span></button><button class="arrow" part="arrow" type="button" aria-haspopup="menu" aria-expanded="false"><md-ripple></md-ripple><md-focus-ring></md-focus-ring>${ARROW_SVG}</button></div><slot name="menu"></slot>`;
    this._main = this.$('.main'); this._arrow = this.$('.arrow'); this.bindHold(this._main); this.bindHold(this._arrow);
    const s = this.$('slot[name=icon]'); const f = () => { this.hasIcon = s.assignedNodes().length > 0; }; s.addEventListener('slotchange', f); f();
    this._arrow.addEventListener('click', () => { this.open = !this.open; this.emit('arrow-click', { bubbles: true, composed: true }); });
    this.$('slot[name=menu]').addEventListener('slotchange', () => this._wire());
  }
  get menu() { return this.$('slot[name=menu]').assignedElements()[0] || null; }
  _wire() { const m = this.menu; if (!m || m._splitBound) return; m._splitBound = true; m.anchorElement = this._arrow; m.anchorCorner = 'end-end'; m.menuCorner = 'start-end'; m.skipRestoreFocus = true; m.addEventListener('closed', () => { this.open = false; }); m.addEventListener('closing', () => { this.open = false; }); }
  update() { this._main.disabled = this._arrow.disabled = this.disabled; this._arrow.setAttribute('aria-label', this.arrowLabel || 'More options'); this._arrow.setAttribute('aria-expanded', String(this.open)); const m = this.menu; if (m) { this._wire(); if (m.open !== this.open) m.open = this.open; } }
}
defineElement('md-split-button', MdSplitButton);

/* ---- Segmented buttons (HTML .mate-segmented-trio / .mate-seg-btn) ---- */
class MdSegmentedButton extends MateElement {
  static delegatesFocus = true;
  static props = { selected: { type: Boolean, reflect: true }, disabled: { type: Boolean, reflect: true }, label: { type: String }, value: { type: String, reflect: true }, hasIcon: { type: Boolean, attribute: 'has-icon', reflect: true }, pos: { type: String, attribute: 'data-pos', reflect: true } };
  static styles = css`
:host{display:inline-flex;vertical-align:top;outline:none;--md-ripple-hover-color:var(--md-sys-color-on-primary-container);--md-ripple-pressed-opacity:0;--md-ripple-pressed-color:var(--md-sys-color-on-primary-container)}
:host([disabled]){pointer-events:none;opacity:.38}
.seg{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:6px;height:var(--md-segmented-button-container-height,40px);padding:0 10px;border:0;margin:0;overflow:hidden;cursor:pointer;outline:none;
background:var(--md-segmented-button-container-color,var(--md-sys-color-primary-container));color:var(--md-segmented-button-label-text-color,var(--md-sys-color-on-primary-container));font:500 13px/20px var(--md-ref-typeface-plain,Inter,sans-serif);border-radius:6px;-webkit-appearance:none;appearance:none;white-space:nowrap;
transition:border-radius .32s cubic-bezier(.2,0,0,1),background-color .25s,color .25s,padding .38s var(--mate-spring-fast)}
:host([data-pos=first]) .seg{border-radius:20px 6px 6px 20px}:host([data-pos=last]) .seg{border-radius:6px 20px 20px 6px}:host([data-pos=single]) .seg{border-radius:20px}
:host([selected]) .seg{background:var(--md-segmented-button-selected-container-color,var(--mate-seg-active-bg,var(--md-sys-color-secondary)));color:var(--md-segmented-button-selected-label-text-color,var(--mate-seg-active-text,var(--md-sys-color-on-secondary)));border-radius:20px;padding:0 24px;--md-ripple-hover-color:currentColor;--md-ripple-pressed-opacity:0;--md-ripple-pressed-color:currentColor}
.seg.hold{border-radius:12px!important}
.icon{display:none;--md-icon-size:18px}:host([has-icon]) .icon{display:inline-flex}.icon ::slotted(*){font-size:18px}`;
  build() {
    this.shadowRoot.innerHTML = '<button class="seg" part="button" type="button" role="radio"><md-ripple></md-ripple><md-focus-ring></md-focus-ring><span class="icon"><slot name="icon"></slot></span><span class="label"><slot></slot><span class="t"></span></span></button>';
    this._b = this.$('.seg'); this.bindHold(this._b); const s = this.$('slot[name=icon]'); const f = () => { this.hasIcon = s.assignedNodes().length > 0; }; s.addEventListener('slotchange', f); f();
  }
  update() { this._b.disabled = this.disabled; this._b.setAttribute('aria-checked', String(this.selected)); this.$('.t').textContent = this.label || ''; }
  focus(o) { this._b && this._b.focus(o); }
}
class MdSegmentedButtonSet extends MateElement {
  static props = { multiselect: { type: Boolean, reflect: true } };
  static styles = css`:host{display:inline-flex;align-items:center;gap:3px;vertical-align:top}`;
  build() { this.shadowRoot.innerHTML = '<slot></slot>'; this.setAttribute('role', 'group'); this.$('slot').addEventListener('slotchange', () => this._pos()); this.addEventListener('click', e => this._click(e)); }
  get buttons() { return Array.from(this.children).filter(c => c instanceof MdSegmentedButton); }
  get selectedItems() { return this.buttons.filter(b => b.selected); }
  _pos() { const b = this.buttons, n = b.length; b.forEach((x, i) => { x.setAttribute('data-pos', n === 1 ? 'single' : i === 0 ? 'first' : i === n - 1 ? 'last' : 'mid'); }); this.setAttribute('role', this.multiselect ? 'group' : 'radiogroup'); }
  update() { this._pos(); }
  selectIndex(i) { const t = this.buttons[i]; if (t) this._select(t); }
  _select(t) {
    if (this.multiselect) t.selected = !t.selected; else { if (t.selected) return; this.buttons.forEach(b => { b.selected = b === t; }); }
    this.emit('segmented-button-set-selection', { bubbles: true, composed: true, detail: { button: t, selected: t.selected, index: this.buttons.indexOf(t) } }); this.emit('change', { bubbles: true });
  }
  _click(e) { const t = this.buttons.find(b => b === e.target || b.contains(e.target)); if (t && !t.disabled) this._select(t); }
}
class MdOutlinedSegmentedButton extends MdSegmentedButton { } class MdOutlinedSegmentedButtonSet extends MdSegmentedButtonSet { }
defineElement('md-segmented-button', MdSegmentedButton); defineElement('md-segmented-button-set', MdSegmentedButtonSet);
defineElement('md-outlined-segmented-button', MdOutlinedSegmentedButton); defineElement('md-outlined-segmented-button-set', MdOutlinedSegmentedButtonSet);

/* ---- FAB menu (HTML .mate-fab-menu-container) ---- */
class MdFabMenuItem extends MateElement {
  static delegatesFocus = true;
  static props = { disabled: { type: Boolean, reflect: true }, label: { type: String }, href: { type: String, reflect: true }, hasIcon: { type: Boolean, attribute: 'has-icon', reflect: true } };
  static styles = css`
:host{display:inline-flex;outline:none;--md-ripple-hover-color:var(--md-sys-color-on-floating,var(--md-sys-color-on-primary-container));--md-ripple-pressed-opacity:0;--md-ripple-pressed-color:var(--md-sys-color-on-floating,var(--md-sys-color-on-primary-container));
opacity:1;transform:none;visibility:visible;transition:opacity .22s ease,transform .38s var(--mate-spring-fast),visibility 0s;transition-delay:var(--_d,0s)}
:host([disabled]){pointer-events:none;opacity:.38}
:host([data-collapsed]){opacity:0;transform:scale(.5) translateY(16px);pointer-events:none;visibility:hidden;transition:opacity .22s ease,transform .38s var(--mate-spring-fast),visibility 0s linear .4s;transition-delay:0s,0s,.4s}
.pill{position:relative;display:inline-flex;align-items:center;gap:8px;height:46px;padding:0 18px;border:0;margin:0;overflow:hidden;border-radius:23px;cursor:pointer;outline:none;
background:var(--md-fab-menu-item-container-color,var(--md-sys-color-floating,var(--md-sys-color-primary-container)));color:var(--md-fab-menu-item-label-text-color,var(--md-sys-color-on-floating,var(--md-sys-color-on-primary-container)));font:500 14px/20px var(--md-ref-typeface-plain,Inter,sans-serif);text-decoration:none;white-space:nowrap;
transition:border-radius .32s cubic-bezier(.2,0,0,1),background-color .25s}
.pill.hold{border-radius:14px}
.icon{display:none;--md-icon-size:20px}:host([has-icon]) .icon{display:inline-flex}.icon ::slotted(*){font-size:20px}`;
  build() { this._mount(); }
  _mount() {
    const tag = this.href ? 'a' : 'button'; this._tag = tag; this.shadowRoot.querySelectorAll('.pill').forEach(n => n.remove());
    const w = document.createElement('div'); w.innerHTML = `<${tag} class="pill" part="button"${tag === 'button' ? ' type="button"' : ''}><md-ripple></md-ripple><md-focus-ring></md-focus-ring><span class="icon"><slot name="icon"></slot></span><span class="label"><slot></slot><span class="t"></span></span></${tag}>`;
    this._b = w.firstElementChild; this.shadowRoot.appendChild(this._b); this.bindHold(this._b); const s = this.$('slot[name=icon]'); const f = () => { this.hasIcon = s.assignedNodes().length > 0; }; s.addEventListener('slotchange', f); f();
  }
  update() { if (this._tag !== (this.href ? 'a' : 'button')) this._mount(); this.$('.t').textContent = this.label || ''; this._tag === 'a' ? this._b.setAttribute('href', this.href) : (this._b.disabled = this.disabled); }
  focus(o) { this._b && this._b.focus(o); }
}
defineElement('md-fab-menu-item', MdFabMenuItem);
class MdFabMenu extends MateElement {
  static props = { open: { type: Boolean, reflect: true }, label: { type: String } };
  static styles = css`
:host{position:relative;display:inline-flex;vertical-align:top}
.items{position:absolute;bottom:calc(100% + 8px);inset-inline-end:0;display:flex;flex-direction:column;align-items:flex-end;gap:8px;pointer-events:none}
:host([open]) .items ::slotted(*){pointer-events:auto}
.trigger{position:relative;display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;border:0;margin:0;padding:0;overflow:hidden;cursor:pointer;outline:none;border-radius:26px;
background:var(--md-fab-menu-container-color,var(--md-sys-color-primary));color:var(--md-fab-menu-icon-color,var(--md-sys-color-on-primary));-webkit-appearance:none;appearance:none;
transition:border-radius .32s cubic-bezier(.2,0,0,1),width .38s var(--mate-spring-fast),height .38s var(--mate-spring-fast),background-color .25s,color .25s;--md-ripple-hover-color:currentColor;--md-ripple-pressed-opacity:0;--md-ripple-pressed-color:currentColor}
:host(:not([open])) .trigger{width:56px;height:56px;border-radius:16px;background:var(--md-fab-menu-collapsed-container-color,var(--md-sys-color-floating,var(--md-sys-color-primary-container)));color:var(--md-sys-color-on-floating,var(--md-sys-color-on-primary-container));box-shadow:var(--mate-shadow-floating)}
.trigger.hold{border-radius:16px}:host(:not([open])) .trigger.hold{border-radius:28px}
.glyph{display:inline-flex;transition:transform .35s var(--mate-spring-fast)}.glyph svg{width:24px;height:24px;fill:currentColor}:host([open]) .glyph{transform:rotate(45deg)}`;
  build() {
    this.shadowRoot.innerHTML = '<div class="items" part="items" role="menu"><slot></slot></div><button class="trigger" part="trigger" type="button" aria-haspopup="menu" aria-expanded="false"><md-ripple></md-ripple><md-focus-ring></md-focus-ring><span class="glyph"><slot name="icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"/></svg></slot></span></button>';
    this._t = this.$('.trigger'); this.bindHold(this._t); this._t.addEventListener('click', () => this.toggle());
    this.$('slot:not([name])').addEventListener('slotchange', () => this._stagger());
    this.addEventListener('click', e => { if (this.open && this.items.some(i => i === e.target || i.contains(e.target))) { this.open = false; } });
    this.addEventListener('keydown', e => { if (e.key === 'Escape' && this.open) { this.open = false; this._t.focus(); } });
    document.addEventListener('pointerdown', this._out = e => { if (this.open && !e.composedPath().includes(this)) this.open = false; }, true);
  }
  disconnectedCallback() { document.removeEventListener('pointerdown', this._out, true); }
  get items() { return Array.from(this.children).filter(c => c instanceof MdFabMenuItem); }
  show() { this.open = true; } close() { this.open = false; } toggle() { this.open = !this.open; }
  _stagger() { const it = this.items, n = it.length; it.forEach((x, i) => { x.style.setProperty('--_d', `${((n - 1 - i) * .04 + .02).toFixed(2)}s`); x.toggleAttribute('data-collapsed', !this.open); }); }
  update() { this._t.setAttribute('aria-expanded', String(this.open)); this._t.setAttribute('aria-label', this.label || (this.open ? 'Close menu' : 'Open menu')); this._stagger(); this.emit(this.open ? 'open' : 'close', { bubbles: false }); }
}
defineElement('md-fab-menu', MdFabMenu);

/* ---- Navigation bar (HTML .mate-navbar / .mate-nav-item / .mate-nav-pill) ---- */
class MdNavigationTab extends MateElement {
  static delegatesFocus = true;
  static props = { active: { type: Boolean, reflect: true }, disabled: { type: Boolean, reflect: true }, hideInactiveLabel: { type: Boolean, attribute: 'hide-inactive-label', reflect: true }, label: { type: String }, badgeValue: { type: String, attribute: 'badge-value' }, showBadge: { type: Boolean, attribute: 'show-badge', reflect: true }, href: { type: String, reflect: true }, horizontal: { type: Boolean, reflect: true }, hasActiveIcon: { type: Boolean, attribute: 'has-active-icon', reflect: true } };
  static styles = css`
:host{display:inline-flex;flex:1;min-width:0;justify-content:center;outline:none;-webkit-tap-highlight-color:transparent;--md-ripple-hover-color:var(--md-sys-color-on-surface);--md-ripple-pressed-opacity:0;--md-ripple-pressed-color:var(--md-sys-color-on-surface)}
:host([disabled]){pointer-events:none;opacity:.38}
.tab{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;min-width:68px;padding:2px 6px;border:0;margin:0;background:none;cursor:pointer;outline:none;color:var(--md-sys-color-on-surface-variant);text-decoration:none;font:inherit;-webkit-appearance:none;appearance:none}
.pill{position:relative;display:flex;align-items:center;justify-content:center;gap:6px;height:32px;width:64px;border-radius:999px;background:transparent;
transition:background-color .25s ease,width .36s var(--mate-spring-fast),padding .36s var(--mate-spring-fast)}
.pill.hold{width:54px}
:host([active]) .pill{background:var(--md-navigation-bar-active-indicator-color,var(--md-sys-color-primary-container));color:var(--md-navigation-bar-active-icon-color,var(--md-sys-color-on-primary-container))}
.ico{display:inline-flex;align-items:center;justify-content:center;position:relative;--md-icon-size:24px}
.ico ::slotted(*){font-size:24px}
:host([active]) .ico ::slotted(*){--md-icon-fill:1;--md-icon-weight:600}
slot[name=active-icon]{display:none}:host([active][has-active-icon]) slot[name=active-icon]{display:contents}:host([active][has-active-icon]) slot[name=inactive-icon]{display:none}
.label{font:500 12px/16px var(--md-ref-typeface-plain,Inter,sans-serif);color:var(--md-navigation-bar-label-text-color,var(--md-sys-color-on-surface-variant));transition:color .2s ease,font-weight .2s ease;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;max-width:100%}
:host([active]) .label{color:var(--md-sys-color-on-surface);font-weight:600}
:host([hide-inactive-label]:not([active])) .label{display:none}
.badge{position:absolute;top:-4px;inset-inline-start:calc(100% - 6px);min-width:16px;height:16px;padding:0 4px;border-radius:8px;background:var(--md-sys-color-error);color:var(--md-sys-color-on-error);font:500 11px/16px var(--md-ref-typeface-plain,Inter,sans-serif);text-align:center;display:none;box-sizing:border-box}
:host([show-badge]) .badge{display:block}.badge.dot{min-width:6px;width:6px;height:6px;padding:0;top:-2px;inset-inline-start:calc(100% - 4px)}
:host([horizontal]) .tab{flex-direction:row;min-width:auto}
:host([horizontal]) .pill{width:auto;height:40px;padding:0 12px}:host([horizontal][active]) .pill{padding:0 18px}:host([horizontal]) .pill.hold{width:auto;transform:scale(.94)}
`;
  build() { this._mount(); }
  _mount() {
    const tag = this.href ? 'a' : 'button'; this._tag = tag; this.shadowRoot.querySelectorAll('.tab').forEach(n => n.remove());
    const w = document.createElement('div'); w.innerHTML = `<${tag} class="tab" part="button" role="tab"${tag === 'button' ? ' type="button"' : ''}><md-focus-ring part="focus-ring"></md-focus-ring><span class="pill"><md-ripple part="ripple"></md-ripple><span class="ico"><slot name="inactive-icon"></slot><slot name="active-icon"></slot><span class="badge"></span></span></span><span class="label"><slot></slot><span class="t"></span></span></${tag}>`;
    this._b = w.firstElementChild; this.shadowRoot.appendChild(this._b); this.bindHold(this.$('.pill'));
    const s = this.$('slot[name=active-icon]'); const f = () => { this.hasActiveIcon = s.assignedNodes().length > 0; }; s.addEventListener('slotchange', f); f();
    this._b.addEventListener('click', () => { if (!this.disabled) this.emit('navigation-tab-interaction', { bubbles: true, composed: true, detail: { state: this } }); });
  }
  get isNavigationTab() { return true; }
  update() {
    if (this._tag !== (this.href ? 'a' : 'button')) this._mount();
    this._b.setAttribute('aria-selected', String(this.active)); this._b.tabIndex = this.active ? 0 : -1; this.$('.t').textContent = this.label || '';
    const lab = this.$('.label'), pill = this.$('.pill'); if (this.horizontal) { if (lab.parentElement !== pill) pill.appendChild(lab); } else if (lab.parentElement !== this._b) this._b.appendChild(lab);
    if (this._tag === 'a') this._b.setAttribute('href', this.href); else this._b.disabled = this.disabled;
    const bd = this.$('.badge'); bd.textContent = this.badgeValue || ''; bd.classList.toggle('dot', !this.badgeValue); const al = this.getAttribute('aria-label'); al ? this._b.setAttribute('aria-label', al) : this._b.removeAttribute('aria-label');
    if (this.hasAttribute('tab-focusable')) this._b.tabIndex = 0;
  }
  focus(o) { this._b && this._b.focus(o); }
}
defineElement('md-navigation-tab', MdNavigationTab);
class MdNavigationBar extends MateElement {
  static props = { activeIndex: { type: Number, attribute: 'active-index', reflect: true, default: 0 }, hideInactiveLabels: { type: Boolean, attribute: 'hide-inactive-labels', reflect: true }, horizontal: { type: Boolean, reflect: true } };
  static styles = css`
:host{display:flex;width:100%;box-sizing:border-box;flex-shrink:0;background:var(--md-navigation-bar-container-color,var(--md-sys-color-surface-container));padding:10px 8px 14px;justify-content:space-around;align-items:center;transition:background-color .3s ease}
:host([horizontal]){padding:12px 10px 16px}.bar{display:flex;flex:1;align-items:center;justify-content:space-around;gap:4px}`;
  build() { this.shadowRoot.innerHTML = '<div class="bar" role="tablist" part="bar"><slot></slot></div>'; this.$('slot').addEventListener('slotchange', () => this._apply()); this.addEventListener('navigation-tab-interaction', e => this._interact(e)); this.addEventListener('keydown', e => this._key(e)); }
  get tabs() { return Array.from(this.children).filter(c => c.isNavigationTab); }
  get activeTab() { return this.tabs[this.activeIndex] || null; } set activeTab(t) { const i = this.tabs.indexOf(t); if (i >= 0) this.activeIndex = i; }
  update() { this._apply(); }
  _apply() { this.tabs.forEach((t, i) => { t.active = i === this.activeIndex; t.hideInactiveLabel = this.hideInactiveLabels; t.horizontal = this.horizontal; }); }
  _interact(e) { const t = e.detail.state, i = this.tabs.indexOf(t); if (i < 0 || i === this.activeIndex) return; const ev = this.emit('navigation-bar-activated', { bubbles: true, cancelable: true, detail: { tab: t, activeIndex: i } }); if (!ev.defaultPrevented) { this.activeIndex = i; this.emit('change', { bubbles: true }); } }
  _key(e) { if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return; const t = this.tabs.filter(x => !x.disabled), c = t.findIndex(x => x === e.target); if (c < 0) return; const rtl = getComputedStyle(this).direction === 'rtl'; let n = c; if (e.key === 'Home') n = 0; else if (e.key === 'End') n = t.length - 1; else n = (c + ((e.key === 'ArrowRight') !== rtl ? 1 : -1) + t.length) % t.length; e.preventDefault(); t.forEach(x => x.removeAttribute('tab-focusable')); t[n].setAttribute('tab-focusable', ''); t[n].focus(); }
}
defineElement('md-navigation-bar', MdNavigationBar);

/* ---- Navigation drawer (HTML .x-drawer / .x-di / .x-dh / .x-div) ---- */
class MdNavigationDrawerItem extends MateElement {
  static delegatesFocus = true;
  static props = { active: { type: Boolean, reflect: true }, disabled: { type: Boolean, reflect: true }, href: { type: String, reflect: true }, label: { type: String }, hasIcon: { type: Boolean, attribute: 'has-icon', reflect: true } };
  static styles = css`
:host{display:block;outline:none;--md-ripple-hover-color:var(--md-sys-color-on-surface);--md-ripple-pressed-opacity:0;--md-ripple-pressed-color:var(--md-sys-color-on-surface)}:host([disabled]){pointer-events:none;opacity:.38}
.item{position:relative;display:flex;align-items:center;gap:12px;box-sizing:border-box;width:100%;height:56px;padding:0 16px;border:0;margin:0;overflow:hidden;cursor:pointer;outline:none;background:transparent;color:var(--md-navigation-drawer-item-label-text-color,var(--md-sys-color-on-surface-variant));
border-radius:28px;font:500 14px/20px var(--md-ref-typeface-plain,Inter,sans-serif);text-decoration:none;text-align:start;transition:border-radius .32s cubic-bezier(.2,0,0,1),background-color .25s,color .25s;-webkit-appearance:none;appearance:none}
.item.hold{border-radius:14px}
:host([active]) .item{background:var(--md-navigation-drawer-item-active-container-color,var(--md-sys-color-secondary-container));color:var(--md-navigation-drawer-item-active-label-text-color,var(--md-sys-color-on-primary-container));font-weight:700}
.icon{display:none;--md-icon-size:24px}:host([has-icon]) .icon{display:inline-flex}.icon ::slotted(*){font-size:24px}:host([active]) .icon ::slotted(*){--md-icon-fill:1;--md-icon-weight:500}
.label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.badge{margin-inline-start:auto;font-weight:700}`;
  build() { this._mount(); }
  _mount() {
    const tag = this.href ? 'a' : 'button'; this._tag = tag; this.shadowRoot.querySelectorAll('.item').forEach(n => n.remove());
    const w = document.createElement('div'); w.innerHTML = `<${tag} class="item" part="item"${tag === 'button' ? ' type="button"' : ''}><md-ripple></md-ripple><md-focus-ring inward></md-focus-ring><span class="icon"><slot name="icon"></slot></span><span class="label"><slot></slot><span class="t"></span></span><span class="badge"><slot name="badge"></slot></span></${tag}>`;
    this._b = w.firstElementChild; this.shadowRoot.appendChild(this._b); this.bindHold(this._b); const s = this.$('slot[name=icon]'); const f = () => { this.hasIcon = s.assignedNodes().length > 0; }; s.addEventListener('slotchange', f); f();
  }
  get isDrawerItem() { return true; }
  update() { if (this._tag !== (this.href ? 'a' : 'button')) this._mount(); this.$('.t').textContent = this.label || ''; this._tag === 'a' ? this._b.setAttribute('href', this.href) : (this._b.disabled = this.disabled); this._b.setAttribute('aria-current', this.active ? 'page' : 'false'); }
  focus(o) { this._b && this._b.focus(o); }
}
class MdNavigationDrawerHeader extends MateElement { static styles = css`:host{display:block;padding:16px 16px 8px;font:500 14px/20px var(--md-ref-typeface-plain,Inter,sans-serif);color:var(--md-sys-color-on-surface-variant)}`; build() { this.shadowRoot.innerHTML = '<slot></slot>'; this.setAttribute('role', 'heading'); } }
class MdNavigationDrawerDivider extends MateElement { static styles = css`:host{display:block;height:1px;margin:8px 16px;background:var(--md-sys-color-outline-variant)}`; build() { this.setAttribute('role', 'separator'); } }
defineElement('md-navigation-drawer-item', MdNavigationDrawerItem); defineElement('md-navigation-drawer-header', MdNavigationDrawerHeader); defineElement('md-navigation-drawer-divider', MdNavigationDrawerDivider);
class MdNavigationDrawer extends MateElement {
  static props = { open: { type: Boolean, reflect: true }, standard: { type: Boolean, reflect: true }, keepOpen: { type: Boolean, attribute: 'keep-open', reflect: true }, pivot: { type: String } };
  static styles = css`
:host{display:contents}
.root{position:fixed;inset:0;z-index:var(--md-navigation-drawer-z-index,2000);pointer-events:none}
.scrim{position:absolute;inset:0;background:var(--md-navigation-drawer-scrim-color,color-mix(in srgb,var(--md-sys-color-scrim,#000) 52%,transparent));opacity:0;transition:opacity .3s}
.panel{position:absolute;inset-block:0;inset-inline-start:0;width:min(var(--md-navigation-drawer-width,320px),85%);box-sizing:border-box;overflow:auto;padding:24px 12px;background:var(--md-navigation-drawer-container-color,var(--md-sys-color-surface-container));
border-radius:0 28px 28px 0;transform:translateX(-102%);transition:transform .42s var(--mate-ease-decel);outline:none}
:host(:dir(rtl)) .panel{border-radius:28px 0 0 28px;transform:translateX(102%)}
:host([open]) .root{pointer-events:auto}:host([open]) .scrim{opacity:1}:host([open]) .panel{transform:none}
:host([standard]){display:block;width:0;overflow:hidden;transition:width .42s var(--mate-ease-decel)}:host([standard][open]){width:min(var(--md-navigation-drawer-width,320px),85%)}
:host([standard]) .root{position:relative;inset:auto;height:100%;pointer-events:auto}:host([standard]) .scrim{display:none}
:host([standard]) .panel{position:relative;width:100%;height:100%;transform:none;border-radius:0 28px 28px 0}
@media(prefers-reduced-motion:reduce){.panel,.scrim{transition:none}}`;
  build() {
    this.shadowRoot.innerHTML = '<div class="root"><div class="scrim" part="scrim"></div><nav class="panel" part="panel" tabindex="-1"><slot></slot></nav></div>';
    this._panel = this.$('.panel'); this.$('.scrim').addEventListener('click', () => { this.open = false; });
    this.addEventListener('keydown', e => { if (e.key === 'Escape' && this.open && !this.standard) { this.open = false; } });
    this.addEventListener('click', e => { const it = e.composedPath().find(n => n.isDrawerItem); if (it && !it.disabled) { this.items.forEach(x => { x.active = x === it; }); this.emit('change', { bubbles: true, detail: { item: it } }); if (!this.standard && !this.keepOpen) this.open = false; } });
  }
  get items() { return Array.from(this.querySelectorAll('md-navigation-drawer-item')); }
  show() { this.open = true; } close() { this.open = false; } toggle() { this.open = !this.open; }
  update() { this.standard ? this._panel.removeAttribute('aria-modal') : this._panel.setAttribute('aria-modal', String(this.open)); this._panel.setAttribute('aria-hidden', String(!this.open)); if (this._was !== this.open) { if (this._was !== undefined) { this.emit('navigation-drawer-changed', { bubbles: true, composed: true, detail: { opened: this.open } }); if (this.open && !this.standard) this._panel.focus({ preventScroll: true }); } this._was = this.open; } }
}
defineElement('md-navigation-drawer', MdNavigationDrawer);

/* ---- Top app bar (HTML .mate-top-bar / .x-bar) ---- */
class MdTopAppBar extends MateElement {
  static props = { type: { type: String, reflect: true, default: 'small' }, headline: { type: String }, subtitle: { type: String }, scrolled: { type: Boolean, reflect: true }, sticky: { type: Boolean, reflect: true }, scrollTarget: { type: String, attribute: 'scroll-target' }, circleLeading: { type: Boolean, attribute: 'circle-leading', reflect: true }, back: { type: Boolean, reflect: true }, backLabel: { type: String, attribute: 'back-label', default: 'Back' } };
  static styles = css`
:host{display:block;box-sizing:border-box;width:100%;background:var(--md-top-app-bar-container-color,var(--md-sys-color-surface));color:var(--md-sys-color-on-surface);transition:background-color .25s ease,box-shadow .25s;z-index:5}
:host([sticky]){position:sticky;top:0}:host([scrolled]){background:var(--md-top-app-bar-scrolled-container-color,var(--md-sys-color-surface-container))}
.bar{display:flex;flex-direction:column;padding:8px 16px;box-sizing:border-box}
.row{display:flex;align-items:center;gap:8px;min-height:48px}
.lead,.trail{display:flex;align-items:center;gap:8px;flex:none}
::slotted([slot=leading]){border-radius:20px;transition:transform .3s var(--mate-spring-fast),border-radius .32s cubic-bezier(.2,0,0,1),background-color .25s,color .25s}
.back{--md-icon-button-pressed-rotation:0deg;transition:transform .3s var(--mate-spring-fast),border-radius .32s cubic-bezier(.2,0,0,1),background-color .25s}.back[hidden]{display:none}.back svg{width:24px;height:24px;fill:currentColor;display:block}
.back:active{transform:scale(.9) translateX(-2px)}
:host([circle-leading]) .row{gap:16px}
:host([circle-leading]) ::slotted([slot=leading]),:host([circle-leading]) .back{width:var(--md-top-app-bar-leading-size,48px);height:var(--md-top-app-bar-leading-size,48px);border-radius:50%;background:var(--md-top-app-bar-leading-container-color,var(--md-sys-color-surface-container-high));color:var(--md-top-app-bar-leading-icon-color,var(--md-sys-color-on-surface-variant))}
::slotted([slot=leading]:active){transform:scale(.9) translateX(-2px);border-radius:14px;background:var(--md-sys-color-primary-container);color:var(--md-sys-color-on-primary-container)}.trail{margin-inline-start:auto}
.title{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font:500 21px/28px var(--md-ref-typeface-brand,Inter,sans-serif);letter-spacing:-.01em}
.st{font:600 14px/20px var(--md-ref-typeface-plain,Inter,sans-serif);color:var(--md-sys-color-on-surface-variant)}
:host([type=center-aligned]) .title{text-align:center}:host([type=center-aligned]) .lead{min-width:48px}:host([type=center-aligned]) .trail{min-width:48px}
.big{display:none;padding:0 0 12px;font:400 28px/36px var(--md-ref-typeface-brand,Inter,sans-serif);letter-spacing:-.01em;color:var(--md-sys-color-on-surface)}
:host([type=medium]) .bar{min-height:112px}:host([type=large]) .bar{min-height:152px}
:host([type=medium]) .title,:host([type=large]) .title{display:none}:host([type=medium]) .big,:host([type=large]) .big{display:block;margin-top:auto}
:host([type=large]) .big{font-size:32px;line-height:40px}
:host([type=medium]) .trail,:host([type=large]) .trail{margin-inline-start:auto}
:host([type=medium]) .row,:host([type=large]) .row{flex:none}`;
  build() {
    this.shadowRoot.innerHTML = '<header class="bar" part="bar"><div class="row"><div class="lead"><md-icon-button class="back" part="back-button" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"/></svg></md-icon-button><slot name="leading"></slot></div><div class="title" part="headline"><slot name="headline"></slot><span class="h"></span></div><div class="trail"><slot name="trailing"></slot></div></div><div class="big"><slot name="headline-large"></slot><span class="h"></span></div></header>';
    this._bk = this.$('.back'); this._bk.addEventListener('click', () => this.emit('back', { bubbles: true, composed: true, cancelable: true }));
    this._onScroll = e => { const t = e.target === document ? document.scrollingElement : e.target; this.scrolled = (t.scrollTop || 0) > 2; };
  }
  update() {
    this._bk.hidden = !this.back; this._bk.setAttribute('aria-label', this.backLabel || 'Back');
    for (const h of this.$$('.h')) h.textContent = this.headline || ''; const t = this.scrollTarget ? document.querySelector(this.scrollTarget) : null;
    if (this._t !== t) { if (this._t) this._t.removeEventListener('scroll', this._onScroll); this._t = t; if (t) t.addEventListener('scroll', this._onScroll, { passive: true }); }
  }
}
defineElement('md-top-app-bar', MdTopAppBar);

/* ---- Snackbar (HTML .mate-snackbar + showToast) ---- */
class MdSnackbar extends MateElement {
  static props = { open: { type: Boolean, reflect: true }, message: { type: String }, actionLabel: { type: String, attribute: 'action-label' }, closeButton: { type: Boolean, attribute: 'close-button', reflect: true }, duration: { type: Number, default: 4000 }, quick: { type: Boolean, reflect: true } };
  static styles = css`
:host{position:fixed;inset-inline:16px;bottom:calc(var(--md-snackbar-offset,16px) + env(safe-area-inset-bottom,0px));display:flex;justify-content:center;pointer-events:none;z-index:var(--md-snackbar-z-index,2500)}
.bar{display:flex;align-items:center;justify-content:space-between;gap:12px;box-sizing:border-box;width:min(100%,560px);padding:12px 16px;border-radius:var(--md-snackbar-container-shape,14px);
background:var(--md-snackbar-container-color,var(--md-sys-color-inverse-surface));color:var(--md-snackbar-supporting-text-color,var(--md-sys-color-inverse-on-surface));font:500 13px/20px var(--md-ref-typeface-plain,Inter,sans-serif);
box-shadow:var(--mate-shadow-floating,0 6px 18px rgba(0,0,0,.25));transform:translateY(20px);opacity:0;visibility:hidden;transition:transform .3s var(--mate-spring-fast),opacity .22s ease,visibility 0s .3s}
:host([open]) .bar{transform:none;opacity:1;visibility:visible;pointer-events:auto;transition:transform .3s var(--mate-spring-fast),opacity .22s ease,visibility 0s}
:host([quick]) .bar{transition:none}
.msg{flex:1;min-width:0}.act{display:flex;align-items:center;gap:4px;flex:none}
.act ::slotted([slot=action]),.actbtn{border:0;background:none;color:var(--md-snackbar-action-label-text-color,var(--md-sys-color-inverse-primary));font:600 13px/20px var(--md-ref-typeface-plain,Inter,sans-serif);padding:8px 12px;border-radius:999px;cursor:pointer;outline:none}
.actbtn:hover{background:color-mix(in srgb,var(--md-sys-color-inverse-primary) 12%,transparent)}.actbtn:empty{display:none}
.x{display:none;width:32px;height:32px;border:0;padding:0;border-radius:50%;background:none;color:inherit;cursor:pointer;align-items:center;justify-content:center}.x svg{width:18px;height:18px;fill:currentColor}:host([close-button]) .x{display:inline-flex}.x:hover{background:color-mix(in srgb,currentColor 12%,transparent)}`;
  build() {
    this.shadowRoot.innerHTML = `<div class="bar" part="container" role="status" aria-live="polite"><div class="msg" part="message"><slot></slot><span class="m"></span></div><div class="act"><slot name="action"></slot><button class="actbtn" type="button"></button><button class="x" type="button" aria-label="Dismiss">${CLOSE_SVG}</button></div></div>`;
    this._q = []; this.$('.actbtn').addEventListener('click', () => { this.emit('action', { bubbles: true, composed: true }); this._end('action'); }); this.$('.x').addEventListener('click', () => this._end('dismiss'));
    this.addEventListener('click', e => { if (e.composedPath().some(n => n.slot === 'action')) { this.emit('action', { bubbles: true, composed: true }); this._end('action'); } });
    this._pause = () => clearTimeout(this._t); this.$('.bar').addEventListener('pointerenter', this._pause); this.$('.bar').addEventListener('pointerleave', () => this._arm());
  }
  _arm() { clearTimeout(this._t); if (this.open && this.duration > 0) this._t = setTimeout(() => this._end('timeout'), this.duration); }
  /** show('Saved') or show('Deleted', {action:'Undo', duration:5000}) → Promise<'action'|'dismiss'|'timeout'> */
  show(message, o = {}) {
    return new Promise(res => {
      const run = () => { this._res = res; if (message != null) this._p.message = String(message); this._p.actionLabel = o.action || o.actionLabel || ''; if (o.duration != null) this._p.duration = o.duration; this.closeButton = !!o.closeButton; this.open = true; };
      if (this.open) { this._q.push(run); this._end('replaced', true); } else run();
    });
  }
  close(reason) { this._end(reason || 'dismiss'); }
  _end(reason, keepQueue) { if (!this.open) return; clearTimeout(this._t); this.open = false; const r = this._res; this._res = null; this.emit('closed', { bubbles: true, composed: true, detail: { reason } }); r && r(reason); setTimeout(() => { const n = this._q.shift(); n && n(); }, this.quick ? 0 : 320); }
  update() { this.$('.m').textContent = this.message || ''; const b = this.$('.actbtn'); b.textContent = this.actionLabel || ''; if (this.open && !this._was) { this.emit('opened', { bubbles: true, composed: true }); } this._was = this.open; this._arm(); }
}
defineElement('md-snackbar', MdSnackbar);

/* ---- Tooltip: plain + rich (HTML .x-tip) ---- */
class MdTooltip extends MateElement {
  static props = { for: { type: String, reflect: true }, variant: { type: String, reflect: true, default: 'plain' }, trigger: { type: String, reflect: true }, placement: { type: String, reflect: true }, open: { type: Boolean, reflect: true }, delay: { type: Number, default: 500 }, heading: { type: String } };
  static styles = css`
:host{display:contents}
.tip{position:fixed;left:0;top:0;inset:auto;margin:0;display:none;box-sizing:border-box;z-index:var(--md-tooltip-z-index,3500);pointer-events:none;border:0;
background:var(--md-tooltip-container-color,var(--md-sys-color-inverse-surface));color:var(--md-tooltip-supporting-text-color,var(--md-sys-color-inverse-on-surface));border-radius:8px;padding:4px 8px;max-width:240px;font:500 12px/16px var(--md-ref-typeface-plain,Inter,sans-serif);
transform-origin:var(--_o,top left);transform:scale(.8);opacity:0;transition:transform .25s var(--mate-spring-fast),opacity .15s}
.tip.show{display:block}.tip.on{transform:none;opacity:1}
:host([variant=rich]) .tip{background:var(--md-rich-tooltip-container-color,var(--md-sys-color-surface-container-high));color:var(--md-sys-color-on-surface-variant);border-radius:16px;padding:16px;width:260px;max-width:min(260px,calc(100vw - 16px));pointer-events:auto;
box-shadow:var(--mate-shadow-menu,0 8px 24px rgba(0,0,0,.2));transform:scale(.6);transition:transform .38s var(--mate-spring-fast),opacity .2s}
:host([variant=rich]) .tip.on{transform:none}
.h{display:none;font:500 14px/20px var(--md-ref-typeface-plain,Inter,sans-serif);color:var(--md-sys-color-on-surface);margin-bottom:6px}.h.has{display:block}
:host([variant=rich]) .t{font:400 13px/1.5 var(--md-ref-typeface-plain,Inter,sans-serif)}
.a{display:none;margin-top:12px}.a.has{display:block}.a ::slotted(*){font:500 13px var(--md-ref-typeface-plain,Inter,sans-serif);color:var(--md-sys-color-primary);cursor:pointer;text-decoration:none}
:host(:not([variant=rich])) .h,:host(:not([variant=rich])) .a{display:none!important}`;
  build() {
    this.shadowRoot.innerHTML = `<div class="tip" part="container" role="tooltip"${_supportsPopover ? ' popover="manual"' : ''}><div class="h"><slot name="heading"></slot><span class="hh"></span></div><div class="t"><slot></slot></div><div class="a"><slot name="action"></slot></div></div>`;
    this._tip = this.$('.tip'); const sl = [['.h', 'heading'], ['.a', 'action']]; for (const [c, n] of sl) { const s = this.$(`slot[name=${n}]`), b = this.$(c); const f = () => b.classList.toggle('has', s.assignedNodes().length > 0 || (n === 'heading' && !!this.heading)); s.addEventListener('slotchange', f); f(); }
    this._in = () => { if (this._mode() === 'hover') { clearTimeout(this._ct); this._ot = setTimeout(() => { this.open = true; }, this.variant === 'rich' ? 0 : this.delay); } };
    this._out = () => { clearTimeout(this._ot); if (this._mode() === 'hover') this._ct = setTimeout(() => { this.open = false; }, this.variant === 'rich' ? 120 : 0); };
    this._clk = () => { if (this._mode() === 'click') this.open = !this.open; };
    this._esc = e => { if (e.key === 'Escape' && this.open) this.open = false; };
    this._doc = e => { if (this.open && this._mode() === 'click') { const p = e.composedPath(); if (!p.includes(this._tip) && !p.includes(this._a)) this.open = false; } };
    this._tip.addEventListener('pointerenter', () => clearTimeout(this._ct)); this._tip.addEventListener('pointerleave', () => this._out());
  }
  _mode() { return this.trigger || (this.variant === 'rich' ? 'hover' : 'hover'); }
  get anchorElement() { return this._anchorP || null; } set anchorElement(v) { this._anchorP = v; this._bind(); }
  connectedCallback() { super.connectedCallback(); this._bind(); document.addEventListener('keydown', this._esc); document.addEventListener('pointerdown', this._doc, true); }
  disconnectedCallback() { this._unbind(); document.removeEventListener('keydown', this._esc); document.removeEventListener('pointerdown', this._doc, true); }
  _unbind() { const a = this._a; if (!a) return; a.removeEventListener('pointerenter', this._in); a.removeEventListener('pointerleave', this._out); a.removeEventListener('focusin', this._in); a.removeEventListener('focusout', this._out); a.removeEventListener('click', this._clk); this._a = null; }
  _bind() { const a = _resolveFor(this); if (a === this._a) return; this._unbind(); this._a = a; if (!a) return; a.addEventListener('pointerenter', this._in); a.addEventListener('pointerleave', this._out); a.addEventListener('focusin', this._in); a.addEventListener('focusout', this._out); a.addEventListener('click', this._clk); }
  show() { this.open = true; } close() { this.open = false; }
  update() {
    this._bind(); this.$('.hh').textContent = this.heading || ''; this.$('.h').classList.toggle('has', !!this.heading || this.$('slot[name=heading]').assignedNodes().length > 0);
    const t = this._tip; if (this.open && !this._shown) { this._shown = true; t.classList.add('show'); _onTopLayer(t, true); const A = this._a ? this._a.getBoundingClientRect() : { left: 0, right: 0, top: 0, bottom: 0, width: 0, height: 0 }; _placeAround(t, A, this.placement || (this.variant === 'rich' ? 'right-start' : 'bottom'), this.variant === 'rich' ? 8 : 4); void t.offsetWidth; t.classList.add('on'); this._a && this._a.setAttribute('aria-describedby', this.id || ''); }
    else if (!this.open && this._shown) { this._shown = false; t.classList.remove('on'); clearTimeout(this._ft); this._ft = setTimeout(() => { if (!this._shown) { t.classList.remove('show'); _onTopLayer(t, false); } }, 200); }
  }
}
defineElement('md-tooltip', MdTooltip);

/* ---- Card (HTML .mate-card / .mate-post-card, no shadows) ---- */
class MdCard extends MateElement {
  static props = { variant: { type: String, reflect: true, default: 'filled' }, interactive: { type: Boolean, reflect: true }, disabled: { type: Boolean, reflect: true }, href: { type: String, reflect: true }, swipeOpen: { type: Boolean, attribute: 'swipe-open', reflect: true }, tapToggle: { type: Boolean, attribute: 'tap-toggle' } };
  static styles = css`
:host{display:block;position:relative;--_r:var(--md-card-container-shape,22px);--_rp:14px;--_bg:var(--md-card-container-color,var(--md-sys-color-surface-container-lowest));--md-ripple-hover-color:var(--md-sys-color-on-surface);--md-ripple-pressed-opacity:0;--md-ripple-pressed-color:var(--md-sys-color-on-surface);outline:none}
:host([variant=elevated]){--_bg:var(--md-card-container-color,var(--md-sys-color-surface-container-low))}
:host([variant=tonal]){--_bg:var(--md-card-container-color,var(--md-sys-color-surface-container))}
:host([variant=outlined]){--_bg:var(--md-card-container-color,var(--md-sys-color-surface))}
:host([disabled]){pointer-events:none;opacity:.38}
.card{position:relative;display:flex;flex-direction:column;gap:12px;box-sizing:border-box;height:100%;padding:var(--md-card-padding,16px);background:var(--_bg);color:var(--md-sys-color-on-surface);border-radius:var(--_r);overflow:hidden;
transition:border-radius .35s var(--mate-spring-fast),background-color .25s ease,box-shadow .25s,transform .38s var(--mate-spring-spatial)}
.sw{height:100%;border-radius:var(--_r)}:host([has-swipe]) .sw{overflow:hidden}:host([has-swipe]) .sw.hold{border-radius:var(--_rp)}
:host([interactive]) .card{cursor:pointer}.card.hold{border-radius:var(--_rp)}
:host([interactive]) .card.hold{background:var(--md-card-pressed-container-color,var(--md-sys-color-surface-container))}
.outline{position:absolute;inset:0;border-radius:inherit;border:1px solid var(--md-sys-color-outline-variant);pointer-events:none;display:none}:host([variant=outlined]) .outline{display:block}
md-elevation{--md-elevation-level:0}:host([variant=elevated]) md-elevation{--md-elevation-level:1}@media(hover:hover) and (pointer:fine){:host([variant=elevated][interactive]) .card:hover md-elevation{--md-elevation-level:2}}
:host([variant=elevated][interactive]) .card.hold md-elevation{--md-elevation-level:1}
.body{display:flex;flex-direction:column;gap:12px;min-width:0;position:relative}
::slotted([slot=media]){display:block;width:100%;border-radius:18px;overflow:hidden;object-fit:cover}
.actions{display:none;gap:8px;justify-content:flex-end;position:relative}.actions.has{display:flex}
md-ripple,md-focus-ring{display:none}:host([interactive]) md-ripple,:host([interactive]) md-focus-ring{display:flex}
:host([interactive]) md-focus-ring:not([visible]){display:none}` + SWIPE_CSS;
  build() {
    this.shadowRoot.innerHTML = '<div class="sw" part="swipe"><div class="swa" part="swipe-actions"><slot name="swipe-actions"></slot></div><div class="card swx" part="container"><md-elevation></md-elevation><span class="outline"></span><md-ripple part="ripple"></md-ripple><md-focus-ring part="focus-ring"></md-focus-ring><slot name="media"></slot><div class="body"><slot name="header"></slot><slot></slot></div><div class="actions"><slot name="actions"></slot></div></div></div>';
    this._c = this.$('.card'); this.bindHold(this._c); this.bindHold(this.$('.sw'));
    const ss = this.$('slot[name=swipe-actions]'); this._swipe = new _SwipeCtl(this, { main: this._c, actions: this.$('.swa'), can: () => this.hasAttribute('has-swipe'), tap: () => this.tapToggle, onChange: o => { this.swipeOpen = o; this.emit(o ? 'swipe-open' : 'swipe-close', { bubbles: true }); } });
    const fs = () => this.toggleAttribute('has-swipe', ss.assignedNodes().length > 0); ss.addEventListener('slotchange', () => { fs(); this._schedule(); }); fs(); const s = this.$('slot[name=actions]'), a = this.$('.actions'); const f = () => a.classList.toggle('has', s.assignedNodes().length > 0); s.addEventListener('slotchange', f); f();
    this.addEventListener('keydown', e => { if (this.interactive && (e.key === 'Enter' || e.key === ' ') && e.target === this) { e.preventDefault(); this.click(); } });
    this.addEventListener('click', () => { if (this.interactive && this.href && !this.disabled) location.href = this.href; });
  }
  update() { this._swipe.apply(this.swipeOpen); _swipeActions(this.$('slot[name=swipe-actions]'), this.swipeOpen);
    if (this.interactive) { this.setAttribute('role', this.href ? 'link' : 'button'); this.tabIndex = this.disabled ? -1 : 0; } else { this.removeAttribute('tabindex'); this.removeAttribute('role'); } }
}
defineElement('md-card', MdCard);

/* ---- Badge · Avatar ---- */
class MdBadge extends MateElement {
  static props = { value: { type: String, reflect: true }, floating: { type: Boolean, reflect: true } };
  static styles = css`
:host{display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;background:var(--md-badge-color,var(--md-sys-color-error));color:var(--md-badge-label-color,var(--md-sys-color-on-error));
min-width:6px;height:6px;border-radius:3px;font:500 11px/16px var(--md-ref-typeface-plain,Inter,sans-serif);vertical-align:middle;transition:transform .3s var(--mate-spring-fast)}
:host([value]:not([value=""])){min-width:16px;height:16px;padding:0 4px;border-radius:8px}
:host([floating]){position:absolute;top:-4px;inset-inline-end:-4px;z-index:1}`;
  build() { this.shadowRoot.innerHTML = '<span class="v" part="label"></span>'; this.setAttribute('role', 'status'); }
  update() { this.$('.v').textContent = this.value || ''; }
}
defineElement('md-badge', MdBadge);
class MdAvatar extends MateElement {
  static props = { src: { type: String }, alt: { type: String }, tone: { type: String, reflect: true, default: 'primary' } };
  static styles = css`
:host{display:inline-flex;align-items:center;justify-content:center;flex:none;width:var(--md-avatar-size,40px);height:var(--md-avatar-size,40px);border-radius:50%;overflow:hidden;box-sizing:border-box;font:500 calc(var(--md-avatar-size,40px)*.4)/1 var(--md-ref-typeface-plain,Inter,sans-serif);
background:var(--_bg);color:var(--_fg);--_bg:var(--md-sys-color-primary);--_fg:var(--md-sys-color-on-primary);user-select:none;transition:background-color .25s,color .25s}
:host([tone=purple]){--_bg:var(--md-sys-color-floating,var(--md-sys-color-primary-container));--_fg:var(--md-sys-color-on-floating,var(--md-sys-color-on-primary-container))}
:host([tone=soft]){--_bg:var(--md-sys-color-surface-container-high);--_fg:var(--md-sys-color-on-surface-variant)}
:host([tone=lavender]){--_bg:var(--md-sys-color-primary-container);--_fg:var(--md-sys-color-on-primary-container)}
:host([tone=pink]){--_bg:var(--md-sys-color-tertiary-container);--_fg:var(--md-sys-color-on-tertiary-container)}
img{width:100%;height:100%;object-fit:cover;display:none}:host([has-img]) img{display:block}:host([has-img]) slot{display:none}
::slotted(md-icon){--md-icon-size:calc(var(--md-avatar-size,40px)*.5)}`;
  build() { this.shadowRoot.innerHTML = '<img part="image" alt=""><slot></slot>'; }
  update() { const i = this.$('img'); if (this.src) { i.src = this.src; i.alt = this.alt || ''; this.setAttribute('has-img', ''); } else { i.removeAttribute('src'); this.removeAttribute('has-img'); } if (this.alt) this.setAttribute('role', 'img'), this.setAttribute('aria-label', this.alt); }
}
defineElement('md-avatar', MdAvatar);

/* ---- Loading indicator (HTML xLoad: morphing lobed shapes + rotation) ---- */
class MdLoadingIndicator extends MateElement {
  static props = { contained: { type: Boolean, reflect: true } };
  static styles = css`
:host{display:inline-flex;align-items:center;justify-content:center;vertical-align:top;width:var(--md-loading-indicator-size,48px);height:var(--md-loading-indicator-size,48px);border-radius:50%;box-sizing:border-box;--_f:var(--md-loading-indicator-active-indicator-color,var(--md-sys-color-primary))}
:host([contained]){background:var(--md-loading-indicator-container-color,var(--md-sys-color-floating,var(--md-sys-color-primary-container)));--_f:var(--md-loading-indicator-contained-active-indicator-color,var(--md-sys-color-on-floating,var(--md-sys-color-on-primary-container)));padding:calc(var(--md-loading-indicator-size,48px)*.14)}
svg{display:block;width:100%;height:100%;overflow:visible}path{fill:var(--_f)}`;
  static SH = [[7, .10], [5, .16], [3, .18], [4, .14], [6, .12], [0, 0]];
  build() { this.shadowRoot.innerHTML = '<svg viewBox="0 0 48 48" aria-hidden="true"><path/></svg>'; this._path = this.$('path'); this.setAttribute('role', 'progressbar'); this._f = (ph, t) => this._draw(t); }
  connectedCallback() { super.connectedCallback(); if (!_reduceMotion()) _ticker.add(this._f); this._draw(performance.now()); }
  disconnectedCallback() { _ticker.del(this._f); }
  _draw(t) {
    const SH = MdLoadingIndicator.SH, T = 650, k = Math.floor(t / T), e0 = (t % T) / T, e = _easeInOut(e0), a = SH[k % SH.length], b = SH[(k + 1) % SH.length], rot = t / 900; let d = '';
    for (let i = 0; i <= 90; i++) { const th = i / 90 * Math.PI * 2, r = 15 * (1 + a[1] * (1 - e) * Math.cos(a[0] * th) + b[1] * e * Math.cos(b[0] * th)); d += (i ? 'L' : 'M') + (24 + Math.cos(th + rot) * r).toFixed(2) + ' ' + (24 + Math.sin(th + rot) * r).toFixed(2); }
    this._path.setAttribute('d', d + 'Z');
  }
}
defineElement('md-loading-indicator', MdLoadingIndicator);

/* ---- Toolbar (HTML .mate-floating-bar / .x-tbp + pink FAB) ---- */
class MdToolbar extends MateElement {
  static props = { variant: { type: String, reflect: true, default: 'vibrant' }, vertical: { type: Boolean, reflect: true } };
  static styles = css`
:host{display:inline-flex;align-items:center;gap:12px;vertical-align:top}
.bar{display:flex;align-items:center;gap:6px;box-sizing:border-box;height:64px;padding:0 12px;border-radius:999px;background:var(--md-toolbar-container-color,var(--md-sys-color-floating,var(--md-sys-color-primary-container)));color:var(--md-toolbar-icon-color,var(--md-sys-color-on-floating,var(--md-sys-color-on-primary-container)));box-shadow:var(--mate-shadow-floating);transition:background-color .25s,color .25s}
:host([variant=standard]) .bar{height:auto;gap:4px;padding:6px;border-radius:30px;background:var(--md-toolbar-container-color,var(--md-sys-color-surface-container-high));color:var(--md-sys-color-on-surface-variant);box-shadow:none}
:host([variant=surface]) .bar{background:var(--md-toolbar-container-color,var(--md-sys-color-surface-container));color:var(--md-sys-color-on-surface-variant);box-shadow:none}
:host([vertical]){flex-direction:column}:host([vertical]) .bar{flex-direction:column;height:auto;width:64px;padding:12px 0;justify-content:center}
::slotted(*){color:inherit;--md-icon-button-pressed-container-color:rgba(128,128,128,.18);--md-icon-button-pressed-container-shape:14px;--md-icon-button-pressed-rotation:0deg;--md-icon-button-pressed-toggle-rotation:0deg;--md-icon-button-icon-color:currentColor;--md-icon-button-hover-icon-color:currentColor;--md-icon-button-pressed-icon-color:currentColor;--md-ripple-hover-color:currentColor;--md-ripple-pressed-opacity:0;--md-ripple-pressed-color:currentColor}`;
  build() { this.shadowRoot.innerHTML = '<div class="bar" part="bar" role="toolbar"><slot></slot></div><slot name="fab"></slot>'; this.addEventListener('keydown', e => this._key(e)); }
  _items() { return Array.from(this.children).filter(c => !c.slot && !c.disabled && !c.hasAttribute('disabled')); }
  _key(e) { const k = this.vertical ? ['ArrowUp', 'ArrowDown'] : ['ArrowLeft', 'ArrowRight']; if (![...k, 'Home', 'End'].includes(e.key)) return; const it = this._items(), c = it.findIndex(x => x === e.target || x.contains(e.target)); if (c < 0) return; let n = c; if (e.key === 'Home') n = 0; else if (e.key === 'End') n = it.length - 1; else n = (c + (e.key === k[1] ? 1 : -1) + it.length) % it.length; e.preventDefault(); it[n].focus(); }
}
defineElement('md-toolbar', MdToolbar);

/* ---- Swipe item (HTML .mate-swipe-row + 3 vertical capsule actions) ---- */
class MdSwipeAction extends MateElement {
  static delegatesFocus = true;
  static props = { variant: { type: String, reflect: true, default: 'tonal' }, disabled: { type: Boolean, reflect: true }, label: { type: String } };
  static styles = css`
:host{display:inline-flex;--_bg:var(--md-swipe-action-container-color,var(--md-sys-color-primary-container));--_fg:var(--md-swipe-action-icon-color,var(--md-sys-color-on-primary-container));outline:none;-webkit-tap-highlight-color:transparent}
:host([variant=primary]){--_bg:var(--md-swipe-action-container-color,var(--md-sys-color-primary));--_fg:var(--md-swipe-action-icon-color,var(--md-sys-color-on-primary))}
:host([variant=tertiary]){--_bg:var(--md-swipe-action-container-color,var(--md-sys-color-tertiary-container));--_fg:var(--md-swipe-action-icon-color,var(--md-sys-color-on-tertiary-container))}
:host([variant=error]){--_bg:var(--md-swipe-action-container-color,var(--md-sys-color-error-container));--_fg:var(--md-swipe-action-icon-color,var(--md-sys-color-on-error-container))}
:host([disabled]){pointer-events:none;opacity:.38}
.cap{position:relative;display:inline-flex;align-items:center;justify-content:center;width:50px;height:76px;border:0;padding:0;margin:0;border-radius:999px;overflow:hidden;cursor:pointer;outline:none;background:var(--_bg);color:var(--_fg);
-webkit-touch-callout:none;touch-action:manipulation;--md-ripple-hover-color:var(--_fg);--md-ripple-pressed-color:var(--_fg);--md-ripple-pressed-opacity:0;transition:border-radius .32s cubic-bezier(.2,0,0,1),background-color .25s,transform .3s var(--mate-spring-fast)}
.cap.hold{border-radius:16px}::slotted(*){--md-icon-size:24px;font-size:24px}`;
  build() { this.shadowRoot.innerHTML = '<button class="cap" part="button" type="button"><md-ripple></md-ripple><md-focus-ring></md-focus-ring><slot></slot></button>'; this._b = this.$('.cap'); this.bindHold(this._b); }
  update() { this._b.disabled = this.disabled; this.label ? this._b.setAttribute('aria-label', this.label) : this._b.removeAttribute('aria-label'); }
  focus(o) { this._b.focus(o); }
}
class MdSwipeItem extends MateElement {
  static props = { open: { type: Boolean, reflect: true }, noTapToggle: { type: Boolean, attribute: 'no-tap-toggle', reflect: true } };
  static styles = css`
:host{display:block;position:relative}
.sw{display:flex;overflow:hidden;border-radius:var(--md-swipe-item-container-shape,20px);transition:border-radius .35s var(--mate-spring-fast)}.sw.hold{border-radius:14px}
.main{flex:1;min-width:0;box-sizing:border-box;display:flex;align-items:center;gap:14px;padding:12px 14px;border-radius:inherit;background:var(--md-swipe-item-container-color,var(--md-sys-color-surface-container-lowest));color:var(--md-sys-color-on-surface);
cursor:pointer;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;transition:transform .38s var(--mate-spring-spatial),background-color .25s ease}` + SWIPE_CSS;
  build() {
    this.shadowRoot.innerHTML = '<div class="sw" part="row"><div class="swa" part="actions"><slot name="actions"></slot></div><div class="main swx" part="main"><slot></slot></div></div>';
    this._sw = this.$('.sw'); this.bindHold(this._sw);
    this._swipe = new _SwipeCtl(this, { main: this.$('.main'), actions: this.$('.swa'), tap: () => !this.noTapToggle, onChange: o => { this.open = o; this.emit(o ? 'swipe-open' : 'swipe-close', { bubbles: true }); } });
    this.$('slot[name=actions]').addEventListener('slotchange', () => this._schedule());
    this.addEventListener('keydown', e => { if (e.key === 'Escape' && this.open) this.open = false; });
  }
  get actions() { return this.$('slot[name=actions]').assignedElements(); }
  update() { this._swipe.apply(this.open); _swipeActions(this.$('slot[name=actions]'), this.open); }
}
defineElement('md-swipe-action', MdSwipeAction); defineElement('md-swipe-item', MdSwipeItem);

/* ==========================================================================
   Registry summary (window.MateChaComponents) — every tag defined by matecha 3.6.0
   ========================================================================== */
if (typeof window !== 'undefined') {
  window.MateChaComponents = {
    version: '3.6.0',
    materialWeb: ['md-assist-chip', 'md-branded-fab', 'md-checkbox', 'md-chip-set', 'md-circular-progress', 'md-dialog', 'md-divider', 'md-elevated-button', 'md-elevation', 'md-fab', 'md-filled-button', 'md-filled-field', 'md-filled-icon-button', 'md-filled-select', 'md-filled-text-field', 'md-filled-tonal-button', 'md-filled-tonal-icon-button', 'md-filter-chip', 'md-focus-ring', 'md-icon', 'md-icon-button', 'md-input-chip', 'md-item', 'md-linear-progress', 'md-list', 'md-list-item', 'md-menu', 'md-menu-item', 'md-outlined-button', 'md-outlined-field', 'md-outlined-icon-button', 'md-outlined-select', 'md-outlined-text-field', 'md-primary-tab', 'md-radio', 'md-ripple', 'md-secondary-tab', 'md-select-option', 'md-slider', 'md-sub-menu', 'md-suggestion-chip', 'md-switch', 'md-tabs', 'md-text-button'],
    expressive: ['md-connected-button-group', 'md-connected-button', 'md-split-button', 'md-segmented-button-set', 'md-segmented-button', 'md-outlined-segmented-button-set', 'md-outlined-segmented-button', 'md-fab-menu', 'md-fab-menu-item', 'md-navigation-bar', 'md-navigation-tab', 'md-navigation-drawer', 'md-navigation-drawer-item', 'md-navigation-drawer-header', 'md-navigation-drawer-divider', 'md-top-app-bar', 'md-snackbar', 'md-tooltip', 'md-card', 'md-badge', 'md-avatar', 'md-loading-indicator', 'md-toolbar', 'md-swipe-item', 'md-swipe-action', 'md-search-bar']
  };
}

/* ==========================================================================
   PART 3 (3.5.0 – 3.6.0) — new components. Continues part2 (same scope).
   md-switch-bar · md-top-popup · md-pull-to-refresh · md-search-view
   (+ in part1/part2: md-slider size / vertical / icon, md-dialog stacked, md-top-app-bar circle-leading / back)
   ========================================================================== */

const _SV_BACK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"/></svg>';
const _SV_SEARCH = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"/></svg>';
const _INTERACTIVE = 'button,a,input,textarea,select,[role=button],md-text-button,md-filled-button,md-filled-tonal-button,md-outlined-button,md-elevated-button,md-icon-button,md-filled-icon-button,md-filled-tonal-icon-button,md-outlined-icon-button,md-fab';

/* ==========================================================================
   12. Switch bar — md-switch-bar
       The full-width "main switch" pill used at the top of Android settings screens (e.g. "Use Live Caption").
       Same width as md-list / md-card. Selected = primary-container, unselected = surface-container-highest.
       The whole bar toggles; the embedded md-switch only mirrors the state (same handle/press animation as md-switch).
   ========================================================================== */
class MdSwitchBar extends MateElement {
  static formAssociated = true; static delegatesFocus = true;
  static props = { selected: { type: Boolean, reflect: true }, disabled: { type: Boolean, reflect: true }, label: { type: String }, name: { type: String, reflect: true }, value: { type: String, default: 'on' }, required: { type: Boolean, reflect: true } };
  static styles = css`
:host{display:block;width:100%;outline:none;-webkit-tap-highlight-color:transparent;--md-ripple-hover-color:currentColor;--md-ripple-pressed-color:currentColor}
:host([disabled]){pointer-events:none;opacity:.38}
.bar{position:relative;display:flex;align-items:center;gap:16px;box-sizing:border-box;width:100%;min-height:var(--md-switch-bar-container-height,72px);padding:12px 24px 12px 28px;border:0;margin:0;overflow:hidden;cursor:pointer;outline:none;text-align:start;
border-radius:var(--md-switch-bar-container-shape,999px);background:var(--md-switch-bar-container-color,var(--md-sys-color-surface-container-highest));color:var(--md-switch-bar-label-text-color,var(--md-sys-color-on-surface));
font:500 16px/24px var(--md-ref-typeface-plain,Inter,sans-serif);-webkit-touch-callout:none;touch-action:manipulation;user-select:none;-webkit-user-select:none;
transition:border-radius .32s cubic-bezier(.2,0,0,1),background-color .25s ease,color .25s ease}
:host([selected]) .bar{background:var(--md-switch-bar-selected-container-color,var(--md-sys-color-primary-container));color:var(--md-switch-bar-selected-label-text-color,var(--md-sys-color-on-primary-container))}
.bar.hold{border-radius:var(--md-switch-bar-pressed-container-shape,28px)}
.text{flex:1;min-width:0;display:flex;flex-direction:column}
.sup{font:400 13px/18px var(--md-ref-typeface-plain,Inter,sans-serif);opacity:.8}.sup:not(.has){display:none}
md-switch{flex:none;pointer-events:none}`;
  build() {
    this.shadowRoot.innerHTML = '<div class="bar" part="bar" role="switch" tabindex="0"><md-ripple part="ripple"></md-ripple><md-focus-ring part="focus-ring" inward></md-focus-ring><span class="text"><span class="lbl"><slot></slot><span class="t"></span></span><span class="sup"><slot name="supporting-text"></slot></span></span><md-switch aria-hidden="true"></md-switch></div>';
    this._bar = this.$('.bar'); this._sw = this.$('md-switch'); this._sw.inert = true; this._custom = '';
    this.bindHold(this._bar);
    const s = this.$('slot[name=supporting-text]'), sup = this.$('.sup'); const f = () => sup.classList.toggle('has', s.assignedNodes().length > 0); s.addEventListener('slotchange', f); f();
    const press = on => () => this._sw.classList.toggle('pressing', on);
    this._bar.addEventListener('pointerdown', press(true)); ['pointerup', 'pointercancel', 'pointerleave', 'contextmenu'].forEach(t => this._bar.addEventListener(t, press(false)));
    this._bar.addEventListener('click', () => this._toggle());
    this._bar.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); this._bar.click(); } });
    this._ariaDirty = true;
  }
  _toggle() { if (this.disabled) return; this.selected = !this.selected; this._sync(); this.emit('input', { bubbles: true, composed: true }); this.emit('change', { bubbles: true }); }
  _sync() { if (!this._internals) return; this._internals.setFormValue(this.selected ? (this.value || 'on') : null); const bad = this.required && !this.selected; this._internals.setValidity(bad ? { valueMissing: true } : this._custom ? { customError: true } : {}, bad ? 'Please turn this switch on if you want to proceed.' : this._custom, this._bar); }
  update() {
    this._sw.selected = this.selected; this._sw.disabled = this.disabled; this.$('.t').textContent = this.label || '';
    const b = this._bar; b.setAttribute('aria-checked', String(this.selected)); b.setAttribute('aria-disabled', String(this.disabled)); b.tabIndex = this.disabled ? -1 : 0;
    const al = this.getAttribute('aria-label') || this.label; al ? b.setAttribute('aria-label', al) : b.removeAttribute('aria-label');
    this._sync();
  }
  get form() { return this._internals ? this._internals.form : null; }
  get validity() { return this._internals.validity; } get validationMessage() { return this._internals.validationMessage; } get willValidate() { return this._internals.willValidate; }
  checkValidity() { this._sync(); return this._internals.checkValidity(); } reportValidity() { this._sync(); return this._internals.reportValidity(); } setCustomValidity(m) { this._custom = m || ''; this._sync(); }
  focus(o) { this._bar && this._bar.focus(o); }
  formResetCallback() { this.selected = this.hasAttribute('selected'); } formStateRestoreCallback(s) { this.selected = s === (this.value || 'on'); } formDisabledCallback(d) { this.disabled = d; }
}
defineElement('md-switch-bar', MdSwitchBar);

/* ==========================================================================
   13. Top popup — md-top-popup
       A card that slides down from the top edge (bottom corners rounded), e.g. "Viewing full screen — Got it".
       Slots: icon · headline · (default) content · actions.  Swipe up to dismiss, optional auto-dismiss (duration),
       optional scrim (modal).  Same API style as md-dialog: open · show() · close(value) · events open/opened/close/closed/cancel.
   ========================================================================== */
class MdTopPopup extends MateElement {
  static props = { open: { type: Boolean, reflect: true }, modal: { type: Boolean, reflect: true }, duration: { type: Number, default: 0 }, noSwipeDismiss: { type: Boolean, attribute: 'no-swipe-dismiss', reflect: true }, quick: { type: Boolean, reflect: true }, returnValue: { type: String, attribute: 'return-value' } };
  static styles = css`
:host{display:contents}
.root{position:fixed;inset:0;z-index:var(--md-top-popup-z-index,2600);display:none;pointer-events:none}
.root.show{display:block}
.scrim{position:absolute;inset:0;background:var(--md-top-popup-scrim-color,color-mix(in srgb,var(--md-sys-color-scrim,#000) 40%,transparent));opacity:0;transition:opacity .25s ease;pointer-events:none}
:host([modal]) .scrim{pointer-events:auto}.root.on .scrim{opacity:1}:host(:not([modal])) .scrim{display:none}
.wrap{position:absolute;top:0;left:0;right:0;display:flex;justify-content:center;pointer-events:none}
.panel{pointer-events:auto;box-sizing:border-box;width:min(100%,var(--md-top-popup-max-width,560px));padding:calc(24px + env(safe-area-inset-top,0px)) 24px 24px;outline:none;
background:var(--md-top-popup-container-color,var(--md-sys-color-surface-container));color:var(--md-top-popup-supporting-text-color,var(--md-sys-color-on-surface-variant));
border-radius:0 0 var(--md-top-popup-container-shape,28px) var(--md-top-popup-container-shape,28px);box-shadow:var(--md-top-popup-container-shadow,var(--mate-shadow-dialog,0 8px 24px rgba(0,0,0,.2)));
transform:translateY(calc(-100% - 32px));transition:transform .45s var(--mate-spring-spatial);touch-action:pan-x;will-change:transform}
.root.on .panel{transform:translateY(var(--_dy,0px))}.panel.drag{transition:none!important}
.root.leaving .panel{transition:transform .3s var(--mate-ease-accel)}
:host([quick]) .panel,:host([quick]) .scrim{transition:none}
.icon{display:none;justify-content:center;margin-bottom:12px;color:var(--md-top-popup-icon-color,var(--md-sys-color-secondary));--md-icon-size:24px}.icon.has{display:flex}
.headline{display:none;margin:0 0 8px;text-align:center;font:500 24px/32px var(--md-ref-typeface-brand,Inter,sans-serif);color:var(--md-top-popup-headline-color,var(--md-sys-color-on-surface))}.headline.has{display:block}
.content{text-align:center;font:400 14px/20px var(--md-ref-typeface-plain,Inter,sans-serif)}
.actions{display:none;justify-content:flex-end;align-items:center;gap:8px;margin-top:20px;flex-wrap:wrap}.actions.has{display:flex}
.actions ::slotted(*){--md-filled-tonal-button-container-color:var(--md-top-popup-action-container-color,var(--md-sys-color-primary));--md-filled-tonal-button-label-text-color:var(--md-top-popup-action-label-text-color,var(--md-sys-color-on-primary));--md-filled-tonal-button-icon-color:var(--md-top-popup-action-label-text-color,var(--md-sys-color-on-primary));--md-filled-tonal-button-hover-state-layer-color:var(--md-top-popup-action-label-text-color,var(--md-sys-color-on-primary));--md-filled-tonal-button-pressed-state-layer-color:var(--md-top-popup-action-label-text-color,var(--md-sys-color-on-primary));--md-text-button-container-color:var(--md-top-popup-action-container-color,var(--md-sys-color-primary));--md-text-button-label-text-color:var(--md-top-popup-action-label-text-color,var(--md-sys-color-on-primary));--md-text-button-icon-color:var(--md-top-popup-action-label-text-color,var(--md-sys-color-on-primary));--md-text-button-hover-state-layer-color:var(--md-top-popup-action-label-text-color,var(--md-sys-color-on-primary));--md-text-button-pressed-state-layer-color:var(--md-top-popup-action-label-text-color,var(--md-sys-color-on-primary));--md-outlined-button-container-color:var(--md-top-popup-action-container-color,var(--md-sys-color-primary));--md-outlined-button-label-text-color:var(--md-top-popup-action-label-text-color,var(--md-sys-color-on-primary));--md-outlined-button-icon-color:var(--md-top-popup-action-label-text-color,var(--md-sys-color-on-primary));--md-outlined-button-hover-state-layer-color:var(--md-top-popup-action-label-text-color,var(--md-sys-color-on-primary));--md-outlined-button-pressed-state-layer-color:var(--md-top-popup-action-label-text-color,var(--md-sys-color-on-primary));--md-elevated-button-container-color:var(--md-top-popup-action-container-color,var(--md-sys-color-primary));--md-elevated-button-label-text-color:var(--md-top-popup-action-label-text-color,var(--md-sys-color-on-primary));--md-elevated-button-icon-color:var(--md-top-popup-action-label-text-color,var(--md-sys-color-on-primary));--md-elevated-button-hover-state-layer-color:var(--md-top-popup-action-label-text-color,var(--md-sys-color-on-primary));--md-elevated-button-pressed-state-layer-color:var(--md-top-popup-action-label-text-color,var(--md-sys-color-on-primary));--md-outlined-button-outline-color:transparent;}
@media(prefers-reduced-motion:reduce){.panel,.scrim{transition:none}}`;
  build() {
    this.shadowRoot.innerHTML = '<div class="root" part="root"><div class="scrim" part="scrim"></div><div class="wrap"><div class="panel" part="container" tabindex="-1"><div class="icon"><slot name="icon"></slot></div><h2 class="headline" part="headline" id="hl"><slot name="headline"></slot></h2><div class="content" part="content"><slot name="content"></slot><slot></slot></div><div class="actions" part="actions"><slot name="actions"></slot></div></div></div></div>';
    this._root = this.$('.root'); this._panel = this.$('.panel'); this._shown = false; this._dy = 0;
    for (const [c, n] of [['.icon', 'icon'], ['.headline', 'headline'], ['.actions', 'actions']]) { const s = this.$(`slot[name=${n}]`), b = this.$(c); const f = () => b.classList.toggle('has', s.assignedNodes().length > 0); s.addEventListener('slotchange', f); f(); }
    this.$('.scrim').addEventListener('click', () => this._cancel());
    this._esc = e => { if (e.key === 'Escape' && this.open) { e.stopPropagation(); this._cancel(); } };
    this.addEventListener('submit', e => { const f = e.target; if (f && f.method === 'dialog') { e.preventDefault(); this.close(e.submitter ? (e.submitter.value || '') : ''); } });
    this.addEventListener('click', e => { const el = e.composedPath().find(n => n.hasAttribute && n.hasAttribute('dialog-action')); if (el) this.close(el.getAttribute('dialog-action')); });
    const p = this._panel; let d = null;
    p.addEventListener('pointerdown', e => { if (this.noSwipeDismiss || e.button > 0 || e.composedPath().some(n => n.matches && n.matches(_INTERACTIVE))) return; d = { y: e.clientY, t: performance.now(), moved: false, id: e.pointerId }; });
    p.addEventListener('pointermove', e => {
      if (!d) return; const dy = Math.min(0, e.clientY - d.y);
      if (!d.moved) { if (dy > -6) return; d.moved = true; p.classList.add('drag'); try { p.setPointerCapture(d.id); } catch (er) { } }
      this._dy = dy; this._root.style.setProperty('--_dy', dy + 'px');
    });
    const up = e => { if (!d) return; const m = d.moved, v = (this._dy) / Math.max(1, performance.now() - d.t); d = null; p.classList.remove('drag'); if (!m) return; if (this._dy < -Math.min(72, p.offsetHeight * .3) || v < -.5) { this.close('swipe'); } else { this._dy = 0; this._root.style.setProperty('--_dy', '0px'); } };
    p.addEventListener('pointerup', up); p.addEventListener('pointercancel', up);
    p.addEventListener('pointerenter', () => clearTimeout(this._at)); p.addEventListener('pointerleave', () => this._arm()); p.addEventListener('focusin', () => clearTimeout(this._at)); p.addEventListener('focusout', () => this._arm());
  }
  show() { this.open = true; } close(v) { if (v !== undefined) this._p.returnValue = String(v); this.open = false; }
  toggle() { this.open = !this.open; }
  _cancel() { const ev = this.emit('cancel', { cancelable: true }); if (!ev.defaultPrevented) this.close(); }
  _arm() { clearTimeout(this._at); if (this.open && this.duration > 0) this._at = setTimeout(() => this.close('timeout'), this.duration); }
  disconnectedCallback() { document.removeEventListener('keydown', this._esc, true); clearTimeout(this._at); }
  update() {
    const modal = this.modal; this._panel.setAttribute('role', modal ? 'dialog' : 'status'); modal ? this._panel.setAttribute('aria-modal', 'true') : this._panel.removeAttribute('aria-modal');
    this.querySelector('[slot=headline]') ? this._panel.setAttribute('aria-labelledby', 'hl') : this._panel.removeAttribute('aria-labelledby');
    if (this.open && !this._shown) this._show(); else if (!this.open && this._shown) this._hide();
  }
  _show() {
    this._shown = true; clearTimeout(this._ct); this._prev = document.activeElement; this.emit('open', { bubbles: true, composed: true });
    const r = this._root; r.classList.remove('leaving'); r.classList.add('show'); this._dy = 0; r.style.setProperty('--_dy', '0px'); void r.offsetWidth;
    requestAnimationFrame(() => r.classList.add('on'));
    document.addEventListener('keydown', this._esc, true); if (this.modal) this._panel.focus({ preventScroll: true });
    const af = this.querySelector('[autofocus]'); if (af && af.focus) af.focus();
    clearTimeout(this._ot); this._ot = setTimeout(() => this.emit('opened', { bubbles: true, composed: true }), this.quick ? 0 : 450); this._arm();
  }
  _hide() {
    this._shown = false; clearTimeout(this._ot); clearTimeout(this._at); this.emit('close', { bubbles: true, composed: true });
    document.removeEventListener('keydown', this._esc, true); const r = this._root; r.classList.add('leaving'); r.classList.remove('on'); r.style.setProperty('--_dy', '0px');
    const fin = () => { r.classList.remove('show', 'leaving'); if (this.modal && this._prev && this._prev.focus && document.contains(this._prev)) { try { this._prev.focus({ preventScroll: true }); } catch (e) { } } this.emit('closed', { bubbles: true, composed: true }); };
    if (this.quick || _reduceMotion()) fin(); else this._ct = setTimeout(fin, 320);
  }
}
defineElement('md-top-popup', MdTopPopup);

/* ==========================================================================
   14. Pull to refresh — md-pull-to-refresh
       variant="expressive" (default): M3E contained loading indicator (morphing shape) — see Android 16 / Google News.
       variant="classic": the traditional round surface with a thin circular arc.
       Wrap scrollable content; give the element a height.  Fires `refresh` (detail.done()) — set refreshing=false when finished.
   ========================================================================== */
class MdPullToRefresh extends MateElement {
  static props = { refreshing: { type: Boolean, reflect: true }, threshold: { type: Number, default: 72 }, variant: { type: String, reflect: true, default: 'expressive' }, disabled: { type: Boolean, reflect: true } };
  static styles = css`
:host{display:block;position:relative;overflow:hidden;min-height:96px;--_e:.4s cubic-bezier(.05,.7,.1,1)}
.scroller{position:absolute;inset:0;overflow-y:auto;overflow-x:hidden;overscroll-behavior-y:contain;-webkit-overflow-scrolling:touch}
.scroller.pulling{user-select:none;-webkit-user-select:none}
.content{min-height:100%;transform:translateY(var(--_p,0px));transition:transform var(--_t,0s);will-change:transform}
.indicator{position:absolute;top:0;left:50%;z-index:2;width:var(--_is,48px);height:var(--_is,48px);margin-left:calc(var(--_is,48px)/-2);display:flex;align-items:center;justify-content:center;border-radius:50%;pointer-events:none;
transform:translateY(calc(var(--_p,0px)/2 - var(--_is,48px)/2)) scale(var(--_s,0));opacity:var(--_o,0);transition:transform var(--_t,0s),opacity var(--_t,0s)}
:host([variant=classic]) .indicator{--_is:40px;background:var(--md-pull-to-refresh-container-color,var(--md-sys-color-surface-container-high));box-shadow:var(--md-pull-to-refresh-container-shadow,0 1px 4px rgba(0,0,0,.2))}
.exp,.cls{display:none;align-items:center;justify-content:center}
:host(:not([variant=classic])) .exp{display:flex}:host([variant=classic]) .cls{display:flex;transform:rotate(var(--_r,0deg))}
md-circular-progress{--md-circular-progress-size:24px;--md-circular-progress-active-indicator-color:var(--md-pull-to-refresh-indicator-color,var(--md-sys-color-on-surface));--md-circular-progress-track-color:transparent}
md-loading-indicator{--md-loading-indicator-size:48px}`;
  build() {
    this.shadowRoot.innerHTML = '<div class="indicator" part="indicator" aria-hidden="true"><span class="exp"></span><span class="cls"><md-circular-progress max="1"></md-circular-progress></span></div><div class="scroller" part="scroller"><div class="content" part="content"><slot></slot></div></div>';
    this._sc = this.$('.scroller'); this._exp = this.$('.exp'); this._ci = this.$('md-circular-progress'); this._pull = 0; this._d = null;
    const sc = this._sc;
    sc.addEventListener('touchstart', e => { if (this.disabled || this.refreshing || sc.scrollTop > 0) { this._d = null; return; } this._d = { y: e.touches[0].clientY, active: false }; }, { passive: true });
    sc.addEventListener('touchmove', e => {
      const d = this._d; if (!d) return; const dy = e.touches[0].clientY - d.y;
      if (!d.active) { if (dy > 6 && sc.scrollTop <= 0) d.active = true; else { if (dy < -4) this._d = null; return; } }
      if (e.cancelable) e.preventDefault(); this._move(dy);
    }, { passive: false });
    sc.addEventListener('touchend', () => this._end()); sc.addEventListener('touchcancel', () => this._end());
    sc.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse' || e.button > 0 || this.disabled || this.refreshing || sc.scrollTop > 0) return; this._d = { y: e.clientY, active: false, mouse: true }; });
    this._wm = e => { const d = this._d; if (!d || !d.mouse) return; const dy = e.clientY - d.y; if (!d.active) { if (dy > 6) d.active = true; else return; } this._move(dy); };
    this._wu = () => { if (this._d && this._d.mouse) this._end(); };
  }
  connectedCallback() { super.connectedCallback(); window.addEventListener('pointermove', this._wm); window.addEventListener('pointerup', this._wu); window.addEventListener('pointercancel', this._wu); }
  disconnectedCallback() { window.removeEventListener('pointermove', this._wm); window.removeEventListener('pointerup', this._wu); window.removeEventListener('pointercancel', this._wu); }
  get scroller() { return this._sc; }
  _show(on) { if (on && !this._exp.firstChild) this._exp.innerHTML = '<md-loading-indicator contained></md-loading-indicator>'; else if (!on) this._exp.innerHTML = ''; }
  _set(p, s, o, t) { const st = this.style; st.setProperty('--_p', p + 'px'); st.setProperty('--_s', s); st.setProperty('--_o', o); st.setProperty('--_t', t); }
  _move(dy) {
    const cap = this.threshold * 1.6, p = cap * Math.tanh(dy * .6 / cap); this._pull = p; this._sc.classList.add('pulling');
    this._show(true); const k = Math.min(1, p / (this.threshold * .6));
    this._set(p, k, k, '0s'); this.style.setProperty('--_r', (p * 3) + 'deg'); this._ci.indeterminate = false; this._ci.value = Math.min(.9, p / this.threshold);
    if (!this._armed && p >= this.threshold * .85) { this._armed = true; this.emit('pull-ready', { bubbles: true }); } else if (p < this.threshold * .85) this._armed = false;
  }
  _end() {
    const d = this._d; this._d = null; if (!d || !d.active) return; this._sc.classList.remove('pulling');
    if (this._pull >= this.threshold * .85) this._start(); else this._settle();
  }
  _start() {
    const ev = this.emit('refresh', { bubbles: true, composed: true, cancelable: true, detail: { done: () => { this.refreshing = false; } } });
    if (ev.defaultPrevented) { this._settle(); return; } this.refreshing = true;
  }
  refresh() { if (!this.refreshing) { this._pull = this.threshold; this._start(); } }
  done() { this.refreshing = false; }
  _settle() { this._pull = 0; this._armed = false; this._set(0, 0, 0, 'var(--_e)'); clearTimeout(this._ht); this._ht = setTimeout(() => { if (!this.refreshing && !this._d) this._show(false); }, 420); }
  update() {
    if (this.refreshing) { clearTimeout(this._ht); this._show(true); const rest = this.threshold * .9; this._pull = rest; this._set(rest, 1, 1, 'var(--_e)'); this._ci.indeterminate = true; this.setAttribute('aria-busy', 'true'); }
    else { this.removeAttribute('aria-busy'); if (!this._d) { this._ci.indeterminate = false; this._ci.value = 0; this._settle(); } }
  }
}
defineElement('md-pull-to-refresh', MdPullToRefresh);

/* ==========================================================================
   15. Search view — md-search-view   (Jetpack Compose SearchBar / ExpandedSearchView; not in Material Web)
       Docked (expands from the bar, results below) or fullscreen (back button, takes the whole screen).
       Customise with slots (leading-icon · trailing-icon · default results · empty), attributes and --md-search-view-* tokens.
       Link to an md-search-bar (or any element) with  anchor="id":  the view opens when the anchor is clicked / focused.
   ========================================================================== */
class MdSearchView extends MateElement {
  static delegatesFocus = true;
  static props = { open: { type: Boolean, reflect: true }, fullscreen: { type: Boolean, reflect: true }, anchor: { type: String }, trigger: { type: String }, value: { type: String }, placeholder: { type: String, default: 'Search' }, quick: { type: Boolean, reflect: true }, name: { type: String, reflect: true }, noClear: { type: Boolean, attribute: 'no-clear', reflect: true } };
  static styles = css`
:host{display:contents}
.root{position:fixed;inset:0;z-index:var(--md-search-view-z-index,2700);display:none;pointer-events:none}
.root.show{display:block;pointer-events:auto}
.scrim{position:absolute;inset:0;background:transparent}
:host([fullscreen]) .scrim{display:none}
.surface{position:fixed;display:flex;flex-direction:column;box-sizing:border-box;overflow:hidden;outline:none;
background:var(--md-search-view-container-color,var(--md-sys-color-surface-container-high));color:var(--md-search-view-text-color,var(--md-sys-color-on-surface));border-radius:var(--md-search-view-container-shape,28px);
font:400 16px/24px var(--md-ref-typeface-plain,Inter,sans-serif)}
:host([fullscreen]) .surface{inset:0;width:100%;height:100%;border-radius:0;background:var(--md-search-view-fullscreen-container-color,var(--md-sys-color-surface-container))}
.head{display:flex;align-items:center;gap:4px;flex:none;box-sizing:border-box;height:var(--md-search-view-header-height,56px);padding:0 8px 0 8px}
:host([fullscreen]) .head{height:var(--md-search-view-fullscreen-header-height,64px)}
.lead,.clear{position:relative;display:inline-flex;align-items:center;justify-content:center;flex:none;width:48px;height:48px;border:0;margin:0;padding:0;border-radius:50%;background:none;color:var(--md-search-view-icon-color,var(--md-sys-color-on-surface));cursor:pointer;outline:none;
overflow:hidden;transition:background-color .2s,transform .3s var(--mate-spring-fast);--md-ripple-hover-color:currentColor;--md-ripple-pressed-color:currentColor}
.lead:hover,.clear:hover{background:color-mix(in srgb,currentColor 8%,transparent)}.lead:active,.clear:active{transform:scale(.9)}
.lead svg,.clear svg{width:24px;height:24px;fill:currentColor;display:block}
.lead ::slotted(*){--md-icon-size:24px}
:host(:not([fullscreen])) .lead{cursor:default}:host(:not([fullscreen])) .lead:hover{background:none}:host(:not([fullscreen])) .lead:active{transform:none}
.ic-back{display:none}:host([fullscreen]) .ic-back{display:block}:host([fullscreen]) .ic-search{display:none}
.in{flex:1;min-width:0;height:100%;border:0;margin:0;padding:0 4px;outline:none;background:transparent;color:inherit;font:inherit;letter-spacing:.01em;caret-color:var(--md-sys-color-primary);-webkit-appearance:none;appearance:none}
.in::placeholder{color:var(--md-search-view-placeholder-color,var(--md-sys-color-on-surface-variant));opacity:1}.in::-webkit-search-cancel-button{display:none}
.clear{visibility:visible}.clear.hide{display:none}
.divider{flex:none;height:1px;background:var(--md-search-view-divider-color,var(--md-sys-color-outline-variant))}.surface.bare .divider{display:none}
.body{position:relative;flex:1 1 auto;min-height:0;overflow-y:auto;overscroll-behavior:contain}
:host(:not([fullscreen])) .body{max-height:var(--md-search-view-docked-max-height,min(420px,calc(100vh - 160px)))}
.empty{display:none;flex-direction:column;align-items:center;gap:12px;padding:32px 24px;text-align:center;color:var(--md-sys-color-on-surface);font:400 22px/28px var(--md-ref-typeface-brand,Inter,sans-serif)}
.body.is-empty .empty{display:flex}
::slotted(md-list){--md-list-container-color:transparent}
.empty ::slotted(md-icon){--md-icon-size:24px;color:var(--md-sys-color-primary)}
.surface .divider,.surface .body{opacity:0;transition:opacity .18s ease .08s}.root.on .surface .divider,.root.on .surface .body{opacity:1}
.surface .head>*{opacity:0;transition:opacity .15s ease .05s}.root.on .surface .head>*{opacity:1}
:host([quick]) .surface *{transition:none!important}`;
  build() {
    this.shadowRoot.innerHTML = `<div class="root" part="root"><div class="scrim" part="scrim"></div><div class="surface" part="surface" role="dialog" aria-modal="true"><div class="head" part="header"><button class="lead" part="leading" type="button" aria-label="Back"><md-ripple></md-ripple><slot name="leading-icon"><span class="ic-back">${_SV_BACK}</span><span class="ic-search">${_SV_SEARCH}</span></slot></button><input class="in" part="input" type="search" enterkeyhint="search" autocomplete="off" spellcheck="false"><button class="clear" part="clear" type="button" aria-label="Clear"><md-ripple></md-ripple>${CLOSE_SVG}</button><slot name="trailing-icon"></slot></div><div class="divider"></div><div class="body is-empty" part="body"><slot></slot><div class="empty" part="empty"><slot name="empty"></slot></div></div></div></div>`;
    this._root = this.$('.root'); this._s = this.$('.surface'); this._in = this.$('.in'); this._body = this.$('.body'); this._clear = this.$('.clear'); this._lead = this.$('.lead'); this._shown = false; this._a = null;
    const i = this._in;
    i.addEventListener('input', () => { this._p.value = i.value; this._schedule(); });
    i.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.isComposing) { this.emit('search', { bubbles: true, composed: true, detail: { value: this.value } }); } });
    this._clear.addEventListener('click', () => { if (this.value) { this._p.value = ''; i.value = ''; this._schedule(); i.focus(); this.emit('input', { bubbles: true, composed: true }); this.emit('clear', { bubbles: true, composed: true }); } else this.close(); });
    this._lead.addEventListener('click', () => { this.fullscreen ? this.close() : i.focus(); });
    this.$('.scrim').addEventListener('click', () => this.close());
    this._esc = e => { if (e.key === 'Escape' && this.open) { e.stopPropagation(); this.close(); } };
    const f = () => { const has = Array.from(this.childNodes).some(n => (n.nodeType === 1 && !n.slot) || (n.nodeType === 3 && n.textContent.trim())), emp = this.querySelector('[slot=empty]'); this._body.classList.toggle('is-empty', !has); this._s.classList.toggle('bare', !this.fullscreen && !has && !emp); };
    this.$('slot:not([name])').addEventListener('slotchange', f); this.$('slot[name=empty]').addEventListener('slotchange', f); this._f = f; f();
    this._rs = () => { if (this._shown) this._layout(); };
    this._onA = () => { if (!this._suppress && !this.open) { this._origin = this._a; this.open = true; } };
    /* any element can open the view: trigger="#btn1, #btn2" / "btn1 btn2" / ".open-search" (delegated, so late-added elements work) */
    this._dc = e => {
      const t = (this.trigger || '').trim(); if (!t || this._suppress || this.open) return;
      const sel = t.split(/[\s,]+/).filter(Boolean).map(k => (/^[A-Za-z_][\w-]*$/.test(k) && document.getElementById(k)) ? '#' + k : k).join(',');
      let hit = null; for (const n of e.composedPath()) { if (n.nodeType === 1 && n.matches) { try { if (n.matches(sel)) { hit = n; break; } } catch (er) { break; } } }
      if (hit) { this._origin = hit; this.open = true; }
    };
  }
  get anchorElement() { return this._ap || null; } set anchorElement(v) { this._ap = v; this._bind(); }
  _anchorEl() { if (this._ap) return this._ap; if (this.anchor) { const r = this.getRootNode(); return (r.getElementById && r.getElementById(this.anchor)) || document.getElementById(this.anchor); } return null; }
  _bind() { const a = this._anchorEl(); if (a === this._a) return; if (this._a) { this._a.removeEventListener('click', this._onA); this._a.removeEventListener('focusin', this._onA); } this._a = a; if (a) { a.addEventListener('click', this._onA); a.addEventListener('focusin', this._onA); a.setAttribute('aria-haspopup', 'dialog'); } }
  connectedCallback() { super.connectedCallback(); this._bind(); window.addEventListener('resize', this._rs); document.addEventListener('click', this._dc, true); }
  disconnectedCallback() { document.removeEventListener('click', this._dc, true); window.removeEventListener('resize', this._rs); document.removeEventListener('keydown', this._esc, true); if (this._a) { this._a.removeEventListener('click', this._onA); this._a.removeEventListener('focusin', this._onA); this._a = null; } }
  show(from) { if (from instanceof Element) this._origin = from; this.open = true; } close() { this.open = false; } toggle() { this.open = !this.open; }
  focus(o) { this._in && this._in.focus(o); } select() { this._in.select(); }
  update() {
    this._bind(); const i = this._in; if (i.value !== this.value) i.value = this.value; i.placeholder = this.placeholder; this.name ? i.setAttribute('name', this.name) : i.removeAttribute('name');
    i.setAttribute('aria-label', this.getAttribute('aria-label') || this.placeholder || 'Search');
    this._clear.classList.toggle('hide', this.noClear || (this.fullscreen && !this.value)); this._f();
    if (this.open && !this._shown) this._open(); else if (!this.open && this._shown) this._close(); else if (this._shown) this._layout();
  }
  _rect() { const a = this._anchorEl() || this._origin; return a && a.isConnected ? a.getBoundingClientRect() : null; }
  _orect() { const a = this._origin || this._anchorEl(); return a && a.isConnected ? a.getBoundingClientRect() : null; }
  _layout() {
    const s = this._s, A = this._rect(), vw = document.documentElement.clientWidth || innerWidth, vh = innerHeight;
    if (this.fullscreen) { s.style.left = s.style.top = s.style.width = s.style.height = s.style.right = ''; return; }
    const w = A ? Math.max(A.width, 280) : Math.min(560, vw - 32), left = A ? Math.min(A.left, Math.max(8, vw - w - 8)) : (vw - w) / 2, top = A ? A.top : 16;
    s.style.left = left + 'px'; s.style.top = top + 'px'; s.style.width = w + 'px'; s.style.right = 'auto'; s.style.height = 'auto'; s.style.maxHeight = `${Math.max(120, vh - top - 16)}px`;
  }
  _clip(open) {
    const s = this._s, A = this._orect(), vw = document.documentElement.clientWidth || innerWidth, vh = innerHeight, S = s.getBoundingClientRect(); const full = 'inset(0px 0px 0px 0px round ' + (this.fullscreen ? 0 : 28) + 'px)'; let from;
    if (!A) from = 'inset(0px 0px 100% 0px round 24px)';
    else if (this.fullscreen) from = `inset(${A.top}px ${Math.max(0, vw - A.right)}px ${Math.max(0, vh - A.bottom)}px ${A.left}px round ${A.height / 2}px)`;
    else from = `inset(${Math.max(0, A.top - S.top)}px ${Math.max(0, S.right - A.right)}px ${Math.max(0, S.bottom - A.bottom)}px ${Math.max(0, A.left - S.left)}px round ${A.height / 2}px)`;
    return open ? [from, full] : [full, from];
  }
  _open() {
    this._shown = true; clearTimeout(this._ct); const a = this._anchorEl(); this._a2 = document.activeElement;
    if (a && 'value' in a && typeof a.value === 'string' && !this.value) { this._p.value = a.value; }
    this._in.value = this.value; this._clear.classList.toggle('hide', this.noClear || (this.fullscreen && !this.value));
    this.emit('open', { bubbles: true, composed: true }); const r = this._root; r.classList.add('show'); this._layout(); this._f();
    if (a) a.setAttribute('aria-expanded', 'true');
    document.addEventListener('keydown', this._esc, true);
    const [f, t] = this._clip(true); if (this._anim) this._anim.cancel();
    if (!this.quick && !_reduceMotion() && this._s.animate) { this._anim = this._s.animate([{ clipPath: f }, { clipPath: t }], { duration: 380, easing: 'cubic-bezier(.05,.7,.1,1)', fill: 'both' }); this._anim.onfinish = () => { this._anim && this._anim.cancel(); this._anim = null; }; }
    requestAnimationFrame(() => { r.classList.add('on'); this._in.focus({ preventScroll: true }); });
    clearTimeout(this._ot); this._ot = setTimeout(() => this.emit('opened', { bubbles: true, composed: true }), this.quick ? 0 : 380);
  }
  _close() {
    this._shown = false; clearTimeout(this._ot); const a = this._anchorEl(), r = this._root; this.emit('close', { bubbles: true, composed: true });
    document.removeEventListener('keydown', this._esc, true); r.classList.remove('on');
    if (a) { a.setAttribute('aria-expanded', 'false'); if ('value' in a) { try { a.value = this.value; } catch (e) { } } }
    const fin = () => { r.classList.remove('show'); if (this._anim) { this._anim.cancel(); this._anim = null; }
      this._suppress = true; setTimeout(() => { this._suppress = false; }, 350);
      const t = this._origin || a || this._a2; this._origin = null; if (t && t.focus) { try { t.focus({ preventScroll: true }); } catch (e) { } } this.emit('closed', { bubbles: true, composed: true }); };
    if (this.quick || _reduceMotion() || !this._s.animate) { fin(); return; }
    this._suppress = true; const [f, t] = this._clip(false); if (this._anim) this._anim.cancel();
    this._anim = this._s.animate([{ clipPath: f }, { clipPath: t }], { duration: 260, easing: 'cubic-bezier(.3,0,.8,.15)', fill: 'both' }); this._anim.onfinish = fin;
  }
}
defineElement('md-search-view', MdSearchView);

/* ==========================================================================
   16. Navigation rail — md-navigation-rail · md-navigation-rail-item
       Vertical rail with a collapsed state (icon pill + label underneath, 96px) and an expanded state (icon + label inside the pill,
       full width).  Slots: menu · fab · (default) items.  Badges: number (badge-value) or dot (show-badge).
       The menu button toggles `expanded`; the width animates with --mate-ease-decel; the FAB becomes extended (label) when expanded.
   ========================================================================== */
class MdNavigationRailItem extends MdNavigationTab {
  static styles = css`
:host{display:flex;flex:none;width:100%;--md-navigation-bar-active-indicator-color:var(--md-navigation-rail-active-indicator-color,var(--md-sys-color-secondary-container));--md-navigation-bar-active-icon-color:var(--md-sys-color-on-secondary-container)}
.tab{width:100%;min-width:0;padding:2px 0}
.pill{width:56px}
:host([horizontal]) .tab{align-items:stretch;padding:0}
:host([horizontal]) .pill{width:100%;height:56px;padding:0 16px;justify-content:flex-start;gap:12px;box-sizing:border-box}
:host([horizontal][active]) .pill{padding:0 16px}
:host([horizontal]) .pill.hold{width:100%;transform:scale(.97)}
:host([horizontal]) .label{font:500 14px/20px var(--md-ref-typeface-plain,Inter,sans-serif);animation:mate-rail-label .35s var(--mate-ease-decel)}
@keyframes mate-rail-label{from{opacity:0;transform:translateX(-8px)}}`;
}
defineElement('md-navigation-rail-item', MdNavigationRailItem);
class MdNavigationRail extends MdNavigationBar {
  static props = { expanded: { type: Boolean, reflect: true }, noMenu: { type: Boolean, attribute: 'no-menu', reflect: true }, itemAlign: { type: String, attribute: 'item-align', reflect: true, default: 'start' } };
  static styles = css`
:host{display:flex;flex-direction:column;align-items:stretch;justify-content:flex-start;box-sizing:border-box;flex:none;width:var(--md-navigation-rail-collapsed-width,96px);height:100%;min-height:0;padding:44px 0 20px;overflow:hidden;
background:var(--md-navigation-rail-container-color,var(--md-sys-color-surface-container));transition:width .42s var(--mate-ease-decel),background-color .3s ease}
:host([expanded]){width:var(--md-navigation-rail-expanded-width,240px)}
.top{display:flex;flex-direction:column;align-items:center;gap:8px;flex:none;padding:0 20px}
:host([expanded]) .top{align-items:flex-start}
.menu{display:flex}.menu[hidden]{display:none}
.mbtn svg{width:24px;height:24px;fill:currentColor;display:block}.mbtn .open{display:none}:host([expanded]) .mbtn .open{display:block}:host([expanded]) .mbtn .closed{display:none}
.mbtn{--md-icon-button-pressed-rotation:0deg}
.fab{display:flex}.fab ::slotted(*){flex:none}
.body{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:flex-start;margin-top:40px;padding:0 8px;overflow-x:hidden;overflow-y:auto;scrollbar-width:none;transition:padding .42s var(--mate-ease-decel)}
:host([item-align=center]) .body{justify-content:center}:host([item-align=end]) .body{justify-content:flex-end}
:host([expanded]) .body{padding:0 20px}
.items{display:flex;flex-direction:column;align-items:stretch;gap:12px}:host([expanded]) .items{gap:0}`;
  build() {
    const M = '<svg class="closed" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"/></svg><svg class="open" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18h13v-2H3zm0-5h10v-2H3zm0-7v2h13V6zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5z"/></svg>';
    this.shadowRoot.innerHTML = `<div class="top" part="top"><div class="menu" part="menu"><slot name="menu"><md-icon-button class="mbtn" aria-label="Menu">${M}</md-icon-button></slot></div><div class="fab" part="fab"><slot name="fab"></slot></div></div><div class="body" part="body"><div class="items" role="tablist" part="items"><slot></slot></div></div>`;
    this.$('slot:not([name])').addEventListener('slotchange', () => this._apply()); this.$('slot[name=fab]').addEventListener('slotchange', () => this._apply());
    this.addEventListener('navigation-tab-interaction', e => this._interact(e)); this.addEventListener('keydown', e => this._rkey(e));
    this.$('.mbtn').addEventListener('click', () => this.toggle());
    this.addEventListener('click', e => { if (e.composedPath().some(n => n.nodeType === 1 && n.getAttribute('slot') === 'menu' && n.parentNode === this)) this.toggle(); });
  }
  toggle() { const ev = this.emit('navigation-rail-toggle', { bubbles: true, cancelable: true, detail: { expanded: !this.expanded } }); if (!ev.defaultPrevented) this.expanded = !this.expanded; }
  show() { this.expanded = true; } collapse() { this.expanded = false; }
  _apply() {
    this.tabs.forEach((t, i) => { t.active = i === this.activeIndex; t.horizontal = this.expanded; });
    for (const f of this.querySelectorAll(':scope > [slot=fab]')) {
      if (this.expanded) { const l = f.dataset.railLabel; if (l && !f.getAttribute('label')) f.setAttribute('label', l); }
      else { const l = f.getAttribute('label'); if (l) { f.dataset.railLabel = l; f.removeAttribute('label'); } }
    }
    this.$('.menu').hidden = this.noMenu && !this.querySelector(':scope > [slot=menu]');
    this.$('slot[name=menu]').assignedElements().forEach(m => m.toggleAttribute('data-expanded', this.expanded));
  }
  _rkey(e) {
    if (!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) return; const t = this.tabs.filter(x => !x.disabled), c = t.findIndex(x => x === e.target); if (c < 0) return;
    let n = c; if (e.key === 'Home') n = 0; else if (e.key === 'End') n = t.length - 1; else n = (c + (e.key === 'ArrowDown' ? 1 : -1) + t.length) % t.length;
    e.preventDefault(); t.forEach(x => x.removeAttribute('tab-focusable')); t[n].setAttribute('tab-focusable', ''); t[n].focus();
  }
}
defineElement('md-navigation-rail', MdNavigationRail);

if (typeof window !== 'undefined' && window.MateChaComponents) {
  window.MateChaComponents.version = '3.6.0';
  window.MateChaComponents.expressive.push('md-switch-bar', 'md-top-popup', 'md-pull-to-refresh', 'md-search-view', 'md-navigation-rail', 'md-navigation-rail-item');
}
