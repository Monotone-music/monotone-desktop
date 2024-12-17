import styles from "./styles.module.scss";
import { Box } from "@chakra-ui/react";
import TitlePage from "../../../components/Auth/TitlePage/TitlePage";
import SignInForm from "../../../components/Auth/Form/SignInForm/SignInForm";
import signInImage from "../../../assets/img/signIn-image.jpg";

const SignIn = () => {


  return (
    <Box className={styles.container}>
      <Box className={styles["content-wrapper"]}>
        <TitlePage title="Sign in" desc="Welcome back to Monotone!"/>
        <SignInForm />
      </Box>

      <Box className={styles["image-wrapper"]}>
        <img src={signInImage} alt="Sign-in-img" loading="lazy" />
      </Box>
    </Box>
  );
};

export default SignIn;
