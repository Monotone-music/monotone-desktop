import styles from "./styles.module.scss";
import { Box, Progress, Text } from "@chakra-ui/react";
import BtnPlayBar from "../btnPlayBar/BtnPlayBar";
import { FaPause, FaPlay, FaRandom } from "react-icons/fa";
import {
  IoIosSkipBackward,
  IoIosSkipForward,
  IoMdRepeat,
} from "react-icons/io";
import useFetchAudio from "../../../../hook/useFetchAudio";
import { useEffect, useRef, useState } from "react";
import useAudioStore from "../../../../store/useAudioStore";
import { usePlayerStore } from "../../../../store/usePlayerStore";
import formatDuration from "../../../../util/formatDuration";

const PlayBar = () => {
  const { currentTrackId, playNextTrack } = usePlayerStore();
  const audioSrc = useFetchAudio(currentTrackId!);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { isPlaying, togglePlayPause, setIsPlaying } = useAudioStore();
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((err) => console.error("Error playing audio:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Automatically play the track when it is selected
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause(); // Pause the current audio
      audioRef.current.currentTime = 0; // Reset the current time
      if (audioSrc) {
        audioRef.current.src = audioSrc; // Set the new source
      }
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Error auto-playing new track:", err));
    }
  }, [audioSrc, setIsPlaying]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const updateProgress = () => {
        const progress =
          (audioElement.currentTime / audioElement.duration) * 100;
        setProgress(progress);
        setCurrentTime(audioElement.currentTime);
        setDuration(audioElement.duration);
      };

      audioElement.addEventListener("timeupdate", updateProgress);

      return () => {
        audioElement.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, [audioSrc]);

  const handlePlayPause = () => {
    togglePlayPause(!isPlaying);
  };

  const handleTrackEnd = () => {
    playNextTrack();
    setIsPlaying(true);
  };

  return (
    <Box className={styles.container}>
      {audioSrc && (
        <audio
          ref={audioRef}
          src={audioSrc}
          preload="auto"
          onEnded={handleTrackEnd}
        />
      )}
      <Box className={styles["btn-wrapper"]}>
        <BtnPlayBar
          iconSize={5}
          icon={FaRandom}
          onClick={() => {}}
          type="normal"
          iconColor="#595959"
        />
        <BtnPlayBar
          iconSize={5}
          icon={IoIosSkipBackward}
          onClick={() => {}}
          type="normal"
            iconColor="#595959"
        />
        <BtnPlayBar
          iconSize={4}
          icon={isPlaying ? FaPause : FaPlay}
          onClick={handlePlayPause}
          type="playPause"
          iconColor="black"
        />
        <BtnPlayBar
          iconSize={5}
          icon={IoIosSkipForward}
          onClick={playNextTrack}
          type="normal"
            iconColor="#595959"
        />
        <BtnPlayBar
          iconSize={5}
          icon={IoMdRepeat}
          onClick={() => {}}
          type="normal"
            iconColor="#595959"
        />
      </Box>

      <Box className={styles["progress-bar-wrapper"]}>
        <Text className={styles["time"]}>{formatDuration(currentTime)}</Text>
        <Progress
        width={200}
          colorScheme="green"
          borderRadius={10}
          value={progress}
          height={1}
        />

        <Text className={styles["time"]}>{formatDuration(duration)}</Text>
      </Box>
    </Box>
  );
};

export default PlayBar;
