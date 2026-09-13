import React from 'react';
import { useGame } from '../../features/game/useGame';
import { MatrixTable } from '../../features/game/MatrixTable';
import styles from './RulesPage.module.css';

export const RulesPage: React.FC = React.memo(() => {
  const { state } = useGame();

  return (
    <section className={styles.notebookPage} aria-label="Game Log">
      <div className={styles.pageContent}>
        <h2 className={styles.handH2}>1.0 Codebreaker Log</h2>
        <p className={styles.handP} style={{ marginBottom: '10px' }}>
          <strong>Rules:</strong> Guess the 4 unique digits. <strong>Bulls</strong> = correct digit & position. <strong>Cows</strong> = correct digit, wrong position.
        </p>
        
        <MatrixTable guesses={state.guesses} status={state.status} />
      </div>
    </section>
  );
});

RulesPage.displayName = 'RulesPage';

