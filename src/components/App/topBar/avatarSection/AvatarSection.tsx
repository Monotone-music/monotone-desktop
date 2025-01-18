import styles from "./styles.module.scss";
import {
  Avatar,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../../store/useAuthStore";
import { usePlayerStore } from "../../../../store/usePlayerStore";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../../../service/profile.api";
import { getAlbumImageByFileName } from "../../../../service/album.api";
import unknownimg from '../../../../assets/img/unknownimg.jpg'

const AvatarSection = () => {
  const {clearAuthState, token} = useAuthStore()
  const {clearStatePlayer} = usePlayerStore()
  const navigate = useNavigate();

  const { data: profileData } = useQuery({
    queryKey: ['profile', token],
    queryFn: () => getProfile(token!),
    enabled: !!token,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60, // 1 minute
  });

  const { data: imgData } = useQuery({
    queryKey: ['imgProfile', profileData?.data?.image?.filename],
    queryFn: () => getAlbumImageByFileName(profileData?.data?.image?.filename!, token!),
    enabled: !!token && !!profileData?.data?.image?.filename,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60, // 1 minute
  });

  const redirectToProfile = () => {
    navigate('/profile', { replace: true });
  };

  const logout = () => {
    clearAuthState()
    clearStatePlayer()
    navigate('/', { replace: true });
  };

  return (
    <Box className={styles.container}>
      <Menu>
        <MenuButton>
          <Avatar
            name="Dan Abrahmov"
            size="sm"
            src={imgData || unknownimg}
          />
        </MenuButton>
        <MenuList bg="black" p={2} border="gray solid 1px" borderRadius={10}>
          <MenuItem bg="black" borderRadius={2} padding="16px 10px" color={'white'}  _hover={{bg: "#CACACA", color: "black"}}  transition="all 0.3s ease" onClick={redirectToProfile}>Profile</MenuItem>
          <MenuItem bg="black" borderRadius={2} padding="16px 10px" color={'white'}  _hover={{bg: "#CACACA", color: "black"}}  transition="all 0.3s ease" onClick={logout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default AvatarSection;
