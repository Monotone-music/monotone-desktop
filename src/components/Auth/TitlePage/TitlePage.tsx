  import styles from './styles.module.scss'
import { Box, Text } from '@chakra-ui/react'

const TitlePage = () => {
  return (
    <Box className={styles.container}>
        <Text className={styles.title}>Sign in</Text>
        <Text className={styles.desc}>Welcome back to Monotone!</Text>
    </Box>
  )
}

export default TitlePage