import styles from "./styles.module.scss";
import { Box, Icon } from "@chakra-ui/react";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import { useAuthStore } from "../../../../store/useAuthStore";
import { useSearchStore, useUISearch } from "../../../../store/useUIStore";
import useSearchResults from "../../../../hook/useSearchResults";
import { useEffect, useRef } from "react";

const SearchBar = () => {
  const { query, setQuery } = useSearchStore();
  const { token } = useAuthStore();
  const { toggleOpenModal } = useUISearch();
  const inputRef = useRef<HTMLInputElement>(null);
  useSearchResults(query!, token!);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
  
      if (value) {
        toggleOpenModal(true);
      } else {
        toggleOpenModal(false);
      }
    }


  const handleClearInput = () => {
    setQuery("");
    toggleOpenModal(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <Box className={styles.container}>
      <Icon as={IoSearchOutline} color={'white'} boxSize={7} />
      <input
        ref={inputRef}
        value={query}
        onChange={handleInputChange}
        placeholder="Search"
        className={styles["search-bar"]}
      />
       {query && (
        <Icon
          as={IoCloseOutline}
          onClick={handleClearInput}
          cursor="pointer"
          color="white"
          boxSize={5}
        />)}
    </Box>
  );
};


export default SearchBar;
