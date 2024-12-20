import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react'
import { getAlbum } from '../../../../service/album.api';
import { Box, Skeleton, Spinner, Stack } from '@chakra-ui/react';
import RowCard from '../../../Shared/RowCard/RowCard';
import { useAuthStore } from '../../../../store/useAuthStore';
import styles from "./styles.module.scss";
import ErrorWarning from '../../../Error/ErrorWarning/ErrorWarning';

const CompilationTab = () => {
    const {token} = useAuthStore()
      const [contentWidth] = useState(0);
      const contentRef = useRef<HTMLDivElement>(null);

      const { data, isLoading, error } = useQuery({
        queryKey: ["card", token],
        queryFn: () => getAlbum(token!),
        enabled: !!token,
      });
 
      if (isLoading) {
        return (
          <Box className={styles.loadingContainer}>
              <Spinner size="xl" thickness='4px'/>
          </Box>
        );
      }

      if (error) {
        return (
          <Box className={styles.container}>
            <ErrorWarning
              title="Error"
              description="Please wait for a moment or you can restart the app for better experiences"
            />
          </Box>
        );
      }

      const compilations = data?.data.releaseGroup.filter(
        (item: any) => item.releaseType === "compilation"
      );
  return (
    <Box className={styles.container} ref={contentRef}>

    {compilations.length > 0 ? (
      <Skeleton isLoaded={!isLoading}>
        <RowCard
          rowTitle="Compilation"
          contentWidth={contentWidth}
          cardData={compilations}
          showMore={false}
        />
      </Skeleton>
    ) : <Box fontSize={20} color={'white'} p={4} fontWeight={600}>There is no any Compilation albums.. </Box>}
  </Box>
  )
}

export default CompilationTab