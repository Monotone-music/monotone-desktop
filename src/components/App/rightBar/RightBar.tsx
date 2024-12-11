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
  const { isRightBarOpen } = useUIStore();
  const { currentTrackId } = usePlayerStore();
  const { token } = useAuthStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["trackInfo", currentTrackId, token], // Include currentTrackId in queryKey
    queryFn: () => getTrackInfoById(currentTrackId!, token!),
    enabled: !!currentTrackId && !!token, // Only run query if both are valid
  });

  const { data: imgTrack, isLoading: isImgLoading } = useQuery({
    queryKey: ["imgTrack", data?.recording?.image?.filename, token], // Include image filename in queryKey
    queryFn: () =>
      getAlbumImageByFileName(data!.recording.image.filename, token!),
    enabled: !!data?.recording?.image?.filename && !!token, // Only run query if both are valid
  });


  if (isError && !data?.recording) {
    return (
      <Box
        className={styles.container}
        style={isRightBarOpen ? { display: "block" } : { display: "none" }}
      >
        <Text color="red.500">Error loading track information.</Text>
      </Box>
    );
  }

  return isLoading || isImgLoading ? (
    <section
    className={styles.container} 
    style={isRightBarOpen ? { display: "block" } : { display: "none" }}

    >
      <Spinner />
    </section>
  ) : (
    <section
      className={styles.container}
      style={isRightBarOpen ? { display: "block" } : { display: "none" }}
    >
      <AlbumActionBar title={data.recording.title} />
      <ThumbnailTrack
        imgUrl={imgTrack}
        author={data.recording.displayedArtist}
        title={data.recording.title}
      />
      <AboutArtist artistData={data.recording.artist} />
    </section>
  );
};

export default RightBar;
