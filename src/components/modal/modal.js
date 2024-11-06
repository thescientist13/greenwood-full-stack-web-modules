import sheet from './modal.css' with { type: 'css' };
import template from './modal.html?type=html';

export default class Modal extends HTMLElement {

  updateModal(detail) {
    console.log(`message is => ${detail.content}`);
    const modal = this.shadowRoot.querySelector('dialog');
    
    modal.querySelector('#content').textContent = detail.content;
    modal.showModal();
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    this.shadowRoot.adoptedStyleSheets = [sheet];

    // setup event handlers for updating and closing the dialog
    globalThis.addEventListener('update-modal', (event) => {
      this.updateModal(event.detail);
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