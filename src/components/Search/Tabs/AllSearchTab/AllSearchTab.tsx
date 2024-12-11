import React from "react";
import styles from "./styles.module.scss";
import { Box } from "@chakra-ui/react";
import SongContainer from "../../Container/SongContainer/SongContainer";
import ArtistContainer from "../../Container/ArtistContainer/ArtistContainer";
import AlbumContainer from "../../Container/AlbumContainer/AlbumContainer";


interface AllSearchTabProps {
  artist: any[];
  recording: any[];
  album: any[]
  token: string;
}

const AllSearchTab: React.FC<AllSearchTabProps> = ({ artist, recording, album, token }) => {
  const noData = !artist?.length && !recording?.length && !album?.length;

  return (
    <Box className={styles.container}>
      {noData ? (
        <Box className={styles.notFound}>No Results Found</Box>
      ) : (
        <>
          {recording.length > 0 && <SongContainer token={token} songs={recording} />}
          {artist.length > 0 && <ArtistContainer token={token} artist={artist} />}
          {album.length > 0 && <AlbumContainer token={token} album={album} />}
        </>
      )}
    </Box>
  );
};

export default AllSearchTab;
