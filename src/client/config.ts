import GameScene from './scenes/game';
import theme from './data/theme.json';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: theme.title,
  width: theme.canvas.width,
  height: theme.canvas.height,
  backgroundColor: theme.canvas.backgroundColor,
  type: Phaser.AUTO,
  parent: 'game',
  //zoom: 2,
  render: {
    pixelArt: false,
  },
  scene: [GameScene],
};
