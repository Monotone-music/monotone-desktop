export interface IPayment {
    amount: number;
    currency: string;
    metadata: {
        token: string | null;
        type: string;
    }
}

export interface PaymentState {
    token: string | null;
    amount: number;
    currency: string;
    type: string;
    setToken: (token: string) => void
    setAmount: (amount: number) => void
    setCurrency: (currency: string) => void
    setType: (type: string) => void,
    clearPaymentState: () => void,
}