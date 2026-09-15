export type InkTheme = 'ink-blue' | 'ink-black' | 'ink-pencil';

export interface SettingsState {
  inkTheme: InkTheme;
  gridActive: boolean;
  audioActive: boolean;
  drawMode: boolean;
  clearDrawingsCount: number;
}

export type SettingsAction =
  | { type: 'SET_INK'; theme: InkTheme }
  | { type: 'TOGGLE_GRID' }
  | { type: 'TOGGLE_AUDIO' }
  | { type: 'TOGGLE_DRAW_MODE' }
  | { type: 'CLEAR_DRAWINGS' };
