import apiClient from "./apiClient";

export const getTrackStream = async (trackId: string): Promise<any> => {
    const response = await apiClient.get(`/tracks/stream/${trackId}?bitrate=lossless`, {
      responseType: 'arraybuffer'
    })
    return response;
  };

  export const getTrackInfoById = async (trackId: string, token: string) => {
    const response = await apiClient.get(`/tracks/info/${trackId}`, 
      { headers: { Authorization: `Bearer ${token}` } }
    )

    return response.data.data;
  }