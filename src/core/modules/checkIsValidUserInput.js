'use strict';
export function checkIsValidUserInput(userInput) {
  return (
    userInput.length === 4 && isFinite(+userInput) && new Set(userInput).size === 4
  );
}
