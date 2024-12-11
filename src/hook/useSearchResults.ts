import { useEffect } from "react";
import { useSearchStore, useUISearch } from "../store/useUIStore";
import { searchAPI } from "../service/search.api";
import useDebouncedEffect from "../util/useDebouncedEffect";


const useSearchResults = (query: string, token: string) => {
  const { setResults, setLoading } = useSearchStore();
  // Effect for handling search results with debouncing
  useDebouncedEffect(
    () => {
      const fetchSearchResults = async () => {
        setLoading(true);

        try {
          const response = await searchAPI(query, token);
          setResults(response);
        } catch (error) {
          console.error("Error fetching search results:", error);
          setResults(null); // Reset results on error
        } finally {
          setLoading(false);
        }
      };

      fetchSearchResults();
    },
    [query],
    300 // Debounce delay in milliseconds
  );
};

export default useSearchResults;
