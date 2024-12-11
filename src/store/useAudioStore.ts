import { create } from "zustand";
import { AudioState } from "../interface/Audio";

const useAudioStore = create<AudioState>((set) => ({
  audioBuffer: null,
  isPlaying: false,
  setAudioBuffer: (buffer) => set({ audioBuffer: buffer }),
  togglePlayPause: (isPlaying) => set({isPlaying}),
  setIsPlaying: (isPlaying) => set({isPlaying})
}));

export default useAudioStore;
