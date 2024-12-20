import { IImageAlbum } from "./UI";

// Artist
export interface IArtist {
  name: string;
  _id: string;
}



// Track & Album
export interface IPosition {
  no: number;
  of: number;
}

export interface IRecord {
  acoustid: string;
  artist: IArtist[];
  displayedArtist: string;
  duration: number;
  image: IImageAlbum;
  mbid: string;
  media: string;
  position: IPosition;
  title: string;
  _id: string;
}

export interface IReleaseEvent{
  date: string;
  country: string;
}

export interface IReleaseGroup{
  albumArtist: string;
  image: string;
  mbid: string;
  release: string[];
  releaseEvent: IReleaseEvent;
  releaseType: string;
  title: string;
  _id: string;
}

export interface IRelease {
  format: string;
  mbid: string;
  status: string;
  title: string;
  trackCount: number;
  _id: string;
  recording: IRecord[];
}

// Search
export interface ITrackSearchRecord {
  id: string;
  score: number;
  source: {
    create_at: string;
    info: { recording: IRecord };
  };
}

export interface IArtistSearchRecord{
  id: string;
  score: number;
  source: {
    created_at: string;
    type: string;
    value: string;
    info: {
      artist:{
        featuredIn: any[];
        name: string;
        releaseGroup: IReleaseGroup[];
        _id: string;
        image: IImageAlbum
      }
    }
  }
}

export interface IAlbumSearchRecord{
  id: string;
  score: number;
  source: {
    created_at: string;
    type: string;
    value: string;
    info: IRecord
  }
}