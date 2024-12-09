import styles from './styles.module.scss'
import { Box } from '@chakra-ui/react'
import exampleImg from '../../../../assets/img/musicCard.jpg'
import {IArtistSearchRecord } from '../../../../interface/Music';


interface ArtistCardProps {
    index: number;
    artistData: IArtistSearchRecord;
}
const ArtistCard:React.FC<ArtistCardProps> = ({index, artistData}) => {
    return (
        <Box className={styles['card-container']} key={index}>
            <Box className={styles['img-wrapper']}>
                <img src={exampleImg} alt="" />
            </Box>
            <Box className={styles['info-wrapper']}>
                <Box className={styles.name}>{artistData.source.value}</Box>
                <Box className={styles.role}>{artistData.source.type}</Box>
            </Box>
        </Box>
    )
}

interface ArtistContainerProps {
    artist: any[];
    token: string;
}

const ArtistContainer:React.FC<ArtistContainerProps> = ({artist, token}) => {
  return (
    <Box className={styles['artist-container']}>
        <Box className={styles.title}>
            Artists
        </Box>
        <Box className={styles.row}>
            {artist.map((artist, index) => (
                   <ArtistCard index={index} artistData={artist} key={index}/>
            ))}
         
        </Box>
    </Box>
  )
}

export default ArtistContainer