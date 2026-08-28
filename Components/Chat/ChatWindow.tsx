"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Profile from "@/public/download (1).jpg";
import {
  Phone,
  Video,
  Info,
  Image as ImageIcon,
  Smile,
  Send,
  ThumbsUp,
} from "lucide-react";
import { useAuth } from "@/Context/AuthContext";
import { listenToMessages } from "@/services/Chat/listenToMessages";
import { sendMessage } from "@/services/Chat/sendMessages";
import { getConversationId } from "@/utils/conversation";
import { Message, userDataChat } from "@/types";
import SkeletonChat from "../cards/SkeletonChat";
import { MessageRender } from "../common/MessageRender";
import BubbleChat from "./BubbleChat";
import { getAuth } from "firebase/auth";
import Link from "next/link";
interface ChatWindowProps {
  otherUser: userDataChat;
  isLoading:boolean
}

const ChatWindow = ({ otherUser,isLoading }: ChatWindowProps) => {
  const { userProfile, firebaseUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const conversationId = firebaseUser
    ? getConversationId(firebaseUser.uid, otherUser.uid)
    : null;

  useEffect(() => {
    if (!conversationId || !firebaseUser) return;
    const unsubscribe = listenToMessages(conversationId,firebaseUser?.uid,setMessages);
    return () => unsubscribe();
  }, [conversationId,firebaseUser]);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleSend = async () => {
    if (!inputValue.trim() || !userProfile || !firebaseUser) return;
    const content = inputValue.trim();
    setInputValue("");
    await sendMessage({
      senderId: firebaseUser.uid,
      receiverId: otherUser.uid,
      content,
      senderName: `${userProfile.firstName} ${userProfile.lastName}`,
      senderPhoto: userProfile.profilePicture,
      receiverName: `${otherUser.firstName} ${otherUser.lastName}`,
      receiverPhoto: otherUser.profilePicture,
    });
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };
  console.log("current user", getAuth().currentUser)
  return (
    <section
      aria-label="Chat conversation"
      className="flex-1 h-[calc(100vh-3.5rem)] flex flex-col bg-[#18191a] min-w-0"
    >
      <header className="flex items-center justify-between px-4 py-2.5 border-b border-[#3a3b3c] shrink-0">
        <Link href={`/User/UserProfile/${otherUser?.uid}`} className="flex items-center gap-3">
          <div className="relative w-10 h-10 shrink-0">
            <Image
              src={otherUser.profilePicture || Profile}
              alt={otherUser.firstName}
              fill
              sizes="40px"
              className="rounded-full object-cover"
            />
          </div>
          <p className="font-semibold text-[0.9375rem] text-gray-100 leading-tight">
            {otherUser.firstName} {otherUser.lastName}
          </p>
        </Link>

        <div className="flex items-center gap-1">
          <button
            aria-label="Voice call"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#4da3ff] hover:bg-[#3a3b3c] transition-all duration-150 cursor-pointer"
          >
            <Phone size={18} />
          </button>
          <button
            aria-label="Video call"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#4da3ff] hover:bg-[#3a3b3c] transition-all duration-150 cursor-pointer"
          >
            <Video size={18} />
          </button>
          <button
            aria-label="Conversation info"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#4da3ff] hover:bg-[#3a3b3c] transition-all duration-150 cursor-pointer"
          >
            <Info size={18} />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4 flex flex-col gap-1.5">
        <MessageRender
          isLoading={isLoading}
          skeleton={<SkeletonChat />}
          data={messages}
          renderItem={(msg) => <BubbleChat key={msg.id} message={msg} />}
        />
        <div ref={bottomRef} />
      </div>

      <div className="px-4 py-3 border-t border-[#3a3b3c] shrink-0">
        <div className="flex items-center gap-2">
          <button
            aria-label="Attach photo"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#4da3ff] hover:bg-[#3a3b3c] transition-all duration-150 cursor-pointer shrink-0"
          >
            <ImageIcon size={20} />
          </button>

          <div className="flex-1 flex items-center gap-2 bg-[#3a3b3c] rounded-full pl-4 pr-1.5 py-1.5 focus-within:ring-1 focus-within:ring-[#1877f2]/40 transition-all duration-150">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Aa"
              aria-label="Type a message"
              className="flex-1 bg-transparent outline-none text-[0.875rem] text-gray-100 placeholder:text-gray-400"
            />
            <button
              aria-label="Add emoji"
              className="w-7 h-7 rounded-full flex items-center justify-center text-[#4da3ff] hover:bg-[#4e4f50] transition-all duration-150 cursor-pointer shrink-0"
            >
              <Smile size={16} />
            </button>
          </div>

          <button
            onClick={handleSend}
            aria-label={inputValue.trim() ? "Send message" : "Send like"}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#4da3ff] hover:bg-[#3a3b3c] transition-all duration-150 cursor-pointer shrink-0"
          >
            {inputValue.trim() ? <Send size={18} /> : <ThumbsUp size={18} />}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChatWindow;
