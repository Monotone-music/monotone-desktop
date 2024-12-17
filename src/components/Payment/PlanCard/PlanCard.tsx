import React from "react";
import styles from "./styles.module.scss";
import { Box, Button, ListItem, UnorderedList } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export interface PlanCardProps {
    cardType: string;
    cardTitle: string;
    priceMain: string;
    monthMain: string;
    priceLater: string;
    descPlan: string[]
    btnColor: string;
}

const PlanCard:React.FC<PlanCardProps> = ({
    cardTitle,
    cardType,
    descPlan,
    monthMain,
    priceLater,priceMain,
    btnColor
}) => {
  const navigate = useNavigate()
  const handleTogglePopup = () => {
    // toggleOpenPopup(true)
    navigate('/payment/checkout')
  }

  return (
    <Box className={styles.container}>
      <Box className={styles["info-wrapper"]}>
        <Box className={styles.cardType}>{cardType}</Box>
        <Box className={styles.cardTitle}>{cardTitle}</Box>
        <Box className={styles["price-wrapper"]}>
          <Box className={styles.priceMain}>{priceMain} for {monthMain} months</Box>
          <Box className={styles.priceLater}>{priceLater} / month later</Box>
        </Box>
      </Box>
      <Box className={styles.divider}></Box>
      <Box className={styles["list-desc-wrapper"]}>
        <UnorderedList>
            {descPlan.map((desc, index) => (
                  <ListItem key={index} color={'white'}>{desc}</ListItem>
            ))}
        
        </UnorderedList>
      </Box>
      <Button onClick={handleTogglePopup} style={{background: btnColor}} className={styles.btn}>Get {cardType} plan</Button>
    </Box>
  );
};

export default PlanCard;
