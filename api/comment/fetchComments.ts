import { db } from "@/lib/firebase"
import { collection, query, where, orderBy, getDocs } from "firebase/firestore"
import { Comment } from "@/types"

export const fetchCommentsByPost = async (postId: string): Promise<Comment[]> => {
  const q = query(
    collection(db, "comments"),
    where("postId", "==", postId),
    orderBy("createdAt", "asc")
  )
  const snap = await getDocs(q)
  return snap.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      postId: data.postId,
      userId: data.userId,
      authorName: data.authorName,
      authorPhoto: data.authorPhoto,
      content: data.content,
      likes: data.likes,
      createdAt: data.createdAt?.toDate?.().toISOString() ?? null,
    }
  }) as Comment[]
}