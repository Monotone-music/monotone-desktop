import { Box, Icon, useToast } from "@chakra-ui/react";
import { useDeletePlaylistMutation } from "../../../mutation/useDeletePlaylist";
import styles from "./styles.module.scss";
import { FaPlay, FaRandom } from "react-icons/fa";
import { RiAddCircleLine } from "react-icons/ri";
import { SlOptions } from "react-icons/sl";

// Action bar for the play buttons
interface ActionBarProps {
    playlistId:string
  }
  
const ActionBar:React.FC<ActionBarProps> = ({playlistId}) => {
    // const deletePlaylistMutation = useDeletePlaylistMutation()
    // const toast = useToast()
    // console.log("hi")
    // deletePlaylistMutation.mutate(playlistId, 
    //     {
    //         onSuccess(data, variables, context) {
    //             console.log(data)
    //         },
    //     }
    // )
  
    return (
      <Box className={styles["actionBar-container"]}>
        <Box className={styles.playBtn}>
          <Icon as={FaPlay} boxSize={5} color={"#000000"} />
        </Box>
  
        <Box className={styles.sufferBtn}>
          <Icon as={FaRandom} boxSize={6} />
        </Box>
  
        <Box className={styles.sufferBtn}>
          <Icon as={RiAddCircleLine} boxSize={7} />
        </Box>
  
        <Box className={styles.sufferBtn}>
          <Icon as={SlOptions} boxSize={7} />
        </Box>
      </Box>
    );
  };

  export default ActionBar