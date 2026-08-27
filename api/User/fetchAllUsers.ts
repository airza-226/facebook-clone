import { db } from "@/lib/firebase";
import { collection, query, limit, getDocs, doc, getDoc } from "firebase/firestore";
import { userData } from "@/types";

export const fetchAllUsers = async (
  currentUid: string,
  maxResults: number = 10,
): Promise<userData[]> => {
  const currentUserRef = doc(db, "users", currentUid);
  const currentUserSnap = await getDoc(currentUserRef);
  const currentUserData = currentUserSnap.data() as userData | undefined;

  const friendIds = currentUserData?.friends || [];
  const pendingIds = currentUserData?.isPending || [];

  const q = query(collection(db, "users"), limit(maxResults * 3)); 
  const snap = await getDocs(q);

  const users = snap.docs
    .map((doc) => ({ uid: doc.id, ...doc.data() }) as userData)
    .filter(
      (user) =>
        user.uid !== currentUid &&
        !friendIds.includes(user.uid) &&
        !pendingIds.includes(user.uid)
    ) 
    .slice(0, maxResults);

  return users;
};