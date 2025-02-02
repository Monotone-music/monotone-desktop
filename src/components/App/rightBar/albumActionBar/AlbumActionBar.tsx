
import styles from './styles.module.scss'
import { Box, Icon, Text } from '@chakra-ui/react'
import { BsThreeDots } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import { useUIStore } from '../../../../store/useUIStore';

interface AlbumActionBarProp{
    title: string;
}

const AlbumActionBar:React.FC<AlbumActionBarProp> = ({title}) => {
    const {toggleRightBar} = useUIStore()

    const handleToggleBar = () => {
        toggleRightBar(false)
    }

  return (
    <Box className={styles.container}>
        <Box className={styles['text-wrapper']}>
            <Text className={styles.text} color={'white'}>{title}</Text>
        </Box>
        <Box className={styles['cta-wrapper']}>
            <Box className={styles['option-wrapper']}>
                <Icon as={BsThreeDots} boxSize={6} color={'gray'} _hover={{color: 'white'}}/>
            </Box>
            <Box className={styles['close-wrapper']} onClick={() => handleToggleBar()}>
                <Icon as={IoCloseOutline} boxSize={6} color={'gray'} _hover={{color: 'white'}}/>
            </Box>
        </Box>
    </Box>
  )
}

export default AlbumActionBar