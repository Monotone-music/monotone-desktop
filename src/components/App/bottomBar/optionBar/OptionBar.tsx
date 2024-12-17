import styles from './styles.module.scss'
import VolumeBar from '../volumeBar/VolumeBar'
import { HiMiniQueueList } from "react-icons/hi2";
import { Icon } from '@chakra-ui/react';
import { useQueueStore, useUIStore } from '../../../../store/useUIStore';

const OptionBar = () => {
  const {toggleOpenQueue} = useQueueStore()
  const {toggleRightBar} = useUIStore()
  const handleToggleQueue = () => {
    toggleOpenQueue(true)
    toggleRightBar(false)
  }
  return (
    <div className={styles.container}>
        <Icon as={HiMiniQueueList} boxSize={5} onClick={handleToggleQueue} color='gray.700' _hover={{color: 'white'}} cursor={'pointer'} transition={"all ease 0.3s"}/>
        <VolumeBar/>
    </div>
  )
}

export default OptionBar