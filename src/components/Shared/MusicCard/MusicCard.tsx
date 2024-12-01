import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Box, Icon, Text } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getAlbumImageByFileName } from "../../../service/album.api";
import { useNavigate } from "react-router-dom";
import ErrorWarning from "../../Error/ErrorWarning/ErrorWarning";

interface MusicCardProps {
  itemData: any;
}

const MusicCard: React.FC<MusicCardProps> = ({ itemData }) => {
  console.log(itemData);
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["cardImg", itemData.image.filename],
    queryFn: () => getAlbumImageByFileName(itemData.image.filename),
  });
  const [isHover, setIsHover] = useState<boolean>(false);

  useEffect(() => {
    // Clean up the object URL when the component unmounts
    return () => {
      if (data) {
        URL.revokeObjectURL(data);
      }
    };
  }, [data]);

  const handleRedirectToDetailPage = (albumId: string) => {
    navigate(`/album/${albumId}`);
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
      <Box className={styles["img-wrapper"]}>
        <img src={data} alt="" />

        {isHover && (
          <Box className={`${styles.playBtn} ${styles.slideIn}`}>
            <Icon as={FaPlay} boxSize={3} />
          </Box>
        )}
      </Box>
      <Box className={styles["info-wrapper"]}>
        <Text className={styles.title}>{itemData.title}</Text>
        <Text className={styles.des}>{itemData.albumArtist}</Text>
      </Box>
    </Box>
  );
};

export default MusicCard;
