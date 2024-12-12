import styles from "./styles.module.scss";
import { Box } from "@chakra-ui/react";

const PlanContainer = () => {
  return (
    <Box className={styles.container}>
      <Box className={styles.wrapper}>
        <Box className={styles["current-plan-container"]}>
          <Box className={styles.title}>Current Plan</Box>
          <Box className={styles.plan}>Basic Premium</Box>
        </Box>
        <Box className={styles["upgrade-plan-container"]}>
        <Box className={styles['upgrade-plan-title']}>Update your plan ?</Box>
        <Box className={styles.btn}>
            Click Here
        </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PlanContainer;
