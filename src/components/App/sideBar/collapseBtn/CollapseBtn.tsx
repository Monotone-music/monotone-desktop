import React from 'react'
import styles from './styles.module.scss'
import { useUIStore } from '../../../../store/useUIStore';
import { Box, Button, Icon, Text } from '@chakra-ui/react';
import { LuLibrary } from "react-icons/lu";
const CollapseBtn = () => {
  const {isSidebarOpen, toggleSidebar} = useUIStore();
  return (
        <Box className={styles.container} onClick={toggleSidebar}>
            <Icon as={LuLibrary} boxSize={7}/>
            {isSidebarOpen && <Text className={styles.text}>Your Library</Text>}
        </Box>
  )
}

export default CollapseBtn