import React, { forwardRef } from 'react';
import styles from './DigitInput.module.css';

interface DigitInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled: boolean;
  ariaLabel: string;
}

export const DigitInput = forwardRef<HTMLInputElement, DigitInputProps>(({
  value,
  onChange,
  onKeyDown,
  onFocus,
  disabled,
  ariaLabel,
}, ref) => {
  return (
    <input
      type="text"
      ref={ref}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      disabled={disabled}
      maxLength={1}
      className={styles.digitCell}
      autoComplete="off"
      aria-label={ariaLabel}
      pattern="[0-9]"
    />
  );
});

DigitInput.displayName = 'DigitInput';
