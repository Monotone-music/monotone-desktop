import styles from './styles.module.scss'
import { Box } from '@chakra-ui/react'

const TopInfo = () => {
  return (
    <Box className={styles.container}>
        <Box className={styles['content-wrapper']}>
            
            <Box className={styles.title}>
                Elevate Your Sound with Premium!
            </Box>
            <Box className={styles['sub-title']}>
                Upgrade now to Monotone Premium and listen to your favorite tracks, uninterrupted, anytime, anywhere.
            </Box>
        </Box>

      
    </Box>
  )
}

export default TopInfo