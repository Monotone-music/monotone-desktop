import { Box, Icon } from '@chakra-ui/react'
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
        <Icon as={PiHouse} color={'white'} boxSize={7}/>
    </Box>
  )
}

export default HomeBtn