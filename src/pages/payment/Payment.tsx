import styles from "./styles.module.scss";
import { Box } from "@chakra-ui/react";
import TopInfo from "../../components/Payment/TopInfo/TopInfo";
import PlanInfo from "../../components/Payment/PlanInfo/PlanInfo";
import { useUIPayment } from "../../store/useUIStore";


const Payment = () => {

  const { isOpenPopup, clientSecret } = useUIPayment();
  return (
    <Box className={styles.container}>
          <TopInfo />
          <PlanInfo />
    </Box>
  );
};

export default Payment;
