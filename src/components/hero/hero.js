import sheet from './hero.css' with { type: "css" };
import template from "./hero.html" with { type: "html" };
import json from "./hero.json" with { type: "json" };

export default class HeroBanner extends HTMLElement {
  clickButton(el) {
    console.log('clicked button =>', el.textContent);
  }

  connectedCallback() {
    console.log({ sheet, template, json });

    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    this.shadowRoot.adoptedStyleSheets = [sheet];
    this.shadowRoot.querySelectorAll('button')
      .forEach(button => {
        button.addEventListener('click', () => this.clickButton(button))
      });
  }
}

customElements.define('app-hero', HeroBanner);