import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendFriendRequest,cancelFriendRequest } from "@/api/Friends/friendActions";
import { userData } from "@/types";
import { rejectFriendRequest,confirmRequest } from "@/api/Friends/friendActions";
export const useSendFriendRequest = (currentUid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (targetUid: string) => sendFriendRequest(currentUid, targetUid),
    onMutate: async (targetUid: string) => {
      await queryClient.cancelQueries({ queryKey: ["allUsers", currentUid] });
      const previous = queryClient.getQueryData<userData[]>(["allUsers", currentUid]);

      queryClient.setQueryData<userData[]>(["allUsers", currentUid], (old) =>
        old?.map((u) =>
          u.uid === targetUid
            ? { ...u, isPending: [...(u.isPending ?? []), currentUid] }
            : u
        )
      );

      return { previous };
    },
    onError: (_err, _targetUid, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["allUsers", currentUid], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers", currentUid] });
    },
  });
};

export const useCancelFriendRequest = (currentUid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (targetUid: string) => cancelFriendRequest(currentUid, targetUid),
    onMutate: async (targetUid: string) => {
      await queryClient.cancelQueries({ queryKey: ["allUsers", currentUid] });
      const previous = queryClient.getQueryData<userData[]>(["allUsers", currentUid]);

      queryClient.setQueryData<userData[]>(["allUsers", currentUid], (old) =>
        old?.map((u) =>
          u.uid === targetUid
            ? { ...u, isPending: (u.isPending ?? []).filter((id) => id !== currentUid) }
            : u
        )
      );

      return { previous };
    },
    onError: (_err, _targetUid, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["allUsers", currentUid], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers", currentUid] });
    },
  });
};

export const useConfirmFriendRequest = (currentUid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requesterUid: string) => confirmRequest(currentUid, requesterUid),
    onMutate: async (requesterUid: string) => {
      await queryClient.cancelQueries({ queryKey: ["pendingRequests"] });
      const previous = queryClient.getQueryData<userData[]>(["pendingRequests", requesterUid]);
      queryClient.setQueriesData<userData[]>(
        { queryKey: ["pendingRequests"] },
        (old) => old?.filter((u) => u.uid !== requesterUid),
      );

      return { previous };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingRequests"] });
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
  });
};

export const useRejectFriendRequest = (currentUid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requesterUid: string) => rejectFriendRequest(currentUid, requesterUid),
    onMutate: async (requesterUid: string) => {
      await queryClient.cancelQueries({ queryKey: ["pendingRequests"] });

      queryClient.setQueriesData<userData[]>(
        { queryKey: ["pendingRequests"] },
        (old) => old?.filter((u) => u.uid !== requesterUid),
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingRequests"] });
    },
  });
};