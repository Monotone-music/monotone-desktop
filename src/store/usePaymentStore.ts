import { create } from "zustand";
import { PaymentState } from "../interface/Payment";

export const usePaymentStore = create<PaymentState>((set) => ({
    amount: 0,
    token: null,
    currency: 'usd', 
    type: 'membership',
    setAmount: (amount) => set({amount}),
    setToken: (token) => set({token}),
    setCurrency: (currency) => set({currency}),
    setType: (type) => set({type}),
    clearPaymentState: () => set({
        amount: 0,
        token: null
    })
})) 