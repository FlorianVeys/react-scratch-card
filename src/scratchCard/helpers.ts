import { get } from 'lodash';
import { CanvasMouseEvent } from './model';

interface CanvasRelativePosition {
  width: number;
  height: number;
  left: number;
  top: number;
}
export function getCanvasRelativePosition(
  canvas: HTMLCanvasElement | null
): CanvasRelativePosition {
  const rect = canvas?.getBoundingClientRect();

  return {
    width: get(rect, 'width', 1),
    height: get(rect, 'height', 1),
    left: get(rect, 'left', 0),
    top: get(rect, 'top', 0),
  };
}

export function getEventCoordinatesInCanvas(event: CanvasMouseEvent): {
  x: number;
  y: number;
} {
  const { touchscreenX, touchscreenY } = getTouchscreenEvent(event);

  return {
    x: get(event, 'clientX', touchscreenX),
    y: get(event, 'clientY', touchscreenY),
  };
}

function getTouchscreenEvent(event: CanvasMouseEvent) {
  const touch = get(
    event,
    'originalEvent.touches[0]',
    get(event, 'originalEvent.changedTouches[0]')
  );

  return {
    touchscreenX: get(touch, 'pageX'),
    touchscreenY: get(touch, 'pageY'),
  };
}
