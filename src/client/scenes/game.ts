/* eslint-disable */
// TODO: Убрать выше строчку, она для того чтобы закомитить хаски
import SceneLoader from '../kernel/scene-loader';
import SceneMap from '../kernel/scene-map';
import SceneInput from '../kernel/scene-input';
import EventEmitter from '../kernel/event-emitter';
import GUI from '../app';
import Network from '../kernel/network';
import { EventSceneUpdate } from '../events/scene';
import EventSystem from '../kernel/event-system';
import hooks from '../events';

export default class GameScene extends Phaser.Scene {
  private sceneLoader: SceneLoader;
  private sceneInput: SceneInput;
  private sceneMap: SceneMap;
  private gui: GUI;
  private network: Network;
  private isReady = false;
  private emitter: EventEmitter;
  private eventSystem: EventSystem;

  constructor() {
    super({ key: 'GameScene' });
    // Первая инициализация эмиттера
    this.emitter = EventEmitter.getInstance();
    this.sceneLoader = new SceneLoader(this);
    this.sceneInput = new SceneInput(this);
    this.sceneMap = new SceneMap(this);
    this.gui = new GUI();
    this.eventSystem = new EventSystem();

    // создается в конце, чтобы все события network и EventEmitter точно дошли
    this.network = new Network();

    this.eventSystem.bindSystems({
      network: this.network,
      events: this.eventSystem,
      gui: this.gui,
      input: this.sceneInput,
    });

    this.eventSystem.createEventSystem(hooks);
  }

  preload() {
    this.sceneLoader.preload();
    this.sceneInput.preload();
    this.sceneMap.preload();
    this.gui.preload();
    this.network.preload();
  }

  create() {
    this.configCamera();
    this.sceneLoader.create();
    this.sceneInput.create();
    this.sceneMap.create();
    this.gui.create();

    this.network.create();
    this.network.connectToServer(); // вызывается в конце, чтобы все события network и EventEmitter точно дошли
  }

  firstUpdate() {
    this.gui.firstUpdate();
  }

  update(time: number, delta: number) {
    if (!this.isReady) {
      this.isReady = true;
      this.firstUpdate();
    }

    // Апдейты игры

    // this.gui.updateDebugInfo({
    //   fps: this.game.loop.actualFps,
    // });
    const eventUpdate = new EventSceneUpdate({
      fps: Number(this.game.loop.actualFps),
      time,
      delta,
    });
    this.eventSystem.emit(eventUpdate);
    this.sceneInput.update(time, delta);
  }

  startFollowCamera(obj: any) {
    const camera = this.cameras.main;
    camera.startFollow(obj);
    //camera.setZoom(0.5);
  }

  configCamera() {
    const camera = this.cameras.main;
    //camera.setZoom(0.5);
  }
}
