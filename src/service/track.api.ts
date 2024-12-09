import apiClient from "./apiClient";

export const getTrackStream = async (trackId: string): Promise<any> => {
    const response = await apiClient.get(`/tracks/stream/${trackId}?bitrate=lossless`, {
      responseType: 'arraybuffer'
    })
    return response;
  };