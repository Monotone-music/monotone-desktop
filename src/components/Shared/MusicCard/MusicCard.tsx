import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Box, Icon, Spinner, Text } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getAlbumImageByFileName } from "../../../service/album.api";
import { useNavigate } from "react-router-dom";
import ErrorWarning from "../../Error/ErrorWarning/ErrorWarning";
import noImage from "../../../assets/img/no-image-1.png";
import { useAuthStore } from "../../../store/useAuthStore";

interface MusicCardProps {
  itemData: {
    _id: string;
    title: string;
    albumArtist: string;
    image: { filename: string };
  };
}

const MusicCard: React.FC<MusicCardProps> = ({ itemData }) => {
  const {token} = useAuthStore()
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["cardImg", itemData.image.filename],
    queryFn: () => getAlbumImageByFileName(itemData.image.filename, token!),
    enabled: !!token
  });
  const [isHover, setIsHover] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      if (data) {
        URL.revokeObjectURL(data);
      }
    };
  }, [data]);

  const handleRedirectToDetailPage = (albumId: string) => {
    navigate(`/home/album/${albumId}`);
  };

  if (error) {
    return (
      <Box className={styles.container}>
        <ErrorWarning title="Error" description="Cannot load the Music Card" />
      </Box>
    );
  }

  return (
    <Box
      className={styles.container}
      onClick={() => handleRedirectToDetailPage(itemData._id)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isLoading ? (
        <Box className={styles.loadingContainer}>
          <Spinner color="white"/>
        </Box>
      ) : (
        <Box className={styles["img-wrapper"]} border="none">
          <img src={data || noImage} alt={itemData.title} />

          {isHover && (
            <Box className={`${styles.playBtn} ${styles.slideIn}`}>
              <Icon as={FaPlay} boxSize={3} color={'white'}/>
            </Box>
          )}
        </Box>
      )}

      <Box className={styles["info-wrapper"]}>
        <Text className={styles.title}>{itemData.title}</Text>
        <Text className={styles.des}>{itemData.albumArtist}</Text>
      </Box>
    </Box>
  );
};

export default React.memo(MusicCard);
