import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useDeleteTrackFromPlaylistMutation } from '../../../mutation/useDeleteTrackPlaylist';
import { useQueryClient } from '@tanstack/react-query';

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  recordIndex: any;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ isOpen, onClose, recordIndex }) => {
  const cancelRef = React.useRef(null);
  const toast = useToast();
  const queryClient = useQueryClient();

  const deleteTrackFromPlaylistMutation = useDeleteTrackFromPlaylistMutation();

  const handleDelete = async (data: any) => {
    deleteTrackFromPlaylistMutation.mutate(data, {
      onSuccess: () => {
        toast({
          status: 'success',
          title: 'Remove successfully',
          duration: 2000,
        });
        queryClient.invalidateQueries({ queryKey: ['playlistDetail'] }); // Invalidate the playlist query to refresh the list
        onClose();
      },
      onError: () => {
        toast({
          status: 'error',
          duration: 2000,
          title: 'Remove failed',
        });
      },
    });
  };

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Are you sure you want to discard all of your notes? 44 words will be deleted.
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button colorScheme="red" ml={3} onClick={() => handleDelete(recordIndex)}>
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;