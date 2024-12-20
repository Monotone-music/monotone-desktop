import apiClient from "./apiClient"

export const getRandomAds = async (token: string, type: string) => {
    const response = await apiClient.get(`/advertisement/random?type=${type}_ad`, {
        headers: { Authorization: `Bearer ${token}` } 
    })

    return response.data;
}

export const getStreamAds = async (token: string, adsId: string) => {
    const response = await apiClient.get(`/advertisement/stream/${adsId}`, {
        headers: { Authorization: `Bearer ${token}` } ,
        responseType: 'arraybuffer'
    })

    return response;
}