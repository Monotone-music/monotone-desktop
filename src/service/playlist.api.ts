import apiClient from "./apiClient";

export interface createNewPlaylistProps {
    name: string;
    recordingId?:string;
}

export const createNewPlaylist = async (body: createNewPlaylistProps, token: string) => {
    const response = await apiClient.put(`/playlist`, body, 
      { headers: { Authorization: `Bearer ${token}` } }
    )

    return response.data.data;
  }


export const getPlaylistDetail = async (playlistId: string, token:string) => {
  const response = await apiClient.get(`/playlist/${playlistId}`, 
    { headers: { Authorization: `Bearer ${token}` } }
  )

  return response.data;
}

export const deleteTrackFromPlaylist = async (playlistId: string, token:string, index: any) => {
  const response = await apiClient.delete(`/playlist/${playlistId}/recording`, 
    { 
      headers: { Authorization: `Bearer ${token}` },
      data: { index }
    }
  )

  return response.data;
}

