import React from 'react';
import styles from './WinStamp.module.css';

interface WinStampProps {
  active: boolean;
}

export const WinStamp: React.FC<WinStampProps> = ({ active }) => {
  return (
    <div className={styles.crackedStampWrapper}>
      <div className={`${styles.crackedStamp} ${active ? styles.active : ''}`}>
        CRACKED!
      </div>
    </div>
  );
};
