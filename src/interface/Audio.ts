export interface AudioState {
  audioBuffer: AudioBuffer | null;
  isPlaying: boolean;
  setAudioBuffer: (buffer: AudioBuffer) => void;
  togglePlayPause: (isPlaying: boolean) => void;
  setIsPlaying: (isPlaying: boolean) => void
}


export interface PlayerStore {
  currentTrack: any;
  queue: string[];
  currentTrackId: string | null;
  currentTime: number;
  volume: number;
  duration: number;
  addAlbumToQueue: (albumTrackIds: string[], trackId: string) => void;
  setCurrentTrackId: (currentTrackId: string | null) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  playNextTrack: () => void;
  setCurrentTrack: (currentTrack: any) => void
}