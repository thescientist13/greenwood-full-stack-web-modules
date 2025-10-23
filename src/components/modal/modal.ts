import sheet from './modal.css' with { type: 'css' };
import template from './modal.html?type=html';
import { UpdateModalEvent } from '../modal/modal.types.ts';

export default class Modal extends HTMLElement {

  updateModal(content: string) {
    console.log(`updateModal content is => ${content}`);
    const modal = this.shadowRoot.querySelector('dialog');
    
    modal.querySelector('#content').textContent = content;
    modal.showModal();
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    this.shadowRoot.adoptedStyleSheets = [sheet];

    // setup event handlers for updating and closing the dialog
    globalThis.addEventListener(UpdateModalEvent.eventName, (event: UpdateModalEvent) => {
      this.updateModal(event.content);
    });

    const modal = this.shadowRoot?.querySelector?.('dialog');

    if (modal) {
      modal.querySelector('button').addEventListener('click', () => {
        modal.close();
      });
    }
  }
}

customElements.define('app-modal', Modal);