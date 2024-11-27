import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { Box, Skeleton } from "@chakra-ui/react";
import RowCard from "../../../Shared/RowCard/RowCard";
import { getAlbum } from "../../../../service/album.api";
import { useQuery } from "@tanstack/react-query";

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
      // ResizeObserver to track width changes
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
    return <div className={styles.container}>...Loading</div>;
  }

  if (error) {
    return <div className={styles.container}>Error loading data</div>;
  }

  const albums = data?.data.releaseGroup.filter((item: any) => item.releaseType === 'album');
  const compilations = data?.data.releaseGroup.filter((item: any) => item.releaseType === 'compilation');


  return (
    <Box className={styles.container} ref={contentRef}>
     <Skeleton isLoaded={!isLoading}>
        <RowCard rowTitle="Album" contentWidth={contentWidth} cardData={albums} />
      </Skeleton>

      <Skeleton isLoaded={!isLoading}>
        <RowCard rowTitle="Compilation" contentWidth={contentWidth} cardData={compilations} />
      </Skeleton>
    </Box>
  );
};

export default AllTab;
