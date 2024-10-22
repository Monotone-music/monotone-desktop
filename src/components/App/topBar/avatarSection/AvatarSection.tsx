import React from 'react'
import styles from './styles.module.scss'
import { Avatar, Box } from '@chakra-ui/react'

const AvatarSection = () => {
  return (
    <Box className={styles.container}>
    <Avatar name='Dan Abrahmov' size='sm' src='https://bit.ly/dan-abramov' />
    </Box>
  )
}

export default AvatarSection