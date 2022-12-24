let instance: EventEmitter | null = null;

export default class EventEmitter extends Phaser.Events.EventEmitter {
  constructor() {
    super();
  }

  static getInstance() {
    if (instance === null) {
      instance = new EventEmitter();
    }
    return instance;
  }
}
