import { Box } from '@chakra-ui/react';
import React from 'react'
import styles from './styles.module.scss'
import SongContainer from '../../Container/SongContainer/SongContainer';

interface SongSearchTabProps {
  recording: any[];
  token: string;
}


const SongSearchTab: React.FC<SongSearchTabProps> = ({  recording, token }) => {
  const noData =  !recording?.length 

  return (
    <Box className={styles.container}>
      {noData ? (
        <Box className={styles.notFound}>No Results Found</Box>
      ) : (
        <>
          {recording.length > 0 && <SongContainer token={token} songs={recording} />}
        </>
      )}
    </Box>
    )
}

export default SongSearchTab