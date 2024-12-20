import styles from "./styles.module.scss";
import SideBar from "../../components/App/sideBar/SideBar";
import TopBar from "../../components/App/topBar/TopBar";
import { Outlet } from "react-router-dom";
import BottomBar from "../../components/App/bottomBar/BottomBar";
import RightBar from "../../components/App/rightBar/RightBar";
import { useQueueStore, useUISearch, useUIStore } from "../../store/useUIStore";
import SearchModal from "../../components/Search/Modal/SearchModal/SearchModal";
import QueueBar from "../../components/App/queueBar/QueueBar";
import AdvertistBar from "../../components/App/bottomBar/advertiseBar/AdvertistBar";
import { useAuthStore } from "../../store/useAuthStore";

const Root = () => {
  const { isOpenModal } = useUISearch();
  const { isRightBarOpen } = useUIStore();
  const { isOpenQueue } = useQueueStore();
  const {isPremium} = useAuthStore()

  return (
    <section className={styles.container}>
      <SideBar />
      <TopBar />
      <section className={styles.main}>
        {isOpenModal ? <SearchModal /> : <Outlet />}
      </section>
      {isRightBarOpen && <RightBar />}
      {isOpenQueue && <QueueBar />}
      {!isPremium ? <></>: (<AdvertistBar/>)}
      <BottomBar />
    </section>
  );
};

export default Root;
