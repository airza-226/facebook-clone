import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { Post } from "@/types";

export const fetchAllPosts = async (): Promise<Post[]> => {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      userId: data.userId,
      content: data.content,
      imageUrl: data.imageUrl,
      likes: data.likes,
      commentsCount: data.commentsCount,
      createdAt: data.createdAt?.toDate?.().toISOString() ?? null,
    };
  }) as Post[];
};

export const fetchPostsByUser = async (uid: string): Promise<Post[]> => {
  const q = query(
    collection(db, "posts"),
    where("userId", "==", uid),
    orderBy("createdAt", "desc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      userId: data.userId,
      content: data.content,
      imageUrl: data.imageUrl,
      likes: data.likes,
      commentsCount: data.commentsCount,
      createdAt: data.createdAt?.toDate?.().toISOString() ?? null,
    };
  }) as Post[];
};
