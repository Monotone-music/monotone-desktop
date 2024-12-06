import React from 'react'
import styles from './styles.module.scss'
import { Input } from '@chakra-ui/react'
import {UseFormRegister } from "react-hook-form";

export type FormValues = {
  username: string;
  password: string;
};


interface AuthInputProps {
  label?: string;
  id: string;
  type?: string;
  placeholder: string;
  register: UseFormRegister<any>; // or your specific form type
  error?: string; // Error message passed from the parent component

}

const InputForm:React.FC<AuthInputProps> = ({register, placeholder, type, id, error}) => {
  return (
    <>
    <Input variant='outline'  type={type} {...register(id)} placeholder={placeholder} className={styles.container}/>
    {error && <p className={styles['error-text']}>{error}</p>}
    </>
  )
}

export default InputForm