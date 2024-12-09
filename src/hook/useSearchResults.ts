import { useEffect } from "react";
import { useSearchStore, useUISearch } from "../store/useUIStore";
import { searchAPI } from "../service/search.api";

const useSearchResults = (query: string, token: string) => {
    const { setResults, setLoading } = useSearchStore();
    const { toggleOpenModal } = useUISearch();
  
    useEffect(() => {
      const fetchSearchResults = async () => {
        if (query.trim()) {
          toggleOpenModal(true);
        } else {
          toggleOpenModal(false);
        }
  
        setLoading(true); // Set loading state
        try {
          const response = await searchAPI(query, token!);
          setResults(response); // Store full response
        } catch (error) {
          console.error("Error fetching search results:", error);
          setResults(null); // Handle error case
        } finally {
          setLoading(false); // Reset loading state
        }
      };
  
      if (query.trim()) {
        const timeoutId = setTimeout(fetchSearchResults, 500); // Delay API call by 500ms
        return () => clearTimeout(timeoutId); // Cleanup on query change
      }
    }, [query, token, setResults, setLoading, toggleOpenModal]);
  
  };
  
  export default useSearchResults;
  