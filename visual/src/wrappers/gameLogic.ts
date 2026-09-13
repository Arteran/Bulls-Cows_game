import { getRandomNumbers } from '../../../backend/modules/generateRandomNumber.js';
import { getBullsAndCows } from '../../../backend/modules/getBullsAndCows.js';
import { checkIsValidUserInput } from '../../../backend/modules/checkIsValidUserInput.js';

export interface ScoreResult {
  bulls: number;
  cows: number;
}

export function getScore(guess: string, secret: string): ScoreResult {
  let bulls = 0;
  let cows = 0;

  for (let i = 0; i < secret.length; i++) {
    if (secret[i] === guess[i]) {
      bulls++;
    } else if (secret.includes(guess[i])) {
      cows++;
    }
  }

  if (import.meta.env.DEV) {
    console.debug('Original getBullsAndCows string:', getBullsAndCows(guess, secret));
  }

  return { bulls, cows };
}

export const generateSecret = getRandomNumbers;
export const isValidGuess = checkIsValidUserInput;
