import React, { useState } from 'react';
import { useSettings } from '../../features/settings/useSettings';
import { useSound } from '../../hooks/useSound';
import styles from './StickyNotes.module.css';

export const StickyNotes: React.FC = () => {
  const { state, setInkTheme, toggleGrid, toggleAudio, toggleDrawMode, clearDrawings } = useSettings();
  const sound = useSound();
  const [crossedDigits, setCrossedDigits] = useState<number[]>([]);

  const handleInkChange = (theme: 'ink-blue' | 'ink-black' | 'ink-pencil') => {
    sound.click();
    setInkTheme(theme);
  };

  const handleGridToggle = () => {
    sound.click();
    toggleGrid();
  };

  const handleAudioToggle = () => {
    if (!state.audioActive) {
      toggleAudio();
      setTimeout(() => sound.boot(), 50);
    } else {
      toggleAudio();
    }
  };

  const handleDrawToggle = () => {
    if (!state.drawMode) {
      sound.boot();
    } else {
      sound.click();
    }
    toggleDrawMode();
  };

  const handleClearDrawings = () => {
    sound.success();
    clearDrawings();
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

  return (
    <div className={styles.stickyNotesContainer}>
      <div className={`${styles.stickyNote} ${styles.noteYellow}`}>
        <h4 className={styles.stickyTitle}>SELECT INK</h4>
        <button
          className={`${styles.inkBtn} ${state.inkTheme === 'ink-blue' ? styles.active : ''}`}
          onClick={() => handleInkChange('ink-blue')}
          aria-label="Blue Pen Ink"
        >
          BLUE PEN
        </button>
        <button
          className={`${styles.inkBtn} ${state.inkTheme === 'ink-black' ? styles.active : ''}`}
          onClick={() => handleInkChange('ink-black')}
          aria-label="Black Pen Ink"
        >
          BLACK PEN
        </button>
        <button
          className={`${styles.inkBtn} ${state.inkTheme === 'ink-pencil' ? styles.active : ''}`}
          onClick={() => handleInkChange('ink-pencil')}
          aria-label="Pencil Graphite"
        >
          PENCIL
        </button>
      </div>

      <div className={`${styles.stickyNote} ${styles.notePink}`}>
        <h4 className={styles.stickyTitle}>OPTIONS</h4>
        <button
          className={`${styles.optionToggle} ${state.gridActive ? styles.active : ''}`}
          role="switch"
          aria-checked={state.gridActive}
          onClick={handleGridToggle}
        >
          <span className={styles.checkboxBox}>{state.gridActive ? '[X]' : '[ ]'}</span> GRID LINE
        </button>
        <button
          className={`${styles.optionToggle} ${state.audioActive ? styles.active : ''}`}
          role="switch"
          aria-checked={state.audioActive}
          onClick={handleAudioToggle}
        >
          <span className={styles.checkboxBox}>{state.audioActive ? '[X]' : '[ ]'}</span> SOUNDS
        </button>
        <button
          className={`${styles.optionToggle} ${state.drawMode ? styles.active : ''}`}
          role="switch"
          aria-checked={state.drawMode}
          onClick={handleDrawToggle}
        >
          <span className={styles.checkboxBox}>{state.drawMode ? '[X]' : '[ ]'}</span> DRAW MODE
        </button>
        <button
          className={styles.optionToggle}
          aria-label="Erase drawings"
          onClick={handleClearDrawings}
        >
          <span className={styles.checkboxBox}></span> ERASE PAGE
        </button>
      </div>

      <div className={`${styles.stickyNote} ${styles.noteOrange}`}>
        <h4 className={styles.stickyTitle}>DEDUCTION HELPER</h4>
        <p className={styles.stickyText} style={{ fontSize: '0.8rem', margin: 0 }}>
          Tap numbers to cross out:
        </p>
        <div className={styles.deductionGrid}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
            const isCrossed = crossedDigits.includes(num);
            return (
              <button
                key={num}
                className={`${styles.deductionNum} ${isCrossed ? styles.crossed : ''}`}
                onClick={() => handleToggleDeduction(num)}
              >
                {num}
              </button>
            );
          })}
        </div>
        <button className={styles.btnClearDeduction} onClick={handleClearDeduction}>
          RESET BOARD
        </button>
      </div>
    </div>
  );
};
