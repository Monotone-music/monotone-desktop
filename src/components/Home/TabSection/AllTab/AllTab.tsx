import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { Box, Skeleton, Stack } from "@chakra-ui/react";
import RowCard from "../../../Shared/RowCard/RowCard";
import { getAlbum, getTopAlbum } from "../../../../service/album.api";
import { useQuery } from "@tanstack/react-query";
import ErrorWarning from "../../../Error/ErrorWarning/ErrorWarning";
import { useAuthStore } from "../../../../store/useAuthStore";
import StripePaymentButton from "../../../Payment/StripePaymentButton/StripePaymentButton";

const AllTab = () => {
  const {token} = useAuthStore()
  const [contentWidth, setContentWidth] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
 
  const {data: topAlbums, isPending, isError } = useQuery({
    queryKey: ["cardTopAlbum", token],
    queryFn: () => getTopAlbum(token!, 10),
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

  const albums = data?.data.releaseGroup.filter(
    (item: any) => item.releaseType === "album"
  );
  const compilations = data?.data.releaseGroup.filter(
    (item: any) => item.releaseType === "compilation"
  );

  return (
    <Box className={styles.container} ref={contentRef}>

      {topAlbums && (
        <Skeleton isLoaded={!isLoading}>
          <RowCard
            rowTitle="Top Album"
            contentWidth={contentWidth}
            cardData={topAlbums.data.releaseGroup}
          />
        </Skeleton>
      )}

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
