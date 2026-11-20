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

      const { node, partGroup } = template.cloneWithParts();
      const values: Record<string, string> = { title, thumbnail };

      for (const part of partGroup.parts) {
        part.value = values[part.name] ?? '';
      }
      partGroup.commit();

      shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(node);
    }

    shadowRoot.adoptedStyleSheets = [sheet];
  }
}

customElements.define('app-card', Card);