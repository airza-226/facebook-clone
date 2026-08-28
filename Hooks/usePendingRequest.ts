import { useQuery } from "@tanstack/react-query";
import { fetchPendingRequests } from "@/services/Friends/friendActions";

export const usePendingRequests = (pendingUids: string[]) => {
  return useQuery({
    queryKey: ["pendingRequests", pendingUids],
    queryFn: () => fetchPendingRequests(pendingUids),
    enabled: pendingUids.length > 0,
  });
};