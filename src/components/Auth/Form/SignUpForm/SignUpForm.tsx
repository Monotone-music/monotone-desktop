import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { Box, Button, Spinner, useToast } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {ISignUpForm, SignUpSchema } from "../../../../interface/Auth";
import InputForm, { SignUpFormValues } from "../../Input/InputForm";
import Notation from "../../Notation/Notation";
import { FaArrowRight } from "react-icons/fa";
import { useSignUpMutation } from "../../../../mutation/useSignUpMutation";
import { AxiosError } from "axios";

const SignUpForm = () => {
  const signUpMutation = useSignUpMutation();
  const navigate = useNavigate();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({ resolver: yupResolver(SignUpSchema) });

  const onSubmit: SubmitHandler<ISignUpForm> = async (data) => {
    const trimmedData = {
      username: data.username.trim(),
      password: data.password.trim(),
      displayName: data.displayName.trim(),
      email: data.email.trim()
    }


    signUpMutation.mutate(trimmedData, {
      onSuccess: () => {
        toast({
          status: "success",
          title: "Sign Up Successfully",
          description: "Please sign in with the account you have created!",
          position: "top-right",
          duration: 2000,
        });

        navigate("/auth/sign-in", { replace: true });
      },

      onError: (e: Error) => {
        const error = e as AxiosError
        const errorMessage = (error?.response?.data as { message: string })?.message;
        toast({
          status: "error",
          duration: 2000,
          title: "Sign Up Failed !",
          position: "top-right",
          description: errorMessage || "Please try again with your information!",
        });
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <InputForm
        id="username"
        type="text"
        register={register}
        placeholder="Username"
        error={errors.username?.message}
      />
      <InputForm
        id="password"
        type="password"
        register={register}
        placeholder="Password"
        error={errors.password?.message}
      />

<InputForm
        id="displayName"
        type="text"
        register={register}
        placeholder="Display Name"
        error={errors.displayName?.message}
      />
      <InputForm
        id="email"
        type="text"
        register={register}
        placeholder="Email"
        error={errors.email?.message}
      />

      <Box className={styles["submit-wrapper"]}>
        <Button
          type="submit"
          className={styles.submitBtn}
          rightIcon={signUpMutation.isPending ? <></> : <FaArrowRight />}
          isDisabled={signUpMutation.isPending}
          size="md"
          w="full"
          borderRadius="10px"
        >
          {signUpMutation.isPending ? <Spinner color="white"/> : "Sign up"}
        </Button>
      </Box>

      <Notation text="Already have account ?" btnText="Sign in" to="/auth/sign-in"/>
    </form>
  );
};

export default SignUpForm;
