import { AxiosResponse } from "axios";
import apiClient from "./apiClient";

export const getAlbum = async (token: string): Promise<AxiosResponse> => {
  const response = await apiClient.get(`/album`, 
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const getTopAlbum = async (token: string, limit:number): Promise<AxiosResponse> => {
  const response = await apiClient.get(`/album/top?limit=${limit}`, 
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}

export const getAlbumImageByFileName = async (fileName: string, token: string): Promise<string> => {
    const response = await apiClient.get(`/image/${fileName}`, {
        responseType: 'blob',
        headers: { Authorization: `Bearer ${token}` } 
    })

    const blob = response.data;
    const url = URL.createObjectURL(blob);
    return url;
}


export const getAlbumDetailById = async (albumId: string, token: string): Promise<AxiosResponse> => {
  const response = await apiClient.get(`/album/id/${albumId}`, {
    headers: { Authorization: `Bearer ${token}` } 
  });
  return response.data
}