import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useAuthStore } from "../../../store/useAuthStore";
import { paymentStripe } from "../../../service/payment.api";
import { Elements } from '@stripe/react-stripe-js';

import { loadStripe } from '@stripe/stripe-js';
export const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLISH_KEY
  );
  
const StripePaymentButton = () => {
    const [clientSecret, setClientSecret] = useState("") 
  const { token } = useAuthStore();
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);

  const testBody = {
    amount: 17339342, // Amount in VND
    currency: "vnd",
    metadata: {
      token: token,
      type: "basic",
    },
  };

  const handlePayment = async () => {
    if (!stripe || !elements) {
      // Stripe.js or Elements not yet loaded
      return;
    }

    setIsProcessing(true);

    
    try {
      // Call the backend API to create a payment intent
      const response = await paymentStripe(testBody);
      const { client_secret } = response; // Assuming the response contains client_secret
      setClientSecret(client_secret)
    //   if (!client_secret) {
    //     console.error("Client secret missing");
    //     setIsProcessing(false);
    //     return;
    //   }

    //   // Confirm the payment with Stripe
    //   const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
    //     payment_method: {
    //       card: cardElement, // Pass the CardElement as the payment method
    //     },
    //   });

    //   if (error) {
    //     console.error("Payment failed:", error.message);
    //   } else if (paymentIntent.status === "succeeded") {
    //     alert("Payment successful!");
    //   }

console.log(clientSecret)
    } catch (error) {
      console.error("Error during payment process:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
    <button onClick={handlePayment} disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
      <PaymentElement/>
  <Elements stripe={stripePromise} options={{clientSecret:clientSecret }}>
    </Elements>
    </>
  );
};

export default StripePaymentButton;
