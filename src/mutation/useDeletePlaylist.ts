import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/useAuthStore";
import { deletePlaylist } from "../service/playlist.api";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export const useDeletePlaylistMutation = () => {
  const { token } = useAuthStore();
  const navigate = useNavigate()
  const toast = useToast()
  
  return useMutation({
    mutationFn: (data: any) =>
        deletePlaylist(data, token!),
    onSuccess: () => {
      toast({
        status:'success',
        title: "Delete playlist successfully",
        position: "top-right",
        duration: 2000
      })
      navigate('/profile')
    },
    onError: () => {
      toast({
        status:'error',
        title: "Delete playlist failed",
        position: "top-right",
        duration: 2000
      })
    }
  });
};
