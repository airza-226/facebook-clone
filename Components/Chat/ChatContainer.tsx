"use client";
import { useState, useEffect, useMemo, use, useRef } from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import ChatEmptyState from "./ChatEmptyState";
import { userData, Conversation, userDataChat } from "@/types";
import { useAuth } from "@/Context/AuthContext";
import { fetchUserProfile } from "@/api/User/fetchUserProfile";
import { useRouter } from "next/navigation";

interface ChatContainerProps {
  params: Promise<{ uid: string }>;
}
const ChatContainer = ({ params }: ChatContainerProps) => {
  const { uid } = use(params);
  const { firebaseUser } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);
  const [fetchedUser, setFetchedUser] = useState<userData | null>(null);
  const [fetchedForUid, setFetchedForUid] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState(false);
  const router = useRouter();
  const userFromConversation: userDataChat | null = useMemo(() => {
    if (!activeConversation) return null;
    const otherUid = activeConversation.participants.find(
      (p) => p !== firebaseUser?.uid,
    );
    if (!otherUid || otherUid !== uid) return null;
    return {
      uid: otherUid,
      firstName:
        activeConversation.participantNames[otherUid]?.split(" ")[0] ?? "",
      lastName:
        activeConversation.participantNames[otherUid]?.split(" ")[1] ?? "",
      profilePicture: activeConversation.participantPhotos[otherUid] ?? "",
    };
  }, [activeConversation, uid, firebaseUser?.uid]);

  useEffect(() => {
    if (!firebaseUser) {
      router.push("/Login");
      return;
    }
    if (!uid) return;
    let isCanceled = false;
    const load = async () => {
      setFetchError(false);
      try {
        const data = await fetchUserProfile(uid);
        if (!isCanceled) {
          setIsLoading(true)
          if (data) {
            setFetchedUser(data);
            setFetchedForUid(uid);
            setIsLoading(false)
          } else {
            setFetchError(true);
          }
        }
      } catch (error) {
        if (!isCanceled) setFetchError(true);
      }
    };
    load();
    return () => {
      isCanceled = true;
    };
  }, [firebaseUser, uid, router]);

  const otherUser =
    userFromConversation ?? (fetchedForUid === uid ? fetchedUser : null);
  const isLoadingUser =
    !userFromConversation && !!uid && fetchedForUid !== uid && !fetchError;
    console.log("ChatContainer RENDER")
    console.log(userFromConversation)

  return (
    <div className="w-full mt-2 flex">
      <ChatList
        activeConversationId={activeConversation?.id ?? null}
        onSelectConversation={setActiveConversation}
        isLoading={isLoading}
      />
      {isLoadingUser ? (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Loading chat...
        </div>
      ) : otherUser ? (
        <ChatWindow otherUser={otherUser} isLoading={isLoading}/>
      ) : (
        <ChatEmptyState />
      )}
    </div>
  );
};

export default ChatContainer;
