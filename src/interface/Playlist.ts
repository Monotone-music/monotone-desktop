import * as yup from "yup";

export type PlaylistValue = {
    name: string;
    recordingId? : string;
}

export interface PlaylistState {
    recordingId: string | null;
    setRecordingId: (recordingId: string) => void;
    resetState: () => void; // Add resetState function
}

export const PlaylistSchema = yup
  .object({
    name: yup.string().required(),
    recordingId: yup.string(),
  })
  .required();