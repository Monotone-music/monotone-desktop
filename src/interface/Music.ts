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

export interface IRelease {
  format: string;
  mbid: string;
  status: string;
  title: string;
  trackCount: number;
  _id: string;
  recording: IRecord[]
}
