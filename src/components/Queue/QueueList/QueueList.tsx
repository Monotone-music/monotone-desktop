import styles from "./styles.module.scss";
import { usePlayerStore } from "../../../store/usePlayerStore";
import { useQueries } from "@tanstack/react-query";
import { useAuthStore } from "../../../store/useAuthStore";
import { getTrackInfoById } from "../../../service/track.api";
import { getAlbumImageByFileName } from "../../../service/album.api";
import { Text } from "@chakra-ui/react";

const QueueList = () => {
  const { currentTrackId, queue} = usePlayerStore();
  const { token } = useAuthStore();
  if (!queue.length) {
    return <Text color={'white'}>No songs in the queue</Text>; // Early return if the queue is empty
  }
  const queries = queue.map((trackId) => ({
    queryKey: ["trackInfo", trackId, token],
    queryFn: () => getTrackInfoById(trackId, token!),
    enabled: !!token,
  }));

  const results = useQueries({ queries });

  const imageQueries = results.map((result) => ({
    queryKey: ["trackImage", result.data?.recording?.image.filename, token],
    queryFn: () =>
      getAlbumImageByFileName(result.data?.recording?.image.filename, token!),
    enabled: !!token && !!result.data?.recording?.image.filename,
  }));

  const imageResults = useQueries({ queries: imageQueries });
  return (
    <div className={styles.container}>
      {results.map((results, index) => {
        const trackInfo = results?.data?.recording;
        const trackImage = imageResults[index]?.data;
        return (
          <div
            className={`${styles["queue-row"]} ${
              currentTrackId === trackInfo?._id ? styles.active : ""
            }`}
            key={index}
          >
            <div className={styles["img-wrapper"]}>
              <img src={trackImage} alt={trackInfo?.title || "Track Image"} />
            </div>
            <div className={styles.title}>{trackInfo?.title}</div>
          </div>
        );
      })}
    </div>
  );
};

export default QueueList;
