import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { Box, Skeleton, Stack } from "@chakra-ui/react";
import RowCard from "../../../Shared/RowCard/RowCard";
import { getAlbum, getTopAlbum } from "../../../../service/album.api";
import { useQuery } from "@tanstack/react-query";
import ErrorWarning from "../../../Error/ErrorWarning/ErrorWarning";
import { useAuthStore } from "../../../../store/useAuthStore";

const AllTab = () => {
  const {token} = useAuthStore()
  const [contentWidth, setContentWidth] = useState(1200);
  const contentRef = useRef<HTMLDivElement>(null);
  const [albumShow,  setAlbumShow] = useState(8);

  
  useEffect(() => {
    const getAlbumsToShow = () => {
      if (contentWidth < 750) return 4;
      if (contentWidth < 900) return 5;
      if (contentWidth < 1024) return 7;
      if (contentWidth < 1200) return 8;
      if (contentWidth < 1400) return 9;
      if (contentWidth < 1600) return 10;
      return 11; // Default value for larger screens
    };

    const newAlbumsToShow = getAlbumsToShow();

    setAlbumShow(newAlbumsToShow);
  }, [contentWidth]);
 
  const {data: topAlbums} = useQuery({
    queryKey: ["cardTopAlbum", token],
    queryFn: () => getTopAlbum(token!, 5),
    enabled: !!token,
  })

  const { data, isLoading, error } = useQuery({
    queryKey: ["card", token],
    queryFn: () => getAlbum(token!),
    enabled: !!token,
  });

  // Tracking Width of Content
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
      <Stack className={styles.container}>
        <Skeleton height={20}></Skeleton>
        <Skeleton height={20}></Skeleton>
        <Skeleton height={20}></Skeleton>
      </Stack>
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

  const albums = data?.data.releaseGroup
    .slice(0, albumShow)
    .filter((item: any) => item.releaseType === "album");
  const compilations = data?.data.releaseGroup
    .slice(0, albumShow)
    .filter((item: any) => item.releaseType === "compilation");

    const topAlbum = topAlbums?.data.releaseGroup
    .slice(0, albumShow)

  return (
    <Box className={styles.container} ref={contentRef}>

      {topAlbums && (
        <Skeleton isLoaded={!isLoading}>
          <RowCard
            rowTitle="Top Album"
            contentWidth={contentWidth}
            cardData={topAlbum}
            showMore={false}
          />
        </Skeleton>
      )}

      {albums.length > 0 && (
        <Skeleton isLoaded={!isLoading}>
          <RowCard
            rowTitle="Album"
            contentWidth={contentWidth}
            cardData={albums}
          />
        </Skeleton>
      )}

      {compilations.length > 0 && (
        <Skeleton isLoaded={!isLoading}>
          <RowCard
            rowTitle="Compilation"
            contentWidth={contentWidth}
            cardData={compilations}
          />
        </Skeleton>
      )}
    </Box>
  );
};

export default AllTab;
