import { Box, Button, Icon } from '@chakra-ui/react'
import styles from './styles.module.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import { MdErrorOutline } from 'react-icons/md';

const Error = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleRedirectToLogin = () => {
        navigate('/auth/sign-in');
      };
    const { message } = location.state || {};
  return (
    <Box className={styles.container}>
      <Icon as={MdErrorOutline } color="white" boxSize={8}/>
      <Box className={styles.title}>{message || "An unknown error occurred."}</Box>
      <Box className={styles.desc}>Please Sign In Again!</Box>
      <Button className={styles.btn} onClick={handleRedirectToLogin}>Go to Sign In Page</Button>
    </Box>
  )
}

export default Error