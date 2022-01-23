import { has } from 'lodash';

export type CanvasMouseEvent =
  | React.MouseEvent<HTMLCanvasElement>
  | React.TouchEvent<HTMLCanvasElement>;

export const DEFAULT_SCRATCH_CONFIG = {
  scratchRadius: 25,
  canvasConfig: {
    content: { value: '#000000' },
  },
};

export type ScratchConfig = {
  scratchRadius?: number;
  canvasConfig?: CanvasConfig;
};

export interface CanvasConfig {
  content?: CanvasColor | CanvasImage;
}
export interface CanvasColor {
  value: string;
}
export interface CanvasImage {
  src: string;
}

export namespace CanvasConfig {
  export function hasColor(canvasConfig: CanvasConfig): boolean {
    return has(canvasConfig, 'content.value');
  }
  export function hasImage(canvasConfig: CanvasConfig): boolean {
    return has(canvasConfig, 'content.src');
  }
}
