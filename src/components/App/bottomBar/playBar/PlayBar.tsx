import styles from "./styles.module.scss";
import {
  Box,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import BtnPlayBar from "../btnPlayBar/BtnPlayBar";
import { FaPause, FaPlay, FaRandom } from "react-icons/fa";
import {
  IoIosSkipBackward,
  IoIosSkipForward,
  IoMdRepeat,
} from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { usePlayerStore } from "../../../../store/usePlayerStore";
import formatDuration from "../../../../util/formatDuration";
import { useAuthStore } from "../../../../store/useAuthStore";
import { getRandomAds } from "../../../../service/ads.api";

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
    isPlaying,
    isLoading,
    volume,
    incrementTrackCounter,
    trackCounter,
    clearStateCounter,
    isAdPlaying,
    setIsAdPlaying,
    adId,
    setAdId,
    setLoading,
  } = usePlayerStore();

  const { bitrate, isPremium, token } = useAuthStore();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);


  const updateAudioProgress = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setProgress((current / total) * 100 || 0);
      setCurrentTime(current || 0);
      setDuration(total || 0);
    }
  };


  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play()
          .catch((error) => {
            // Only log error, don't block UI
            console.error("Error playing audio:", error);
          });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("timeupdate", updateAudioProgress);
      return () => audio.removeEventListener("timeupdate", updateAudioProgress);
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      const handleLoadStart = () => setLoading(true);
      const handleCanPlay = () => {
        setLoading(false);
        if (isPlaying) {
          audioRef.current?.play().catch(console.error);
        } else {
          setIsPlaying(true);
          audioRef.current?.play().catch(console.error);
        }
      };

      audioRef.current.addEventListener("loadstart", handleLoadStart);
      audioRef.current.addEventListener("canplay", handleCanPlay);

      return () => {
        audioRef.current?.removeEventListener("loadstart", handleLoadStart);
        audioRef.current?.removeEventListener("canplay", handleCanPlay);
      };
    }
  }, [currentTrackId, setLoading, isPlaying, setIsPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTrackEnd = () => {
    if (isRepeat) {
      // Reset current track
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      return;
    }

    if (!isPremium && trackCounter + 1 >= 5) {
      setIsAdPlaying(true); // Trigger ad playback
    } else {
      incrementTrackCounter();
      playNextTrack();
    }
  };

  useEffect(() => {
    const fetchAd = async () => {
      if (!isAdPlaying || !token) return;

      try {
        const adResponse = await getRandomAds(token, "player");
        setAdId(adResponse.data._id);
      } catch (error) {
        console.error("Error fetching ad:", error);
        playNextTrack();
      }
    };

    if (isAdPlaying) {
      fetchAd();
    }
  }, [isAdPlaying, token, playNextTrack]);

  useEffect(() => {
    if (!audioRef.current || !adId || !isAdPlaying) return;

    audioRef.current.src = `https://api2.ibarakoi.online/advertisement/stream/${adId}`;
    audioRef.current.load();

    const playAd = async () => {
      try {
        await audioRef.current?.play();
      } catch (error) {
        console.error("Error playing ad audio:", error);
      }
    };

    audioRef.current.oncanplay = playAd;
    audioRef.current.onended = () => {
      setIsAdPlaying(false);
      setAdId(null);
      clearStateCounter();
      playNextTrack();
      setIsPlaying(true);
    };

    return () => {
      if (audioRef.current) {
        audioRef.current.oncanplay = null;
        audioRef.current.onended = null;
      }
    };
  }, [
    adId,
    isAdPlaying,
    clearStateCounter,
    playNextTrack,
    setIsPlaying,
    setIsAdPlaying,
    setAdId,
  ]);

  return (
    <Box className={styles.container}>
      <audio
      ref={audioRef}
        onEnded={handleTrackEnd}
        controls={true}
        onLoadedMetadata={updateAudioProgress}
        style={{ display: "none" }}
        src={`https://api2.ibarakoi.online/tracks/stream/${currentTrackId}?bitrate=${bitrate}`}
      />

      <Box className={styles["btn-wrapper"]}>
        <BtnPlayBar
          iconSize={5}
          icon={FaRandom}
          onClick={toggleShuffle}
          type="normal"
          iconColor={isShuffle ? "white" : "#595959"}
          disabled={isAdPlaying}
        />
        <BtnPlayBar
          iconSize={5}
          icon={IoIosSkipBackward}
          onClick={playPreviousTrack}
          type="normal"
          iconColor="#595959"
          disabled={isAdPlaying}
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
          onClick={handleTrackEnd}
          type="normal"
          iconColor="#595959"
          disabled={isAdPlaying}
        />
        <BtnPlayBar
          iconSize={5}
          icon={IoMdRepeat}
          onClick={toggleRepeat}
          type="normal"
          iconColor={isRepeat ? "white" : "#595959"}
          disabled={isAdPlaying}
        />
      </Box>

      <Box className={styles["progress-bar-wrapper"]}>
        <Text className={styles["time"]} color="white">
          {formatDuration(currentTime)}
        </Text>
        {isLoading ? (
          <Skeleton height={2} width={200} />
        ) : (
          <input 
          
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            if (audioRef.current && !isNaN(val)) {
              audioRef.current.currentTime = (val / 100) * duration;
              setProgress(val);
            }
          }}

          className={styles['progress-bar']} value={progress} type="range" />
        )}
        <Text className={styles["time"]} color="white">
          {formatDuration(duration)}
        </Text>
      </Box>
    </Box>
  );
};

export default PlayBar;
