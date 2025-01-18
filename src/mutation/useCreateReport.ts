import { useMutation } from "@tanstack/react-query";
import { bodyReport, createReport } from "../service/report.api";
import { useAuthStore } from "../store/useAuthStore";

export const useCreateReportMutation = () => {
    const { token } = useAuthStore();
  
    return useMutation({
      mutationFn: (data: bodyReport) =>
        createReport(token!, data ),
    });
  };
  