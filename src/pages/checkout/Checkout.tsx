import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Box, Spinner } from "@chakra-ui/react";
import { loadStripe } from "@stripe/stripe-js";
import { paymentStripe } from "../../service/payment.api";
import { useAuthStore } from "../../store/useAuthStore";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/Payment/CheckoutForm/CheckoutForm";
import { getEnv } from "../../util/getEnv";

const STRIPE_PUBLISH_KEY = getEnv('VITE_STRIPE_PUBLISH_KEY')
const stripePromise = loadStripe(STRIPE_PUBLISH_KEY);
const Checkout = () => {
  const { token } = useAuthStore();

  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const testBody = {
    amount: 2000000, // Amount in VND
    currency: "usd",
    metadata: {
      token: token,
      type: "basic",
    },
  };

  const fetchClientSecret = async () => {
    const response = await paymentStripe(testBody);
    const { client_secret } = response;
    setClientSecret(client_secret);
  };

  useEffect(() => {
    fetchClientSecret();
  }, []);

  const LoadingScreen = () => {
    return (
        <Box className={styles.loadingScreen}>
            <Spinner size="lg" />
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
