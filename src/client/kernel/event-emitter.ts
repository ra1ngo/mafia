let instance: EventEmitter | null = null;

export default class EventEmitter extends Phaser.Events.EventEmitter {
  constructor() {
    super();
  }

  static getInstance() {
    if (!instance) {
      instance = new EventEmitter();
    }
    return instance;
  }
}
