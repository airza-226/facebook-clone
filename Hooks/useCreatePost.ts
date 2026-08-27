import { db } from "@/lib/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { userId: string; content: string }) =>
      addDoc(collection(db, "posts"), { ...input, createdAt: serverTimestamp() }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};