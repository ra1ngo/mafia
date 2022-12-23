import { hexToNumber } from '../utils/phaser';

export default class Figure extends Phaser.GameObjects.Graphics {
  private radius: number;
  private color: number;

  constructor(scene: Phaser.Scene, radius: number, color: string) {
    super(scene);
    this.radius = radius;
    this.color = hexToNumber(color);

    this.fillStyle(this.color, 1);
    this.fillCircle(0, 0, this.radius);
  }
}
