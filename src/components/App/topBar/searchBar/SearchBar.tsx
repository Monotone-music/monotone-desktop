import styles from "./styles.module.scss";
import { Box, Icon } from "@chakra-ui/react";
import { useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { searchAPI } from "../../../../service/search.api";
import { useAuthStore } from "../../../../store/useAuthStore";
import { useSearchStore, useUISearch } from "../../../../store/useUIStore";
import useSearchResults from "../../../../hook/useSearchResults";
const SearchBar = () => {
  const { query, setQuery } = useSearchStore(); // Use Zustand store
  const { token } = useAuthStore();

  // const fetchSearchResults = async (searchQuery: string) => {
  //   if (searchQuery.trim()) {
  //     toggleOpenModal(true);
  //   } else {
  //     toggleOpenModal(false);
  //   }

  //   setLoading(true); // Set loading state
  //   try {
  //     const response = await searchAPI(searchQuery, token!);

  //     // Store the entire response object in the Zustand store
  //     setResults(response); // Store full response
  //   } catch (error) {
  //     console.error("Error fetching search results:", error);
  //     setResults(null); // Handle error case
  //   } finally {
  //     setLoading(false); // Reset loading state
  //   }
  // };

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     if (query.trim() === "") {
  //       setResults(null); // Clear results when query is empty
  //       toggleOpenModal(false);
  //       return;
  //     }
  //     fetchSearchResults(query);
  //   }, 500); // Delay API call by 500ms after typing

  //   return () => clearTimeout(timeoutId);
  // }, [query, setResults]);

  useSearchResults(query, token!);
  return (
    <Box className={styles.container}>
      <Icon as={IoSearchOutline} boxSize={7} />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles["search-bar"]}
        placeholder="Search"
      />
    </Box>
  );
};

export default SearchBar;
