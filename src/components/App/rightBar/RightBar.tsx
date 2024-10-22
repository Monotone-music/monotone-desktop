import React from "react";
import styles from "./styles.module.scss";
import { useUIStore } from "../../../store/useUIStore";
import AlbumActionBar from "./albumActionBar/AlbumActionBar";
import ThumbnailTrack from "./thumbnailTrack/ThumbnailTrack";
import AboutArtist from "./aboutArtist/AboutArtist";

const RightBar = () => {
  const { toggleRightBar, isRightBarOpen } = useUIStore();

  return (
    <section
      className={styles.container}
      style={isRightBarOpen ? { display: "block" } : { display: "none" }}
    >
      <AlbumActionBar/>
      <ThumbnailTrack/>
      <AboutArtist/>
    </section>
  );
};

export default RightBar;
