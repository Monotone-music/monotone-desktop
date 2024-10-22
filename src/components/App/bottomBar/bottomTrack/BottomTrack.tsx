import React from 'react'
import styles from './styles.module.scss'
import { Box } from '@chakra-ui/react'
import demoImg from '../../../../assets/img/aboutCard-img.jpg'

const BottomTrack = () => {
  return (
    <Box className={styles.container}>
        <Box className={styles['img-wrapper']}>
            <img src={demoImg} alt="" />
        </Box>
        
        <Box className={styles['info-wrapper']}>
            <Box className={styles.title}>Seasons</Box>
            <Box className={styles.authors}>Thirty seconds to Mars </Box>
        </Box>
    </Box>
  )
}

export default BottomTrack