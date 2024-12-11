import React from 'react'
import styles from './styles.module.scss'
import { Box } from '@chakra-ui/react'
import playlistImg from '../../../../assets/img/playlistImg.png'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../../../../store/useAuthStore'
import { getAlbumImageByFileName } from '../../../../service/album.api'
import { useNavigate } from 'react-router-dom'

interface PlaylistCardProps {
    dataCard: any
}
const PlaylistCard:React.FC<PlaylistCardProps> = ({dataCard}) => {
    console.log(dataCard)
    const {token} = useAuthStore()
    const navigate = useNavigate()
    const {data, isLoading, error } = useQuery({
        queryKey: ['cardImg', token],
        queryFn: () => getAlbumImageByFileName(dataCard.image.filename, token!),
        enabled: !!token
    })

    const redirectToPlaylistDetail = (playlistId: string) => {
        navigate(`/home/playlist/${playlistId}`); // Corrected URL with `/home`
    }

  return (
    <Box className={styles.container} onClick={() => redirectToPlaylistDetail(dataCard._id)}>
        <Box className={styles['img-wrapper']}>
            <img src={data || playlistImg} alt="" />
        </Box>
        <Box className={styles['info-wrapper']}>
            <Box className={styles.title}>
                {dataCard.name}
            </Box>
        </Box>
    </Box>
  )
}

export default PlaylistCard