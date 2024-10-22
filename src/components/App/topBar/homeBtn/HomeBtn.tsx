import { Box, Icon, Text } from '@chakra-ui/react'
import styles from './styles.module.scss'
import React from 'react'
import { PiHouse } from "react-icons/pi";

const HomeBtn = () => {
  return (
    <Box className={styles.container}>
        <Icon as={PiHouse} boxSize={7}/>
        {/* <Text className={styles.text}>Home</Text> */}
    </Box>
  )
}

export default HomeBtn