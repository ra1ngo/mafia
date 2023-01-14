import { AEvent, ISystems } from '../contracts/eventSystems';
import EventEmitter from './event-emitter';

export default class EventSystem {
  private systems?: ISystems;
  private emitter: EventEmitter;

  constructor() {
    this.emitter = EventEmitter.getInstance();
  }

  public bindSystems(systems: ISystems) {
    this.systems = systems;
  }

  public createEventSystem(hooks: object) {
    console.log(hooks);
    Object.entries(hooks).forEach(([systemName, hook]) => {
      Object.entries(hook).forEach(([eventName, handler]) => {
        if (typeof handler !== 'function') return;
        this.emitter.on(`${systemName}:${eventName}`, (event: AEvent) => handler(event, this.systems));
      });
    });
  }

  public emit(event: AEvent) {
    this.emitter.emit(`${event.system}:${event.name}`, event);
  }
}
