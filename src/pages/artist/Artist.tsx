import styles from './styles.module.scss'
import { getArtistById } from '../../service/artist.api';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { Box, Spinner } from '@chakra-ui/react';
import InfoContainer from '../../components/Profile/InfoContainer/InfoContainer';
import AlbumContainer from '../../components/Artist/AlbumContainer/AlbumContainer';
import FeaturedInContainer from '../../components/Artist/FeaturedInContainer/FeaturedInContainer';

const Artist = () => {
    const { token } = useAuthStore();
    const {artistId} = useParams<{ artistId: string }>()

    const { data, isLoading } = useQuery({
      queryKey: ["artist", token, artistId],
      queryFn: () => getArtistById(artistId!, token!),
      enabled: !!artistId,
    });

    return isLoading ? (
      <Box className={styles.loadingContainer}>
        <Spinner size="lg" thickness='4px' color="white"/>
      </Box>
    ) : (
  
      <Box className={styles.container}>
        <InfoContainer
        forPage='artist'
          displayName={data?.data?.artist.name}
          createdAt={data?.data?.artist.createdAt}
          imageFileName={data?.data?.artist.image.filename}
        />
         
          <Box className={styles.description} color="white">
            {data?.data?.artist.name} is a talented style artist recognized for their unique
            approach techniques. Drawing inspiration from influences their work
            has been showcased in exhibitions, leaving a lasting impression with
            its distinctive qualities.
          </Box>
 
        <Box className={styles.wrapper}>
        {data?.data?.artist.releaseGroup.length === 0 ? <></> : <AlbumContainer albums={data?.data?.artist?.releaseGroup}/>}
        {data?.data?.artist.featuredIn.length === 0 ? <></> : <FeaturedInContainer featuredIn={data?.data?.artist?.featuredIn}/>}
        </Box>
  
      </Box>
    );
  };

export default Artist