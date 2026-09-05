"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PeopleCard from "./PeopleCard";
import { useAuth } from "@/Context/AuthContext";
import { useAllUsers } from "@/Hooks/useAllUsers";
import { useCancelFriendRequest, useSendFriendRequest } from "@/Hooks/useFriendActions";
import PeopleCardSkeleton from "../cards/PeopleCardSkeleton";

const FriendsCard = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { firebaseUser } = useAuth();
  const currentUid = firebaseUser?.uid ?? "";

  const { data: users = [], isLoading } = useAllUsers(currentUid);
  const sendRequest = useSendFriendRequest(currentUid);
  const cancelRequest = useCancelFriendRequest(currentUid);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (!isLoading && users.length === 0) return null;

  return (
    <section aria-label="People you may know" className="px-3 md:px-4 lg:px-6 mt-3">
      <div className="flex flex-col gap-y-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 shadow-sm transition-colors">
        <header className="flex items-center justify-between">
          <h2 className="font-bold text-[0.9375rem] leading-tight text-gray-900 dark:text-gray-100">
            People You May Know
          </h2>
          <button className="text-[0.875rem] font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-150 cursor-pointer">
            See all
          </button>
        </header>

        <div className="relative group w-full">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="flex items-center justify-center absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full active:scale-[0.90] bg-white/80 dark:bg-neutral-800/90 hover:bg-white dark:hover:bg-neutral-800 text-gray-800 dark:text-gray-200 border border-black/10 dark:border-white/10 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-x-3 overflow-x-hidden scrollbar-hide scroll-smooth -mx-4 px-4 py-1"
          >
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="shrink-0">
                    <PeopleCardSkeleton variant="profile" />
                  </div>
                ))
              : users.map((user) => {
                  const isPending = user.isPending?.includes(currentUid) ?? false;
                  const isProcessing =
                    (sendRequest.isPending && sendRequest.variables === user.uid) ||
                    (cancelRequest.isPending && cancelRequest.variables === user.uid);

                  return (
                    <div key={user.uid} className="shrink-0">
                      <PeopleCard
                        variant="profile"
                        uid={user.uid}
                        name={`${user.firstName} ${user.lastName}`}
                        photoURL={user.profilePicture}
                        isPending={isPending}
                        isProcessing={isProcessing}
                        onAddFriend={() => sendRequest.mutate(user.uid)}
                        onCancelRequest={() => cancelRequest.mutate(user.uid)}
                      />
                    </div>
                  );
                })}
          </div>

          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="flex items-center justify-center absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full active:scale-[0.90] bg-white/80 dark:bg-neutral-800/90 hover:bg-white dark:hover:bg-neutral-800 text-gray-800 dark:text-gray-200 border border-black/10 dark:border-white/10 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FriendsCard;