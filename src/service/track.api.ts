import apiClient from "./apiClient";

export const getTrackStream = async (trackId: string): Promise<any> => {
    const response = await apiClient.get(`/tracks/mobile/stream/${trackId}`, {
      responseType: 'arraybuffer'
    })
    return response;
  };