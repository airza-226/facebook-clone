import { fetchUserProfile } from "@/services/User/fetchUserProfile"
import { useQuery } from "@tanstack/react-query"

export const useUserProfile = (uid: string) => {
  return useQuery({
    queryKey: ["userProfile", uid],
    queryFn: () => fetchUserProfile(uid),
    enabled: !!uid,
    staleTime: 1000 * 60 * 5,
  });
};