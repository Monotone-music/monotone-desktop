import styles from "./styles.module.scss";
import { Box, Icon } from "@chakra-ui/react";
import { CiVolumeHigh, CiVolumeMute } from "react-icons/ci";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { usePlayerStore } from "../../../../store/usePlayerStore";

const VolumeBar = () => {
  const {volume, setVolume} = usePlayerStore()
  const handleVolumeChange = (value: number) => {
    setVolume(value / 100); // Update the store's volume
  };

  
  return (
    <Box className={styles.container}>
      <Box className={styles["icon-wrapper"]}>
        <Icon color={"white"} as={volume === 0 ? CiVolumeMute : CiVolumeHigh} boxSize={6} />
      </Box>
      <Slider
        width={200}
        aria-label="volume-slider"
        defaultValue={volume * 100} // Convert store value (0-1) to slider value (0-100)
        onChange={handleVolumeChange}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
};

export default VolumeBar;
