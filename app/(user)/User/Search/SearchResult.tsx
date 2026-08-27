"use client";
import React from "react";
import PostCard from "@/Components/post/PostCard";
import SideBarMenuSearch from "@/Components/ui/SideBarMenuSearch";
import { useParams } from "next/navigation";
import Image from "next/image";
import Profile from "@/public/download (1).jpg";
import { User2 } from "lucide-react";
import { useUserSearch } from "@/Hooks/useUserSearch";
import Link from "next/link";

const SearchResult = () => {
  const searchParams = useParams();
  const rawQuery = (searchParams?.slug as string);
  const query = decodeURIComponent(rawQuery);

  const { results: userSearch, isLoading, error } = useUserSearch(query, 500);

  return (
    <div className="w-full min-h-screen bg-transparent text-gray-200">
      <div className="left-0 px-4 relative">
        <SideBarMenuSearch />

        <main className="w-full md:pl-75 lg:pl-85 md:pr-4">
          <div className="w-full max-w-262.5 mx-auto flex gap-x-6 justify-center">
            <div className="w-full max-w-155 flex flex-col space-y-5">
              
              {query && (
                <h2 className="text-sm font-medium text-gray-400">
                  Search Result for: <span className="text-white font-semibold">&quot;{query}&quot;</span>
                </h2>
              )}

              {isLoading && (
                <ul className="flex flex-col gap-2.5 w-full">
                  {[1, 2, 3].map((n) => (
                    <li
                      key={n}
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
                  cannot found data user: {error}
                </div>
              )}

              {!isLoading && !error && userSearch?.length === 0 && (
                <div className="p-8 text-center text-gray-400 bg-[#242526] rounded-2xl border border-[#3a3b3c]">
                  Theres no user name&quot;{query}&quot;.
                </div>
              )}

              {!isLoading && !error && userSearch && userSearch.length > 0 && (
                <ul className="flex flex-col gap-2.5 w-full">
                  {userSearch.map((user) => (
                    <li
                      key={user.uid}
                      className="flex items-center justify-between p-3 rounded-2xl bg-[#242526] hover:bg-[#3a3b3c] border border-[#3a3b3c] transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-x-3.5 min-w-0">
                        <div className="relative w-12 h-12 shrink-0 rounded-full overflow-hidden ring-2 ring-[#3a3b3c] group-hover:ring-[#4e4f50] transition-all">
                          <Image
                            src={user.profilePicture || Profile}
                            alt={user.firstName || "User Avatar"}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>

                        <div className="flex flex-col min-w-0">
                          <h3 className="font-semibold text-[0.95rem] text-gray-100 group-hover:text-white truncate leading-snug">
                            {user.firstName} {user.lastName || ""}
                          </h3>
                          <p className="text-[0.775rem] text-gray-400 truncate leading-tight font-normal">
                            {user.bio || "User Profile"}
                          </p>
                        </div>
                      </div>

                      <Link
                        href={`/User/UserProfile/${user.uid}`}
                        aria-label="View Profile"
                        className="shrink-0 w-10 h-10 rounded-xl bg-[#0064d1] hover:bg-[#0072ec] active:scale-95 text-white flex items-center justify-center transition-all duration-150 shadow-sm cursor-pointer ml-2"
                      >
                        <User2 size={18} />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              <div>{/* Post Card */}</div>
            </div>

            {/* Right Sidebar */}
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