import styles from "./styles.module.scss";
import SideBar from "../../components/App/sideBar/SideBar";
import TopBar from "../../components/App/topBar/TopBar";
import { Outlet } from "react-router-dom";
import BottomBar from "../../components/App/bottomBar/BottomBar";
import RightBar from "../../components/App/rightBar/RightBar";
import { useQueueStore, useUISearch, useUIStore } from "../../store/useUIStore";
import SearchModal from "../../components/Search/Modal/SearchModal/SearchModal";
import QueueBar from "../../components/App/queueBar/QueueBar";

const Root = () => {
  const { isOpenModal } = useUISearch();
  const { isRightBarOpen } = useUIStore();
  const { isOpenQueue } = useQueueStore();

  return (
    <section className={styles.container}>
      <SideBar />
      <TopBar />
      <section className={styles.main}>
        {isOpenModal ? <SearchModal /> : <Outlet />}
      </section>
      {isRightBarOpen && <RightBar />}
      {isOpenQueue && <QueueBar />}
      <BottomBar />
    </section>
  );
};

export default Root;
