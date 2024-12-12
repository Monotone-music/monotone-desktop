import styles from "./styles.module.scss";
import NavigationBar from "./navigationBar/NavigationBar";
import HomeBtn from "./homeBtn/HomeBtn";
import SearchBar from "./searchBar/SearchBar";
import AvatarSection from "./avatarSection/AvatarSection";

const TopBar = () => {
  return (
    <section className={styles.container}>
      <div className={styles['nav-container']}>
        <NavigationBar />
      </div>
      <div className={styles['home-search-container']}>
        <HomeBtn />
        <SearchBar />
      </div>
      <div className={styles['avatar-container']}>
        <AvatarSection />
      </div>
    </section>
  );
};

export default TopBar;
