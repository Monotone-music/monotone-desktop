import { Button, useColorMode } from '@chakra-ui/react';
import React from 'react'

const ColorBtn = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        </Button>
      );
}

export default ColorBtn