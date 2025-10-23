import sheet from './card.css' with { type: 'css' };
import template from './card.html?type=html';
import { UpdateModalEvent } from '../modal/modal.types.ts';

export default class Card extends HTMLElement {

  clickItem() {
    const title = this.getAttribute('title');

    window.dispatchEvent(new UpdateModalEvent(`You clicked the image => ${title}`));
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      const thumbnail = this.getAttribute('thumbnail');
      const title = this.getAttribute('title');

      template.replaceAll('title', title);
      template.replace('thumbnail', thumbnail);

      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    this.shadowRoot.adoptedStyleSheets = [sheet];
  }
}

customElements.define('app-card', Card);