import React from "react";
import styles from "./styles.module.scss";
import { Box, Button, ListItem, UnorderedList } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { usePaymentStore } from "../../../store/usePaymentStore";
import { useAuthStore } from "../../../store/useAuthStore";

export interface PlanCardProps {
  cardType: string;
  cardTitle: string;
  priceMain: string | number;
  monthMain: string;
  priceLater: string;
  descPlan: string[];
  btnColor: string;
}

const PlanCard: React.FC<PlanCardProps> = ({
  cardTitle,
  cardType,
  descPlan,
  priceMain,
  btnColor,
}) => {
  const navigate = useNavigate();
  const { token, isPremium } = useAuthStore();
  const { setAmount, setToken } = usePaymentStore();
  const handleTogglePopup = (amount: number, token: string) => {
    navigate("/payment/checkout");
    setAmount(amount);
    setToken(token);
  };

  return (
    <Box className={styles.container}>
      <Box className={styles["info-wrapper"]}>
        <Box className={styles.cardType}>{cardType}</Box>
        <Box className={styles.cardTitle}>{cardTitle}</Box>
        <Box className={styles["price-wrapper"]}>
          <Box className={styles.priceMain}>$ {priceMain}.00</Box>
        </Box>
      </Box>
      <Box className={styles.divider}></Box>
      <Box className={styles["list-desc-wrapper"]}>
        <UnorderedList>
          {descPlan.map((desc, index) => (
            <ListItem key={index} color={"white"}>
              {desc}
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
      {isPremium ? (
        <Box
          style={{ background: 'green' }}
          className={styles['btn-paid']}
        >
          Your are already use this plan
        </Box>
      ) : (
        <Button
          onClick={() => handleTogglePopup(priceMain as number, token!)}
          style={{ background: btnColor }}
          className={styles.btn}
        >
          Get {cardType} plan
        </Button>
      )}
    </Box>
  );
};

export default PlanCard;
