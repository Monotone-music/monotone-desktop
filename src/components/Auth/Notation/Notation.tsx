import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss'
import { Box, Button, Text } from '@chakra-ui/react';

interface NotationProps {
  text: string;
  btnText: string;
  to: string
}

const Notation: React.FC<NotationProps> = ({text, btnText, to}) => {

  const navigate = useNavigate()

  const handleDirectToSignUp = () => {
    navigate(to, {replace: true})
  }
  return (
    <Box className={styles.container}>
        <Text className={styles.text}>{text}</Text>
        <Button size="xs" onClick={handleDirectToSignUp} className={styles.btn}>{btnText}</Button>
    </Box>
  )
}

export default Notation