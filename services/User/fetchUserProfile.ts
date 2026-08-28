import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import { userData } from "@/types"

export const fetchUserProfile = async (uid: string): Promise<userData> => {
  const docRef = doc(db, "users", uid)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    throw new Error("User not found")
  }

  return docSnap.data() as userData
}