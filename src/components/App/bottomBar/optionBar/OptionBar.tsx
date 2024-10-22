import React from 'react'
import styles from './styles.module.scss'
import VolumeBar from '../volumeBar/VolumeBar'
import { HiMiniQueueList } from "react-icons/hi2";
import { Icon } from '@chakra-ui/react';

const OptionBar = () => {
  return (
    <div className={styles.container}>
        <Icon as={HiMiniQueueList} boxSize={5}/>
        <VolumeBar/>
    </div>
  )
}

export default OptionBar