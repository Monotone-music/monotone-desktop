import React, { FunctionComponent, useState } from "react";
import styles from "./styles.module.scss";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Button,
  Textarea,
  useToast,
  Text,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ReportValue } from "../../../interface/Report";
import { bodyReport } from "../../../service/report.api";
import { useCreateReportMutation } from "../../../mutation/useCreateReport";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  recordingId: string;
}

const ReportModal: FunctionComponent<ReportModalProps> = ({ isOpen, onClose, recordingId }) => {
  const toast = useToast();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const createReportMutation = useCreateReportMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReportValue>({ mode: "onChange" });

  // Watch the selected type
  const type = watch("type");

  const onSubmit: SubmitHandler<ReportValue> = (data) => {
    const formData:bodyReport = {
      type: data.type,
      reason: data.reason,
      recordingId: recordingId
    }

    createReportMutation.mutate(formData, {
      onSuccess: () => {
        toast({
          status:'success',
          title: "Report Successfully",
          position: "top-right",
          duration: 2000
        })

        onClose()
      },

      onError: ()=> {
        toast({
          status: 'error',
          duration: 2000,
          title: "Report Failed",
          position: "top-right"
        })
      }
    });
   
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxHeight={450} padding={2}>
        <ModalHeader>Report</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Text mb={4}>Choose the reason below you want to report</Text>
            <RadioGroup
              value={type}
              onChange={(value) => {
                setSelectedType(value);
                setValue("type", value);
              }}
            >
              <Stack direction="column" spacing={3}>
                <Radio {...register("type")} value="invalid_playback">
                  Invalid Playback
                </Radio>
                <Radio {...register("type")} value="inappropriate_content">
                  Inappropiate Content
                </Radio>
                <Radio {...register("type")} value="other">
                  Other
                </Radio>
              </Stack>
            </RadioGroup>

            {type === "other" && (
              <Textarea
                mt={4}
                maxHeight={200}
                placeholder="Please describe the issue"
                {...register("reason", {
                  required: "Please provide a reason",
                })}
              />
            )}
            {errors.reason && <Text color="red.500">{errors.reason.message}</Text>}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" type="submit">
              Submit Report
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ReportModal;
