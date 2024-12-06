import React from "react";
import styles from "./styles.module.scss";
import { Avatar, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AvatarSection = () => {
  const navigate = useNavigate()

  const handleRedirectToAuth = () => {
    navigate('/auth/sign-in')
  }

  return (
    <Box className={styles.container} onClick={handleRedirectToAuth}>
      <Avatar name="Dan Abrahmov" size="sm" src="https://bit.ly/dan-abramov" />
    </Box>
  );
};

export default AvatarSection;
