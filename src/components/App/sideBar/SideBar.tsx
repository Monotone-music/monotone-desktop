import styles from './styles.module.scss'
import { Box, useColorModeValue } from '@chakra-ui/react';
import SideBtn from './sideBtn/SideBtn';
import { useUIStore } from '../../../store/useUIStore';
import CollapseBtn from './collapseBtn/CollapseBtn';
import { HiOutlineUser } from "react-icons/hi";
import { MdOutlinePayments } from "react-icons/md";
const SideBar = () => {
  const bg = useColorModeValue("white", "black");
  const color = useColorModeValue("black", "white");
  const {isSidebarOpen} = useUIStore();


  return (
    <Box width={isSidebarOpen ? 'auto' : 'auto'} bg={bg} color={color} className={styles.container}>
      <CollapseBtn/>
      {/* <SideBtn icon={RiPlayList2Fill} title='Playlists' toUrl='/'/> */}
      {/* <SideBtn icon={MdOutlinePodcasts} title='Podcasts' toUrl='/'/>
      <SideBtn icon={HiOutlineUser} title='Artists' toUrl='/'/> */}
      {/* <SideBtn icon={FaRegFolderOpen} title='Local music' toUrl='/'/> */}
      <SideBtn icon={HiOutlineUser} title='Profile' toUrl='/profile'/>
      <SideBtn icon={MdOutlinePayments } title='Payment' toUrl='/payment'/>
    </Box>
  )
}

export default SideBar