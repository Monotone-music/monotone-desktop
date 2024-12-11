import React from "react";
import styles from "./styles.module.scss";
import { Box, Text } from "@chakra-ui/react";
import cardImg from "../../../../assets/img/aboutCard-img.jpg";

interface AboutCardProp {
  dataAboutCard: any[];
}

const AboutCard: React.FC<AboutCardProp> = ({ dataAboutCard }) => {
  return dataAboutCard.map((item, index) => (
    <Box className={styles.container} key={index}>
      <Box className={styles["img-wrapper"]}>
        <img src={cardImg} alt="" />
        <div className={styles.mask}>
          <Text className={styles["mask-title"]}>About the artist</Text>
        </div>
      </Box>
      <Box className={styles["info-wrapper"]}>
        <Box className={styles.top}>
          <Box className={styles.name}>
            <Text>{item.name}</Text>
          </Box>
          <Box className={styles["follow-btn"]}>Follow</Box>
        </Box>
        <Box className={styles.bottom}>
          <Text className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse,
            dolores excepturi obcaecati odio suscipit magni, quas accusantium
            perferendis qui eum aliquid nihil magnam vero quod natus iusto
            maiores facilis placeat.
          </Text>
        </Box>
      </Box>
    </Box>
  ));
};

export default AboutCard;
