import React, { RefObject, useEffect, useRef } from 'react';
import { CanvasConfig, CanvasColor, CanvasImage } from './model';

interface ParentRefDatas {
  parentClassName?: string;
}
export function useParentRef<T extends HTMLElement>(
  parentRef?: RefObject<T>
): ParentRefDatas {
  return {
    parentClassName: parentRef?.current?.className,
  };
}

export function useCanvas(config: CanvasConfig): RefObject<HTMLCanvasElement> {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        const drawer = drawInCanvas(context);

        drawer(config);
      }
    }
  }, [config]);

  return canvasRef;
}

function drawInCanvas(context: CanvasRenderingContext2D) {
  return (config: CanvasConfig) => {
    if (CanvasConfig.hasColor(config)) {
      context.fillStyle = (config?.content as CanvasColor).value;
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }

    if (CanvasConfig.hasImage(config)) {
      const src = (config?.content as CanvasImage).src;

      const img = new Image();
      img.onload = () => {
        context.drawImage(
          img,
          0,
          0,
          context.canvas.width,
          context.canvas.height
        );
      };
      img.src = src;
    }
  };
}
