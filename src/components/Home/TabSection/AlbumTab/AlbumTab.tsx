import { useEffect, useRef, useState } from 'react'
import { useAuthStore } from '../../../../store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { getAlbum } from '../../../../service/album.api';
import { Box, Skeleton, Spinner } from '@chakra-ui/react';
import ErrorWarning from '../../../Error/ErrorWarning/ErrorWarning';
import styles from "./styles.module.scss";
import RowCard from '../../../Shared/RowCard/RowCard';

const AlbumTab = () => {
    const {token} = useAuthStore()
    const [contentWidth, setContentWidth] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    const { data, isLoading, error } = useQuery({
      queryKey: ["card", token],
      queryFn: () => getAlbum(token!),
      enabled: !!token,
    });

      useEffect(() => {
        const contentElement = contentRef.current;
    
        if (contentElement) {
          const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
              setContentWidth(entry.contentRect.width);
            }
          });
    
          resizeObserver.observe(contentElement);
    
          // Cleanup observer on unmount
          return () => {
            resizeObserver.disconnect();
          };
        }
      }, []);
  

      if (isLoading) {
        return (
          <Box className={styles.loadingContainer}>
              <Spinner size="xl" thickness='4px' color="white"/>
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

      const albums = data?.data.releaseGroup.filter(
        (item: any) => item.releaseType === "album"
      );
  return (
    <Box className={styles.container} ref={contentRef}>

    {albums && (
      <Skeleton isLoaded={!isLoading}>
        <RowCard
          rowTitle="Album"
          contentWidth={contentWidth}
          cardData={albums}
          showMore={false}
          isWrap={true}
        />
      </Skeleton>
    )}

  </Box>
  )
}

export default AlbumTab