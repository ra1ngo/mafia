import SceneInput from '../kernel/scene-input';
import GUI from '../app';
import Network from '../kernel/network';
import EventSystem from '../kernel/event-system';

export interface ISystems {
  input: SceneInput;
  gui: GUI;
  network: Network;
  events: EventSystem;
}

export enum SYSTEM_NAME {
  SCENE = 'scene',
  NETWORK = 'network',
}

export abstract class AEvent {
  public system: SYSTEM_NAME;
  public name: string;
  public data: object;

  constructor(data: object) {
    this.data = data;
  }
}
