import  { useEffect } from 'react'
import styles from './styles.module.scss'
import { Box, Center, Spinner, Text } from '@chakra-ui/react'
import { useAuthStore } from '../../store/useAuthStore';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPlaylistDetail } from '../../service/playlist.api';
import ErrorWarning from '../../components/Error/ErrorWarning/ErrorWarning';
import TopInfoPlaylist from '../../components/Playlist/TopInfo/TopInfo'
import ListRecord from '../../components/Playlist/ListRecord/ListRecord';

const Playlist = () => {
    const {token} = useAuthStore();
    const { playlistId } = useParams<{ playlistId: string }>();
    const queryClient = useQueryClient();
  
    const { data, isLoading, error } = useQuery({
      queryKey: ['playlistDetail', playlistId, token],
      queryFn: () => getPlaylistDetail(playlistId!, token!),
      enabled: !!playlistId && !!token
    });
  
    useEffect(() => {
      return () => {
        queryClient.removeQueries({ queryKey: ['playlistDetailImg'], exact: true });
      };
    }, [playlistId, queryClient]);
  
    if (isLoading) {
      return (
        <Box className={styles.loadingContainer}>
          <Spinner size='xl' thickness='4px' color="white"/>
        </Box>
      );
    }
  
    if (error) {
      return (
        <div className={styles.container}>
          <ErrorWarning title="Error" description="Album Detail is error, please try again"/>
        </div>
      );
    }
  
    if (!data || !data.data) {
      return (
        <Center height="100vh">
          <Text>No album data found.</Text>
        </Center>
      );
    }
    return (
      <Box className={styles.container}>
          <TopInfoPlaylist playlistId={playlistId} {...data.data.playlist} />
          <ListRecord playlistId={playlistId} {...data.data.playlist} />
      </Box>
    );
}

export default Playlist