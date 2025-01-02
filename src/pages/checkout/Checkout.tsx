import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Box, Spinner } from "@chakra-ui/react";
import { loadStripe } from "@stripe/stripe-js";
import { paymentStripe } from "../../service/payment.api";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/Payment/CheckoutForm/CheckoutForm";
import { getEnv } from "../../util/getEnv";
import { usePaymentStore } from "../../store/usePaymentStore";

const STRIPE_PUBLISH_KEY = getEnv('VITE_STRIPE_PUBLISH_KEY')
const stripePromise = loadStripe(STRIPE_PUBLISH_KEY);
const Checkout = () => {
  const {amount, currency, token, type} = usePaymentStore()
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const paymentBody = {
    amount: amount * 100, 
    currency: currency,
    metadata: {
      token: token,
      type: type,
    },
  };

  const fetchClientSecret = async () => {
    const response = await paymentStripe(paymentBody);
    const { client_secret } = response;
    setClientSecret(client_secret);
  };

  useEffect(() => {
    fetchClientSecret();
  }, []);

  const LoadingScreen = () => {
    return (
        <Box className={styles.loadingScreen}>
            <Spinner size="lg" color="white"/>
        </Box>
    );
};

  if (!stripePromise || !clientSecret) {
    return <LoadingScreen/>;
  }

  return (
    <Box className={styles.container}>
      {stripePromise && clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: clientSecret }}
        >
          <CheckoutForm/>
        </Elements>
      )}
    </Box>
  );
};

export default Checkout;
