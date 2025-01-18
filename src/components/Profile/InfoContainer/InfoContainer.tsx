import { Badge, Box, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import formatMonthYear from "../../../util/formatDate";
import { useQuery } from "@tanstack/react-query";
import { getAlbumImageByFileName } from "../../../service/album.api";
import { useAuthStore } from "../../../store/useAuthStore";
import unknownimg from '../../../assets/img/unknownimg.jpg'
import { FaEdit } from "react-icons/fa";
import { useUpdateImageMutation, useUpdateNameMutation } from "../../../mutation/useUpdateProfile";

interface InfoContainerProps {
  displayName: string;
  createdAt: string;
  imageFileName?: string;
  forPage?: string;
  role?: string;
}

const InfoContainer: React.FC<InfoContainerProps> = ({
  forPage = "profile",
  displayName,
  createdAt,
  imageFileName,
}) => {
  const toast = useToast()
  const updateNameMutation = useUpdateNameMutation();
  const updateImageMutation = useUpdateImageMutation();
  const { token, isPremium } = useAuthStore();
  const [newDisplayName, setNewDisplayName] = useState(displayName);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const { data, isLoading } = useQuery({
    queryKey: ["artistImg", token!, imageFileName],
    queryFn: () => getAlbumImageByFileName(imageFileName!, token!),
    enabled: !!token && !!imageFileName,
  });


  const handleSubmit = async () => {
    const nameChanged = newDisplayName !== displayName;
    const imageChanged = selectedImage !== null;

    try {
      const mutations = [];
      
      if (nameChanged) {
        mutations.push(updateNameMutation.mutateAsync({ 
          displayName: newDisplayName 
        }));
      }

      

      if (imageChanged && selectedImage) {
        const formData = new FormData();
        formData.append('file', selectedImage);
  
        mutations.push(updateImageMutation.mutateAsync(formData));
      }

      if (mutations.length > 0) {
        await Promise.all(mutations);
        toast({
          title: "Profile updated successfully",
          status: "success",
          duration: 2000,
        });
        setIsOpen(false);
      }
    } catch (error) {
      toast({
        title: "Failed to update profile",
        status: "error",
        duration: 2000,
      });
    }
  };

  return (
    <Box className={styles.container}>
      <Box
        className={
          forPage === "artist"
            ? styles["background-artist"]
            : styles["background-profile"]
        }
      ></Box>

      <Box className={styles["info-wrapper"]}>
        <Box className={styles["img-container"]}>
          <Box className={styles["img-wrapper"]}>
            {isLoading ? (
              <Spinner color="white"/>
            ) : (
              <img src={data || unknownimg} alt="" />
            )}
          </Box>
        </Box>
        <Box className={styles["content-container"]}>
          <Box className={styles["name"]}>
            {displayName}
            {isPremium ? (
                  <Badge marginLeft={10} fontSize="0.7rem" colorScheme="green">
                  Basic
                </Badge>
            ) : (
              <Badge marginLeft={10} fontSize="0.7rem" colorScheme="gray">
                Free
              </Badge>
            )}
          </Box>
          {forPage === "artist" && <Box className={styles["role"]}>Artist</Box>}

          <Box className={styles["created_at"]}>
            Join Monotone at {formatMonthYear(createdAt)}
          </Box>
          {forPage === "profile" &&  <Box className={styles["edit-icon"]} onClick={() => setIsOpen(true)}>
            <FaEdit size={20}/>
          </Box>}
       
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" gap={4}>
            <Box>
              <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="file-input"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                setSelectedImage(file);
                setPreviewUrl(URL.createObjectURL(file));
                }
              }}
              />
              <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
              <Box
                width="150px"
                height="150px"
                borderRadius="full"
                overflow="hidden"
                border="2px solid"
                borderColor="gray.200"
              >
                <img
                src={previewUrl || data || unknownimg}
                alt="Profile"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
              <Button
                as="label"
                htmlFor="file-input"
                size="sm"
                colorScheme="blue"
              >
                Change Photo
              </Button>
              </Box>
            </Box>
            <Input
              value={newDisplayName}
              onChange={(e) => setNewDisplayName(e.target.value)}
              placeholder="Display Name"
              size="md"
            />
            <Button
              onClick={handleSubmit}
              isLoading={updateNameMutation.isPending || updateImageMutation.isPending}
              isDisabled={!selectedImage && newDisplayName === displayName}
              colorScheme="blue"
              width="100%"
            >
              Save Changes
            </Button>
            </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default InfoContainer;
