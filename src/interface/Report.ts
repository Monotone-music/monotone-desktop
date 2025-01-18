import * as yup from "yup";

export type ReportValue = {
    recordingId: string;
    type: string;
    reason?: string;
}


export const ReportSchema = yup
  .object({
    recordingId: yup.string().required(),
    type: yup.string().required(),
    reason: yup.string()
  })
  .required();