import React from 'react'
import styles from './styles.module.scss'
import { Box, Icon, Text } from '@chakra-ui/react'
import { RiErrorWarningLine } from "react-icons/ri";

interface ErrorWarningProps {
    title: string;
    description: string;
}


const ErrorWarning:React.FC<ErrorWarningProps> = ({title, description}) => {
  return (
    <Box className={styles.container}>
        <Box className={styles['content-wrapper']}>
            <Icon as={RiErrorWarningLine} boxSize={10}/>
            <Text className={styles.heading}>{title}</Text>
            <Text className={styles.desc}>{description}</Text>
        </Box>
    </Box>
  )
}

export default ErrorWarning