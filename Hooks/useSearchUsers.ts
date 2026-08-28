import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@/api/User/searchUsers";
export const useSearchUsers = (searchTerm: string) => {
  return useQuery({
    queryKey: ["searchUsers", searchTerm],
    queryFn: () => fetchUserProfile(searchTerm),
    enabled: searchTerm.length > 0,
  });
};
