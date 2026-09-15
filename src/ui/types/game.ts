export interface Guess {
  id: string;
  round: number;
  digits: string;
  bulls: number;
  cows: number;
}

export type GameStatus = 'idle' | 'active' | 'won';

export interface GameState {
  status: GameStatus;
  secret: string;
  guesses: Guess[];
}

export type GameAction =
  | { type: 'START_GAME'; secret: string }
  | { type: 'SUBMIT_GUESS'; guess: Guess }
  | { type: 'RESET' };
