import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserBio } from "@/api/User/updateUserBio";
import { userData } from "@/types";

export const useUpdateBio = (uid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bio: string) => updateUserBio(uid, bio),
    onMutate: async (bio: string) => {
      await queryClient.cancelQueries({ queryKey: ["userProfile", uid] });
      const previous = queryClient.getQueryData<userData>(["userProfile", uid]);

      queryClient.setQueryData<userData>(["userProfile", uid], (old) =>
        old ? { ...old, bio } : old,
      );

      return { previous };
    },
    onError: (_err, _bio, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["userProfile", uid], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile", uid] });
    },
  });
};