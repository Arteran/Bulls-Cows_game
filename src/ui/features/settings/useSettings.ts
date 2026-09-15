import { useContext, useCallback, useEffect } from 'react';
import { SettingsContext } from './SettingsContext';
import { audioService } from '../../services/AudioService';
import type { InkTheme } from '../../types/settings';

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  const [state, dispatch] = context;

  useEffect(() => {
    audioService.setMuted(!state.audioActive);
  }, [state.audioActive]);

  const setInkTheme = useCallback((theme: InkTheme) => {
    dispatch({ type: 'SET_INK', theme });
  }, [dispatch]);

  const toggleGrid = useCallback(() => {
    dispatch({ type: 'TOGGLE_GRID' });
  }, [dispatch]);

  const toggleAudio = useCallback(() => {
    dispatch({ type: 'TOGGLE_AUDIO' });
  }, [dispatch]);

  const toggleDrawMode = useCallback(() => {
    dispatch({ type: 'TOGGLE_DRAW_MODE' });
  }, [dispatch]);

  const clearDrawings = useCallback(() => {
    dispatch({ type: 'CLEAR_DRAWINGS' });
  }, [dispatch]);

  return {
    state,
    setInkTheme,
    toggleGrid,
    toggleAudio,
    toggleDrawMode,
    clearDrawings,
  };
}
