import 'Phaser';
import { GameConfig } from './config';

export class PhaserGame extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener('load', () => {
  //loadFont("font", "assets/fonts/font.ttf");
  const engine = new PhaserGame(GameConfig);
});

// function loadFont(name: string, url: string) {
//   const font = new FontFace(name, `url(${url})`);
//   font.load().then((loaded) => {
//     document.fonts.add(loaded);
//   });
// }
