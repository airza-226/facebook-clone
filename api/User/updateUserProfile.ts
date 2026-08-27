import { db } from "@/lib/firebase"
import { doc, updateDoc } from "firebase/firestore"

interface UpdateProfileInput {
  uid: string
  firstName?: string
  lastName?: string
  profilePicture:string
}

export const updateUserProfile = async ({ uid, ...fields }: UpdateProfileInput) => {
  const userRef = doc(db, "users", uid)
  await updateDoc(userRef, fields)
}