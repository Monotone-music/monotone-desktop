import { Box, Icon, Text } from '@chakra-ui/react'
import styles from './styles.module.scss'
import { PiHouse } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

const HomeBtn = () => {
  const navigate = useNavigate();
  const redirectBackHome = () => {
    navigate('/home')
  }
  return (
    <Box className={styles.container} onClick={redirectBackHome}>
        <Icon as={PiHouse} boxSize={7}/>
        {/* <Text className={styles.text}>Home</Text> */}
    </Box>
  )
}

export default HomeBtn