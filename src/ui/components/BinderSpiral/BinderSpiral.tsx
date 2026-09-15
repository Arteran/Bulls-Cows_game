import React from 'react';
import styles from './BinderSpiral.module.css';

export const BinderSpiral: React.FC = React.memo(() => {
  return (
    <div className={styles.binderSpiral} aria-hidden="true">
      {Array.from({ length: 11 }).map((_, idx) => (
        <div key={idx} className={styles.spiralLoop} />
      ))}
    </div>
  );
});

BinderSpiral.displayName = 'BinderSpiral';
