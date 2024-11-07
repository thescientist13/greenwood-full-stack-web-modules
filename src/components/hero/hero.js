import sheet from './hero.css' with { type: 'css' };
import json from "./hero.json" with { type: 'json' };
import template from './hero.html?type=html';

export default class HeroBanner extends HTMLElement {
  clickButton(el) {
    const content = el.textContent;
    const buttonClickedEvent = new CustomEvent('update-modal', {
      detail: {
        content: `You selected "${content}"`,
      },
    });

    console.log('clicked button =>', content);

    window.dispatchEvent(buttonClickedEvent);
  }

  connectedCallback() {
    console.log({ sheet, template, json });

    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    this.shadowRoot.adoptedStyleSheets = [sheet];
    this.shadowRoot.querySelectorAll?.('button')
      .forEach(button => {
        button.addEventListener('click', () => this.clickButton(button))
      });
  }
}

customElements.define('app-hero', HeroBanner);