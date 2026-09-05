"use client";
import React from 'react'
import { Settings, Users2, UserCheck, UserPlus, Search } from 'lucide-react'
import PeopleCard from '@/Components/friends/PeopleCard'
import Link from 'next/link'
import { useAuth } from '@/Context/AuthContext'
import { useAllUsers } from '@/Hooks/useAllUsers';
import { useCancelFriendRequest } from '@/Hooks/useFriendActions';
import { useConfirmFriendRequest, useRejectFriendRequest } from '@/Hooks/useFriendActions';
import { useSendFriendRequest } from '@/Hooks/addFriend';
import { usePendingRequests } from '@/Hooks/usePendingRequest';
import PeopleCardSkeleton from '../cards/PeopleCardSkeleton';

const sidebarLinks = [
  { label: "Home", icon: <Users2 size={20} />, href: "#", active: true },
  { label: "Friend Requests", icon: <UserPlus size={20} />, href: "#" },
  { label: "Suggestions", icon: <UserCheck size={20} />, href: "#" },
]

const Friends = () => {
  const { firebaseUser, userProfile } = useAuth();
  const currentUid = firebaseUser ? firebaseUser.uid : "";
  const pendingUids = userProfile?.isPending ?? [];

  const { data: requesters = [], isLoading: requestersLoading } = usePendingRequests(pendingUids);
  const confirmRequest = useConfirmFriendRequest(currentUid);
  const rejectRequest = useRejectFriendRequest(currentUid);

  const { data: suggestions = [], isLoading: suggestionsLoading } = useAllUsers(currentUid);
  const sendRequest = useSendFriendRequest(currentUid);
  const cancelRequest = useCancelFriendRequest(currentUid);

  return (
    <div className="w-full min-h-screen">

      <aside
        aria-label="Friends navigation"
        className="hidden md:flex flex-col fixed left-0 top-14 rounded-xl w-90 h-[calc(100vh-3.5rem)] bg-white dark:bg-white/5 border-r border-black/10 dark:border-white/10 overflow-y-auto scrollbar-hide px-3 py-4 gap-y-2 z-10 transition-colors"
      >
        <header className="flex items-center justify-between px-2 mb-1">
          <h1 className="font-bold text-gray-900 dark:text-gray-100 text-[1.375rem] leading-tight">Friends</h1>
          <button
            aria-label="Friend settings"
            className="w-9 h-9 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-150 cursor-pointer"
          >
            <Settings size={18} />
          </button>
        </header>

        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search friends"
            aria-label="Search friends"
            className="w-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 rounded-full pl-9 pr-4 py-2 text-[0.875rem] text-gray-900 dark:text-gray-200 placeholder:text-gray-400 outline-none transition-colors duration-150"
          />
        </div>

        <nav aria-label="Friends categories">
          <ul className="flex flex-col gap-y-0.5">
            {sidebarLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150 group ${
                    link.active 
                      ? "bg-blue-500/10 text-blue-600 dark:text-[#4da3ff]" 
                      : "text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                    link.active 
                      ? "bg-blue-500/20 text-blue-600 dark:text-[#4da3ff]" 
                      : "bg-black/5 dark:bg-white/10 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:hover:text-white"
                  }`}>
                    {link.icon}
                  </span>
                  <span className="text-[0.9375rem] font-semibold leading-tight">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main aria-label="Friends content" className="md:ml-90 min-h-screen bg-gray-50 dark:bg-[#18191a] px-4 py-5 transition-colors">
        <div className="max-w-375 mx-auto flex flex-col gap-y-6">

          <section aria-label="Friend requests">
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="font-bold text-gray-900 dark:text-gray-100 text-[1.0625rem] leading-tight">Friend Requests</h2>
              <button className="text-[0.9375rem] font-semibold text-blue-600 dark:text-[#4da3ff] hover:text-blue-700 dark:hover:text-[#6ab4ff] hover:underline transition-colors duration-150 cursor-pointer">
                See all
              </button>
            </div>

            {!requestersLoading && requesters.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-[0.875rem] px-1">No friend requests</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-3">
                {requestersLoading
                  ? Array.from({ length: 10 }, (_, index) => <PeopleCardSkeleton variant="profile" key={index} />)
                  : requesters.map((user) => {
                      const isProcessing =
                        (confirmRequest.isPending && confirmRequest.variables === user.uid) ||
                        (rejectRequest.isPending && rejectRequest.variables === user.uid);

                      return (
                        <PeopleCard
                          key={user.uid}
                          variant="friendsSection"
                          name={`${user.firstName} ${user.lastName}`}
                          photoURL={user.profilePicture}
                          isProcessing={isProcessing}
                          onConfirm={() => confirmRequest.mutate(user.uid)}
                          onReject={() => rejectRequest.mutate(user.uid)}
                        />
                      );
                    })}
              </div>
            )}
          </section>

          <section aria-label="People you may know">
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="font-bold text-gray-900 dark:text-gray-100 text-[1.0625rem] leading-tight">People You May Know</h2>
              <button className="text-[0.9375rem] font-semibold text-blue-600 dark:text-[#4da3ff] hover:text-blue-700 dark:hover:text-[#6ab4ff] hover:underline transition-colors duration-150 cursor-pointer">
                See all
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-3">
              {suggestionsLoading
                ? Array.from({ length: 10 }, (_, index) => <PeopleCardSkeleton variant="friendsSection" key={index} />)
                : suggestions.map((user) => {
                    const isPendingSent = user.isPending?.includes(currentUid) ?? false;
                    const isProcessing =
                      (sendRequest.isPending && sendRequest.variables === user.uid) ||
                      (cancelRequest.isPending && cancelRequest.variables === user.uid);

                    return (
                      <PeopleCard
                        key={user.uid}
                        variant="profile"
                        name={`${user.firstName} ${user.lastName}`}
                        photoURL={user.profilePicture}
                        isPending={isPendingSent}
                        uid={user.uid}
                        isProcessing={isProcessing}
                        onAddFriend={() => sendRequest.mutate(user.uid)}
                        onCancelRequest={() => cancelRequest.mutate(user.uid)}
                      />
                    );
                  })}
            </div>
          </section>

        </div>
      </main>

    </div>
  )
}

export default Friends