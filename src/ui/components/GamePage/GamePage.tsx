import React, { useState } from 'react';
import { useGame } from '../../features/game/useGame';
import { useSound } from '../../hooks/useSound';
import { WinStamp } from '../../features/game/WinStamp';
import { GuessForm } from '../../features/game/GuessForm';
import styles from './GamePage.module.css';

export const GamePage: React.FC = () => {
  const { state, startGame } = useGame();
  const sound = useSound();
  const [crossedDigits, setCrossedDigits] = useState<number[]>([]);

  const handleStartGame = () => {
    sound.boot();
    setCrossedDigits([]);
    startGame();
  };

  const handleToggleDeduction = (num: number) => {
    sound.keypress();
    setCrossedDigits((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };

  const handleClearDeduction = () => {
    sound.click();
    setCrossedDigits([]);
  };

  let statusText = 'Awaiting input...';
  if (state.status === 'active') {
    statusText = 'Session active...';
  } else if (state.status === 'won') {
    statusText = `Cracked in ${state.guesses.length} round${state.guesses.length === 1 ? '' : 's'}!`;
  }

  return (
    <section className={styles.notebookPage} aria-label="Active Game Board">
      <div className={styles.pageContent}>
        <h2 className={styles.handH2}>2.0 Decipher Controls</h2>

        <div className={styles.interactiveSheetHeader}>
          <button className={styles.handBtn} onClick={handleStartGame}>
            START NEW DECIPHER RUN
          </button>
          <span className={styles.systemStatusIndicator} id="game-status-label">
            {statusText}
          </span>
        </div>

        <div style={{ marginTop: '20px' }}>
          <GuessForm />
        </div>

        <WinStamp active={state.status === 'won'} />

        <div className={styles.deductionSection} style={{ marginTop: 'auto', padding: '8px', border: '1px dashed var(--ink-color)', borderRadius: '6px', transform: 'rotate(1deg)' }}>
          <h3 style={{ fontFamily: 'var(--font-hand)', margin: '0 0 5px 0', fontSize: '1rem' }}>Deduction Helper</h3>
          <p style={{ fontSize: '0.8rem', margin: '0 0 8px 0' }}>Cross out digits you know are incorrect:</p>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
              const isCrossed = crossedDigits.includes(num);
              return (
                <button
                  key={num}
                  onClick={() => handleToggleDeduction(num)}
                  style={{
                    fontFamily: 'var(--font-hand)',
                    fontSize: '1rem',
                    width: '24px',
                    height: '24px',
                    background: 'transparent',
                    border: '1px solid var(--ink-color)',
                    borderRadius: '50%',
                    color: isCrossed ? 'var(--ink-pencil)' : 'var(--ink-color)',
                    textDecoration: isCrossed ? 'line-through' : 'none',
                    opacity: isCrossed ? 0.5 : 1,
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {num}
                </button>
              );
            })}
          </div>
          <button className={styles.handBtn} style={{ fontSize: '0.75rem', padding: '2px 8px' }} onClick={handleClearDeduction}>
            RESET HELPER
          </button>
        </div>
      </div>
    </section>
  );
};
