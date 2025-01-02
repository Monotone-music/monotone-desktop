import React from 'react'
import styles from './styles.module.scss'
import { Box, Spinner } from '@chakra-ui/react'
import { IAlbumSearchRecord } from '../../../../interface/Music';
import { getAlbumImageByFileName } from '../../../../service/album.api';
import { useQuery } from '@tanstack/react-query';
import formatMonthYear from '../../../../util/formatDate';
import { useNavigate } from 'react-router-dom';
import { useUISearch } from '../../../../store/useUIStore';


interface AlbumCardProps {
    index: number;
    albumData: IAlbumSearchRecord;
    token: string
}
const AlbumCard:React.FC<AlbumCardProps> = ({albumData, index, token}) => {
    const navigate = useNavigate()
    const {toggleOpenModal} = useUISearch()
    const {data, isLoading} = useQuery({
        queryKey: ['trackImgSearch'],
        queryFn: () => getAlbumImageByFileName( albumData.source.info.image.filename ,token!),
        enabled: !!token
    })

    const redirectToAlbumDetail = (albumId: string) => {
        toggleOpenModal(false)
        navigate(`/home/album/${albumId}`)
    }

    return (
        <Box className={styles['card-container']} key={index} onClick={() => redirectToAlbumDetail(albumData.source.info._id)}>
            <Box className={styles['img-wrapper']}>
            {isLoading ? <Spinner color="white"/> : <img src={data} alt="" />}
            </Box>
            <Box className={styles['info-wrapper']}>
                <Box className={styles.name}>{albumData.source.value}</Box>
                <Box className={styles.release}>{formatMonthYear(albumData.source.created_at)}</Box>
            </Box>
        </Box>
    )
}

interface AlbumContainerProps {
    album: any[];
    token: string;
}

const AlbumContainer:React.FC<AlbumContainerProps> = ({album, token}) => {
  return (
    <Box className={styles['album-container']}>
    <Box className={styles.title}>
        Albums
    </Box>
    <Box className={styles.row}>
        {album.map((album, index) => (
            <AlbumCard token={token} albumData={album} index={index} key={index}/>
        ))}
 
    </Box>
</Box>
  )
}

export default AlbumContainer