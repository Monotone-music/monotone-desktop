export interface AudioState {
  audioBuffer: AudioBuffer | null;
  isPlaying: boolean;
  setAudioBuffer: (buffer: AudioBuffer) => void;
  togglePlayPause: () => void;
}
