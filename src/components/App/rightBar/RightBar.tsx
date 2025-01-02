import styles from "./styles.module.scss";
import { useUIStore } from "../../../store/useUIStore";
import AlbumActionBar from "./albumActionBar/AlbumActionBar";
import ThumbnailTrack from "./thumbnailTrack/ThumbnailTrack";
import AboutArtist from "./aboutArtist/AboutArtist";
import { usePlayerStore } from "../../../store/usePlayerStore";
import { useAuthStore } from "../../../store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { getAlbumImageByFileName } from "../../../service/album.api";
import { getTrackInfoById } from "../../../service/track.api";
import { Spinner, Box, Text } from "@chakra-ui/react";

const RightBar = () => {
  const { isRightBarOpen, toggleRightBar } = useUIStore();
  const { currentTrackId } = usePlayerStore();
  const { token } = useAuthStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["track", currentTrackId],
    queryFn: () => getTrackInfoById(currentTrackId!, token!),
    enabled: !!currentTrackId && !!token,
  });

  const { data: imgTrack, isLoading: isImgLoading } = useQuery({
    queryKey: ["imgTrack", data?.recording?.image?.filename, token],
    queryFn: () => data?.recording?.image?.filename 
      ? getAlbumImageByFileName(data.recording.image.filename, token!)
      : null,
    enabled: !!data?.recording?.image?.filename && !!token,
  });

  const containerStyle = {
    display: isRightBarOpen ? "block" : "none"
  };

  if (!currentTrackId) {
        toggleRightBar(false)
    return (
      <Box className={styles.container} style={containerStyle}>
        <Text color="gray.500">No track selected</Text>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box className={styles.container} style={containerStyle}>
        <Text color="red.500">Error loading track information</Text>
      </Box>
    );
  }

  if (isLoading || isImgLoading) {
    return (
      <section className={styles.loadingContainer}>
        <Spinner size="lg" thickness="4px" color="white"/>
      </section>
    );
  }

  if (!data?.recording) {
    return (
      <Box className={styles.container} style={containerStyle}>
        <Text color="gray.500">No track data available</Text>
      </Box>
    );
  }

  return (
    <section className={styles.container} style={containerStyle}>
      <AlbumActionBar title={data.recording.title} />
      <ThumbnailTrack
        imgUrl={imgTrack!}
        author={data.recording.displayedArtist}
        title={data.recording.title}
      />
      <AboutArtist artistData={data.recording.artist} />
    </section>
  );
};

export default RightBar;