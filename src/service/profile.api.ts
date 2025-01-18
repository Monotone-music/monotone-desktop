import apiClient from "./apiClient";

export const getProfile = async (token: string) => {
  const response = await apiClient.get(`/listener/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data
};

export const updateDisplayname = async (displayName: string) => {
  const response = await apiClient.patch('/listener/name', {displayName})

  return response.data.data
}

export const updateImage = async (formData: FormData) => {
  const response = await apiClient.patch('/listener/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.data;
};

