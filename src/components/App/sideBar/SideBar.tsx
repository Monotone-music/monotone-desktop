import styles from './styles.module.scss'
import { Box } from '@chakra-ui/react';
import SideBtn from './sideBtn/SideBtn';
import { useUIStore } from '../../../store/useUIStore';
import CollapseBtn from './collapseBtn/CollapseBtn';
import { HiOutlineUser } from "react-icons/hi";
import { MdOutlinePayments } from "react-icons/md";
const SideBar = () => {
  const {isSidebarOpen} = useUIStore();


  return (
    <Box width={isSidebarOpen ? 'auto' : 'auto'} className={styles.container}>
      <CollapseBtn/>
      <SideBtn icon={HiOutlineUser} title='Profile' toUrl='/profile'/>
      <SideBtn icon={MdOutlinePayments } title='Payment' toUrl='/payment'/>
    </Box>
  )
}

export default SideBar