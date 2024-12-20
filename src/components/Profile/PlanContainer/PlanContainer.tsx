import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { Box } from "@chakra-ui/react";

interface PlanContainerProps {
  membershipData: {
    createdAt: string;
    updatedAt: string;
    description: string;
    end: string | null;
    price: number;
    quality: string;
    start: string | null;
    type: string;
    _id: string;
  };
}

const PlanContainer: React.FC<PlanContainerProps> = ({membershipData}) => {

  const navigate = useNavigate()

  const redirectToProfile = () => {
    navigate('/payment')
  }

  const redirectToHome = () => {
    navigate('/home')
  }

  return (
    <Box className={styles.container}>
      <Box className={styles.wrapper}>
        <Box className={styles["current-plan-container"]}>
          <Box className={styles.title}>Current Plan</Box>
          <Box className={styles.plan}>{membershipData.description}</Box>
        </Box>
        <Box className={styles["upgrade-plan-container"]}>
          {membershipData.quality === "192kbps" ? (
            <>
                <Box className={styles['upgrade-plan-title']}>Update your plan ?</Box>
                <Box className={styles.btn} onClick={redirectToProfile}>
                    Click Here
                </Box>
                </>
          ) : (
            <>
             <Box className={styles['upgrade-plan-title']}>Explore your music journey</Box>
                <Box className={styles.btn} onClick={redirectToHome} >
                    Explore now
                </Box></>
          )}
    
        </Box>
      </Box>
    </Box>
  );
};

export default PlanContainer;
