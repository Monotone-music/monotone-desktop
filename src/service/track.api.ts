import apiClient from "./apiClient";

export const getTrackStream = async (trackId: string, start: number, end: number) => {
  const response = await apiClient.get(`/tracks/stream/${trackId}?bitrate=lossless`, {
    headers: {
      range: `bytes=${start}-${end}`,
    },
    responseType: 'arraybuffer',
  });
  
  return {
    chunk: response.data,
    contentLength: response.headers['Content-Length'],
    contentRange: response.headers['Content-Range']
  };
};

  export const getTrackInfoById = async (trackId: string, token: string) => {
    const response = await apiClient.get(`/tracks/info/${trackId}`, 
      { headers: { Authorization: `Bearer ${token}` } }
    )

    return response.data.data;
  }