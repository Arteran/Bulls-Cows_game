import React from 'react';
import { useGame } from '../../features/game/useGame';
import { useSound } from '../../hooks/useSound';
import { MatrixTable } from '../../features/game/MatrixTable';
import { WinStamp } from '../../features/game/WinStamp';
import { GuessForm } from '../../features/game/GuessForm';
import styles from './GamePage.module.css';

export const GamePage: React.FC = () => {
  const { state, startGame } = useGame();
  const sound = useSound();

  const handleStartGame = () => {
    sound.boot();
    startGame();
  };

  let statusText = 'Awaiting input...';
  if (state.status === 'active') {
    statusText = 'Session active...';
  } else if (state.status === 'won') {
    statusText = `Cracked in ${state.guesses.length} round${state.guesses.length === 1 ? '' : 's'}!`;
  }

  return (
    <section className={`${styles.notebookPage} notebook-page-bg`} aria-label="Active Game Board">
      <div className="page-top-margin"></div>
      <div className={styles.pageContent}>
        <h2 className={styles.handH2}>2.0 Codebreaker Sheet</h2>

        <div className={styles.interactiveSheetHeader}>
          <button className={styles.handBtn} onClick={handleStartGame}>
            START NEW DECIPHER RUN
          </button>
          <span className={styles.systemStatusIndicator} id="game-status-label">
            {statusText}
          </span>
        </div>

        <MatrixTable guesses={state.guesses} status={state.status} />

        <WinStamp active={state.status === 'won'} />

        <GuessForm />
      </div>
    </section>
  );
};
