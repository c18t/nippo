import { css, html, LitElement } from 'lit';

/**
 * テーマ切り替えトグル。
 *
 * - 既定は OS 設定 (prefers-color-scheme) 追従
 * - クリックで <html data-theme> を切り替え、sessionStorage に永続化
 *   (タブセッション内のみ。新規タブ・ブラウザ再起動後は OS 設定に戻る)
 * - color-scheme の解決は CSS 側 (tokens.css) が行うため JS からは書かない
 *
 * tsconfig の erasableSyntaxOnly 制約があるためデコレータは使わず、
 * static properties + declare フィールドで reactive property を定義する。
 */

const STORAGE_KEY = 'nippo:theme';

type Theme = 'light' | 'dark';

const sunIcon = html`
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
`;

const moonIcon = html`
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
`;

export class ThemeToggle extends LitElement {
  static properties = {
    theme: { state: true },
  };

  declare theme: Theme;

  private media: MediaQueryList;

  private handleMediaChange = (event: MediaQueryListEvent): void => {
    // 明示選択がないときだけ OS 設定に表示を追従させる
    if (this.storedTheme() === null) {
      this.theme = event.matches ? 'dark' : 'light';
    }
  };

  constructor() {
    super();
    this.media = window.matchMedia('(prefers-color-scheme: dark)');
    this.theme = this.resolveTheme();
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.media.addEventListener('change', this.handleMediaChange);
  }

  override disconnectedCallback(): void {
    this.media.removeEventListener('change', this.handleMediaChange);
    super.disconnectedCallback();
  }

  private storedTheme(): Theme | null {
    try {
      const value = sessionStorage.getItem(STORAGE_KEY);
      return value === 'light' || value === 'dark' ? value : null;
    } catch {
      return null;
    }
  }

  private resolveTheme(): Theme {
    // FOUC 防止スクリプトが設定済みの data-theme を最優先
    const current = document.documentElement.dataset.theme;
    if (current === 'light' || current === 'dark') return current;
    return this.storedTheme() ?? (this.media.matches ? 'dark' : 'light');
  }

  private toggleTheme(): void {
    const next: Theme = this.theme === 'dark' ? 'light' : 'dark';
    this.theme = next;
    document.documentElement.dataset.theme = next;
    try {
      sessionStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ストレージ不可 (プライベートモード等) でも切り替え自体は機能させる
    }
  }

  override render() {
    const dark = this.theme === 'dark';
    return html`
      <button
        role="switch"
        aria-checked=${dark ? 'true' : 'false'}
        aria-label="ダークモード切り替え"
        @click=${this.toggleTheme}
      >
        <span class="knob">${dark ? moonIcon : sunIcon}</span>
      </button>
    `;
  }

  static styles = css`
    :host {
      display: inline-flex;
    }

    button {
      position: relative;
      width: 52px;
      height: 28px;
      padding: 3px;
      display: flex;
      align-items: center;
      background: var(--color-border, #e7e5e4);
      border: none;
      border-radius: 14px;
      cursor: pointer;
      transition: background var(--transition-theme, 0.35s);
    }

    button:hover {
      background: var(--color-border-hover, #d6d3d1);
    }

    .knob {
      width: 22px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-bg-secondary, #fff);
      border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
      transition:
        transform var(--transition-theme, 0.35s),
        background var(--transition-theme, 0.35s);
    }

    button[aria-checked='true'] .knob {
      transform: translateX(24px);
    }

    svg {
      width: 13px;
      height: 13px;
      color: var(--color-text-secondary, #57534e);
    }
  `;
}

if (!customElements.get('theme-toggle')) {
  customElements.define('theme-toggle', ThemeToggle);
}

declare global {
  interface HTMLElementTagNameMap {
    'theme-toggle': ThemeToggle;
  }
}
