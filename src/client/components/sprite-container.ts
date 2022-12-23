import GameScene from '../scenes/game';
import config from '../data/config.json';
import { COLLIDER_TYPE } from '../contracts/types';
import { ITextureCustomData, SpriteKey } from '../contracts/sprites';

export default class SpriteContainer extends Phaser.GameObjects.Container {
  private marker: Phaser.GameObjects.Graphics;
  private colliderType: string;
  private isDebug = false;
  private sprite: SpriteKey;

  constructor(scene: Phaser.Scene, data: any) {
    super(scene, 0, 0);
    this.setSize(data.width, data.height);
    this.isDebug = config.isDebug;
    this.colliderType = data.colliderType;
    this.sprite = data.sprite;

    // if (this.colliderType == COLLIDER_TYPE.RECTANGLE) {
    // 	this.setPosition(-this.width/2, -this.height/2);
    // }

    this.marker = new Phaser.GameObjects.Graphics(this.scene).setDepth(50).setVisible(this.isDebug);
    this.init();

    return this;
  }

  private init() {
    const sprite = new Phaser.GameObjects.Image(this.scene, this.width, this.height, this.sprite);
    //.setScale(2);
    //.setDepth(30);
    const data = sprite.texture.customData as ITextureCustomData;
    sprite.setOrigin(data.originX ?? 1, data.originY ?? 1);
    sprite.setRotation((data.rotation ?? 0.0) * Math.PI);
    this.add(sprite);

    if (this.colliderType === COLLIDER_TYPE.CIRCLE) {
      this.marker.lineStyle(1, 0xffffff, 1);
      this.marker.strokeCircle(0, 0, this.width);
    } else if (this.colliderType === COLLIDER_TYPE.RECTANGLE) {
      this.marker.lineStyle(1, 0xffffff, 1);
      this.marker.strokeRect(0, 0, this.width, this.height);
    }
    this.add(this.marker);
  }

  destroySelf() {
    this.removeAll(true);
    this.destroy();
  }
}
