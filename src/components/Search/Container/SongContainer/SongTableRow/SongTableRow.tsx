import React from "react";
import styles from "./styles.module.scss";
import { ITrackSearchRecord } from "../../../../../interface/Music";
import { Box, Spinner, Td, Tr } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getAlbumImageByFileName } from "../../../../../service/album.api";
import { usePlayerStore } from "../../../../../store/usePlayerStore";

interface SongTableRowProps {
  index: number;
  songData: ITrackSearchRecord;
  token: string;
}
const SongTableRow: React.FC<SongTableRowProps> = ({
  index,
  songData,
  token,
}) => {
  const {setCurrentTrackId, setQueue} = usePlayerStore()
  const handleClick = () => {
    setQueue([songData.source.info.recording._id]); // Set the queue with the selected song
    setCurrentTrackId(songData.source.info.recording._id);
  };
  const { data, isLoading } = useQuery({
    queryKey: ["trackImgSearch"],
    queryFn: () =>
      getAlbumImageByFileName(
        songData.source.info.recording.image.filename,
        token!
      ),
    enabled: !!token,
  });

  return (
    <Tr key={index} className={styles.row} onClick={handleClick}>
      <Td
        style={{ padding: "16px 8px", width: "90%" }}
        className={styles["song-img-wrapper"]}
      >
        <Box className={styles["img-wrapper"]}>
          {isLoading ? <Spinner color="white"/> : <img src={data} alt="" />}
        </Box>
        <Box className={styles["song-info"]}>
          <Box className={styles["song-title"]}>
            {songData.source.info.recording.title}
          </Box>
          <Box className={styles["song-artist"]}>
            {songData.source.info.recording.displayedArtist}
          </Box>
        </Box>
      </Td>
      <Td
        style={{
          padding: "0 8px",
          width: "10%",
          textAlign: "right",
          fontSize: "12px",
          color: 'white'
        }}
      >
        4:30
      </Td>
    </Tr>
  );
};

export default SongTableRow;
