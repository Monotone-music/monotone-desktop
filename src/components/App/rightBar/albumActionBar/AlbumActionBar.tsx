
import styles from './styles.module.scss'
import { Box, Icon, Text } from '@chakra-ui/react'
import { BsThreeDots } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
const AlbumActionBar = () => {
  return (
    <Box className={styles.container}>
        <Box className={styles['text-wrapper']}>
            <Text className={styles.text}>Anh Trai Vuot Ngan Chong Gai</Text>
        </Box>
        <Box className={styles['cta-wrapper']}>
            <Box className={styles['option-wrapper']}>
                <Icon as={BsThreeDots} boxSize={6} color={'gray'} _hover={{color: 'white'}}/>
            </Box>
            <Box className={styles['close-wrapper']}>
                <Icon as={IoCloseOutline} boxSize={6} color={'gray'} _hover={{color: 'white'}}/>
            </Box>
        </Box>
    </Box>
  )
}

export default AlbumActionBar