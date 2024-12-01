import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { Box, Skeleton, Stack } from "@chakra-ui/react";
import RowCard from "../../../Shared/RowCard/RowCard";
import { getAlbum } from "../../../../service/album.api";
import { useQuery } from "@tanstack/react-query";
import ErrorWarning from "../../../Error/ErrorWarning/ErrorWarning";

const AllTab = () => {
  const [contentWidth, setContentWidth] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["card"],
    queryFn: () => getAlbum(),
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

  const albums = data?.data.releaseGroup.filter(
    (item: any) => item.releaseType === "album"
  );
  const compilations = data?.data.releaseGroup.filter(
    (item: any) => item.releaseType === "compilation"
  );

  return (
    <Box className={styles.container} ref={contentRef}>
      {albums && (
        <Skeleton isLoaded={!isLoading}>
          <RowCard
            rowTitle="Album"
            contentWidth={contentWidth}
            cardData={albums}
          />
        </Skeleton>
      )}

      {compilations && (
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
