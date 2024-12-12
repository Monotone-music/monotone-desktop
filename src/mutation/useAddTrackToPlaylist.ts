import { useMutation } from "@tanstack/react-query";
import { addingTrackToPlaylist } from "../service/playlist.api";
import { useAuthStore } from "../store/useAuthStore";

export const useAddTrackToPlaylistMutation = () => {
  const { token } = useAuthStore();

  return useMutation({
    mutationFn: ({
      playlistId,
      recordingId,
    }: {
      playlistId: string;
      recordingId: string;
    }) => addingTrackToPlaylist(playlistId, recordingId, token!),
  });
};
