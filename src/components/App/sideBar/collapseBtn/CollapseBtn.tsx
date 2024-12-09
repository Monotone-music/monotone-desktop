import styles from './styles.module.scss'
import { useUIStore } from '../../../../store/useUIStore';
import { Box, Icon, Text } from '@chakra-ui/react';
import { IoChevronDownOutline, IoChevronForwardOutline } from 'react-icons/io5';
const CollapseBtn = () => {
  const {isSidebarOpen, toggleSidebar, toggleRightBar} = useUIStore();

  const handleToggleSidebar = () => {
    toggleSidebar(!isSidebarOpen)
    toggleRightBar(false)
  }

  return (
        <Box className={styles.container} onClick={handleToggleSidebar}>
            {isSidebarOpen ? <Icon as={IoChevronForwardOutline } boxSize={7}/> : <Icon as={IoChevronDownOutline } boxSize={7}/>}
            {isSidebarOpen && <Text className={styles.text}>Your Library</Text>}
        </Box>
  )
}

export default CollapseBtn