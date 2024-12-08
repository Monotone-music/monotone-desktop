import { useState, useCallback, useMemo } from "react";
import { Box, Button, Spinner, useToast } from "@chakra-ui/react";
import {
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
    const toast = useToast();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = useCallback(async (e: any) => {
        e.preventDefault();
        setIsProcessing(true);

        if (!stripe || !elements) {
            setIsProcessing(false);
            return;
        }

        const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.href,
            },
            redirect: "if_required",
        });

        if (confirmError) {
            toast({
                status: "error",
                duration: 2000,
                title: "Payment Error!",
                position: "top-right",
                description: confirmError.message,
            });
            setIsProcessing(false);
            return;
        }

        if (paymentIntent?.status === "succeeded") {
            toast({
                status: "success",
                title: "Payment succeeded",
                description: "Enjoy your music!",
                position: "top-right",
                duration: 3000,
            });

            setIsLoading(true);
            setTimeout(() => {
                navigate('/home');
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
            }, 2000);

        } else if (paymentIntent?.status === "canceled") {
            toast({
                status: "error",
                title: "Payment canceled",
                description:
                    "Oops! Something went wrong with your payment. Please try again",
                position: "top-right",
                duration: 3000,
            });
        } else if (paymentIntent?.status === "processing") {
            toast({
                status: "info",
                title: "Payment processing",
                description: "Please wait for a second !",
                position: "top-right",
                duration: 3000,
            });
        }
        setIsProcessing(false);
    }, [stripe, elements, toast, navigate]);

    const LoadingScreen = useMemo(() => {
        return (
            <Box className={styles.loadingScreen}>
                <Spinner size="lg" />
            </Box>
        );
    }, []);


    if (isLoading) {
        return LoadingScreen;
    }

    return (
        <Box className={styles.container}>
            <Box className={styles.title}>Checkout</Box>
            <Box className={styles.desc}>Choose your preferred payment method.</Box>
            <form onSubmit={handleSubmit} className={styles.form}>
                <PaymentElement className={styles["payment-element"]} options={{ layout: 'accordion'}} />
                <Button
                    type="submit"
                    isLoading={isProcessing}
                    className={styles.btnSubmit}
                >
                    Pay now
                </Button>
            </form>
        </Box>
    );
};

export default CheckoutForm;
