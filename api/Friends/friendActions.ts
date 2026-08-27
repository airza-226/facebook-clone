import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  writeBatch,
  arrayUnion,
  arrayRemove,
  collection,
  serverTimestamp,
  updateDoc,
  query, where, documentId, getDocs
} from "firebase/firestore";
import { userData } from "@/types";

export const sendFriendRequest = async (
  currentUid: string,
  targetUid: string,
) => {
  if (currentUid === targetUid) {
    throw new Error("cannot");
  }

  const targetRef = doc(db, "users", targetUid);
  const targetSnap = await getDoc(targetRef);
  if (!targetSnap.exists()) throw new Error("cannot found");

  const data = targetSnap.data();
  if (data.friends?.includes(currentUid)) throw new Error("already");
  if (data.isPending?.includes(currentUid))
    throw new Error("Request has been send");

  const batch = writeBatch(db);
  batch.update(targetRef, { isPending: arrayUnion(currentUid) });

  const notifRef = doc(collection(db, "notifications"));
  batch.set(notifRef, {
    recipientId: targetUid,
    senderId: currentUid,
    type: "friend_request",
    isRead: false,
    createdAt: serverTimestamp(),
  });

  await batch.commit();
};
export const confirmRequest = async (currentUid: string, requesterUid: string) => {
  const currentRef = doc(db, "users", currentUid);
  const requesterRef = doc(db, "users", requesterUid);

  const batch = writeBatch(db);
  batch.update(currentRef, {
    isPending: arrayRemove(requesterUid),
    friends: arrayUnion(requesterUid),
  });
  batch.update(requesterRef, {
    friends: arrayUnion(currentUid),
  });

  await batch.commit();
};

export const rejectFriendRequest = async (
  currentUid: string,
  requesterUid: string,
) => {
  const currentRef = doc(db, "users", currentUid);

  await writeBatch(db)
    .update(currentRef, {
      isPending: arrayRemove(requesterUid),
    })
    .commit();
};
export const cancelFriendRequest = async(currentUid:string,targetUid:string)=> {
  const targetRef = doc(db,"users",targetUid)
  await updateDoc(targetRef,{
    isPending:arrayRemove(currentUid)
  })
}

export const fetchPendingRequests = async (
  pendingUids: string[],
): Promise<userData[]> => {
  if (pendingUids.length === 0) return [];
  const chunks: string[][] = [];
  for (let i = 0; i < pendingUids.length; i += 10) {
    chunks.push(pendingUids.slice(i, i + 10));
  }

  const results = await Promise.all(
    chunks.map(async (chunk) => {
      const q = query(collection(db, "users"), where(documentId(), "in", chunk));
      const snap = await getDocs(q);
      return snap.docs.map((doc) => ({ uid: doc.id, ...doc.data() }) as userData);
    }),
  );

  return results.flat();
};