import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { Box, Spinner } from "@chakra-ui/react";
import RowCard from "../../../Shared/RowCard/RowCard";
import { getAlbum, getTopAlbum } from "../../../../service/album.api";
import { useQuery } from "@tanstack/react-query";
import ErrorWarning from "../../../Error/ErrorWarning/ErrorWarning";
import { useAuthStore } from "../../../../store/useAuthStore";
import HorizontalRow from "../../../Shared/HorizontalRow/HorizontalRow";

const AllTab = () => {
  const { token } = useAuthStore();
  const [contentWidth, setContentWidth] = useState(1200);
  const contentRef = useRef<HTMLDivElement>(null);
  const [albumShow, setAlbumShow] = useState(10);

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

  const { data: topAlbums } = useQuery({
    queryKey: ["cardTopAlbum", token],
    queryFn: () => getTopAlbum(token!, 5),
    enabled: !!token,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["card", token],
    queryFn: () => getAlbum(token!),
    enabled: !!token,
  });

  // Tracking Width of Content
  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setContentWidth(contentRef.current.clientWidth);
      }
    };

    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
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

  const albums = data?.data.releaseGroup
    .slice(0, albumShow)
    .filter((item: any) => item.releaseType === "album");
  const compilations = data?.data.releaseGroup
    .slice(0, albumShow)
    .filter((item: any) => item.releaseType === "compilation");

  const topAlbum = topAlbums?.data.releaseGroup.slice(0, albumShow);

  return (
    <Box className={styles.container} ref={contentRef}>
      {/* <HorizontalRow cardData={topAlbum}/> */}
      {/* {topAlbums && (
        <RowCard
          rowTitle="Top Album"
          contentWidth={contentWidth}
          cardData={topAlbum}
          showMore={false}
        />
      )} */}

      {albums?.length > 0 && (
          <RowCard
            rowTitle="Album"
            contentWidth={contentWidth}
            cardData={albums}
          />
      )}

      {compilations?.length > 0 && (
          <RowCard
            rowTitle="Compilation"
            contentWidth={contentWidth}
            cardData={compilations}
          />
      )}
    </Box>
  );
};

export default AllTab;
