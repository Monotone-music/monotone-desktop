import * as yup from "yup";

export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  message: string | null;
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setIsAuthenticated: (authStatus: boolean) => void;
  setMessage: (message: string) => void;
  clearAuthState: () => void;
}

export interface ISignInForm {
  username: string;
  password: string;
}

export const SignInSchema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();


  export interface ISignUpForm {
    username: string;
    password: string;
    displayName: string;
    email: string;
  }

  export const SignUpSchema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
    displayName: yup.string().required(),
    email: yup.string().required()
  })
  .required();
