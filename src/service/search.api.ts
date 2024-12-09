import apiClient from "./apiClient";

export const searchAPI = async (q: string, token: string) => {
    const response = await apiClient.get(`/search?q=${q}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
};
