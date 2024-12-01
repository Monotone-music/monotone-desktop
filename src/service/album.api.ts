import { AxiosResponse } from "axios";
import apiClient from "./apiClient";

export const getAlbum = async (): Promise<AxiosResponse> => {
  const response = await apiClient.get(`/album`);
  return response.data;
};

export const getAlbumImageByFileName = async (fileName: string): Promise<string> => {
    const response = await apiClient.get(`/image/${fileName}`, {
        responseType: 'blob',
    })

    const blob = response.data;
    const url = URL.createObjectURL(blob);
    return url;
}


export const getAlbumDetailById = async (albumId: string): Promise<AxiosResponse> => {
  const response = await apiClient.get(`/album/id/${albumId}`);
  return response.data
}