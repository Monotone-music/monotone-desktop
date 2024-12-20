import styles from "./styles.module.scss";
import { Box, Flex, Skeleton, Spinner, Text } from "@chakra-ui/react";
import { usePlayerStore } from "../../../../store/usePlayerStore";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../../store/useAuthStore";
import { getTrackInfoById } from "../../../../service/track.api";
import { getAlbumImageByFileName } from "../../../../service/album.api";
import { useQueueStore, useUIStore } from "../../../../store/useUIStore";
import imgAds from "../../../../assets/img/adsImage.jpg";

const BottomTrack = () => {
  const { currentTrackId, isAdPlaying } = usePlayerStore();
  const { toggleRightBar } = useUIStore();
  const { toggleOpenQueue } = useQueueStore();
  const { token } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ["trackInfo", currentTrackId, token],
    queryFn: () => getTrackInfoById(currentTrackId!, token!),
    enabled: !!currentTrackId && !!token,
  });

  const { data: imgTrack, isPending } = useQuery({
    queryKey: ["imgTrack", data?.recording?.image?.filename, token],
    queryFn: () =>
      getAlbumImageByFileName(data!.recording.image.filename, token!),
    enabled: !!data?.recording?.image?.filename && !!token,
  });

  const handleRightBar = () => {
    toggleRightBar(true);
    toggleOpenQueue(false);
  };

  if (!currentTrackId) {
    return (
      <Flex
        flexDirection={"column"}
        justifyContent="center"
        alignContent="center"
        p={2}
      >
        <Text color="white" width={60}>
          Please choose
        </Text>
        <Text color="white" width={60}>
          song to play
        </Text>
      </Flex>
    );
  }
  return (
    <Box className={styles.container}>
      {isLoading ? (
        <Skeleton height="62px" />
      ) : (
        <>
          <Box className={styles["img-wrapper"]}>
            {isPending ? (
              <Skeleton height="62px" width="110px" />
            ) : (
              <img src={isAdPlaying ? imgAds : imgTrack} alt="" />
            )}
          </Box>
          <Box className={styles["info-wrapper"]}>
            <Box className={styles.title} onClick={handleRightBar}>
              {isAdPlaying ? "Advertise playing" : data?.recording?.title}
            </Box>
            <Box className={styles.authors}>
              {isAdPlaying ? "" : data?.recording?.displayedArtist}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default BottomTrack;
