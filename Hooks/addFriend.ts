import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendFriendRequest } from "@/services/Friends/friendActions";
import { userData } from "@/types";

export const useSendFriendRequest = (currentUid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (targetUid: string) => sendFriendRequest(currentUid, targetUid),

    onMutate: async (targetUid: string) => {
      await queryClient.cancelQueries({ queryKey: ["allUsers", currentUid] });
      const previous = queryClient.getQueryData<userData[]>([
        "allUsers",
        currentUid,
      ]);

      queryClient.setQueryData<userData[]>(["allUsers", currentUid], (old) =>
        old?.map((u) =>
          u.uid === targetUid
            ? { ...u, isPending: [...(u.isPending ?? []), currentUid] }
            : u,
        ),
      );
      return { previous };
    },

    onError: (error, _targetUid, context) => {
      console.error("Failed to send friend request:", error);
      if (context?.previous) {
        queryClient.setQueryData(["allUsers", currentUid], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers", currentUid] });
    },
  });
};
