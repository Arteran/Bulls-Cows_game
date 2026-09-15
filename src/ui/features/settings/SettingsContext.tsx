import React, { createContext, useReducer, type Dispatch } from 'react';
import type { SettingsState, SettingsAction } from '../../types/settings';
import { settingsReducer, initialSettingsState } from './settingsReducer';

export const SettingsContext = createContext<[SettingsState, Dispatch<SettingsAction>] | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useReducer(settingsReducer, initialSettingsState);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
