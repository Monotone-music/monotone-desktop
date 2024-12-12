import React from 'react'
import styles from './styles.module.scss'
import { Box, Text } from '@chakra-ui/react';
import MusicCard from '../../Shared/MusicCard/MusicCard';

interface AlbumContainerProps {
    albums: any[]
}


const AlbumContainer:React.FC<AlbumContainerProps> = ({albums}) => {

  return (
    <Box className={styles.container}>
        <Box className={styles.title}>
            <Text>
                Albums
            </Text>
        </Box>
        <Box className={styles['playlist-wrapper']}>
            {albums.map((album, index) => {
                return <MusicCard itemData={album} key={index}/>
            })}
     
        </Box>
    </Box>
    )
}

export default AlbumContainer