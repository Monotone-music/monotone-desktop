import React from 'react'
import styles from './styles.module.scss'
import { Box } from '@chakra-ui/react'
import AboutCard from '../aboutCard/AboutCard'

interface AboutArtistProp{
  artistData?: any;
}


const AboutArtist:React.FC<AboutArtistProp> = ({artistData}) => {
  return (
    <Box className={styles.container}>
        <AboutCard dataAboutCard={artistData}/>
    </Box>
  )
}

export default AboutArtist