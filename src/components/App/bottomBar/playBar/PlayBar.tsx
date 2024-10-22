import styles from "./styles.module.scss";
import { Box, Progress } from "@chakra-ui/react";
import BtnPlayBar from "../btnPlayBar/BtnPlayBar";
import { FaPlay, FaRandom } from "react-icons/fa";
import {
  IoIosSkipBackward,
  IoIosSkipForward,
  IoMdRepeat,
} from "react-icons/io";

const PlayBar = () => {
  return (
    <Box className={styles.container}>
      <Box className={styles["btn-wrapper"]}>
        <BtnPlayBar iconSize={5} icon={FaRandom} onClick={() => {}} type="normal" />
        <BtnPlayBar iconSize={5} icon={IoIosSkipBackward} onClick={() => {}} type="normal" />
        <BtnPlayBar iconSize={4} icon={FaPlay} onClick={() => {}} type="playPause" iconColor='black'/>
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
