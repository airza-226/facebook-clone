import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers } from "@/api/User/fetchAllUsers";

export const useAllUsers = (currentUid: string) => {
  return useQuery({
    queryKey: ["allUsers", currentUid],
    queryFn: () => fetchAllUsers(currentUid),
    enabled: !!currentUid,
    staleTime: 1000 * 60 * 2, 
  });
};