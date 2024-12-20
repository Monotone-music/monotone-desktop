export interface AudioState {
  audioBuffer: AudioBuffer | null;
  isPlaying: boolean;
  setAudioBuffer: (buffer: AudioBuffer) => void;
  togglePlayPause: (isPlaying: boolean) => void;
  setIsPlaying: (isPlaying: boolean) => void
}


export interface PlayerStore {
  currentTrack: any;
  isPlaying: any;
  isLoading: boolean;
  queue: string[];
  currentTrackId: string | null;
  currentTime: number;
  volume: number;
  duration: number;
  adId: string | null;
  isShuffle: boolean; // Indicates if shuffle mode is enabled
  isRepeat: boolean;  // Indicates if repeat mode is enabled
  trackCounter: number;
  isAdPlaying: boolean;
  setAdId: (adId: string | null) => void;
  setIsAdPlaying: (isAdsPlaying: boolean) =>  void;
  incrementTrackCounter: () => void;
  addAlbumToQueue: (albumTrackIds: string[], trackId: string) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentTrackId: (currentTrackId: string | null) => void;
  togglePlayPause: (isPlaying: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  setLoading: (isLoading: boolean) => void;
  setQueue: (trackIds: string[]) => void; // New setQueue function
  playNextTrack: () => void;
  playPreviousTrack: () => void; // Added method to play the previous track
  toggleShuffle: () => void;     // Toggles shuffle mode
  toggleRepeat: () => void;      // Toggles repeat mode
  setCurrentTrack: (currentTrack: any) => void;
  clearStatePlayer: () => void;
  clearStateCounter: () => void;
}