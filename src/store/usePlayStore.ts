import { create } from "zustand";
import { PlayTrackState, StreamTrack } from "../interface/Play";


const usePlayTrackStore = create<PlayTrackState>((set) => ({
    currentTrack: null,
    isPlaying: false,
    volume: 1, // Default volume 100%
    progress: 0,
  
    // Handle streaming track from backend buffer
    playStreamTrack: ({ buffer }: StreamTrack) => {
      const audioBlob = new Blob([buffer], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
  
      set({
        currentTrack: audioUrl,
      });
    },
  
    setPlaying: () => set((state) => ({isPlaying: !state.isPlaying})),
  
    stopTrack: () => set({
      currentTrack: null,
      isPlaying: false
    }),
  }));
  
  export default usePlayTrackStore;