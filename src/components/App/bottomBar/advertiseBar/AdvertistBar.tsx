import styles from "./styles.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../../store/useAuthStore";
import { getRandomAds } from "../../../../service/ads.api";
import { getAlbumImageByFileName } from "../../../../service/album.api";
import { Skeleton } from "@chakra-ui/react";

const AdvertistBar = () => {
  const { token, isPremium } = useAuthStore();

  const { data: adData, isLoading: isAdLoading } = useQuery({
    queryKey: ["bannerAd", token],
    queryFn: () => getRandomAds(token!, "banner"),
    enabled: !!token && !isPremium,
  });

  const { data: imgBanner, isLoading: isImageLoading } = useQuery({
    queryKey: ["imgBanner", adData?.data?.image?.filename],
    queryFn: () => getAlbumImageByFileName(adData?.data?.image?.filename, token!),
    enabled: !!token && !!adData?.data?.image?.filename && !isPremium,
  });

  if (isPremium) return null;
  
  if (isAdLoading || !adData) {
    return (
      <div className={styles.container}>
        <Skeleton height="100%" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.imgWrapper}>
        {isImageLoading ? (
          <Skeleton height="100%" />
        ) : (
          <img src={imgBanner} alt={adData?.data?.title || ""} />
        )}
      </div>
    </div>
  );
};

export default AdvertistBar;