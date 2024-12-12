import React from "react";
import styles from "./styles.module.scss";
import { Box, Button, Icon, Skeleton, Stack, Text, useDisclosure } from "@chakra-ui/react";
import noImage from "../../../assets/img/no-image-1.png";
import { IImageAlbum } from "../../../interface/UI";
import { useQuery } from "@tanstack/react-query";
import { getAlbumImageByFileName } from "../../../service/album.api";
import { IRelease } from "../../../interface/Music";
import { useAuthStore } from "../../../store/useAuthStore";
import formatMonthYear from "../../../util/formatDate";
import { useDeletePlaylistMutation } from "../../../mutation/useDeletePlaylist";
import { FaTrash } from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react'

interface TopInfoProps {
  name?: string;
  image: IImageAlbum;
  recording?: IRelease[];
  createdAt?: string;
  playlistId: string
}

const TopInfoPlaylist: React.FC<TopInfoProps> = ({
  name = "Unknown Title",
  image,
  recording = [{ trackCount: 0 }],
  createdAt,
  playlistId
}) => {
  const {token} = useAuthStore()
  const totalSong = recording.length || 0
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef(null)
  const { data, isLoading, error } = useQuery({
    queryKey: ["playlistDetailImg"],
    queryFn: () => getAlbumImageByFileName(image?.filename, token!),
    enabled: !!image?.filename && !!token
  });

  const { mutate: deletePlaylist } = useDeletePlaylistMutation();

  const handleDelete = () => {
    deletePlaylist(playlistId);
    onClose()
  };

  if (isLoading) {
    return (
      <Stack>
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
      </Stack>
    );
  }

  if (error) {
    return <Box className={styles.container}>Error Loading Detail Page</Box>;
  }

  return (
    <>
    <Box className={styles.container}>
      <Box className={styles["img-wrapper"]}>
        <img src={data || noImage} alt="" loading="lazy" />
      </Box>

      <Box className={styles["info-wrapper"]}>
        <Box className={styles["title-wrapper"]}>
          <Text className={styles.title}>{name}</Text>
        </Box>
        <Box className={styles["artists-wrapper"]}>
          <Text className={styles.artists}>Created at {formatMonthYear(createdAt!) }</Text>
        </Box>

        <Box className={styles["others-wrapper"]}>
          <Text className={styles.others}>{totalSong} songs</Text>
          <Button className={styles.others} variant="ghost" onClick={onOpen}>
            <Icon as={FaTrash}/>
          </Button>
        </Box>
      </Box>
    </Box>
    
    <AlertDialog
    isCentered
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Playlist
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default React.memo(TopInfoPlaylist);
