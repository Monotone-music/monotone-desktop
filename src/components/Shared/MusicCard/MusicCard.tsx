import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Box, Icon, Skeleton, Text } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import { useUIStore } from "../../../store/useUIStore";
import { useQuery } from "@tanstack/react-query";
import { getAlbumImageByFileName } from "../../../service/album.api";


interface MusicCardProps {
  itemData: any;
}

const MusicCard:React.FC<MusicCardProps> = ({itemData}) => {

  const {data, isLoading, error} = useQuery({
    queryKey: ['cardImg' , itemData.image.filename],
    queryFn: () => getAlbumImageByFileName(itemData.image.filename)
    
  })
  const [isHover, setIsHover] = useState<boolean>(false);
  const {toggleRightBar, toggleSidebar} = useUIStore()

  const handleToggleRightBar = () => {
    toggleRightBar(true)
    toggleSidebar(false)
  }

  useEffect(() => {
    // Clean up the object URL when the component unmounts
    return () => {
      if (data) {
        URL.revokeObjectURL(data);
      }
    };
  }, [data]);

  return (
    <Box
      className={styles.container}
      onClick={() => handleToggleRightBar()}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Box className={styles["img-wrapper"]}>
      <Skeleton isLoaded={!isLoading}>
        {data && <img src={data} alt="" />}
        </Skeleton>
        {isHover && (
          <Box className={`${styles.playBtn} ${styles.slideIn}`}>
            <Icon as={FaPlay} boxSize={3}/>
          </Box>
        )}
      </Box>
      <Box className={styles["info-wrapper"]}>
        <Text className={styles.des}>
          {itemData.albumArtist}
        </Text>
      </Box>
    </Box>
  );
};

export default MusicCard;
