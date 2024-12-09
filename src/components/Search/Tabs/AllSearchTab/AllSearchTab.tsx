import React, { useState } from "react";
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

const AllSearchTab:React.FC<AllSearchTabProps> = ({artist, recording, album, token}) => {
  return (
    <Box className={styles.container}>
      {recording && ( <SongContainer token={token} songs={recording}/>)}
     
      {artist && <ArtistContainer token={token} artist={artist}/>}
      {album &&  <AlbumContainer token={token} album={album}/>}
     
    </Box>
  );
};

export default AllSearchTab;
