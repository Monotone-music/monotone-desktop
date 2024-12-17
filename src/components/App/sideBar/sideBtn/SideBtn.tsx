import React from 'react'
import styles from './styles.module.scss'
import { Icon, Text } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
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
  const location = useLocation();
  const isActive = location.pathname === toUrl;
  return (
    <Link to={toUrl} className={`${styles.container} ${isActive ? styles.active : ''}`}>
      {icon ? <Icon as={icon} color={'white'} boxSize={6} /> : <img src={imgIcon} className={styles['img-logo']} />}
      {isSidebarOpen && <Text className={styles.text}>{title}</Text>}
    </Link>
  )
}

export default SideBtn