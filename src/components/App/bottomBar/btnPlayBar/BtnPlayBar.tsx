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
  disabled?: boolean
}

const BtnPlayBar: React.FC<BtnPlayBarProps> = ({
  icon,
  onClick,
  type = "normal",
  iconSize,
  iconColor = 'white',
  disabled = false,
}) => {
  return (
    <>
      {type === "normal" ? (
        <Box
          className={`${styles.container} ${disabled ? styles.disabled : ""}`}
          onClick={!disabled ? onClick : undefined}
          cursor={disabled ? "not-allowed" : "pointer"}
        >
          <Icon boxSize={iconSize} as={icon} color={iconColor} />
        </Box>
      ) : (
        <Box
          className={`${styles["play-pause-btn"]} ${disabled ? styles.disabled : ""}`}
          onClick={!disabled ? onClick : undefined}
          cursor={disabled ? "not-allowed" : "pointer"}
        >
          <Icon boxSize={iconSize} as={icon} color={iconColor} />
        </Box>
      )}
    </>
  );
};

export default BtnPlayBar;
