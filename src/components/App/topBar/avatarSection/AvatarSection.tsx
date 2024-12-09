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

const AvatarSection = () => {
  const navigate = useNavigate();

  const logout = () => {
    navigate('/', { replace: true });
  };

  return (
    <Box className={styles.container}>
      <Menu>
        <MenuButton>
          <Avatar
            name="Dan Abrahmov"
            size="sm"
            src="https://bit.ly/dan-abramov"
          />
        </MenuButton>
        <MenuList bg="black" p={2} border="gray solid 1px" borderRadius={10}>
          <MenuItem bg="black" borderRadius={2} padding="16px 10px"  _hover={{bg: "#CACACA", color: "black"}}  transition="all 0.3s ease" >Profile</MenuItem>
          <MenuItem bg="black" borderRadius={2} padding="16px 10px"  _hover={{bg: "#CACACA", color: "black"}}  transition="all 0.3s ease" onClick={logout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default AvatarSection;
