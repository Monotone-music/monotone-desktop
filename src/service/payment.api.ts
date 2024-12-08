import { IPayment } from "../interface/Payment"
import apiClient from "./apiClient"

export const paymentStripe = async (body:IPayment) => {
    console.log("Payment Body: ", body)
    const response = await apiClient.post(`/payment/create-intent`, body, 
        { headers: { Authorization: `Bearer ${body.metadata.token}` } }
    )

    console.log("Payment Stripe Response", response)
    return response.data.data.intent;
}