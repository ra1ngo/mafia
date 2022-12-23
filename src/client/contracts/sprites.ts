//customData - это объект, создаваемый phaser. Неизвестно для чего он еще может пригодится.
//В идеале - доп. данные текстуры, которые я привязываю не должны полностью заменять customData. А быть его отдельным полем.
export interface ITextureCustomData {
  originX?: number;
  originY?: number;
  rotation?: number;
}

export type SpriteKey = string;

export interface ISpriteInfo {
  key: SpriteKey;
  path: string;
  customData?: ITextureCustomData;
  size?: {
    width: number;
    height: number;
  };
}

interface ISpritesheetAnimaion {
  key: SpriteKey;
  frameRate?: number;
  repeat?: number;
  options: {
    frames: number[];
  };
}

export interface ISpritesheetInfo {
  key: SpriteKey;
  path: string;
  slugs?: string[];
  frameOptions?: {
    frameWidth: number;
    frameHeight: number;
  };
  animations?: ISpritesheetAnimaion[];
}
