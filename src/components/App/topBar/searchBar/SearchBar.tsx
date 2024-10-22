import styles from './styles.module.scss'
import { Box, Icon } from '@chakra-ui/react'
import { IoSearchOutline } from "react-icons/io5";
const SearchBar = () => {
  return (
    <Box className={styles.container}>
        <Icon as={IoSearchOutline} boxSize={7}/>
        <input className={styles['search-bar']} placeholder='Search'/>
    </Box>
  )
}

export default SearchBar