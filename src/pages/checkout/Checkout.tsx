import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Box } from "@chakra-ui/react";
import { loadStripe } from "@stripe/stripe-js";
import { paymentStripe } from "../../service/payment.api";
import { useAuthStore } from "../../store/useAuthStore";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/Payment/CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);
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

  if (!stripePromise || !clientSecret) {
    return <div>Loading...</div>;
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
