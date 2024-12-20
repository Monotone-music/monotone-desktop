import styles from "./styles.module.scss";
import { usePlayerStore } from "../../../store/usePlayerStore";
import { useQueries } from "@tanstack/react-query";
import { useAuthStore } from "../../../store/useAuthStore";
import { getTrackInfoById } from "../../../service/track.api";
import { getAlbumImageByFileName } from "../../../service/album.api";
import { Text } from "@chakra-ui/react";

const QueueList = () => {
  const { currentTrackId, queue, setCurrentTrackId } = usePlayerStore();
  const { token } = useAuthStore();

  const trackQueries = queue.map((trackId) => ({
    queryKey: ["trackInfo", trackId, token],
    queryFn: () => getTrackInfoById(trackId, token!),
    enabled: !!token,
  }));

  const trackResults = useQueries({ queries: trackQueries });

  const imageQueries = trackResults.map((result) => ({
    queryKey: ["trackImage", result.data?.recording?.image?.filename, token],
    queryFn: () =>
      result.data?.recording?.image?.filename
        ? getAlbumImageByFileName(result.data.recording.image.filename, token!)
        : Promise.resolve(null),
    enabled: !!token,
  }));

  const imageResults = useQueries({ queries: imageQueries });

  if (!queue.length) {
    return <Text color={"white"}>No songs in the queue</Text>; // Early return if the queue is empty
  }

  return (
    <div className={styles.container}>
      {queue.map((trackId, index) => {
        const trackInfo = trackResults[index]?.data?.recording;
        const trackImage = imageResults[index]?.data;

        return (
          <div
            onClick={() => setCurrentTrackId(trackId)}
            className={`${styles["queue-row"]} ${
              currentTrackId === trackId ? styles.active : ""
            }`}
            key={trackId}
          >
            <div className={styles["img-wrapper"]}>
              <img
                src={trackImage || ""}
                alt={trackInfo?.title || "Track Image"}
              />
            </div>
            <div className={styles.title}>{trackInfo?.title}</div>
          </div>
        );
      })}
    </div>
  );
};

export default QueueList;
