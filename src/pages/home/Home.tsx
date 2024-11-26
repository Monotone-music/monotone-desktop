import styles from "./styles.module.scss";
import { Box } from "@chakra-ui/react";
import TabSection from "../../components/Home/TabSection/TabSection";
import AllTab from "../../components/Home/TabSection/AllTab/AllTab";
import AlbumTab from "../../components/Home/TabSection/AlbumTab/AlbumTab";
import CompilationTab from "../../components/Home/TabSection/CompilationTab/CompilationTab";
import { ITabArr } from "../../interface/UI";

const Home = () => {
  const tabArr: ITabArr[] = [
    { title: "All", component: <AllTab /> },
    { title: "Album", component: <AlbumTab /> },
    { title: "Compilation", component: <CompilationTab /> },
  ];

  return (
    <Box className={styles.container}>
      <TabSection dataTab={tabArr} />
    </Box>
  );
};

export default Home;
