import styles from './styles.module.scss'
import signUpImage from '../../../assets/img/signUp-image.jpg'
import { Box } from "@chakra-ui/react"
import TitlePage from "../../../components/Auth/TitlePage/TitlePage"
import SignUpForm from '../../../components/Auth/Form/SignUpForm/SignUpForm'

const SignUp = () => {
  return (
    <Box className={styles.container}>
    <Box className={styles["content-wrapper"]}>
      <TitlePage title="Sign up" desc="Become Monotone's member!"/>
      <SignUpForm />
    </Box>

    <Box className={styles["image-wrapper"]}>
      <img src={signUpImage} alt="Sign-in-img" loading="lazy" />
    </Box>
  </Box>
  )
}

export default SignUp