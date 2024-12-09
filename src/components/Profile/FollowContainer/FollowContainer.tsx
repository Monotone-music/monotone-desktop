import React from 'react'
import styles from './styles.module.scss'
import { Box } from '@chakra-ui/react'

const FollowContainer = () => {
  return (
    <Box className={styles.container}>
        <Box className={styles.following}>
            <Box className={styles.label}>Followers</Box>
            <Box className={styles.number}>2,985</Box>
        </Box>

        <Box className={styles.following}>
            <Box className={styles.label}>Following</Box>
            <Box className={styles.number}>132</Box>
        </Box>

        <Box className={styles.following}>
            <Box className={styles.label}>Likes</Box>
            <Box className={styles.number}>548</Box>
        </Box>
    </Box>
  )
}

export default FollowContainer