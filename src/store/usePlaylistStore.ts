import { create } from "zustand";
import { PlaylistState } from "../interface/Playlist";

const usePlaylistStore = create<PlaylistState>((set) => ({
    recordingId: null,
    setRecordingId: (recordingId) => set({recordingId})
  }));
  
  export default usePlaylistStore;