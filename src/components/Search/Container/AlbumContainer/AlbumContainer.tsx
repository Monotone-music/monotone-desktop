import React from 'react'
import styles from './styles.module.scss'
import { Box, Spinner } from '@chakra-ui/react'
import { IAlbumSearchRecord } from '../../../../interface/Music';
import { getAlbumImageByFileName } from '../../../../service/album.api';
import { useQuery } from '@tanstack/react-query';
import formatMonthYear from '../../../../util/formatDate';


interface AlbumCardProps {
    index: number;
    albumData: IAlbumSearchRecord;
    token: string
}
const AlbumCard:React.FC<AlbumCardProps> = ({albumData, index, token}) => {
    const {data, isLoading, error} = useQuery({
        queryKey: ['trackImgSearch'],
        queryFn: () => getAlbumImageByFileName( albumData.source.info.image.filename ,token!),
        enabled: !!token
    })



    return (
        <Box className={styles['card-container']} key={index}>
            <Box className={styles['img-wrapper']}>
            {isLoading ? <Spinner /> : <img src={data} alt="" />}
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