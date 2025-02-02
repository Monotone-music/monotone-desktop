import styles from "./styles.module.scss";
import { Box, Icon, Skeleton, Stack, Text } from "@chakra-ui/react";
import { FaClock, FaPlay } from "react-icons/fa";
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
import { usePlayerStore } from "../../../store/usePlayerStore";


interface ActionBarProps {
  recordings: any[]
}
const ActionBar: React.FC<ActionBarProps> = ({recordings}) => {
  const { queue,setQueue, setCurrentTrackId, setIsPlaying } = usePlayerStore();
  const handlePlayAll = () => {
    if (!recordings.length) return;
    
    const sortedIds = recordings.map(recording => recording.recording._id);
    setQueue(sortedIds);
    setCurrentTrackId(sortedIds[0]);
    setIsPlaying(true);
  };
  return (
    <Box className={styles["actionBar-container"]}>
      <Box className={styles.playBtn}  onClick={handlePlayAll}>
        <Icon as={FaPlay} boxSize={5} color={"#000000"} />
   
      </Box>
      <Text color={"white"} fontWeight={600}>Play All</Text>
    </Box>
  );
};


// ListRecord component expecting an array of recording data
interface ListRecordProps {
  recording: any[]; // Data you provided
  playlistId: string;
}

const ListRecord: React.FC<ListRecordProps> = ({ recording, playlistId }) => {
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
          <ActionBar recordings={recording}/>

      <TableContainer>
        <Table variant="unstyled">
          <Thead>
            <Tr>
              <Th style={{ padding: 0, textAlign: "center", color: 'white' }}>#</Th>
              <Th style={{ padding: "16px 0", color: 'white' }}>Title</Th>
              <Th style={{ padding: 0, color: 'white' }}>Artist</Th>
              <Th style={{ padding: 0, color: 'white' }}>
                <Icon as={FaClock} color={'white'} />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {recording.map((record, index: number) => (
              <RowRecord
              playlistId={playlistId}
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
