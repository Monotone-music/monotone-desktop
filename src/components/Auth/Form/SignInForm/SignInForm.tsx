
import styles from "./styles.module.scss";
import InputForm, { FormValues } from "../../Input/InputForm";
import { Box, Button, Spinner, useToast } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import Notation from "../../Notation/Notation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSignInMutation } from "../../../../mutation/useSignInMutation";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISignInForm, SignInSchema } from "../../../../interface/Auth";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const signInMutation = useSignInMutation()
  const navigate = useNavigate();
  const toast = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(SignInSchema) });


  const onSubmit:SubmitHandler<ISignInForm> = async (data) => {
    signInMutation.mutate(data, {
      onSuccess: () => {
        toast({
          status:'success',
          title: "Sign in successfully",
          description: "Have a nice day!",
          position: "top-right",
          duration: 2000
        })

        navigate('/home', {replace: true})
      },

      onError: ()=> {
        toast({
          status: 'error',
          duration: 2000,
          title: "Invalid Credentials",
          position: "top-right",
          description: "Please try again your email or password"
        })
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <InputForm id="username" type="text" register={register}  placeholder="Email or Username" error={errors.username?.message}/>
      <InputForm id="password" type="text" register={register} placeholder="Password" error={errors.password?.message}/>

      <Box className={styles["submit-wrapper"]}>
        <Button type="submit" className={styles.submitBtn}  rightIcon={signInMutation.isPending ? <></> : <FaArrowRight /> } isDisabled={signInMutation.isPending} size="md" w="full" borderRadius="10px">
          {signInMutation.isPending ? <Spinner/> : "Sign in"}
        </Button>
      </Box>

      <Notation/>
    </form>
  );
};

export default SignInForm;
