import { db } from "@/lib/firebase"
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore"
import { Conversation } from "@/types"

export const listenToConversations = (
  uid: string,
  callback: (conversations: Conversation[]) => void
) => {
  if(!uid) return
  const q = query(
    collection(db, "conversations"),
    where("participants", "array-contains", uid),
    orderBy("lastMessageAt", "desc")
  )

  return onSnapshot(q, (snapshot) => {
    const conversations = snapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        participants: data.participants,
        participantNames: data.participantNames,
        participantPhotos: data.participantPhotos,
        lastMessage: data.lastMessage,
        lastMessageAt: data.lastMessageAt?.toDate?.().toISOString() ?? null,
      }
    }) as Conversation[]
    callback(conversations)
  }, (error)=> {
    console.error("conversations listener error", error)
  }
)
}