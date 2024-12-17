import styles from './styles.module.scss'
import { Box, Flex, Spinner, Text } from '@chakra-ui/react'
import { usePlayerStore } from '../../../../store/usePlayerStore'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../../../../store/useAuthStore'
import { getTrackInfoById } from '../../../../service/track.api'
import { getAlbumImageByFileName } from '../../../../service/album.api'
import { useQueueStore, useUIStore } from '../../../../store/useUIStore'

const BottomTrack = () => {
  const {currentTrackId} = usePlayerStore()
  const {toggleRightBar} = useUIStore()
  const {toggleOpenQueue} = useQueueStore()
  const {token} = useAuthStore()



  const {data} = useQuery({
    queryKey: ['trackInfo', currentTrackId, token], 
    queryFn: () => getTrackInfoById(currentTrackId!, token!),
    enabled: !!currentTrackId && !!token 
  });
  
  const {data: imgTrack, isPending} = useQuery({
    queryKey: ['imgTrack', data?.recording?.image?.filename, token], 
    queryFn: () => getAlbumImageByFileName(data!.recording.image.filename, token!),
    enabled: !!data?.recording?.image?.filename && !!token 
  });

  const handleRightBar = () => {
    toggleRightBar(true)
    toggleOpenQueue(false)
  }

  if (!currentTrackId) {
    return (   
    <Flex flexDirection={'column'} justifyContent="center" alignContent="center" p={2}>
      <Text color="white" width={60}>Please choose</Text>
      <Text color="white" width={60}>song to play</Text>
    </Flex>)
  }
  return (
    <Box className={styles.container}>
        <Box className={styles['img-wrapper']}>
            {isPending ? <Spinner color='white'/> : <img src={imgTrack} alt="" />}
        </Box>
        
        <Box className={styles['info-wrapper']}>
            <Box className={styles.title} onClick={handleRightBar}>{data?.recording?.title}</Box>
            <Box className={styles.authors}>{data?.recording?.displayedArtist} </Box>
        </Box>
    </Box>
  )
}

export default BottomTrack