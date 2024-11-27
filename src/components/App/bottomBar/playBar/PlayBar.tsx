import styles from "./styles.module.scss";
import { Box, Progress } from "@chakra-ui/react";
import BtnPlayBar from "../btnPlayBar/BtnPlayBar";
import { FaPause, FaPlay, FaRandom } from "react-icons/fa";
import {
  IoIosSkipBackward,
  IoIosSkipForward,
  IoMdRepeat,
} from "react-icons/io";
import useFetchAudio from "../../../../hook/useFetchAudio";
import { useEffect, useRef } from "react";
import useAudioStore from "../../../../store/useAudioStore";

const PlayBar = () => {
  const audioSrc = useFetchAudio('6740a2506357c3ed99dedfc4');
  console.log(audioSrc)
  const audioRef = useRef<HTMLAudioElement>(null);
  const { isPlaying, togglePlayPause } = useAudioStore();



  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current?.play();
      } else {
        audioRef.current?.pause();
      }
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    togglePlayPause();
  };

  return (
    <Box className={styles.container}>
        {audioSrc && (
        <audio ref={audioRef} src={audioSrc} />
      )}
      <Box className={styles["btn-wrapper"]}>
        <BtnPlayBar iconSize={5} icon={FaRandom} onClick={() => {}} type="normal" />
        <BtnPlayBar iconSize={5} icon={IoIosSkipBackward} onClick={() => {}} type="normal" />
        <BtnPlayBar
          iconSize={4}
          icon={isPlaying ? FaPause : FaPlay}
          onClick={handlePlayPause}
          type="playPause"
          iconColor="black"
        />
        <BtnPlayBar iconSize={5} icon={IoIosSkipForward} onClick={() => {}} type="normal" />
        <BtnPlayBar iconSize={5} icon={IoMdRepeat} onClick={() => {}} type="normal" />
      </Box>

      <Box className={styles['progress-bar-wrapper']}>
        <Progress colorScheme='green' borderRadius={10} value={20} height={1}/>
      </Box>
    </Box>
  );
};

export default PlayBar;
