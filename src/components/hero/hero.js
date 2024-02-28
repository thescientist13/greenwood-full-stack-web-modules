import sheet from './hero.css' with { type: "css" };
import template from "./hero.html" with { type: "html" };

export default class HeroBanner extends HTMLElement {
  connectedCallback() {
    if(!this.shadowRoot) {
      console.log({ sheet, template });

      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.shadowRoot.adoptedStyleSheets = [sheet];
    }
  }
}

customElements.define('app-hero', HeroBanner);