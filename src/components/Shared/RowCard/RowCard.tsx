import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Box, Text } from "@chakra-ui/react";
import MusicCard from "../MusicCard/MusicCard";

interface RowCardProps {
  contentWidth: number;
  rowTitle: string;
  cardData: any[]
}

const RowCard: React.FC<RowCardProps> = ({ contentWidth, rowTitle, cardData }) => {
  const [numberCard, setNumberCard] = useState(4);
  useEffect(() => {
    const calculateNumberOfCards = () => {
      const cardWidth = 175; // Example card width
      const newNumberCard = Math.floor(contentWidth / cardWidth);
      setNumberCard(newNumberCard);
    };

    calculateNumberOfCards();
  }, [contentWidth]);

  return (
    <Box className={styles.container}>
      <Box className={styles.top}>
        <Text className={styles.title}>{rowTitle}</Text>
        <Text className={styles.seeMore}>See More</Text>
      </Box>
      <Box className={styles.row}>
        {cardData.map((item, index) => (
          <MusicCard key={index} itemData={item}/>
        ))}
      </Box>
    </Box>
  );
};

export default RowCard;
