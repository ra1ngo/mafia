import assets from '../data/assets.json';
import { ISpriteInfo, ISpritesheetInfo } from '../contracts/sprites';

export default class SceneLoader {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  preload() {
    const images = assets.images as ISpriteInfo[];
    images.forEach((data) => {
      this.scene.load
        .image(data.key, data.path)
        .on(`filecomplete-image-${data.key}`, (key: string, type: string, texture: any) => {
          if (data.customData) texture.customData = { ...texture.customData, ...data.customData };
        });
    });

    const tilesets = assets.tilesets as ISpriteInfo[];
    tilesets.forEach((data) => {
      this.scene.load
        .image(data.key, data.path)
        .on(`filecomplete-image-${data.key}`, (key: string, type: string, texture: any) => {});
    });

    const svg = assets.svg as ISpriteInfo[];
    svg.forEach((data) => {
      this.scene.load
        .svg(data.key, data.path, data.size)
        .on(`filecomplete-svg-${data.key}`, (key: string, type: string, texture: any) => {
          if (data.customData) texture.customData = { ...texture.customData, ...data.customData };
        });
    });

    const spritesheets = assets.spritesheets as ISpritesheetInfo[];
    spritesheets.forEach((data) => {
      if (!data.slugs) {
        this.scene.load.spritesheet(data.key, data.path, data.frameOptions);
      } else {
        data.slugs.forEach((slug) =>
          this.scene.load.spritesheet(
            data.key.replace('{slug}', slug),
            data.path.replace('{slug}', slug),
            data.frameOptions
          )
        );
      }
    });
  }

  create() {
    const spritesheets = assets.spritesheets as ISpritesheetInfo[];
    spritesheets.forEach((spritesheet) => {
      if (!spritesheet.slugs) {
        spritesheet.animations?.forEach((data) => {
          this.scene.anims.create({
            key: data.key,
            frames: this.scene.anims.generateFrameNumbers(spritesheet.key, data.options),
            frameRate: data.frameRate ?? 10, //скорость проигрывания
            repeat: data.repeat ?? -1,
          });
        });
      } else {
        spritesheet.slugs.forEach((slug) => {
          spritesheet.animations?.forEach((data) => {
            this.scene.anims.create({
              key: data.key.replace('{slug}', slug),
              frames: this.scene.anims.generateFrameNumbers(spritesheet.key.replace('{slug}', slug), data.options),
              frameRate: data.frameRate ?? 10, //скорость проигрывания
              repeat: data.repeat ?? -1,
            });
          });
        });
      }
    });
  }
}
