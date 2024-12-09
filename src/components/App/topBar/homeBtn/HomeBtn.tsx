import { Box, Icon, Text } from '@chakra-ui/react'
import styles from './styles.module.scss'
import { PiHouse } from "react-icons/pi";
import { useLocation, useNavigate } from 'react-router-dom';

const HomeBtn = () => {
  const navigate = useNavigate();
  const redirectBackHome = () => {
    navigate('/home')
  }

  const location = useLocation();
  const isActive = location.pathname === '/home';
  return (
    <Box className={`${styles.container} ${isActive ? styles.active : ''}`} onClick={redirectBackHome}>
        <Icon as={PiHouse} boxSize={7}/>
        {/* <Text className={styles.text}>Home</Text> */}
    </Box>
  )
}

export default HomeBtn