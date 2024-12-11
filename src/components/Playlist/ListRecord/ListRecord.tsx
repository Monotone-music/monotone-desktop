import styles from "./styles.module.scss";
import { Box, Icon, Skeleton, Stack } from "@chakra-ui/react";
import { FaClock, FaPlay, FaRandom } from "react-icons/fa";
import { RiAddCircleLine } from "react-icons/ri";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getAlbumImageByFileName } from "../../../service/album.api";
import { useAuthStore } from "../../../store/useAuthStore";
import RowRecord from "./RowRecord/RowRecord";

// Action bar for the play buttons
const ActionBar = () => {
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
    </Box>
  );
};

// ListRecord component expecting an array of recording data
interface ListRecordProps {
  recording: any[]; // Data you provided
}

const ListRecord: React.FC<ListRecordProps> = ({ recording }) => {
  const { token } = useAuthStore();
  
  // Fetch album images
  const { data: albumImages, isLoading, error } = useQuery<string[]>(
    {
      queryKey: ["playlistImages", recording],
      queryFn: () =>
        Promise.all(
          recording.map((record) =>
            getAlbumImageByFileName(record.recording.image.filename, token!)
          )
        ),
      enabled: recording.length > 0 && !!token,
    }
  );

  if (isLoading) {
    return (
      <Stack pt={10}>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    );
  }

  if (error) {
    return <Box className={styles.container}>Error loading images</Box>;
  }

  return (
    <Box className={styles.container}>
      <ActionBar />

      <TableContainer>
        <Table variant="unstyled">
          <Thead>
            <Tr>
              <Th style={{ padding: 0, textAlign: "center" }}>#</Th>
              <Th style={{ padding: "16px 0" }}>Title</Th>
              <Th style={{ padding: 0 }}>Artist</Th>
              <Th style={{ padding: 0 }}>
                <Icon as={FaClock} />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {recording.map((record, index: number) => (
              <RowRecord
              index={record}
                albumTrackIds={recording.map((rec) => rec.recording._id)} // Pass the IDs of the tracks
                record={record.recording} // Pass the full record object
                item={index} // Pass index
                key={index} // Use index as key for proper rendering
                albumImages={albumImages || []} // Pass fetched album images
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListRecord;
