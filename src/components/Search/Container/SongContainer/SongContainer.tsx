import SongTableRow from "./SongTableRow/SongTableRow";
import styles from "./styles.module.scss";
import { Box, Table, TableContainer, Tbody } from "@chakra-ui/react";

interface SongContainerProps {
  songs: any[];
  token: string;
}

const SongContainer: React.FC<SongContainerProps> = ({ songs, token }) => {
  return (
    <Box className={styles["recording-wrapper"]}>
      <Box className={styles.title}>Songs</Box>
      <TableContainer>
        <Table variant="unstyled">
          <Tbody>
            {songs.map((song, index) => (
                <SongTableRow token={token} songData={song} index={index} key={index}/>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SongContainer;
