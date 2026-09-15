import type { GameState, GameAction } from '../../types/game';

export const initialGameState: GameState = {
  status: 'idle',
  secret: '',
  guesses: [],
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        status: 'active',
        secret: action.secret,
        guesses: [],
      };

    case 'SUBMIT_GUESS': {
      if (state.status !== 'active') return state;
      const guesses = [...state.guesses, action.guess];
      return {
        ...state,
        guesses,
        status: action.guess.bulls === 4 ? 'won' : 'active',
      };
    }

    case 'RESET':
      return initialGameState;

    default:
      return state;
  }
}
