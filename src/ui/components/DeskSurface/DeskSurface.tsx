import React from 'react';
import styles from './DeskSurface.module.css';

interface DeskSurfaceProps {
  children: React.ReactNode;
}

export const DeskSurface: React.FC<DeskSurfaceProps> = ({ children }) => {
  return (
    <main className={styles.deskSurface}>
      {children}
    </main>
  );
};
