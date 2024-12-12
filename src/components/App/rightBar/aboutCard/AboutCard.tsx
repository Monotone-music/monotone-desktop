import React from "react";
import styles from "./styles.module.scss";
import { Box, Spinner, Text } from "@chakra-ui/react";
import cardImg from "../../../../assets/img/aboutCard-img.jpg";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../../store/useAuthStore";
import { getArtistById } from "../../../../service/artist.api";
import { getAlbumImageByFileName } from "../../../../service/album.api";

interface AboutCardProp {
  dataAboutCard: any[];
}

const AboutCard: React.FC<AboutCardProp> = ({ dataAboutCard }) => {
  const navigate = useNavigate();
  const redirectToArtistPage = (artistId: string) => {
    navigate(`/home/artist/${artistId}`);
  };

  const { token } = useAuthStore();

  const { data } = useQuery({
    queryKey: ["artist", dataAboutCard.map((item) => item._id), token],
    queryFn: () =>
      Promise.all(dataAboutCard.map((item) => getArtistById(item._id, token!))),
    enabled: dataAboutCard.length > 0 && !!token,
  });

  const {
    data: imageArtist,
    isLoading: isImageLoading
  } = useQuery({
    queryKey: [
      "artistImages",
      data?.map((artist) => artist.data.artist.image.filename),
      token,
    ],
    queryFn: () =>
      data
        ? Promise.all(
            data.map((artist) =>
              getAlbumImageByFileName(artist.data.artist.image.filename, token!)
            )
          )
        : [],
    enabled: !!data && data.length > 0 && !!token,
  });

  return dataAboutCard.map((item, index) => (
    <Box className={styles.container} key={index}>
      <Box className={styles["img-wrapper"]}>
        {isImageLoading ? (
          <Spinner />
        ) : (
          <img
            src={
              (Array.isArray(imageArtist) ? imageArtist[0] : imageArtist) ||
              cardImg
            }
            alt=""
          />
        )}

        <div className={styles.mask}>
          <Text className={styles["mask-title"]}>About the artist</Text>
        </div>
      </Box>
      <Box className={styles["info-wrapper"]}>
        <Box className={styles.top}>
          <Box className={styles.name}>
            <Text>{item.name}</Text>
          </Box>
          <Box
            className={styles["follow-btn"]}
            onClick={() => redirectToArtistPage(item._id)}
          >
            Detail
          </Box>
        </Box>
        <Box className={styles.bottom}>
          <Text className={styles.description}>
            {item.name} is a talented style artist recognized for their unique
            approach techniques. Drawing inspiration from influences their work
            has been showcased in exhibitions, leaving a lasting impression with
            its distinctive qualities.
          </Text>
        </Box>
      </Box>
    </Box>
  ));
};

export default AboutCard;
