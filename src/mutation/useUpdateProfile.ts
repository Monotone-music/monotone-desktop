import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDisplayname, updateImage } from '../service/profile.api';

export const useUpdateNameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { displayName: string }) => 
      updateDisplayname(data.displayName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

export const useUpdateImageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => 
      updateImage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};