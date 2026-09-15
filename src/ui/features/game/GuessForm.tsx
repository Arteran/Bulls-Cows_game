import React, { useEffect } from 'react';
import { useGame } from './useGame';
import { useDigitInput } from '../../hooks/useDigitInput';
import { useSound } from '../../hooks/useSound';
import { DigitInput } from './DigitInput';
import styles from './GuessForm.module.css';

export const GuessForm: React.FC = () => {
  const { state, submitGuess } = useGame();
  const sound = useSound();

  const onSound = (type: 'keypress' | 'error') => {
    if (type === 'keypress') sound.keypress();
    if (type === 'error') sound.error();
  };

  const {
    digits,
    warning,
    isSubmittable,
    inputRefs,
    handleChange,
    handleKeyDown,
    handleFocus,
    getGuess,
    resetDigits,
    focusFirst,
  } = useDigitInput(onSound);

  const isActive = state.status === 'active';

  useEffect(() => {
    if (isActive && state.guesses.length === 0) {
      resetDigits();
      const timer = setTimeout(() => {
        focusFirst();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isActive, state.guesses.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSubmittable || !isActive) return;

    const result = submitGuess(getGuess());
    if (result) {
      if (result.bulls === 4) {
        sound.success();
      } else {
        sound.enter();
        resetDigits();
        focusFirst();
      }
    }
  };

  return (
    <div className={styles.inputWorkspace}>
      <h3 className={styles.handH3}>Next Decryption guess:</h3>

      <form className={styles.digitInputForm} onSubmit={handleSubmit}>
        <div className={styles.inputsRow}>
          {digits.map((digit, idx) => (
            <DigitInput
              key={idx}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              onFocus={handleFocus}
              disabled={!isActive}
              ariaLabel={`Digit ${idx + 1}`}
            />
          ))}
        </div>
        <button
          type="submit"
          className={styles.handSubmitBtn}
          disabled={!isActive || !isSubmittable}
        >
          DECRYPT CODE
        </button>
      </form>

      <div className={styles.warningInkMessage} aria-live="assertive">
        {warning}
      </div>
    </div>
  );
};
