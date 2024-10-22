import React from 'react'
import styles from './styles.module.scss'
import { Box, Icon, Img, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import {IconType} from 'react-icons'
import { useUIStore } from '../../../../store/useUIStore'


interface SideBtnProps {
    icon?: IconType;
    imgIcon?: string;
    toUrl: string;
    title: string;
    
}

const SideBtn:React.FC<SideBtnProps> = ({icon, toUrl, title, imgIcon}) => {
  const {isSidebarOpen} = useUIStore();
  return (
    <Link to={toUrl} className={styles.container}>
      {icon ?  <Icon as={icon} boxSize={6}/> : <img src={imgIcon} className={styles['img-logo']}/>}
       
        {isSidebarOpen && <Text className={styles.text}>{title}</Text>}
     
    </Link>
  )
}

export default SideBtn