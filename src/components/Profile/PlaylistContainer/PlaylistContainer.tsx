import React from 'react'
import styles from './styles.module.scss'
import { Box, Button, Icon, Text, useDisclosure } from '@chakra-ui/react'
import PlaylistCard from './PlaylistCard/PlaylistCard'
import PlaylistCreateModal from '../../Playlist/PlaylistCreateModal/PlaylistCreateModal'
import { FaPlus } from 'react-icons/fa'

interface PlaylistContainerProps {
    playlists: any[]
}

const PlaylistContainer:React.FC<PlaylistContainerProps> = ({playlists}) => {
      const {
        isOpen: isOpenCreateModal,
        onOpen: OnOpenCreateModal,
        onClose: OnCloseCreateModal,
      } = useDisclosure();
  return (
    <Box className={styles.container}>
        <Box className={styles.title}>
            <Text>Your Playlist</Text>
            <Button variant="ghost" onClick={OnOpenCreateModal}>
                <Icon as={FaPlus} boxSize={4}/>
            </Button>
        </Box>
        <Box className={styles['playlist-wrapper']}>
            {playlists.map((playlist, index) => (
                 <PlaylistCard dataCard={playlist} key={index}/>
            ))}
     
        </Box>

        <PlaylistCreateModal
          isOpen={isOpenCreateModal}
          onClose={OnCloseCreateModal}/>
    </Box>
  )
}

export default PlaylistContainer