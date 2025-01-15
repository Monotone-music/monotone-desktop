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
import {  useMemo } from "react"; // Ensured hooks are imported correctly
import { useQuery } from "@tanstack/react-query";
import { getAlbumImageByFileName } from "../../../service/album.api";
import RowRecord from "./RowRecord/RowRecord";
import { IRelease } from "../../../interface/Music";
import { useAuthStore } from "../../../store/useAuthStore";
import { usePlayerStore } from "../../../store/usePlayerStore";
import ErrorWarning from "../../Error/ErrorWarning/ErrorWarning";

interface ActionBarProps {
  recordings: any[]
}
const ActionBar: React.FC<ActionBarProps> = ({recordings}) => {
  const { queue, setQueue, setCurrentTrackId, setIsPlaying } = usePlayerStore();
  const handlePlayAll = () => {
    if (!recordings.length) return;
    
    const sortedIds = recordings.map(recording => recording._id);
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

interface ListRecordProps {
  release: IRelease[];
}

const ListRecord: React.FC<ListRecordProps> = ({ release }) => {
    const {token} = useAuthStore();


  const sortedRecordings = useMemo(
    () =>
      [...release[0].recording].sort((a, b) => a.position.no - b.position.no),
    [release]
  );

  const {
    data: albumImages,
    isLoading,
    error,
  } = useQuery<string[]>({
    queryKey: ["albumImages", sortedRecordings],
    queryFn: () =>
      Promise.all(
        sortedRecordings.map((record) =>
          getAlbumImageByFileName(record.image.filename, token!)
        )
      ),
    enabled: sortedRecordings.length > 0 && !!token
  });


  if (isLoading) {
    return (
      <Stack pt={10}>
        <Skeleton height="200px" />
      </Stack>
    );
  }

  if (error) {
    return  <Box className={styles.container}>
       <ErrorWarning title="Error" description="Album List Track is error, please try again"/>
    </Box>;
  }


  return (
    <Box className={styles.container}>
      <ActionBar recordings={sortedRecordings}/>

      <TableContainer>
        <Table variant="unstyled">
          <Thead>
            <Tr>
              <Th style={{ padding: 0, textAlign: "center", color: 'white' }}>#</Th>
              <Th style={{ padding: "16px 0", color: 'white' }}>Title</Th>
              <Th style={{ padding: 0, color: 'white' }}>Artist</Th>
              <Th style={{ padding: 0, color: 'white' }}>
                <Icon as={FaClock} color="white" />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedRecordings.map((record, item: number) => (
             <RowRecord
             albumTrackIds={sortedRecordings.map((rec) => rec._id)}
             record={record} item={item} key={item} albumImages={albumImages || []}/>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListRecord;
