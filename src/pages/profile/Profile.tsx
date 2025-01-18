import styles from "./styles.module.scss";
import { Box, Input, Spinner } from "@chakra-ui/react";
import InfoContainer from "../../components/Profile/InfoContainer/InfoContainer";
import PlanContainer from "../../components/Profile/PlanContainer/PlanContainer";
import { useAuthStore } from "../../store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../service/profile.api";
import PlaylistContainer from "../../components/Profile/PlaylistContainer/PlaylistContainer";
import { useEffect } from "react";

const Profile = () => {
  const { token, setIsPremium } = useAuthStore();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["profile", token],
    queryFn: () => getProfile(token!),
    enabled: !!token,
    refetchOnWindowFocus: true, // Refetch on window focus
    refetchOnMount: true, // Refetch on mount
  });

  useEffect(() => {
    if (data?.data?.membership?.type) {
      setIsPremium(data.data.membership.type === "basic");
    }
  }, [data?.data?.membership?.type, setIsPremium]);

  return isLoading ? (
    <Box className={styles.loadingContainer}>
      <Spinner size="lg" color="white"/>
    </Box>
  ) : (
    <Box className={styles.container}>
      <InfoContainer
        imageFileName={data.data.image.filename}
        displayName={data.data.displayName}
        createdAt={data.data.createdAt}
      />
      <Box className={styles.wrapper}>
        <PlanContainer membershipData={data.data.membership} />
        <PlaylistContainer playlists={data.data.playlist} refetchProfile={refetch} />
      </Box>
    </Box>
  );
};

export default Profile;