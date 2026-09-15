import { useContext, useCallback } from 'react';
import { GameContext } from './GameContext';
import { generateSecret, getScore, isValidGuess } from '../../wrappers/gameLogic';

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  const [state, dispatch] = context;

  const startGame = useCallback(() => {
    const secret = generateSecret();
    dispatch({ type: 'START_GAME', secret });
  }, [dispatch]);

  const submitGuess = useCallback((digits: string) => {
    if (!isValidGuess(digits)) return null;
    const { bulls, cows } = getScore(digits, state.secret);
    const id = typeof crypto.randomUUID === 'function' 
      ? crypto.randomUUID() 
      : Math.random().toString(36).substring(2, 9);
    const round = state.guesses.length + 1;
    dispatch({
      type: 'SUBMIT_GUESS',
      guess: { id, round, digits, bulls, cows }
    });
    return { bulls, cows };
  }, [dispatch, state.secret, state.guesses.length]);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, [dispatch]);

  return {
    state,
    startGame,
    submitGuess,
    resetGame
  };
}
