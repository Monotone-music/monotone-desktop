import { useMutation } from "@tanstack/react-query";
import { ISignUpForm } from "../interface/Auth";
import { signUp } from "../service/auth.api";

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: (data: ISignUpForm) => signUp(data),
  });
};
