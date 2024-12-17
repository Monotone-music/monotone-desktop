  import styles from './styles.module.scss'
import { Box, Text } from '@chakra-ui/react'

interface TitlePageProps {
  title: string;
  desc: string;
}

const TitlePage: React.FC<TitlePageProps> = ({title, desc}) => {
  return (
    <Box className={styles.container}>
        <Text className={styles.title}>{title}</Text>
        <Text className={styles.desc}>{desc}</Text>
    </Box>
  )
}

export default TitlePage