import React from 'react'
import styles from './styles.module.scss'
import { Box } from '@chakra-ui/react'
import PlaylistCard from './PlaylistCard/PlaylistCard'

interface PlaylistContainerProps {
    playlists: any[]
}

const PlaylistContainer:React.FC<PlaylistContainerProps> = ({playlists}) => {
    console.log(playlists)
  return (
    <Box className={styles.container}>
        <Box className={styles.title}>
            Your Playlist
        </Box>
        <Box className={styles['playlist-wrapper']}>
            {playlists.map((playlist, index) => (
                 <PlaylistCard dataCard={playlist} key={index}/>
            ))}
     
        </Box>
    </Box>
  )
}

export default PlaylistContainer