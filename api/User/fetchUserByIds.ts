import { db } from "@/lib/firebase";
import { collection, query, where, documentId, getDocs } from "firebase/firestore";
import { userData } from "@/types";

export const fetchUsersByIds = async (uids: string[]): Promise<userData[]> => {
  if (uids.length === 0) return [];

  const chunks: string[][] = [];
  for (let i = 0; i < uids.length; i += 10) {
    chunks.push(uids.slice(i, i + 10));
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