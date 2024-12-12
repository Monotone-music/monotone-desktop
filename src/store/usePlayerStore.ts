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
      isShuffle: false,
      isRepeat: false,
      toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),
      toggleRepeat: () => set((state) => ({ isRepeat: !state.isRepeat })),
      playNextTrack: () => {
        const { queue, currentTrackId, isShuffle } = get();
        const currentTrackIndex = currentTrackId ? queue.indexOf(currentTrackId) : -1;

        let nextTrackIndex;
        if (isShuffle) {
          nextTrackIndex = Math.floor(Math.random() * queue.length);
        } else {
          nextTrackIndex = (currentTrackIndex + 1) % queue.length;
        }

        set({ currentTrackId: queue[nextTrackIndex] });
      },
      playPreviousTrack: () => {
        const { queue, currentTrackId, isShuffle } = get();
        const currentTrackIndex = currentTrackId ? queue.indexOf(currentTrackId) : -1;

        let previousTrackIndex;
        if (isShuffle) {
          previousTrackIndex = Math.floor(Math.random() * queue.length);
        } else {
          previousTrackIndex =
            (currentTrackIndex - 1 + queue.length) % queue.length;
        }

        set({ currentTrackId: queue[previousTrackIndex] });
      },
      addAlbumToQueue: (albumTrackIds, trackId) =>
        set(() => {
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
      setCurrentTrackId: (trackId) => set({ currentTrackId: trackId }),
      setCurrentTime: (time) => set({ currentTime: time }),
      setDuration: (duration) => set({ duration }),
      setVolume: (volume) => set({ volume }),
      setCurrentTrack: (currentTrack) => set({ currentTrack }),
    }),
    { name: "current-track-id" }
  )
);
