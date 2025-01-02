import React from 'react'
import styles from './styles.module.scss'
import { Box, Text } from '@chakra-ui/react'
import MusicCard from '../../Shared/MusicCard/MusicCard'


interface FeaturedInContainerProps {
    featuredIn: any[]
}

const FeaturedInContainer:React.FC<FeaturedInContainerProps> = ({featuredIn}) => {
    return (
        <Box className={styles.container}>
            <Box className={styles.title}>
                <Text color="white">
                    Featured in
                </Text>
            </Box>
            <Box className={styles['playlist-wrapper']}>
                {featuredIn.map((featured, index) => {
                    return <MusicCard itemData={featured} key={index}/>
                })}
         
            </Box>
        </Box>
        )
}

export default FeaturedInContainer