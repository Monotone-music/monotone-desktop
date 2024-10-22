import React from 'react'
import styles from './styles.module.scss'
import { Box } from '@chakra-ui/react'
import AboutCard from '../aboutCard/AboutCard'

const AboutArtist = () => {
  return (
    <Box className={styles.container}>
        <AboutCard/>
    </Box>
  )
}

export default AboutArtist