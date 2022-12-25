/* eslint-disable */
// TODO: Убрать выше строчку, она для того чтобы закомитить хаски

import EventEmmiter from '../kernel/event-emitter';
import * as store from './store';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import App from './App.svelte';

interface IDebugInfo {
  fps: number;
  ping: number;
  x: number;
  y: number;
}

export default class GUI {
  private emitter: EventEmmiter;
  private app: App;

  constructor() {
    this.emitter = EventEmmiter.getInstance();
  }

  preload() {}

  create() {}

  firstUpdate() {
    this.app = new App({
      target: document.getElementById('gui'),
    });
  }

  updateDebugInfo(data: Partial<IDebugInfo>) {
    if (data.hasOwnProperty('fps')) store.fps.set(<number>data.fps);
    if (data.hasOwnProperty('ping')) store.ping.set(<number>data.ping);
    if (data.hasOwnProperty('x')) store.x.set(<number>data.x);
    if (data.hasOwnProperty('y')) store.y.set(<number>data.y);
  }
}
