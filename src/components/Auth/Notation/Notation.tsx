import styles from './styles.module.scss'
import { Box, Button, Text } from '@chakra-ui/react';

const Notation = () => {
  return (
    <Box className={styles.container}>
        <Text className={styles.text}>Don't have account ?</Text>
        <Button size="xs" className={styles.btn}>Sign up</Button>
    </Box>
  )
}

export default Notation