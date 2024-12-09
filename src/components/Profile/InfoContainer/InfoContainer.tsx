import { Box } from "@chakra-ui/react";
import React from "react";
import styles from "./styles.module.scss";
import formatMonthYear from "../../../util/formatDate";


interface InfoContainerProps {
  displayName: string;
  createdAt: string;
}

const InfoContainer:React.FC<InfoContainerProps> = ({displayName, createdAt}) => {
  return (
    <Box className={styles.container}>
      <Box className={styles.background}></Box>

      <Box className={styles["info-wrapper"]}>
        <Box className={styles["img-container"]}>
          <Box className={styles["img-wrapper"]}>
            <img src="https://bit.ly/dan-abramov" alt="" />
          </Box>
        </Box>
        <Box className={styles["content-container"]}>
          <Box className={styles["name"]}>{displayName}</Box>
          <Box className={styles["created_at"]}>Join Monotone at {formatMonthYear(createdAt)}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InfoContainer;
