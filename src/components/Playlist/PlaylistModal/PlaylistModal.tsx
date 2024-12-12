import React from "react";
import styles from "./styles.module.scss";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Icon,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import PlaylistCreateModal from "../PlaylistCreateModal/PlaylistCreateModal";
import usePlaylistStore from "../../../store/usePlaylistStore";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../../service/profile.api";
import { useAuthStore } from "../../../store/useAuthStore";
import { useAddTrackToPlaylistMutation } from "../../../mutation/useAddTrackToPlaylist";

interface PlaylistModal {
  isOpen: boolean;
  onClose: () => void;
  recordingId: string | null;
  playlistId?: string;
}
const PlaylistModal: React.FC<PlaylistModal> = ({
  isOpen,
  onClose,
  recordingId,
}) => {
  const {
    isOpen: isOpenCreateModal,
    onOpen: OnOpenCreateModal,
    onClose: OnCloseCreateModal,
  } = useDisclosure();
  const { token } = useAuthStore();
  const toast = useToast();
  const { setRecordingId } = usePlaylistStore();
  const addTrackToPlaylistMutation = useAddTrackToPlaylistMutation();
  const handleCreatePlaylistClick = () => {
    onClose();
    OnOpenCreateModal();
    setRecordingId(recordingId!);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["profileUser"],
    queryFn: () => getProfile(token!),
    enabled: !!token,
  });

  const handleAddTrackToPlaylist = (
    playlistId: string,
    recordingId: string
  ) => {
    const dataSubmit = {
      playlistId: playlistId,
      recordingId: recordingId,
    };

    addTrackToPlaylistMutation.mutate(dataSubmit, {
      onSuccess: () => {
        toast({
          status: "success",
          title: "Adding track to playlist successfully",
          position: "top-right",
          duration: 2000,
        });
        onClose();
      },
      onError: () => {
        toast({
          status: "error",
          title: "Adding track to playlist failed",
          position: "top-right",
          duration: 2000,
        });
      },
    });

  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="white" color="black">
          <ModalHeader color="black">Adding song to your playlist</ModalHeader>
          <ModalCloseButton />
          <ModalBody bg="white" className={styles["modal-body"]}>
            <Box
              className={styles["create-playlist-row"]}
              onClick={handleCreatePlaylistClick}
            >
              <Icon as={FaPlus} />
              <Box className={styles.text}>Create new playlist</Box>
            </Box>

            <Box className={styles.divider}></Box>

            <Box className={styles["playlist-list"]}>
              {data?.data?.playlist.map((item: any, index: any) => (
                <Box
                  className={styles["playlist-row"]}
                  key={index}
                  onClick={() =>
                    handleAddTrackToPlaylist(item._id, recordingId!)
                  }
                >
                  <Box className={styles.text}>{item.name}</Box>
                </Box>
              ))}
            </Box>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      <PlaylistCreateModal
        isOpen={isOpenCreateModal}
        onClose={OnCloseCreateModal}
      />
    </>
  );
};

export default PlaylistModal;
