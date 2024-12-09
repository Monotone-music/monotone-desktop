import apiClient from "./apiClient";

export const getProfile = async (token: string) => {
  const response = await apiClient.get(`/listener/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data
};
