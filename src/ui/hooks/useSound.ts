import { audioService } from '../services/AudioService';

interface SoundAPI {
  click: () => void;
  keypress: () => void;
  enter: () => void;
  boot: () => void;
  success: () => void;
  error: () => void;
  warning: () => void;
}

export function useSound(): SoundAPI {
  const play = audioService.playTone.bind(audioService);

  return {
    click: () => play(550, 'triangle', 0.03, 0.04),
    keypress: () => play(750, 'sine', 0.015, 0.03),
    enter: () => play(880, 'sine', 0.08, 0.05),
    boot: () => {
      play(380, 'sine', 0.08, 0.06);
      setTimeout(() => play(580, 'sine', 0.08, 0.06), 70);
      setTimeout(() => play(880, 'sine', 0.2, 0.06), 140);
    },
    success: () => {
      [523.25, 659.25, 783.99, 1046.5].forEach((note, i) =>
        setTimeout(() => play(note, 'square', 0.12, 0.05), i * 100)
      );
    },
    error: () => {
      play(160, 'sawtooth', 0.2, 0.06);
      setTimeout(() => play(120, 'sawtooth', 0.15, 0.06), 90);
    },
    warning: () => play(440, 'triangle', 0.12, 0.04),
  };
}
