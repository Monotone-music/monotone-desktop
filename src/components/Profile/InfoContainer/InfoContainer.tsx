import { Badge, Box, Spinner } from "@chakra-ui/react";
import React from "react";
import styles from "./styles.module.scss";
import formatMonthYear from "../../../util/formatDate";
import { useQuery } from "@tanstack/react-query";
import { getAlbumImageByFileName } from "../../../service/album.api";
import { useAuthStore } from "../../../store/useAuthStore";

interface InfoContainerProps {
  displayName: string;
  createdAt: string;
  imageArtist?: string;
  forPage?: string;
  role?: string;
}

const InfoContainer: React.FC<InfoContainerProps> = ({
  forPage = "profile",
  displayName,
  createdAt,
  imageArtist,
}) => {
  const { token, isPremium } = useAuthStore();
  const { data, isLoading } = useQuery({
    queryKey: ["artistImg", token!, imageArtist],
    queryFn: () => getAlbumImageByFileName(imageArtist!, token!),
    enabled: !!token && !!imageArtist,
  });

  return (
    <Box className={styles.container}>
      <Box
        className={
          forPage === "artist"
            ? styles["background-artist"]
            : styles["background-profile"]
        }
      ></Box>

      <Box className={styles["info-wrapper"]}>
        <Box className={styles["img-container"]}>
          <Box className={styles["img-wrapper"]}>
            {isLoading ? (
              <Spinner color="white"/>
            ) : (
              <img src={data || "https://bit.ly/code-beast"} alt="" />
            )}
          </Box>
        </Box>
        <Box className={styles["content-container"]}>
          <Box className={styles["name"]}>
            {displayName}
            {isPremium ? (
                  <Badge marginLeft={10} fontSize="0.7rem" colorScheme="green">
                  Basic
                </Badge>
            ) : (
              <Badge marginLeft={10} fontSize="0.7rem" colorScheme="gray">
                Free
              </Badge>
            )}
          </Box>
          {forPage === "artist" && <Box className={styles["role"]}>Artist</Box>}

          <Box className={styles["created_at"]}>
            Join Monotone at {formatMonthYear(createdAt)}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InfoContainer;
