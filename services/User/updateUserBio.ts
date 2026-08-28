import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export const updateUserBio = async (uid: string, bio: string) => {
  await updateDoc(doc(db, "users", uid), { bio });
};