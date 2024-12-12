import {
  Box,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import styles from "./styles.module.scss";
import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import formatDuration from "../../../../util/formatDuration";
import { IRecord } from "../../../../interface/Music";
import { usePlayerStore } from "../../../../store/usePlayerStore";
import playingGif from "../../../../assets/img/disc-unscreen.gif";
import { SlOptions } from "react-icons/sl";
import PlaylistModal from "../../../Playlist/PlaylistModal/PlaylistModal";
import DelelteDialog from "../../DeleteDialog/DelelteDialog";

interface RowRecordProps {
  record: IRecord;
  item: number;
  index: any;
  albumImages: string[];
  albumTrackIds: string[];
  playlistId: string;
}

const RowRecord: React.FC<RowRecordProps> = ({
  record,
  index,
  item,
  albumImages,
  albumTrackIds,
  playlistId
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { setCurrentTrack, addAlbumToQueue, currentTrackId } = usePlayerStore();
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [selectedRecordIndex, setSelectedRecordIndex] = useState<string | null>(
    null
  );

  const handleSetCurrentTrack = (record: IRecord) => {
    addAlbumToQueue(albumTrackIds, record._id);
    setCurrentTrack(record);
  };

  const handleMouseEnter = () => {
    setHoveredIndex(item);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleOpenModal = (recordId: string) => {
    setSelectedRecordId(recordId);
    onOpen();
  };

  const handleOpenDeleteModal = (recordId: string) => {
    setSelectedRecordIndex(recordId);
    onOpenDeleteModal();
  };

  return (
    <Tr
      className={`${styles.tableRow} ${
        currentTrackId === record._id ? styles.active : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={() => handleSetCurrentTrack(record)}
    >
      <Td className={styles.index}>
        {currentTrackId === record._id ? (
          <img src={playingGif} alt="Playing" className={styles.playingGif} />
        ) : hoveredIndex === item ? (
          <Icon as={FaPlay} boxSize={4} color="#FFFFFF" />
        ) : (
          item + 1
        )}
      </Td>
      <Td className={styles["title-col"]}>
        <Box className={styles["img-album"]}>
          <img
            src={albumImages ? albumImages[item] : ""}
            alt={record.title}
            className={styles.albumImage}
          />
        </Box>
        <Box className={styles["title-wrapper"]}>
          <span className={styles.title}>{record.title}</span>
          <span className={styles.artist}>{record.displayedArtist}</span>
        </Box>
      </Td>
      <Td className={styles.artist}>{record.displayedArtist}</Td>
      <Td className={styles.duration}>{formatDuration(record.duration)}</Td>
      <Td className={styles.option}>
        <Menu>
          <MenuButton boxSize={5} color="gray" _hover={{ color: "white" }}>
            <Icon as={SlOptions} />
          </MenuButton>
          <MenuList p={0}>
            <MenuItem
              bg="gray.700"
              _hover={{ bg: "gray.500" }}
              p={4}
              onClick={() => handleOpenModal(record._id)}
            >
              Adding to Playlist
            </MenuItem>
            <MenuItem
              bg="gray.700"
              _hover={{ bg: "gray.500" }}
              p={4}
              onClick={() => handleOpenDeleteModal(index)}
            >
              Remove Track
            </MenuItem>
          </MenuList>
        </Menu>
      </Td>

      <PlaylistModal
        isOpen={isOpen}
        onClose={onClose}
        recordingId={selectedRecordId}
        playlistId={playlistId}
      />

      <DelelteDialog
        isOpen={isOpenDeleteModal}
        onClose={onCloseDeleteModal}
        recordIndex={selectedRecordIndex}
      />
    </Tr>
  );
};

export default React.memo(RowRecord);
