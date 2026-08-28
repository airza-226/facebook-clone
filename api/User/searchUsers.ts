import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { userData } from "@/types";

export const fetchUserProfile = async (
  keyword: string,
): Promise<userData[]> => {
  if (!keyword.trim()) return [];

  const usersRef = collection(db, "users");
  const cleanKeyword = keyword.toLowerCase();
  const q = query(usersRef, where("firstName", ">=", cleanKeyword), limit(10));

  const querySnapshot = await getDocs(q);
  const users: userData[] = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data() as userData;
    const firstName = data.firstName?.toLowerCase() || "";
    const lastName = data.lastName?.toLowerCase() || "";

    if (
      firstName.startsWith(cleanKeyword) ||
      lastName.startsWith(cleanKeyword)
    ) {
      users.push({
        ...data,
      } as userData);
    }
  });

  return users;
};
