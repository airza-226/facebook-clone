import { userData } from "@/types";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "@/api/User/searchUsers";

export const useUserSearch = (query: string, delay: number = 500) => {
  const [results, setResults] = useState<userData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setError("");
      setIsLoading(false);
      return;
    }

    setIsLoading(true); 
    setError("");

    const timer = setTimeout(async () => {
      try {
        const data = await fetchUserProfile(query);
        const list = Array.isArray(data) ? data : data ? [data] : [];

        if (list.length > 0) {
          setResults(list);
          setError("");
        } else {
          setResults([]);
          setError("User not found");
        }
      } catch (err) {
        console.error("cannot fetch data", err);
        setResults([]);
        setError("Something went wrong while searching");
      } finally {
        setIsLoading(false);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [query, delay]);

  return { results, isLoading, error };
};