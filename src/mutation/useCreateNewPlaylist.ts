import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/useAuthStore";
import {
  createNewPlaylist,
  createNewPlaylistProps,
} from "../service/playlist.api";

export const useCreatePlaylistMutation = () => {
  const { token } = useAuthStore();

  return useMutation({
    mutationFn: (data: createNewPlaylistProps) =>
      createNewPlaylist(data, token!),
  });
};
