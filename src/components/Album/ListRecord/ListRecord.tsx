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
import {  useMemo } from "react"; // Ensured hooks are imported correctly
import { useQuery } from "@tanstack/react-query";
import { getAlbumImageByFileName } from "../../../service/album.api";
import RowRecord from "./RowRecord/RowRecord";
import { IRelease } from "../../../interface/Music";

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

interface ListRecordProps {
  release: IRelease[];
}

const ListRecord: React.FC<ListRecordProps> = ({ release }) => {
  
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
          getAlbumImageByFileName(record.image.filename)
        )
      ),
    enabled: sortedRecordings.length > 0,
  });


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
    return  <Box className={styles.container}>Error loading images</Box>;
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
            {sortedRecordings.map((record, item: number) => (
             <RowRecord record={record} item={item} key={item} albumImages={albumImages || []}/>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListRecord;
