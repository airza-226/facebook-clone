"use client";

import React from "react";
import SideBarMenuSearch from "@/Components/ui/SideBarMenuSearch";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { UserPlus, UserX, Loader2 } from "lucide-react";
import Profile from "@/public/download (1).jpg";
import { useAuth } from "@/Context/AuthContext";
import { useUserSearch } from "@/Hooks/useUserSearch";
import {
  sendFriendRequest,
  cancelFriendRequest,
} from "@/services/Friends/friendActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const SearchResult = () => {
  const searchParams = useParams();
  const rawQuery = searchParams?.slug as string;
  const query = decodeURIComponent(rawQuery || "");
  const { firebaseUser } = useAuth();
  const { results: userSearch, isLoading, error } = useUserSearch(query, 500);
  const queryClient = useQueryClient();
  const {
    mutate: addFriend,
    isPending: isAdding,
    variables: addingVars,
  } = useMutation({
    mutationFn: ({
      currentUid,
      targetUid,
    }: {
      currentUid: string;
      targetUid: string;
    }) => sendFriendRequest(currentUid, targetUid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "search"] });
    },
    onError: (err) => {
      console.error("Error sending friend request:", err);
    },
  });
  const {
    mutate: cancelRequest,
    isPending: isCanceling,
    variables: cancelingVars,
  } = useMutation({
    mutationFn: ({
      currentUid,
      targetUid,
    }: {
      currentUid: string;
      targetUid: string;
    }) => cancelFriendRequest(currentUid, targetUid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "search"] });
    },
    onError: (err) => {
      console.error("Error canceling friend request:", err);
    },
  });

  return (
    <div className="w-full min-h-screen bg-transparent text-gray-200">
      <div className="left-0 px-4 relative">
        <SideBarMenuSearch />

        <main className="w-full md:pl-75 lg:pl-85 md:pr-4">
          <div className="w-full max-w-262.5 mx-auto flex gap-x-6 justify-center">
            <div className="w-full max-w-155 flex flex-col space-y-5">
              {query && (
                <h2 className="text-sm font-medium text-gray-400">
                  Search Result for:{" "}
                  <span className="text-white font-semibold">
                    &quot;{query}&quot;
                  </span>
                </h2>
              )}
              {isLoading && (
                <ul className="flex flex-col gap-2.5 w-full">
                  {Array.from({ length: 5 }, (_, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between p-3 rounded-2xl bg-[#242526] border border-[#3a3b3c] animate-pulse"
                    >
                      <div className="flex items-center gap-x-3.5 min-w-0">
                        <div className="w-12 h-12 shrink-0 rounded-full bg-[#3a3b3c]" />
                        <div className="flex flex-col gap-2 min-w-0">
                          <div className="h-4 bg-[#3a3b3c] rounded w-32" />
                          <div className="h-3 bg-[#3a3b3c] rounded w-24" />
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-[#3a3b3c]" />
                    </li>
                  ))}
                </ul>
              )}
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}
              {!isLoading && !error && userSearch?.length === 0 && (
                <div className="p-8 text-center text-gray-400 bg-[#242526] rounded-2xl border border-[#3a3b3c]">
                  There&apos;s no user named &quot;{query}&quot;.
                </div>
              )}
              {!isLoading && !error && userSearch && userSearch.length > 0 && (
                <ul className="flex flex-col gap-2.5 w-full">
                  {userSearch.map((user) => {
                    const pending =
                      (user.isPending || []).includes(
                        firebaseUser?.uid || "",
                      ) && user.uid !== firebaseUser?.uid;
                    const isItemAdding =
                      isAdding && addingVars?.targetUid === user.uid;
                    const isItemCanceling =
                      isCanceling && cancelingVars?.targetUid === user.uid;
                    const isItemLoading = isItemAdding || isItemCanceling;

                    return (
                      <li
                        key={user.uid}
                       className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-white/5 hover:bg-black/2 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 transition-all duration-200 group shadow-sm"
                      >
                        <div className="flex items-center gap-x-3.5 min-w-0">
                          <Link
                            href={`/User/UserProfile/${user.uid}`}
                            className="relative w-12 h-12 shrink-0 rounded-full overflow-hidden ring-2 ring-black/10 dark:ring-white/20 group-hover:ring-black/20 dark:group-hover:ring-white/40 transition-all"
                          >
                            <Image
                              src={user.profilePicture || Profile}
                              alt={user.firstName || "User Avatar"}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </Link>

                          <div className="flex flex-col min-w-0">
                            <h3 className="font-semibold text-[0.95rem] text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-white truncate leading-snug transition-colors">
                              {user.firstName} {user.lastName || ""}
                            </h3>
                            <p className="text-[0.775rem] text-gray-500 dark:text-gray-400 truncate leading-tight font-normal">
                              {user.bio || "User Profile"}
                            </p>
                          </div>
                        </div>

                        {pending ? (
                          <button
                            disabled={isItemLoading}
                            onClick={() =>
                              cancelRequest({
                                currentUid: firebaseUser?.uid || "",
                                targetUid: user.uid,
                              })
                            }
                            aria-label="Cancel friend request"
                            className="shrink-0 w-10 h-10 rounded-xl bg-[#0064d1] hover:bg-[#0072ec] active:scale-95 text-white flex items-center justify-center transition-all duration-150 shadow-sm cursor-pointer ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isItemLoading ? (
                              <Loader2 size={18} className="animate-spin" />
                            ) : (
                              <UserX size={18} />
                            )}
                          </button>
                        ) : (
                          <button
                            disabled={isItemLoading}
                            onClick={() =>
                              addFriend({
                                currentUid: firebaseUser?.uid || "",
                                targetUid: user.uid,
                              })
                            }
                            aria-label="Add friend"
                            className="shrink-0 w-10 h-10 rounded-xl bg-gray-600 hover:bg-gray-500 active:scale-95 text-white flex items-center justify-center transition-all duration-150 shadow-sm cursor-pointer ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isItemLoading ? (
                              <Loader2 size={18} className="animate-spin" />
                            ) : (
                              <UserPlus size={18} />
                            )}
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="hidden lg:block w-75 shrink-0">
              <div className="sticky top-20 flex flex-col gap-y-4 overflow-x-hidden">
                <h3 className="font-bold text-lg text-gray-200">Feed List</h3>
                <div className="bg-gray-800 p-4 rounded-xl border border-gray-700/50">
                  <p className="text-sm text-gray-300">
                    Feed Item / Trending 1
                  </p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-gray-700/50">
                  <p className="text-sm text-gray-300">
                    Feed Item / Trending 2
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SearchResult;
