"use client";
import { useState } from "react";
import { Search, Users2 } from "lucide-react";
import { userData } from "@/types";
import FriendListItem from "@/Components/friends/FriendsList";

interface FriendsPanelProps {
  friends: userData[];
  isLoading: boolean;
  isOwnProfile: boolean;
}

const FriendsPanel = ({ friends, isLoading, isOwnProfile }: FriendsPanelProps) => {
  const [search, setSearch] = useState("");

  const filtered = friends.filter((f) =>
    `${f.firstName} ${f.lastName}`.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Header & Search Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-bold text-lg text-gray-900 dark:text-gray-100 leading-tight">Friends</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{friends.length} people</p>
        </div>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search friends"
            aria-label="Search friends"
            className="
              bg-black/5 hover:bg-black/10 focus:bg-black/10 
              dark:bg-[#3a3b3c] dark:hover:bg-[#4e4f50] dark:focus:bg-[#4e4f50] 
              rounded-full pl-9 pr-4 py-2 
              text-sm text-gray-900 dark:text-gray-200 
              placeholder:text-gray-400 outline-none 
              transition-colors duration-150 w-48 sm:w-64
            "
          />
        </div>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-3/4 bg-gray-200 dark:bg-[#242526] rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white dark:bg-[#242526] border border-black/5 dark:border-transparent rounded-xl px-4 py-14 flex flex-col items-center text-center gap-2 shadow-sm">
          <Users2 size={28} className="text-gray-400 dark:text-gray-500" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {search
              ? "No friends match your search"
              : isOwnProfile
                ? "You haven't added any friends yet"
                : "No friends to show"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((friend) => (
            <FriendListItem
              key={friend.uid}
              uid={friend.uid}
              name={`${friend.firstName} ${friend.lastName}`}
              photoURL={friend.profilePicture}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsPanel;