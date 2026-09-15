# Bulls & Cows: Paper & Pen Notebook Edition

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

Bulls & Cows is a classic logical code-breaking mind game. This project features two interfaces: the original Node.js console implementation and a modern React + TypeScript web application designed with a tactile, retro-minimalist paper notebook aesthetic.

---

## Game Interface Preview

![Bulls & Cows: Paper & Pen Edition](./assets/game_mockup.jpg)

---

## Game Formats and Execution

The project provides two separate interfaces: the web application and the console interface.

### 1. Web Version (React + TypeScript)
A modern browser-based implementation styled as an open graph paper notebook.

**Key Features:**
*   **Deduction Helper**: A dedicated helper listing digits 0 to 9. Click on numbers to cross them out and aid your logical calculations.
*   **Draw Mode**: Write notes, draw arrows, or make custom annotations directly on the notebook pages using virtual ink (blue pen, black pen, or pencil).
*   **Retro Audio Synthetics**: Dynamic sound effects for keypresses, successful decryption, and errors powered by the Web Audio API.
*   **Responsive Design**: The notebook layout automatically reflows to a stacked single-page view on mobile viewports.

#### How to run the web version:
1. Ensure you are in the project's root directory and install dependencies:
   ```bash
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. Open the development link in your browser: `http://localhost:5173`.

---

### 2. Console Version (Node.js)
The original text-based terminal version of the game.

#### How to run the console version:
1. Ensure you are in the project's root directory and install dependencies.
2. Execute the run script:
   ```bash
   npm run play
   ```
   or run it directly using Node.js:
   ```bash
   node src/core/app.js
   ```
3. Enter your guesses in response to the terminal prompts to crack the code.

---

## Game Rules

The computer generates a random 4-digit number where all digits are unique and the first digit is not zero.

Your goal is to guess this number. After each attempt, the game provides a hint specifying the number of "Bulls" and "Cows":
*   **Bulls**: Digits that are guessed correctly and are in the correct position.
*   **Cows**: Digits that are correct but in the wrong position.

### Example:
*   Secret number: `5902`
*   Your guess: `5920`
*   Result: `2 bulls and 2 cows` (Bulls: `5` and `9` are in their correct slots. Cows: `2` and `0` exist in the code but are in different positions).

---

## Project Structure

This project uses a Unified Architecture, storing both core console logic and UI logic within a single workspace.

```text
├── assets/
│   └── game_mockup.jpg
├── src/
│   ├── core/                           # Core game logic modules (backend)
│   │   ├── app.js
│   │   └── modules/
│   │       ├── checkIsValidUserInput.js
│   │       ├── generateRandomNumber.js
│   │       └── getBullsAndCows.js
│   └── ui/                             # React + TypeScript web app (visual)
│       ├── wrappers/
│       ├── features/
│       ├── hooks/
│       └── styles/
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```
