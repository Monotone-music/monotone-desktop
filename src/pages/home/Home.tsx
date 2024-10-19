import React from "react";
import styles from "./styles.module.scss";
import { Box, useColorModeValue } from "@chakra-ui/react";
import ColorBtn from "../../components/Setting/colorBtn/ColorBtn";
const Home = () => {
  const bg = useColorModeValue("gray.100", "gray.700");
  const color = useColorModeValue("black", "white");

  return (
    <>
    <ColorBtn/>
    <Box bg={bg} color={color} p={4}>
      This box adjusts its background and text color based on the color mode.
    </Box>
    </>
  );
};

export default Home;
