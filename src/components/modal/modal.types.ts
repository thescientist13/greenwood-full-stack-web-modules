declare global {
  interface GlobalEventHandlersEventMap {
    'update-modal': UpdateModalEvent;
  }
}

export class UpdateModalEvent extends Event {
  static readonly eventName = 'update-modal';

  readonly content: string;

  constructor(content: string) {
    super(UpdateModalEvent.eventName, { bubbles: true, composed: true });
    this.content = content;
  }
}