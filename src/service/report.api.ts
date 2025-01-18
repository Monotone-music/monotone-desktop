import apiClient from "./apiClient"

export interface bodyReport {
    recordingId: string;
    type: string;
    reason?: string;
}

export const createReport = async (token: string, body: any) => {
    const response = await apiClient.post('/report/create', body, {
        headers: { Authorization: `Bearer ${token}` } 
    })

    return response.data.data
}