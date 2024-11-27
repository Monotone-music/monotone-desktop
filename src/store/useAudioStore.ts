import { create } from "zustand";
import { AudioState } from "../interface/Audio";

const useAudioStore = create<AudioState>((set) => ({
  audioBuffer: null,
  isPlaying: false,
  setAudioBuffer: (buffer) => set({ audioBuffer: buffer }),
  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
}));

export default useAudioStore;
