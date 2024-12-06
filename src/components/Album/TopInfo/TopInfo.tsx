import React from "react";
import styles from "./styles.module.scss";
import { Box, Skeleton, Stack, Text } from "@chakra-ui/react";
import noImage from "../../../assets/img/no-image-1.png";
import { IImageAlbum } from "../../../interface/UI";
import { useQuery } from "@tanstack/react-query";
import { getAlbumImageByFileName } from "../../../service/album.api";
import { IRelease } from "../../../interface/Music";
import { useAuthStore } from "../../../store/useAuthStore";

interface TopInfoProps {
  title?: string;
  albumArtist?: string;
  image: IImageAlbum;
  duration?: string;
  releaseType?: string;
  release?: IRelease[];
}

const TopInfo: React.FC<TopInfoProps> = ({
  title = "Unknown Title",
  albumArtist = "Unknown Artist",
  image,
  duration = "Unknown Duration",
  releaseType = "Unknown Type",
  release = [{ trackCount: 0 }],
}) => {
  const {token} = useAuthStore()
  const totalSong = release[0]?.trackCount || 0;

  const { data, isLoading, error } = useQuery({
    queryKey: ["albumDetailImg"],
    queryFn: () => getAlbumImageByFileName(image?.filename, token!),
    enabled: !!image?.filename && !!token
  });

  if (isLoading) {
    return (
      <Stack>
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
      </Stack>
    );
  }

  if (error) {
    return <Box className={styles.container}>Error Loading Detail Page</Box>;
  }

  return (
    <Box className={styles.container}>
      <Box className={styles["img-wrapper"]}>
        <img src={data || noImage} alt="" loading="lazy" />
      </Box>

      <Box className={styles["info-wrapper"]}>
        <Box className={styles["title-wrapper"]}>
          <Text className={styles.title}>{title}</Text>
        </Box>
        <Box className={styles["artists-wrapper"]}>
          <Text className={styles.artists}>{albumArtist}</Text>
        </Box>

        <Box className={styles["others-wrapper"]}>
          <Text className={styles.others}>{totalSong} songs, 2hr 47min</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(TopInfo);
