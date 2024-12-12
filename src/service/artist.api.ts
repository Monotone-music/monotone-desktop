import apiClient from "./apiClient";


export const getArtists = async (token: string) => {
    const response = await apiClient.get(`/artist`, 
        { headers: { Authorization: `Bearer ${token}` } }
      )
    
      return response.data;
}

export const getArtistById = async (artistId: string, token:string) => {
    const response = await apiClient.get(`/artist/id/${artistId}`, 
      { headers: { Authorization: `Bearer ${token}` } }
    )
  
    return response.data;
  }
  