'use strict';
import readline from 'node:readline/promises';
import { getRandomNumbers } from './modules/generateRandomNumber.js';
import { checkIsValidUserInput } from './modules/checkIsValidUserInput.js';
import { getBullsAndCows } from './modules/getBullsAndCows.js';

const terminal = readline.createInterface(process.stdin, process.stdout);

const numberToGuess = getRandomNumbers();
let win = false;

while (!win) {
  const userNumber = await terminal.question('try to guess: \n');

  if (checkIsValidUserInput(userNumber)) {
    console.log(getBullsAndCows(userNumber, numberToGuess));

    if (userNumber === numberToGuess) {
      win = true;
      console.log('You win!');
    }
  } else {
    console.log('Error: Please enter a 4-digit number with all unique digits.');
  }
}

terminal.close();
