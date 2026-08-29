import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "@/services/User/searchUsers";
import { userData } from "@/types";

export const useUserSearch = (query: string, delay: number = 500) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, delay);
    return () => clearTimeout(timer);
  }, [query, delay]);
  const {
    data: results = [],
    isLoading: isQueryLoading,
    error,
  } = useQuery<userData[], Error>({
    queryKey: ["users", "search", debouncedQuery], 
    queryFn: async () => {
      const data = await fetchUserProfile(debouncedQuery);
      return Array.isArray(data) ? data : data ? [data] : [];
    },
    enabled: Boolean(debouncedQuery), 
    staleTime: 1000 * 60 * 5, 
  });

  const isTyping = query.trim() !== debouncedQuery;
  const isLoading = (isTyping && Boolean(query.trim())) || isQueryLoading;

  return {
    results,
    isLoading,
    error: error ? error.message : "",
  };
};