import React, { useEffect } from 'react';
import { useSettings } from '../settings/useSettings';
import { useDrawing } from './useDrawing';
import styles from './ScribbleCanvas.module.css';

export const ScribbleCanvas: React.FC = () => {
  const { state } = useSettings();

  const inkColor = state.inkTheme === 'ink-black'
    ? '#1f2022'
    : state.inkTheme === 'ink-pencil'
      ? '#6c7178'
      : '#1449a8';

  const inkWidth = state.inkTheme === 'ink-pencil' ? 3 : 2;

  const { canvasRef, clearCanvas } = useDrawing(state.drawMode, inkColor, inkWidth);

  useEffect(() => {
    if (state.clearDrawingsCount > 0) {
      clearCanvas();
    }
  }, [state.clearDrawingsCount, clearCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.scribbleCanvas}
      id="scribble-canvas"
    />
  );
};
