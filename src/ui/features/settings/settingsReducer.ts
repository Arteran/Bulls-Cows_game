import type { SettingsState, SettingsAction } from '../../types/settings';

export const initialSettingsState: SettingsState = {
  inkTheme: 'ink-pencil',
  gridActive: true,
  audioActive: true,
  drawMode: false,
  clearDrawingsCount: 0,
};

export function settingsReducer(state: SettingsState, action: SettingsAction): SettingsState {
  switch (action.type) {
    case 'SET_INK':
      return {
        ...state,
        inkTheme: action.theme,
      };
    case 'TOGGLE_GRID':
      return {
        ...state,
        gridActive: !state.gridActive,
      };
    case 'TOGGLE_AUDIO':
      return {
        ...state,
        audioActive: !state.audioActive,
      };
    case 'TOGGLE_DRAW_MODE':
      return {
        ...state,
        drawMode: !state.drawMode,
      };
    case 'CLEAR_DRAWINGS':
      return {
        ...state,
        clearDrawingsCount: state.clearDrawingsCount + 1,
      };
    default:
      return state;
  }
}
