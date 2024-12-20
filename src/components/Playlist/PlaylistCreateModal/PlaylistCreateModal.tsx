import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import usePlaylistStore from "../../../store/usePlaylistStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { PlaylistSchema, PlaylistValue } from "../../../interface/Playlist";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreatePlaylistMutation } from "../../../mutation/useCreateNewPlaylist";
import { AxiosError } from "axios";

interface PlaylistCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PlaylistCreateModal: React.FC<PlaylistCreateModalProps> = ({
  isOpen,
  onClose,
}) => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PlaylistValue>({ resolver: yupResolver(PlaylistSchema), mode: 'onChange' });
  const { recordingId,  resetState } = usePlaylistStore();
  const createNewPlaylistMutation = useCreatePlaylistMutation();

  const onSubmit: SubmitHandler<any> = async (data) => {
    const formData = { ...data, recordingId };
    createNewPlaylistMutation.mutate(formData, {
      onSuccess: () => {
        toast({
          status: "success",
          title: "Create playlist successfully",
          duration: 2000,
          position: "top-right",
        });
        resetState()
        onClose();
      },

      onError: (e: any) => {
        const axiosError = e as AxiosError;
        const errorMessage = (axiosError.response?.data as { message: string })?.message || "Failed to create playlist!";
        toast({
          status: "error",
          duration: 2000,
          title: errorMessage,
          position: "top-right",
        });
      },
    });
  }; 
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Playlist</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Text mb="8px" fontWeight="bold"> Playlist Name:</Text>
            <Input placeholder="Enter playlist name..." {...register("name")} />
            {errors.name && <Text color="red.500" fontWeight="semibold" mt={2}>{errors.name.message}</Text>}


            <Flex alignItems="center" marginTop={4} justifyContent="flex-end"> 
        

            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button  colorScheme="teal" type="submit" disabled={!isValid}>
              Save
            </Button>
            </Flex>
          </form>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PlaylistCreateModal;
