import styles from "./styles.module.scss";
import { Box } from "@chakra-ui/react";
import TabSection from "../../components/Home/TabSection/TabSection";
import AllTab from "../../components/Home/TabSection/AllTab/AllTab";
import AlbumTab from "../../components/Home/TabSection/AlbumTab/AlbumTab";
import CompilationTab from "../../components/Home/TabSection/CompilationTab/CompilationTab";
import { ITabArr } from "../../interface/UI";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";

const Home = () => {
  const {isPremium} = useAuthStore()
  console.log(isPremium)
  const tabArr: ITabArr[] = [
    { title: "All", component: <AllTab /> },
    { title: "Album", component: <AlbumTab /> },
    { title: "Compilation", component: <CompilationTab /> },
  ];
  const [bgColor, setBgColor] = useState("#252525");
  useEffect(() => {
    const colors = ["#0b0f1f", "#152C0C", "#440505", "#4A235A"];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % colors.length;
      setBgColor(colors[index]);
    }, 12000); // Change every 2 minutes

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);
  return (
    <Box      
      className={styles.container}
      style={{
      background: `linear-gradient(to bottom, ${bgColor} 0%, #000000 100%)`, // Dynamic background color
      transition: "background 1s ease-in-out" // Smoother transition
      }}>
      <TabSection dataTab={tabArr} />
    </Box>
  );
};

export default Home;
