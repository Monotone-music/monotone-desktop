import { Box, Text, Center, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import TopInfo from "../../components/Album/TopInfo/TopInfo";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAlbumDetailById } from "../../service/album.api";
import ListRecord from "../../components/Album/ListRecord/ListRecord";
import ErrorWarning from "../../components/Error/ErrorWarning/ErrorWarning";
import { useAuthStore } from "../../store/useAuthStore";

const Album = () => {
  const {token} = useAuthStore();
  const { albumId } = useParams<{ albumId: string }>();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['albumDetail', albumId, token],
    queryFn: () => getAlbumDetailById(albumId!, token!),
    enabled: !!albumId && !!token
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ['albumDetailImg'], exact: true });
    };
  }, [albumId, queryClient]);

  if (isLoading) {
    return (
      <Box className={styles.loadingContainer}>
        <Spinner size='xl' />
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
        <TopInfo {...data.data} />
        <ListRecord {...data.data} />
    </Box>
  );
};

export default Album;
