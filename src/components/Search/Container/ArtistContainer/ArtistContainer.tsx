import styles from "./styles.module.scss";
import { Box, Spinner } from "@chakra-ui/react";
import exampleImg from "../../../../assets/img/musicCard.jpg";
import { IArtistSearchRecord } from "../../../../interface/Music";
import { useNavigate } from "react-router-dom";
import { useUISearch } from "../../../../store/useUIStore";
import { useQuery } from "@tanstack/react-query";
import { getAlbumImageByFileName } from "../../../../service/album.api";
import { useAuthStore } from "../../../../store/useAuthStore";

interface ArtistCardProps {
  index: number;
  artistData: IArtistSearchRecord;
}
const ArtistCard: React.FC<ArtistCardProps> = ({ index, artistData }) => {
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const { toggleOpenModal } = useUISearch();
  const redirectToArtistDetail = (albumId: string) => {
    toggleOpenModal(false);
    navigate(`/home/artist/${albumId}`);
  };
  const { data, isLoading } = useQuery({
    queryKey: [
      "imgCardSearch",
      artistData?.source?.info?.artist?.image?.filename,
    ],
    queryFn: () =>
      getAlbumImageByFileName(
        artistData?.source?.info?.artist?.image?.filename,
        token!
      ),
    enabled: !!token && !!artistData?.source?.info?.artist?.image?.filename,
  });
  return (
    <Box
      className={styles["card-container"]}
      key={index}
      onClick={() => redirectToArtistDetail(artistData.source.info.artist._id)}
    >
      <Box className={styles["img-wrapper"]}>
        {isLoading ? (
          <Spinner size="xl" thickness="2px" color="white"/>
        ) : (
          <img src={data || exampleImg} alt="" />
        )}
      </Box>
      <Box className={styles["info-wrapper"]}>
        <Box className={styles.name}>{artistData.source.value}</Box>
        <Box className={styles.role}>{artistData.source.type}</Box>
      </Box>
    </Box>
  );
};

interface ArtistContainerProps {
  artist: any[];
  token: string;
}

const ArtistContainer: React.FC<ArtistContainerProps> = ({ artist }) => {
  return (
    <Box className={styles["artist-container"]}>
      <Box className={styles.title}>Artists</Box>
      <Box className={styles.row}>
        {artist.map((artist, index) => (
          <ArtistCard index={index} artistData={artist} key={index} />
        ))}
      </Box>
    </Box>
  );
};

export default ArtistContainer;
