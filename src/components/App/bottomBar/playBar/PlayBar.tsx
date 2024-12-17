import styles from "./styles.module.scss";
import { Box, Progress, Skeleton, Text } from "@chakra-ui/react";
import BtnPlayBar from "../btnPlayBar/BtnPlayBar";
import { FaPause, FaPlay, FaRandom } from "react-icons/fa";
import {
  IoIosSkipBackward,
  IoIosSkipForward,
  IoMdRepeat,
} from "react-icons/io";
import useFetchAudio from "../../../../hook/useFetchAudio";
import { useEffect, useRef, useState } from "react";
import { usePlayerStore } from "../../../../store/usePlayerStore";
import formatDuration from "../../../../util/formatDuration";


const PlayBar = () => {
  const {
    currentTrackId,
    playNextTrack,
    playPreviousTrack,
    isShuffle,
    isRepeat,
    toggleShuffle,
    toggleRepeat,
    setIsPlaying,
    togglePlayPause,
    isPlaying,
    isLoading,
    volume,
  } = usePlayerStore();

  const audioSrc = useFetchAudio(currentTrackId!);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((err) => console.error("Error playing audio:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume]);

  // Handle audio source change
  useEffect(() => {
    if (audioRef.current && audioSrc) {
      audioRef.current.pause(); // Stop the current track
      audioRef.current.src = audioSrc; // Set the new track
      audioRef.current.load(); // Reload the audio element
      audioRef.current.currentTime = 0; // Reset playback position

      // Automatically play the track
      audioRef.current
        .play()
        .then(() => setIsPlaying(true)) // Ensure the state reflects playback
        .catch((err) => console.error("Error auto-playing new track:", err));
    }
  }, [audioSrc, setIsPlaying]);

  // Update progress and duration
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
    if (isRepeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      playNextTrack();
    }
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
          onClick={toggleShuffle}
          type="normal"
          iconColor={isShuffle ? "white" : "#595959"}
        />
        <BtnPlayBar
          iconSize={5}
          icon={IoIosSkipBackward}
          onClick={() => {
            playPreviousTrack();
          }}
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
          onClick={() => {
            playNextTrack();
          }}
          type="normal"
          iconColor="#595959"
        />
        <BtnPlayBar
          iconSize={5}
          icon={IoMdRepeat}
          onClick={toggleRepeat}
          type="normal"
          iconColor={isRepeat ? "white" : "#595959"}
        />
        


      </Box>

      <Box className={styles["progress-bar-wrapper"]}>
        <Text className={styles["time"]}>
          {isNaN(currentTime) ? "0:00" : formatDuration(currentTime)}
        </Text>
        {isLoading ? (
          <Skeleton
            startColor="black.900"
            endColor="green.400"
            height={2}
            width={200}
          />
        ) : (
          <Progress
            width={200}
            colorScheme="green"
            borderRadius={10}
            value={progress}
            height={2}
          />
        )}
        <Text className={styles["time"]}>
          {isNaN(duration) ? "0:00" : formatDuration(duration)}
        </Text>
      </Box>
    </Box>
  );
};

export default PlayBar;
