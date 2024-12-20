import { create } from "zustand";
import { PlayerStore } from "../interface/Audio";
import { persist } from "zustand/middleware";

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => ({
      queue: [],
      isPlaying: false,
      currentTrack: null,
      currentTrackId: null,
      adId: null,
      currentTime: 0,
      volume: 0.5,
      duration: 0,
      isShuffle: false,
      isRepeat: false,
      isLoading: false,
      trackCounter: 0,
      isAdPlaying: false,
      setAdId: (adId) => set({adId}),
      setIsAdPlaying: (isAdPlaying) => set({isAdPlaying}),
      setLoading: (isLoading) => set({isLoading}),
      setIsPlaying: (isPlaying) => set({isPlaying}),
      togglePlayPause: (isPlaying) => set({isPlaying}),
      toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),
      toggleRepeat: () => set((state) => ({ isRepeat: !state.isRepeat })),
      setQueue: (trackIds) =>
        set(() => ({
          queue: trackIds,
          currentTrackId: trackIds[0],
        })),
      playNextTrack: () => {
        const { queue, currentTrackId, isShuffle } = get();
        const currentTrackIndex = currentTrackId ? queue.indexOf(currentTrackId) : -1;

        let nextTrackIndex;
        if (isShuffle) {
          nextTrackIndex = Math.floor(Math.random() * queue.length);
        } else {
          nextTrackIndex = (currentTrackIndex + 1) % queue.length;
        }
        // get().incrementTrackCounter();
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
        incrementTrackCounter: () =>
          set((state) => ({
            trackCounter: state.trackCounter + 1,
          })),
      setCurrentTrackId: (trackId) => set({ currentTrackId: trackId }),
      setCurrentTime: (time) => set({ currentTime: time }),
      setDuration: (duration) => set({ duration }),
      setVolume: (volume) => set({ volume }),
      setCurrentTrack: (currentTrack) => set({ currentTrack }),
      clearStateCounter: () => set({
          trackCounter: 0,
           isAdPlaying: false
      }),
      clearStatePlayer: () => set({
          currentTrackId: null,
          queue: [],
          isPlaying: false,
          isShuffle: false,
          isRepeat: false,
          trackCounter: 0,
          isAdPlaying: false,
          adId: null,
        }),
        
    }),
    
    { name: "current-track-id" }
  )
);

