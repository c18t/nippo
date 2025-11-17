import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-element')
export class MyElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      border: 2px solid #333;
      border-radius: 8px;
    }

    h2 {
      margin: 0 0 8px 0;
      color: #333;
    }

    p {
      margin: 0;
      color: #666;
    }
  `;

  @property({ type: String })
  name = 'World';

  @property({ type: Number })
  count = 0;

  render() {
    return html`
      <h2>Hello, ${this.name}!</h2>
      <p>Count: ${this.count}</p>
      <button @click=${this._increment}>Increment</button>
    `;
  }

  private _increment() {
    this.count++;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
