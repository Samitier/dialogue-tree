export class Oscillator {
  oscillator!: OscillatorNode
  gain!: GainNode
  isPlaying = false

  constructor(
    private frequency: number = 500,
    private type: OscillatorType = 'sine',
    private context: AudioContext = new AudioContext()
  ) {
    this.init()
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  start({ frequency = 0, type = '' as OscillatorType }): void {
    if (frequency) this.oscillator.frequency.value = frequency
    if (type) this.oscillator.type = type
    this.isPlaying = true
    this.oscillator.start()
  }

  stop(): void {
    this.isPlaying = false
    this.gain.gain.linearRampToValueAtTime(
      0,
      this.context.currentTime + 0.01
    )
    this.oscillator.stop(this.context.currentTime + 0.01)
    this.init()
  }

  setFrequency(frequency: number): void {
    this.oscillator.frequency.value = frequency
  }

  getFrequency(): number {
    return this.oscillator.frequency.value
  }

  private init() {
    this.oscillator = this.context.createOscillator()
    this.gain = this.context.createGain()
    this.oscillator.type = this.type
    this.oscillator.frequency.value = this.frequency
    this.oscillator.connect(this.gain)
    this.gain.connect(this.context.destination)
  }
}
