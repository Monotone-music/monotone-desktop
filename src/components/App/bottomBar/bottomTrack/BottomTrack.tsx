import styles from './styles.module.scss'
import { Box, Spinner } from '@chakra-ui/react'
import { usePlayerStore } from '../../../../store/usePlayerStore'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../../../../store/useAuthStore'
import { getTrackInfoById } from '../../../../service/track.api'
import { getAlbumImageByFileName } from '../../../../service/album.api'
import { useUIStore } from '../../../../store/useUIStore'

const BottomTrack = () => {
  const {currentTrackId} = usePlayerStore()
  const {toggleRightBar} = useUIStore()
  const {token} = useAuthStore()

  const {data} = useQuery({
    queryKey: ['trackInfo', currentTrackId, token], // Add currentTrackId to queryKey
    queryFn: () => getTrackInfoById(currentTrackId!, token!),
    enabled: !!currentTrackId && !!token // Ensure query runs only when both are valid
  });
  
  const {data: imgTrack, isPending} = useQuery({
    queryKey: ['imgTrack', data?.recording?.image?.filename, token], // Add image filename to queryKey
    queryFn: () => getAlbumImageByFileName(data!.recording.image.filename, token!),
    enabled: !!data?.recording?.image?.filename && !!token // Ensure query runs only when both are valid
  });

  const handleRightBar = () => {
    toggleRightBar(true)
  }
  
  return (
    <Box className={styles.container}>
        <Box className={styles['img-wrapper']}>
            {isPending ? <Spinner/> : <img src={imgTrack} alt="" />}
        </Box>
        
        <Box className={styles['info-wrapper']}>
            <Box className={styles.title} onClick={handleRightBar}>{data?.recording?.title}</Box>
            <Box className={styles.authors}>{data?.recording?.displayedArtist} </Box>
        </Box>
    </Box>
  )
}

export default BottomTrack