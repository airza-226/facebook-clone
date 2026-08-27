import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { uploadPostImage } from "./uploadImage";
import { StaticImageData } from "next/image";

export interface CreatePostInput {
  userId: string;
  authorName: string;
  authorPhoto: string | StaticImageData;
  content: string;
  imageFile?: File | null;
}

export const submitPost = async (post: CreatePostInput) => {
  try {
    let uploadedImageUrl = "";

    if (post.imageFile) {
      uploadedImageUrl = await uploadPostImage(post.imageFile);
    }

    const docRef = await addDoc(collection(db, "posts"), {
      userId: post.userId,
      content: post.content,
      imageUrl: uploadedImageUrl,
      likes: [],
      commentsCount: 0,
      createdAt: serverTimestamp(), 
    });

    return docRef.id;
  } catch (error) {
    console.error("error creating post", error);
    throw error;
  }
};