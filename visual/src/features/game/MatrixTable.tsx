import React, { useEffect, useRef } from 'react';
import type { Guess } from '../../types/game';
import styles from './MatrixTable.module.css';

interface MatrixTableProps {
  guesses: Guess[];
  status: string;
}

export const MatrixTable: React.FC<MatrixTableProps> = ({ guesses, status }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [guesses.length]);

  return (
    <div ref={containerRef} className={styles.matrixTableContainer}>
      <table className={styles.paperMatrixTable}>
        <thead>
          <tr>
            <th className={styles.colRound}>Round</th>
            <th className={styles.colGuess}>Guess</th>
            <th className={styles.colBulls}>Bulls (B)</th>
            <th className={styles.colCows}>Cows (C)</th>
          </tr>
        </thead>
        <tbody>
          {status === 'idle' ? (
            <tr className={styles.placeholderRow}>
              <td colSpan={4}>Click "Start New Decipher Run" to begin...</td>
            </tr>
          ) : guesses.length === 0 ? (
            <tr className={styles.placeholderRow}>
              <td colSpan={4}>Awaiting guess input...</td>
            </tr>
          ) : (
            guesses.map((guess) => (
              <tr key={guess.id}>
                <td>[{guess.round.toString().padStart(2, '0')}]</td>
                <td>{guess.digits}</td>
                <td>
                  <span className={styles.matrixCircled}>{guess.bulls}</span>
                </td>
                <td>
                  <span className={styles.matrixCircled}>{guess.cows}</span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
