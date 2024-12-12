import styles from './styles.module.scss'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className={styles.container}>
        <Outlet/>
    </div>
  )
}

export default AuthLayout