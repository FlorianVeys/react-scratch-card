import clsx from 'clsx';
import React, { RefObject, TouchEventHandler } from 'react';
import { useState } from 'react';
import { defaults, get } from 'lodash';
import { useCanvasRef, useParentRef, useParentRefAsRefresh } from './hook';
import './index.css';
import {
  getCanvasRelativePosition,
  getEventCoordinatesInCanvas,
} from './helpers';
import { CanvasMouseEvent } from './model';

export type ScratchConfig = {
  scratchRadius?: number;
};
const DEFAULT_SCRATCH_CONFIG = {
  scratchRadius: 25,
};

export interface ScratchCardProps<T extends HTMLElement> {
  scratchConfig?: ScratchConfig;
  parentRef?: RefObject<T>;
  className?: string;
  children: React.ReactNode;
}
export function ScratchCard<T extends HTMLElement>({
  scratchConfig,
  parentRef,
  className,
  children,
}: ScratchCardProps<T>) {
  const canvasRef = useCanvasRef();
  useParentRefAsRefresh(parentRef);
  const { parentClassName } = useParentRef(parentRef);
  const [isScratchable, setIsScratchable] = useState(false);

  const _scratchConfig = defaults(scratchConfig, DEFAULT_SCRATCH_CONFIG);

  function startScratch() {
    setIsScratchable(true);
  }

  function endScratch() {
    setIsScratchable(false);
  }

  function scratch(event: CanvasMouseEvent) {
    const { x, y } = getCursorCoordinatesInCanvas(event);
    const context = canvasRef.current?.getContext('2d');
    if (isScratchable && context) {
      context.globalCompositeOperation = 'destination-out';
      context.beginPath();
      context.arc(x, y, _scratchConfig.scratchRadius, 0, 2 * Math.PI, false);
      context.fill();
    }
  }

  function getCursorCoordinatesInCanvas(event: CanvasMouseEvent) {
    const canvas = canvasRef.current;
    const {
      width: relativeWidth,
      height: relativeHeight,
      left: relativeLeft,
      top: relativeTop,
    } = getCanvasRelativePosition(canvas);
    const { x: eventX, y: eventY } = getEventCoordinatesInCanvas(event);

    const xOffset = window.pageXOffset || document.documentElement.scrollLeft;
    const yOffset = window.pageYOffset || document.documentElement.scrollTop;

    const scaleX = (canvas?.width ?? 1) / relativeWidth;
    const scaleY = (canvas?.height ?? 1) / relativeHeight;

    return {
      x: (eventX - relativeLeft - xOffset) * scaleX,
      y: (eventY - relativeTop - yOffset) * scaleY,
    };
  }

  const canvasEventHandlers = {
    onMouseDown: startScratch,
    onMouseUp: endScratch,
    onTouchStart: startScratch,
    onTouchEnd: endScratch,

    onMouseMove: scratch,
    onTouchMove: scratch,
  };

  return (
    <canvas
      ref={canvasRef}
      className={clsx(className, parentClassName, 'scratchCard')}
      {...canvasEventHandlers}
    >
      {children}
    </canvas>
  );
}
