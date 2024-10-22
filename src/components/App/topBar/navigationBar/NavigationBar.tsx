
import styles from './styles.module.scss'
import { Box, Icon } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { IoChevronBackOutline, IoChevronForwardOutline  } from "react-icons/io5";
const NavigationBar = () => {
  return (
    <Box className={styles.container}>
        <Link to={'/'} className={styles['link-container']}>
            <Icon as={IoChevronBackOutline} boxSize={7}/>
        </Link>
        <Link to={'/'} className={styles['link-container']}>
            <Icon as={IoChevronForwardOutline} boxSize={7}/>
        </Link>
    </Box>
  )
}

export default NavigationBar