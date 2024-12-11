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
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import PlaylistCreateModal from "../PlaylistCreateModal/PlaylistCreateModal";
import usePlaylistStore from "../../../store/usePlaylistStore";

interface PlaylistModal {
  isOpen: boolean;
  onClose: () => void; recordingId: string | null;
}
const PlaylistModal: React.FC<PlaylistModal> = ({ isOpen, onClose, recordingId }) => {
  const {
    isOpen: isOpenCreateModal,
    onOpen: OnOpenCreateModal,
    onClose: OnCloseCreateModal,
  } = useDisclosure();
  const { setRecordingId } = usePlaylistStore();
  const handleCreatePlaylistClick = () => {
    onClose();
    OnOpenCreateModal(); 
    setRecordingId(recordingId!)
  };

  
 
  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="white" color="black">
        <ModalHeader color="black">Adding song to your playlist</ModalHeader>
        <ModalCloseButton />
        <ModalBody bg="white" className={styles["modal-body"]}>
          <Box className={styles["create-playlist-row"]} onClick={handleCreatePlaylistClick}>
            <Icon as={FaPlus} />
            <Box className={styles.text}>Create new playlist</Box>
          </Box>

          <Box className={styles.divider}></Box>

          <Box className={styles["playlist-list"]}>
            <Box className={styles["playlist-row"]}>
              <Box className={styles.text}>My Playlist 1</Box>
            </Box>
            <Box className={styles["playlist-row"]}>
              <Box className={styles.text}>My Playlist 1</Box>
            </Box>
            <Box className={styles["playlist-row"]}>
              <Box className={styles.text}>My Playlist 1</Box>
            </Box>
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
