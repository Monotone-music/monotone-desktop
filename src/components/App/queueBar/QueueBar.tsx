import { Box } from '@chakra-ui/react'
import styles from './styles.module.scss'
import QueueActionBar from '../../Queue/QueueActionBar/QueueActionBar'
import QueueList from '../../Queue/QueueList/QueueList'

const QueueBar = () => {
  return (
    <Box className={styles.container} >
      <QueueActionBar/>
      <QueueList/>
    </Box>
  )
}

export default QueueBar