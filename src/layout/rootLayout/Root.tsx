import styles from './styles.module.scss'
import SideBar from '../../components/App/sideBar/SideBar'
import TopBar from '../../components/App/topBar/TopBar'
import { Outlet } from 'react-router-dom'
import BottomBar from '../../components/App/bottomBar/BottomBar'
import RightBar from '../../components/App/rightBar/RightBar'
import {useUISearch } from '../../store/useUIStore'
import SearchModal from '../../components/Search/Modal/SearchModal/SearchModal'


const Root = () => {
  const {isOpenModal} = useUISearch()

  return (
    <section className={styles.container}>
        <SideBar/>
        <TopBar/>
        <section  className={styles.main}>
          {isOpenModal ? (
            <SearchModal/>
          ) : (<Outlet/>)}
            
        </section>
        <RightBar/>
        <BottomBar/>
    </section>
  )
}

export default Root