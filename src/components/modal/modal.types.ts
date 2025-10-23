declare global {
  interface GlobalEventHandlersEventMap {
    'update-modal': UpdateModalEvent;
  }
}

/**
 * An event that's fired when the modal content needs to be updated
 */
export class UpdateModalEvent extends Event {
  static readonly eventName = 'update-modal';

  readonly content: string;

  constructor(content: string) {
    super(UpdateModalEvent.eventName, { bubbles: true, composed: true });
    this.content = content;
  }
}