import { IPayment } from "../interface/Payment"
import apiClient from "./apiClient"

export const paymentStripe = async (body:IPayment) => {
    const response = await apiClient.post(`/payment/create-intent`, body, 
        { headers: { Authorization: `Bearer ${body.metadata.token}` } }
    )
    return response.data.data.intent;
}