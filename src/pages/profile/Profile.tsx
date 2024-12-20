import styles from "./styles.module.scss";
import { Box, Spinner } from "@chakra-ui/react";
import InfoContainer from "../../components/Profile/InfoContainer/InfoContainer";
import PlanContainer from "../../components/Profile/PlanContainer/PlanContainer";
import { useAuthStore } from "../../store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../service/profile.api";
import PlaylistContainer from "../../components/Profile/PlaylistContainer/PlaylistContainer";

const Profile = () => {
  const { token } = useAuthStore();
  const { data, isLoading , refetch} = useQuery({
    queryKey: ["profile", token],
    queryFn: () => getProfile(token!),
    enabled: !!token,
  });

  return isLoading ? (
    <Box className={styles.loadingContainer}>
      <Spinner size="lg" />
    </Box>
  ) : (

    <Box className={styles.container}>
      <InfoContainer
        displayName={data.data.displayName}
        createdAt={data.data.createdAt}
      />
      <Box className={styles.wrapper}>
        {/* <FollowContainer /> */}
        <PlanContainer membershipData={data.data.membership}/>
        <PlaylistContainer playlists={data.data.playlist} refetchProfile={refetch}/>

      </Box>

    </Box>
  );
};

export default Profile;
