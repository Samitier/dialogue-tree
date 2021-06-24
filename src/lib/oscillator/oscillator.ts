export class Oscillator {
  public isPlaying = false
  private oscillator!: OscillatorNode
  private gain!: GainNode

  constructor(private context: AudioContext = new AudioContext()) {
    this.oscillator = this.context.createOscillator()
    this.gain = this.context.createGain()
    this.oscillator.connect(this.gain)
    this.gain.connect(this.context.destination)
    this.gain.gain.value = 0
    this.oscillator.start()
    // The sound will never play unless there's user gesture (security reasons)
    window.addEventListener('click', () => {
      this.context.resume()
    })
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  start({ frequency = 500, type = 'sine' as OscillatorType }): void {
    this.oscillator.frequency.value = frequency
    this.oscillator.type = type
    this.isPlaying = true
    this.gain.gain.linearRampToValueAtTime(
      0.8,
      this.context.currentTime + 0.01
    )
  }

  stop(): void {
    this.isPlaying = false
    this.gain.gain.linearRampToValueAtTime(
      0,
      this.context.currentTime + 0.02
    )
  }
}
