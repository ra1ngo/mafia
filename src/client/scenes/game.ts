import SceneLoader from '../kernel/scene-loader';
import SceneMap from '../kernel/scene-map';
import SceneInput from '../kernel/scene-input';
import EventEmitter from '../kernel/event-emitter';
import GUI from '../app';

export default class GameScene extends Phaser.Scene {
  private sceneLoader: SceneLoader;
  private sceneInput: SceneInput;
  private sceneMap: SceneMap;
  private gui: GUI;
  private isReady = false;

  constructor() {
    super({ key: 'GameScene' });
    // Первая инициализация эмиттера
    const emitter = EventEmitter.getInstance();
    this.sceneLoader = new SceneLoader(this);
    this.sceneInput = new SceneInput(this);
    this.sceneMap = new SceneMap(this);
    this.gui = new GUI();
  }

  preload() {
    this.sceneLoader.preload();
    this.sceneInput.preload();
    this.sceneMap.preload();
    this.gui.preload();
  }

  create() {
    this.configCamera();
    this.sceneLoader.create();
    this.sceneInput.create();
    this.sceneMap.create();
    this.gui.create();
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
    this.gui.updateDebugInfo({
      fps: this.game.loop.actualFps,
    });
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
