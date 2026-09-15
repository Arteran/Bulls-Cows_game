import { useState, useCallback, useRef } from 'react';
import { isValidGuess } from '../wrappers/gameLogic';

const DIGIT_COUNT = 4;

interface DigitInputAPI {
  digits: string[];
  warning: string;
  isSubmittable: boolean;
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  handleChange: (index: number, value: string) => void;
  handleKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  getGuess: () => string;
  resetDigits: () => void;
  focusFirst: () => void;
}

export function useDigitInput(
  onSound: (sound: 'keypress' | 'error') => void,
): DigitInputAPI {
  const [digits, setDigits] = useState<string[]>(Array(DIGIT_COUNT).fill(''));
  const [warning, setWarning] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(DIGIT_COUNT).fill(null));

  const validate = useCallback((current: string[]): boolean => {
    const combined = current.join('');
    if (combined.length < 4) return false;
    if (new Set(combined).size !== 4) {
      setWarning('Warning: digits must be unique!');
      return false;
    }
    setWarning('');
    return true;
  }, []);

  const handleChange = useCallback((index: number, value: string) => {
    if (value && !/^\d$/.test(value)) {
      onSound('error');
      return;
    }
    
    onSound('keypress');
    setWarning('');
    
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    
    if (value && index < DIGIT_COUNT - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    
    validate(next);
  }, [digits, onSound, validate]);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && digits[index] === '' && index > 0) {
      const next = [...digits];
      next[index - 1] = '';
      setDigits(next);
      inputRefs.current[index - 1]?.focus();
      onSound('keypress');
      validate(next);
    }
  }, [digits, onSound, validate]);

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  }, []);

  const getGuess = () => digits.join('');
  
  const resetDigits = () => {
    setDigits(Array(DIGIT_COUNT).fill(''));
    setWarning('');
  };
  
  const focusFirst = () => {
    inputRefs.current[0]?.focus();
  };

  const isSubmittable = digits.join('').length === 4 && warning === '' && isValidGuess(digits.join(''));

  return {
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
  };
}
