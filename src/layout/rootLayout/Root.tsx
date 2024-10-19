import React from 'react'
import styles from './styles.module.scss'
import SideBar from '../../components/App/sideBar/SideBar'
import TopBar from '../../components/App/topBar/TopBar'
import { Outlet } from 'react-router-dom'
import BottomBar from '../../components/App/bottomBar/BottomBar'
import RightBar from '../../components/App/rightBar/RightBar'

const Root = () => {
  return (
    <section className={styles.container}>
        <SideBar/>
        <TopBar/>
        <section  className={styles.main}>
            <Outlet/>
        </section>
        <RightBar/>
        <BottomBar/>
    </section>
  )
}

export default Root