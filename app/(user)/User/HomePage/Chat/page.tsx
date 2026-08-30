'use client'
import ChatList from "@/Components/Chat/ChatList";
import ChatEmptyState from "@/Components/Chat/ChatEmptyState";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Context/AuthContext";
import { Conversation } from "@/types";
export default function ChatIndexPage() {
  const router = useRouter();
  const { firebaseUser } = useAuth();
  const handleSelectConversation = (conversation: Conversation) => {
    if (!conversation) return;
    const otherUid = conversation.participants.find(
      (p) => p !== firebaseUser?.uid,
    );
    if (!otherUid) return;
    router.push(`/User/HomePage/Chat/${otherUid}`);
  };
  return (
    <div className="w-full mt-2 flex">
      <ChatList onSelectConversation={handleSelectConversation} />
      <ChatEmptyState />
    </div>
  );
}
