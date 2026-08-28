import { db } from "@/lib/firebase"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"

export const toggleLike = async (postId:string,uid:string,isLiked:boolean) => {
    const postRef = doc(db,"posts",postId)
    await updateDoc(postRef,{
        likes:isLiked
        ? arrayRemove(uid):
        arrayUnion(uid)
    })
}