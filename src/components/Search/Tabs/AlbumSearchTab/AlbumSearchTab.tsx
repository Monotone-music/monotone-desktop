import { Box } from '@chakra-ui/react';
import React from 'react'
import styles from './styles.module.scss'
import AlbumContainer from '../../Container/AlbumContainer/AlbumContainer';

interface AlbumSearchTabProps {
  album: any[];
  token: string;
}

const AlbumSearchTab: React.FC<AlbumSearchTabProps> = ({  album, token }) => {
  const noData =  !album?.length 

  return (
    <Box className={styles.container}>
      {noData ? (
        <Box className={styles.notFound}>No Results Found</Box>
      ) : (
        <>
          {album?.length > 0 && <AlbumContainer token={token} album={album} />}
        </>
      )}
    </Box>
    )
}

export default AlbumSearchTab