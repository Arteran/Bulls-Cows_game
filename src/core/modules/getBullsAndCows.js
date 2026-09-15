'use strict';

export function getBullsAndCows(userInput, numberToGuess) {
  let bulls = 0;
  let cows = 0;

  for (let i = 0; i < numberToGuess.length; i++) {
    if (numberToGuess[i] === userInput[i]) {
      bulls += 1;
      continue;
    }

    if (numberToGuess.includes(userInput[i])) {
      cows += 1;
    }
  }

  if (cows && bulls) return `close, ${bulls} bulls and ${cows} cows`;

  if (!cows) return `there ${bulls} bulls`;

  if (!bulls) return `there ${cows} cows`;

  if (!cows && !bulls) return 'ops, 0 bulls and cows';
}
