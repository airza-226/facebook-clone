"use client";
import React, { useState } from "react";
import ProfileBannerDefault from "@/public/(1) Wuthering Waves (@Wuthering_Waves) _ X.jpg";
import ProfileDefault from "@/public/download (1).jpg";
import UserProfile from "@/Components/ui/UserProfileCard";
import FriendsCard from "@/Components/friends/FriendsCard";
import { Users2, ChevronDown, Pen, Cake } from "lucide-react";
import Image from "next/image";
import { Post, userData } from "@/types";
import { useAuth } from "@/Context/AuthContext";
import { DataRender } from "@/Components/common/DataRender";
import { useRouter } from "next/navigation";
import { useUsersByIds } from "@/Hooks/useUserByIds";
import Link from "next/link";
import PostsPanel from "@/Components/Profile/panel/PostPanel"
import AboutPanel from "@/Components/Profile/panel/AboutPanel"
import PhotosPanel from "@/Components//Profile/panel/PhotosPanel"
import MorePanel from "@/Components/Profile/panel/MorePanel";
import FriendListItem from "@/Components/friends/FriendsList";
import SkeletonPostCard from "@/Components/cards/SkeletonCard";
const navTabs = ["Posts", "About","Photos", "More"];
interface UserProfileLayoutProps {
  data: userData;
  post: Post[];
  isLoading: boolean;
}

const UserProfileLayout = ({ data, post, isLoading }: UserProfileLayoutProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { firebaseUser } = useAuth();
  const router = useRouter();
  const isOwnProfile = firebaseUser?.uid === data?.uid;
  const isPending = data.isPending?.includes(firebaseUser?.uid) ?? false;
  const getValidImage = (photoUrl: string | undefined | null, fallback: any) => {
    if (!photoUrl || typeof photoUrl !== "string" || photoUrl.trim() === "") {
      return fallback;
    }
    return photoUrl;
  };

  const handleChatClick = () => {
    if (!firebaseUser) {
      router.push("/Login");
      return;
    }
    router.push(`/User/HomePage/Chat/${data?.uid}`);
  };

  const userAvatar = getValidImage(data?.profilePicture, ProfileDefault);
  const userBanner = getValidImage(data?.bannerPhoto, ProfileBannerDefault);

  const friendsList: string[] = data?.friends || [];
  const userPhotos: string[] = Array.isArray(data?.profilePicture) ? data.profilePicture : [];

  const { data: friendsProfiles = [], isLoading: friendsLoading } = useUsersByIds(friendsList);

  const panelMap: Record<string, React.ReactNode> = {
    Posts: (
      <PostsPanel
        isOwnProfile={isOwnProfile}
        userAvatar={userAvatar}
        posts={post}
        isLoading={isLoading}
        data={data}
      />
    ),
    About: <AboutPanel data={data} isOwnProfile={isOwnProfile} />,
    Photos: <PhotosPanel photos={userPhotos} isOwnProfile={isOwnProfile} />,
    More: <MorePanel />,
  };

  return (
    <div className="w-full min-h-screen bg-[#18191a] mt-14">
      <div className="max-w-275 mx-auto px-3 md:px-6 pb-10">
        <div className="relative w-full mt-2">
          <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-100 rounded-xl overflow-hidden">
            <Image src={userBanner} alt="Profile Banner" fill className="object-cover" priority />
          </div>

          <div className="md:hidden absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-36 h-36 rounded-full ring-4 ring-[#18191a] overflow-hidden z-10 bg-[#242526]">
            <Image src={userAvatar} alt="Profile" fill className="object-cover" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-1.5 pt-20 pb-4 md:hidden w-full">
          <h1 className="text-white font-bold text-xl tracking-tight">
            {data?.firstName} {data?.lastName || ""}
          </h1>
          <p className="text-gray-400 text-sm flex items-center gap-1.5">
            <Users2 size={14} />
            <span>{friendsList.length} friends</span>
          </p>
          <div className="flex items-center gap-2 mt-3 flex-wrap justify-center">
            {isOwnProfile ? (
              <>
                <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 cursor-pointer">
                  + Add to story
                </button>
                <Link className="cursor-pointer flex items-center gap-1.5 bg-[#3a3b3c] hover:bg-[#4e4f50] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150" href="/User/Account">
                  ✏️ Edit profile
                </Link>
              </>
            ) : isPending ? (
              <>
                <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 cursor-pointer">
                  Cancel
                </button>
                <button
                  onClick={handleChatClick}
                  className="flex items-center gap-1.5 bg-[#3a3b3c] hover:bg-[#4e4f50] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 cursor-pointer"
                >
                  Chat
                </button>
              </>
            ): <>
                <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 cursor-pointer">
                  Add friend
                </button>
                <button
                  onClick={handleChatClick}
                  className="flex items-center gap-1.5 bg-[#3a3b3c] hover:bg-[#4e4f50] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 cursor-pointer"
                >
                  Chat
                </button>
              </>}
            <button className="bg-[#3a3b3c] hover:bg-[#4e4f50] text-white p-2 rounded-lg transition-all duration-150 cursor-pointer">
              <ChevronDown size={18} />
            </button>
          </div>
        </div>

        <div className="hidden md:block mt-2.5">
          <UserProfile data={data} />
        </div>

        <div className="w-full">
          <FriendsCard />
        </div>

        <div className="border-t border-[#3a3b3c] mt-4" />
        <div className="flex items-center justify-between px-1 mt-1">
          <div className="flex items-center overflow-x-auto scrollbar-hide">
            {navTabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`
                  relative h-12 px-3 md:px-4 font-semibold text-sm whitespace-nowrap transition-all duration-150 cursor-pointer
                  ${
                    activeTab === index
                      ? "text-blue-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.75 after:bg-blue-500 after:rounded-t-full"
                      : "text-gray-400 hover:bg-[#3a3b3c] rounded-lg"
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="shrink-0 bg-[#3a3b3c] hover:bg-[#4e4f50] text-gray-200 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-150 cursor-pointer">
            <Users2 size={18} />
          </button>
        </div>

        <div className="mt-4 flex flex-col md:flex-row gap-4 items-start w-full">
          <aside
            className="hidden md:flex
              md:w-90 lg:w-100
              shrink-0
              flex-col gap-3
              sticky top-20
              self-start
              max-h-[calc(100vh-5.5rem)]
              overflow-y-hidden
              scrollbar-hide"
          >
            <div className="bg-[#242526] rounded-xl px-4 py-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-base text-gray-100">Intro</h2>
                <button className="text-gray-400 hover:text-white p-1.5 hover:bg-[#3a3b3c] rounded-lg transition-all duration-150 cursor-pointer">
                  <Pen size={16} />
                </button>
              </div>
              <div className="flex items-center gap-3 px-2 py-2.5 hover:bg-[#3a3b3c] rounded-lg cursor-pointer transition-all duration-150 group">
                <Cake
                  className="text-gray-400 group-hover:text-gray-200 shrink-0 transition-colors"
                  size={18}
                />
                <span className="text-sm text-gray-300 group-hover:text-gray-100 transition-colors">
                  {data?.birthDay || "Add your birthday"}
                </span>
              </div>
            </div>

            <div className="bg-[#242526] rounded-xl px-4 py-4 flex flex-col gap-3">
              <h2 className="font-bold text-base text-gray-100">Highlights</h2>
              <button className="w-full py-2 bg-[#3a3b3c] hover:bg-[#4e4f50] active:scale-[0.98] transition-all duration-150 rounded-lg cursor-pointer">
                <span className="font-semibold text-sm text-gray-200">+ Add Highlights</span>
              </button>
            </div>

            <div className="bg-[#242526] rounded-xl px-4 py-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-base text-gray-100">Friends</h2>
                  <p className="text-sm text-gray-400 mt-0.5">{friendsList.length} friends</p>
                </div>
                {friendsList.length > 0 && (
                  <button
                    onClick={() => setActiveTab(navTabs.indexOf("Friends"))}
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors cursor-pointer"
                  >
                    See all
                  </button>
                )}
              </div>

              <DataRender
                isLoading={friendsLoading}
                data={friendsProfiles.slice(0, 6)}
                skeleton={
                  <SkeletonPostCard />
                }
                emptyText="No friends added yet"
                renderItem={(friend) => (
                  <div key={friend.uid} className="grid grid-cols-4 gap-2">
                    <FriendListItem 
                      name={`${friend.firstName} ${friend.lastName}`}
                      photoURL={friend.profilePicture}
                      uid={friend.uid}
                    />
                  </div>
                )}
              />
            </div>
          </aside>

          <section className="flex-1 flex flex-col gap-4 min-w-0 w-full mb-6">
            {panelMap[navTabs[activeTab]]}
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserProfileLayout;