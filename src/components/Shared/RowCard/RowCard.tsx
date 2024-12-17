import React from "react";
import styles from "./styles.module.scss";
import { Box, Text } from "@chakra-ui/react";
import MusicCard from "../MusicCard/MusicCard";
import { useTabStore } from "../../../store/useTabStore";

interface RowCardProps {
  contentWidth: number;
  rowTitle: string;
  cardData: any[];
  showMore?: boolean;
  isWrap? :boolean;
}

const RowCard: React.FC<RowCardProps> = ({rowTitle, cardData, showMore = true, isWrap=false }) => {

  const setActiveTab = useTabStore((state) => state.setActiveTab);

  const handleSeeMoreClick = () => {
    setActiveTab(rowTitle); // Set the active tab based on the row title
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.top}>
        <Text className={styles.title}>{rowTitle}</Text>
        {showMore &&     <Text className={styles.seeMore}    onClick={handleSeeMoreClick}>See More</Text>}
    
      </Box>
      <Box className={isWrap ? styles['row-wrap'] : styles.row}>
        {cardData.map((item, index) => (
          <MusicCard key={index} itemData={item}/>
        ))}
      </Box>
    </Box>
  );
};

export default RowCard;
