export type CanvasMouseEvent =
  | React.MouseEvent<HTMLCanvasElement>
  | React.TouchEvent<HTMLCanvasElement>;

export const DEFAULT_SCRATCH_CONFIG = {
  scratchRadius: 25,
};
export type ScratchConfig = {
  scratchRadius?: number;
  canvasConfig?: CanvasConfig;
};

interface CanvasConfig {}
