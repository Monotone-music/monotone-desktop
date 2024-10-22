import React from 'react'
import styles from './styles.module.scss'
import { Box, Icon, Progress } from '@chakra-ui/react'
import { CiVolumeHigh } from "react-icons/ci";
const VolumeBar = () => {
  return (
    <Box className={styles.container}>
        <Box className={styles['icon-wrapper']}>
            <Icon as={CiVolumeHigh} boxSize={5}/>
        </Box>
        <Box className={styles['bar-wrapper']}>
            <Progress value={100} size='xs' colorScheme='green' borderRadius={10}/>
        </Box>
    </Box>
  )
}

export default VolumeBar