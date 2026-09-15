import { useEffect, useRef, useCallback } from 'react';

interface DrawingAPI {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  clearCanvas: () => void;
}

export function useDrawing(
  isDrawMode: boolean,
  inkColor: string,
  inkWidth: number,
): DrawingAPI {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas?.parentElement) return;

    const observer = new ResizeObserver((entries) => {
      if (!entries[0]) return;
      const { width, height } = entries[0].contentRect;

      const temp = document.createElement('canvas');
      temp.width = canvas.width;
      temp.height = canvas.height;
      temp.getContext('2d')?.drawImage(canvas, 0, 0);

      canvas.width = width;
      canvas.height = height;

      canvas
        .getContext('2d')
        ?.drawImage(temp, 0, 0, temp.width, temp.height, 0, 0, width, height);
    });

    observer.observe(canvas.parentElement);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const src = 'touches' in e ? e.touches[0] : e;
      return {
        x: (src.clientX - rect.left) * scaleX,
        y: (src.clientY - rect.top) * scaleY,
      };
    };

    const onStart = (e: MouseEvent | TouchEvent) => {
      if (!isDrawMode) return;
      
      if (e.cancelable) {
        e.preventDefault();
      }

      const ctx = canvas.getContext('2d')!;
      const pos = getPos(e);
      isDrawing.current = true;
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.strokeStyle = inkColor;
      ctx.lineWidth = inkWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing.current || !isDrawMode) return;
      if (e.cancelable) {
        e.preventDefault();
      }

      const ctx = canvas.getContext('2d')!;
      const { x, y } = getPos(e);
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const onEnd = () => {
      isDrawing.current = false;
    };

    canvas.addEventListener('mousedown', onStart);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseup', onEnd);
    canvas.addEventListener('mouseleave', onEnd);
    canvas.addEventListener('touchstart', onStart, { passive: false });
    canvas.addEventListener('touchmove', onMove, { passive: false });
    canvas.addEventListener('touchend', onEnd);

    return () => {
      canvas.removeEventListener('mousedown', onStart);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseup', onEnd);
      canvas.removeEventListener('mouseleave', onEnd);
      canvas.removeEventListener('touchstart', onStart);
      canvas.removeEventListener('touchmove', onMove);
      canvas.removeEventListener('touchend', onEnd);
    };
  }, [isDrawMode, inkColor, inkWidth]);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  return { canvasRef, clearCanvas };
}
