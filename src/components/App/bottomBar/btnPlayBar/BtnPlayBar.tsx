import React from "react";
import styles from "./styles.module.scss";
import { Box, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface BtnPlayBarProps {
  icon: IconType;
  onClick: () => void;
  type: "normal" | "playPause";
  iconSize: number;
  iconColor?: string;
}

const BtnPlayBar: React.FC<BtnPlayBarProps> = ({
  icon,
  onClick,
  type = "normal",
  iconSize,
  iconColor = 'white',
}) => {
  return (
    <>
      {type == "normal" ? (
        <Box className={styles.container} onClick={onClick}>
          <Icon boxSize={iconSize} as={icon} color={iconColor} />
        </Box>
      ) : (
        <Box className={styles['play-pause-btn']} onClick={onClick}>
          <Icon boxSize={iconSize} as={icon} color={iconColor}/>
        </Box>
      )}
    </>
  );
};

export default BtnPlayBar;
