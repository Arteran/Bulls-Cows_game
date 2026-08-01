import React from 'react';
import styles from './NotebookWrapper.module.css';

interface NotebookWrapperProps {
  children: React.ReactNode;
}

export const NotebookWrapper: React.FC<NotebookWrapperProps> = ({ children }) => {
  return (
    <div className={styles.notebookWrapper} id="notebook-container">
      {children}
    </div>
  );
};
