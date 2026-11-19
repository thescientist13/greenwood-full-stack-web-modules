import sheet from './card.css' with { type: 'css' };
import template from './card.html?type=html';
import { UpdateModalEvent } from '../modal/modal.types.ts';

export default class Card extends HTMLElement {
  clickItem() {
    const title = this.getAttribute('title');

    window.dispatchEvent(new UpdateModalEvent(`You clicked the image => ${title}`));
  }

  connectedCallback() {
    let shadowRoot = this.shadowRoot;

    if (!shadowRoot) {
      const thumbnail = this.getAttribute('thumbnail') ?? '';
      const title = this.getAttribute('title') ?? '';

      template.replaceAll('title', title);
      template.replace('thumbnail', thumbnail);

      shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }

    shadowRoot.adoptedStyleSheets = [sheet];
  }
}

customElements.define('app-card', Card);