import styles from './styles.module.scss'
import BottomTrack from './bottomTrack/BottomTrack'
import PlayBar from './playBar/PlayBar'
import OptionBar from './optionBar/OptionBar'

const BottomBar = () => {

  return (
    <section className={styles.container}>
      <BottomTrack/>
      <PlayBar/>
      <OptionBar/>
    </section>
  )
}

export default BottomBar