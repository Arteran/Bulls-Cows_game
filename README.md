# Bulls and Cows Game

A console implementation of the classic logical code-breaking mind game, written in Node.js.

## Rules of the Game

The computer generates a random **4-digit number** where all digits are unique (no duplicates), and the first digit is not zero.

Your goal is to guess this number. After each attempt, the game provides a hint with the number of "bulls" and "cows":
* **Bulls**: the number of digits that are guessed correctly and are in the correct position.
* **Cows**: the number of digits that are correct but in the wrong position.

### Example:
Secret number: `5902`  
Your guess: `5920`  
Result: `close, 2 bulls and 2 cows` (Bulls: `5` and `9`, Cows: `2` and `0`).

---

## 🚀 How to Run the Game

To run the project, make sure you have **Node.js** (version 22.0.0 or higher) installed on your system.

1. Ensure you are in the project's root directory:
   ```bash
   cd Bulls-Cows_console-game
   ```

2. Run the game using one of the following commands:
   ```bash
   npm run play
   ```
   or directly with Node.js:
   ```bash
   node src/app.js
   ```

---

## 📁 Project Structure

```text
├── src/
│   ├── app.js                          # Main application entry point
│   └── modules/
│       ├── checkIsValidUserInput.js     # Validates user inputs
│       ├── generateRandomNumber.js      # Generates a random secret number
│       └── getBullsAndCows.js           # Calculates bulls and cows count
├── .gitignore                          # Standard Node.js Git ignore rules
├── package.json                        # Node.js project configuration and scripts
└── README.md                           # Project documentation (this file)
```
