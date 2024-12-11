import React from "react";
import styles from "./styles.module.scss";
import { Box, Skeleton, Stack, Text } from "@chakra-ui/react";
import noImage from "../../../assets/img/no-image-1.png";
import { IImageAlbum } from "../../../interface/UI";
import { useQuery } from "@tanstack/react-query";
import { getAlbumImageByFileName } from "../../../service/album.api";
import { IRelease } from "../../../interface/Music";
import { useAuthStore } from "../../../store/useAuthStore";
import formatMonthYear from "../../../util/formatDate";

interface TopInfoProps {
  name?: string;
  image: IImageAlbum;
  recording?: IRelease[];
  createdAt?: string;
}

const TopInfoPlaylist: React.FC<TopInfoProps> = ({
  name = "Unknown Title",
  image,
  recording = [{ trackCount: 0 }],
  createdAt
}) => {
  const {token} = useAuthStore()
  const totalSong = recording.length || 0

  const { data, isLoading, error } = useQuery({
    queryKey: ["playlistDetailImg"],
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
          <Text className={styles.title}>{name}</Text>
        </Box>
        <Box className={styles["artists-wrapper"]}>
          <Text className={styles.artists}>Created at {formatMonthYear(createdAt!) }</Text>
        </Box>

        <Box className={styles["others-wrapper"]}>
          <Text className={styles.others}>{totalSong} songs</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(TopInfoPlaylist);
