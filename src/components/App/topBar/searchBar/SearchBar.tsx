import styles from "./styles.module.scss";
import { Box, Button, Icon } from "@chakra-ui/react";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import { useAuthStore } from "../../../../store/useAuthStore";
import { useSearchStore, useUISearch } from "../../../../store/useUIStore";
import useSearchResults from "../../../../hook/useSearchResults";
const SearchBar = () => {
  const { query, setQuery } = useSearchStore();
  const { token } = useAuthStore();
  const {toggleOpenModal} = useUISearch()

  useSearchResults(query!, token!);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value; 
    setQuery(value);

    if (value) {
      toggleOpenModal(true); 
    } else {
      toggleOpenModal(false);
    }
  };

  const handleClearInput = () => {
    setQuery("");
    toggleOpenModal(false);
  };

  return (
    <Box className={styles.container}>
      <Icon as={IoSearchOutline} color={'white'} boxSize={7} />
      <input
        value={query!}
        onChange={handleInputChange}
        className={styles["search-bar"]}
        placeholder="Search"
      />
        {query && (
          <Icon as={IoCloseOutline} onClick={handleClearInput} cursor={'pointer'} color={'white'} boxSize={5} />
      
      )}
    </Box>
  );
};

export default SearchBar;
