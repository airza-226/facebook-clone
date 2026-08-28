import { db } from "@/lib/firebase"
import { collection, addDoc, doc, updateDoc, increment, serverTimestamp } from "firebase/firestore"

interface CreateCommentInput {
  postId: string
  userId: string
  authorName: string
  authorPhoto: string
  content: string
}

export const createComment = async (input: CreateCommentInput) => {
  const docRef = await addDoc(collection(db, "comments"), {
    postId: input.postId,
    userId: input.userId,
    authorName: input.authorName,
    authorPhoto: input.authorPhoto,
    content: input.content,
    likes: [],
    createdAt: serverTimestamp(),
  })

  await updateDoc(doc(db, "posts", input.postId), {
    commentsCount: increment(1),
  })

  return docRef.id
}