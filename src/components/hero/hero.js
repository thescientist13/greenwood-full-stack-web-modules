import sheet from './hero.css' with { type: "css" };
import template from "./hero.html" with { type: "html" };
import json from "./hero.json" with { type: "json" };

export default class HeroBanner extends HTMLElement {
  connectedCallback() {
    console.log({ sheet, template, json });

    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    this.shadowRoot.adoptedStyleSheets = [sheet];
  }
}

customElements.define('app-hero', HeroBanner);