"use client";
import { useEffect, useState } from "react";
import { Search, Edit } from "lucide-react";
import { useAuth } from "@/Context/AuthContext";
import { listenToConversations } from "@/services/Chat/listenToConversation";
import { Conversation } from "@/types";
import { useRouter } from "next/navigation";
import { ChatRender } from "../common/ChatRender";
import SkeletonChat from "../cards/SkeletonChat";
import { ChatItem } from "./ChatItem";

interface ChatListProps {
  activeConversationId?: string | null;
  onSelectConversation?: (conv: Conversation) => void;
  isLoading?: boolean;
}

const ChatList = ({
  activeConversationId,
  onSelectConversation,
  isLoading,
}: ChatListProps) => {
  const { firebaseUser } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const router = useRouter();
  const handleChatClick = (uid: string) => {
    if (!firebaseUser) return;
    router.push(`/User/HomePage/Chat/${uid}`);
  };
  useEffect(() => {
    const userId = firebaseUser?.uid;
    if (!userId) return;
    const unsubscribe = listenToConversations(userId, setConversations);
    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [firebaseUser?.uid]);

  return (
    <aside
      aria-label="Chat conversations"
      className="w-full md:w-90 shrink-0 h-[calc(100vh-3.5rem)] bg-white dark:bg-white/5 border-r border-black/10 dark:border-white/10 flex flex-col rounded-xl transition-colors"
    >
      <header className="flex items-center justify-between px-4 py-3 border-b border-black/10 dark:border-white/10">
        <h1 className="font-bold text-[1.25rem] text-gray-900 dark:text-gray-100 leading-tight">
          Chats
        </h1>
        <button
          aria-label="New message"
          className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-150 cursor-pointer"
        >
          <Edit size={16} />
        </button>
      </header>

      <div className="px-3 py-2">
        <div className="flex items-center gap-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors rounded-full px-3.5 py-2 cursor-text focus-within:ring-2 focus-within:ring-blue-500/50">
          <Search size={15} className="text-gray-500 dark:text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search Messenger"
            aria-label="Search conversations"
            className="flex-1 bg-transparent outline-none text-[0.875rem] text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
        </div>
      </div>

      <ul className={`${isLoading ? "space-y-1.5" : "space-y-1"} px-2 overflow-y-auto scrollbar-hide flex-1 pb-2`}>
        <ChatRender<Conversation>
          isLoading={Boolean(isLoading)}
          skeleton={<SkeletonChat />}
          conversation={conversations}
          renderItem={(conv) => (
            <ChatItem
              key={conv.id}
              conv={conv}
              currentUid={firebaseUser?.uid}
              isActive={activeConversationId === conv.id}
              onSelect={(selectedConv, otherUid) => {
                onSelectConversation?.(selectedConv);
                handleChatClick(otherUid);
              }}
            />
          )}
        />
      </ul>
    </aside>
  );
};

export default ChatList;