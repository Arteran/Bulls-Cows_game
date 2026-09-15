type OscillatorType = 'sine' | 'square' | 'sawtooth' | 'triangle';

class AudioService {
  private ctx: AudioContext | null = null;
  private muted = false;

  initOnUserGesture(): void {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
  }

  get isMuted(): boolean {
    return this.muted;
  }

  setMuted(value: boolean): void {
    this.muted = value;
  }

  playTone(freq: number, type: OscillatorType, duration: number, volume = 0.08): void {
    if (this.muted || !this.ctx) return;
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }

    try {
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Failed to play tone:', e);
    }
  }
}

export const audioService = new AudioService();
