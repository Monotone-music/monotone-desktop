import { create } from "zustand";
import { PlayerStore } from "../interface/Audio";
import { persist } from "zustand/middleware";

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => ({
      queue: [],
      currentTrack: null,
      currentTrackId: null,
      currentTime: 0,
      volume: 0.5,
      duration: 0,
      addAlbumToQueue: (albumTrackIds, trackId) =>
        set((state) => {
          const currentTrackIndex = albumTrackIds.indexOf(trackId);
          const newQueue = [
            ...albumTrackIds.slice(currentTrackIndex),
            ...albumTrackIds.slice(0, currentTrackIndex),
          ];
          return {
            queue: newQueue, 
            currentTrackId: trackId,
          };
        }),
        playNextTrack: () => {
          const { queue, currentTrackId } = get();
          const currentTrackIndex = currentTrackId ? queue.indexOf(currentTrackId) : -1;
          const nextTrackIndex = (currentTrackIndex + 1) % queue.length;
          set({ currentTrackId: queue[nextTrackIndex] });
        },
      setCurrentTrackId: (trackId) => set({ currentTrackId: trackId }),
      setCurrentTime: (time) => set({ currentTime: time }),
      setDuration: (duration) => set({ duration }),
      setVolume: (volume) => set({ volume }),
      setCurrentTrack: (currentTrack) => set({currentTrack})
    }),
    { name: "current-track-id" }
  )
);
