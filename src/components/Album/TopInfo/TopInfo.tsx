import React from "react";
import styles from "./styles.module.scss";
import { Box, Skeleton, Stack, Text } from "@chakra-ui/react";
import noImage from "../../../assets/img/no-image-1.png";
import { IImageAlbum } from "../../../interface/UI";
import { useQuery } from "@tanstack/react-query";
import { getAlbumImageByFileName } from "../../../service/album.api";
import { IRelease } from "../../../interface/Music";
import { useAuthStore } from "../../../store/useAuthStore";
import ErrorWarning from "../../Error/ErrorWarning/ErrorWarning";

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
        <Skeleton height="280px" />
      </Stack>
    );
  }

  if (error) {
    return <Box className={styles.container}>
       <ErrorWarning title="Error" description="Album Detail Info is error, please try again"/>
    </Box>;
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
          <Text className={styles.others}>{totalSong} songs</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(TopInfo);
