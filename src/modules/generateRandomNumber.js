'use strict';

export const getRandomNumbers = () => {
  let result = '';

  while (result.length < 4) {
    const digit = Math.floor(Math.random() * 10);

    if (result.length === 0 && digit === 0) continue;

    if (!result.includes(digit)) {
      result += digit;
    }
  }

  return result;
};
