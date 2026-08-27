import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getConversationId } from "@/utils/conversation";
import { SendMessageInput } from "@/types";

export const sendMessage = async (input: SendMessageInput) => {
  const conversationId = getConversationId(input.senderId, input.receiverId);

  await addDoc(collection(db, "messages"), {
    conversationId,
    participants: [input.senderId, input.receiverId].sort(),
    senderId: input.senderId,
    content: input.content,
    createdAt: serverTimestamp(),
  });

  await setDoc(
    doc(db, "conversations", conversationId),
    {
      participants: [input.senderId, input.receiverId].sort(),
      participantNames: {
        [input.senderId]: input.senderName ?? "",
        [input.receiverId]: input.receiverName ?? "",
      },
      participantPhotos: {
        [input.senderId]: input.senderPhoto ?? "",
        [input.receiverId]: input.receiverPhoto ?? "",
      },
      lastMessage: input.content,
      lastMessageAt: serverTimestamp(),
    },
    { merge: true },
  );
};