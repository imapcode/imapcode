// Retro 35mm Film Projector Audio Synthesizer via Web Audio API
class ProjectorAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private motorNode: OscillatorNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private gainNode: GainNode | null = null;
  private clickInterval: number | null = null;

  public init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public start() {
    try {
      this.init();
      if (!this.ctx) return;

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.045, this.ctx.currentTime); // Soft, gentle nostalgic volume
      this.gainNode.connect(this.ctx.destination);

      // Low mechanical motor hum (60Hz / 48Hz harmonic)
      this.motorNode = this.ctx.createOscillator();
      this.motorNode.type = 'triangle';
      this.motorNode.frequency.setValueAtTime(48, this.ctx.currentTime);

      const motorFilter = this.ctx.createBiquadFilter();
      motorFilter.type = 'lowpass';
      motorFilter.frequency.setValueAtTime(140, this.ctx.currentTime);

      this.motorNode.connect(motorFilter);
      motorFilter.connect(this.gainNode);
      this.motorNode.start();

      // Mechanical 24fps shutter click simulation
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      this.clickInterval = window.setInterval(() => {
        if (!this.ctx || !this.isPlaying || !this.gainNode) return;
        try {
          const clickSource = this.ctx.createBufferSource();
          clickSource.buffer = noiseBuffer;
          
          const clickFilter = this.ctx.createBiquadFilter();
          clickFilter.type = 'bandpass';
          clickFilter.frequency.value = 1800;
          clickFilter.Q.value = 8;

          const clickGain = this.ctx.createGain();
          clickGain.gain.setValueAtTime(0.025, this.ctx.currentTime);
          clickGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.03);

          clickSource.connect(clickFilter);
          clickFilter.connect(clickGain);
          clickGain.connect(this.gainNode);

          clickSource.start(this.ctx.currentTime);
          clickSource.stop(this.ctx.currentTime + 0.035);
        } catch {
          // ignore transient audio scheduling
        }
      }, 1000 / 24); // 24 FPS cadence

      this.isPlaying = true;
    } catch (e) {
      console.warn('AudioContext not allowed or failed:', e);
      this.isPlaying = false;
    }
  }

  public stop() {
    try {
      if (this.clickInterval) {
        clearInterval(this.clickInterval);
        this.clickInterval = null;
      }
      if (this.motorNode) {
        this.motorNode.stop();
        this.motorNode.disconnect();
        this.motorNode = null;
      }
      if (this.gainNode) {
        this.gainNode.disconnect();
        this.gainNode = null;
      }
    } catch {
      // safe cleanup
    }
    this.isPlaying = false;
  }
}

export const projectorAudio = new ProjectorAudioEngine();
