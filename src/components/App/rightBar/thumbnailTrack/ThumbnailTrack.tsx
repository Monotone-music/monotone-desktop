import React from 'react'
import styles from './styles.module.scss'
import { Box, Text } from '@chakra-ui/react'

interface ThumbnailTrackProps {
    imgUrl?: string;
    title?: string;
    author?: string;
}

const ThumbnailTrack:React.FC<ThumbnailTrackProps> = ({imgUrl}) => {
  return (
    <Box className={styles.container}>
        <Box className={styles['img-wrapper']}>
            {imgUrl && <img src="" alt="" />}
        </Box>

        <Box className={styles['info-wrapper']}>
            <Box className={styles['name-author-wrapper']}>
                <Text className={styles.title}>
                    Less Than Zero
                </Text>
                <Text className={styles.author}>
                    The Weeknd
                </Text>
            </Box>
        </Box>
    </Box>
  )
}

export default ThumbnailTrack