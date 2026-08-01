import React, { createContext, useReducer, type Dispatch } from 'react';
import type { GameState, GameAction } from '../../types/game';
import { gameReducer, initialGameState } from './gameReducer';

export const GameContext = createContext<[GameState, Dispatch<GameAction>] | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useReducer(gameReducer, initialGameState);

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
