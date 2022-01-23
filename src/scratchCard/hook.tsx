import React, { RefObject, useEffect, useRef } from 'react';

export function useParentRefAsRefresh<T extends HTMLElement>(
  parentRef?: RefObject<T>
) {
  const [, refreshComponent] = React.useState<number>();
  // Refresh state on useRef current not null
  useEffect(() => {
    refreshComponent(Date.now());
  }, [parentRef?.current]);
}

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

export function useCanvas(): RefObject<HTMLCanvasElement> {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.fillStyle = '#000000';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      }
    }
  }, []);

  return canvasRef;
}
