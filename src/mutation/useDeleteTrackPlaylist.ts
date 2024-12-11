import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/useAuthStore";
import { deleteTrackFromPlaylist } from "../service/playlist.api";
import { useParams } from "react-router-dom";

export const useDeleteTrackFromPlaylistMutation = () => {
  const { token } = useAuthStore();
  const { playlistId } = useParams<{ playlistId: string }>();
  return useMutation({
    mutationFn: (data: any) =>
      deleteTrackFromPlaylist(playlistId!, data, token!),
  });
};
