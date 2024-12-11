import { Box, Icon, Td, Tr } from "@chakra-ui/react";
import styles from "./styles.module.scss";
import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import formatDuration from "../../../../util/formatDuration";
import { IRecord } from "../../../../interface/Music";
import { usePlayerStore } from "../../../../store/usePlayerStore";

interface RowRecordProps {
  record: IRecord;
  item: number;
  albumImages: string[];
  albumTrackIds: string[];
}

const RowRecord: React.FC<RowRecordProps> = ({ record, item, albumImages, albumTrackIds }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { setCurrentTrack , addAlbumToQueue} = usePlayerStore();

  const handleSetCurrentTrack = (record: IRecord) => {
    addAlbumToQueue(albumTrackIds, record._id)
    setCurrentTrack(record);
  };

  const handleMouseEnter = () => {
    setHoveredIndex(item);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  return (
    <Tr
      className={styles.tableRow}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleSetCurrentTrack(record)}
    >
      <Td className={styles.index}>
        {hoveredIndex === item ? (
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
    </Tr>
  );
};

export default React.memo(RowRecord);
