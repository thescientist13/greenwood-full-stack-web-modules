import sheet from './hero.css' with { type: 'css' };
import json from "./hero.json" with { type: 'json' };
import template from './hero.html?type=html';
import { UpdateModalEvent } from '../modal/modal.types.ts';

export default class HeroBanner extends HTMLElement {
  clickButton(el: HTMLButtonElement) {
    const content = el.textContent;
    console.log('clicked button =>', content);
    
    window.dispatchEvent(new UpdateModalEvent(content));
  }

  connectedCallback() {
    console.log({ sheet, template, json });

    let shadowRoot = this.shadowRoot;

    if (!shadowRoot) {
      shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }

    shadowRoot.adoptedStyleSheets = [sheet];
    shadowRoot.querySelectorAll('button')
      .forEach(button => {
        button.addEventListener('click', () => this.clickButton(button))
      });
  }
}

customElements.define('app-hero', HeroBanner);