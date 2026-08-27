import { useQuery } from "@tanstack/react-query";
import { fetchUsersByIds } from "@/api/User/fetchUserByIds";

export const useUsersByIds = (uids: string[]) => {
  return useQuery({
    queryKey: ["usersByIds", uids],
    queryFn: () => fetchUsersByIds(uids),
    enabled: uids.length > 0,
  });
};