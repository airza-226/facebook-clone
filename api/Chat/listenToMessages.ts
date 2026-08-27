import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { Message } from "@/types";

export const listenToMessages = (
  conversationId: string,
  currentUserId: string,
  callback: (messages: Message[]) => void,
) => {
  if (!conversationId) return () => {};

  const q = query(
    collection(db, "messages"),
    where("participants", "array-contains", currentUserId),
    where("conversationId", "==", conversationId),
    orderBy("createdAt", "asc"),
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const messages = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          conversationId: data.conversationId,
          participants: data.participants,
          senderId: data.senderId,
          content: data.content,
          createdAt: data.createdAt?.toDate?.().toISOString() ?? null,
        };
      }) as Message[];
      callback(messages);
    },
    (error) => {
      console.warn("Messages listener error:", error.message);
    }
  );
};