import { useEffect } from "react";

const useDebouncedEffect = (callback: () => void, dependencies: any[], delay: number) => {
  useEffect(() => {
    const handler = setTimeout(callback, delay);

    return () => clearTimeout(handler); // Cleanup on dependency change
  }, [...dependencies, delay]);
};

export default useDebouncedEffect;