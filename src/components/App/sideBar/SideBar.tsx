import React from 'react'
import styles from './styles.module.scss'
import { Box, useColorModeValue } from '@chakra-ui/react';
import SideBtn from './sideBtn/SideBtn';
import { useUIStore } from '../../../store/useUIStore';
import CollapseBtn from './collapseBtn/CollapseBtn';
import { RiPlayList2Fill } from "react-icons/ri";
import { FaRegFolderOpen  } from "react-icons/fa";
import { HiOutlineUser } from "react-icons/hi";
import { MdOutlinePodcasts } from "react-icons/md";
const SideBar = () => {
  const bg = useColorModeValue("white", "black");
  const color = useColorModeValue("black", "white");
  const {isSidebarOpen} = useUIStore();

  return (
    <Box width={isSidebarOpen ? 'auto' : 'auto'} bg={bg} color={color} className={styles.container}>
      <CollapseBtn/>
      <SideBtn icon={RiPlayList2Fill} title='Playlists' toUrl='/'/>
      <SideBtn icon={MdOutlinePodcasts} title='Podcasts' toUrl='/'/>
      <SideBtn icon={HiOutlineUser} title='Artists' toUrl='/'/>
      <SideBtn icon={FaRegFolderOpen} title='Local music' toUrl='/'/>
    </Box>
  )
}

export default SideBar