"use client";
import React from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import DefaultProfile from "@/public/download (1).jpg";
import { userData } from "@/types";
import { useAuth } from "@/Context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

type UserProfileCardProps = {
  data: userData | null;
};

const UserProfileCard = ({ data }: UserProfileCardProps) => {
  const { firebaseUser } = useAuth();
  const router = useRouter();

  const hasProfilePhoto = Boolean(
    data?.profilePicture && data.profilePicture.trim() !== "",
  );
  const avatarSrc = hasProfilePhoto ? data?.profilePicture : DefaultProfile;
  const isPending = Boolean(
    firebaseUser?.uid && data?.isPending?.includes(firebaseUser.uid)
  );
  const isOwnProfile = firebaseUser?.uid === data?.uid;

  const handleChatClick = () => {
    if (!firebaseUser) {
      router.push('/Login');
      return;
    }
    router.push(`/User/HomePage/Chat/${data?.uid}`);
  };

  return (
    <div className="hidden md:flex justify-between items-center px-4">
      <div className="flex items-center gap-x-4">
        <div className="relative md:w-40 md:h-40 rounded-full overflow-hidden shrink-0 border-4 border-white dark:border-[#242526]">
          <Image
            src={avatarSrc || DefaultProfile}
            alt={data?.profilePicture || "User Profile"}
            fill
            className="object-cover rounded-full"
            sizes="(max-width: 768px) 100vw, 160px"
            priority
          />
        </div>

        <div className="flex flex-col gap-y-1">
          <h1 className="font-bold leading-tight text-gray-900 dark:text-gray-100 text-2xl md:text-[2rem]">
            {data?.firstName} {data?.lastName || ""}
          </h1>
          <p className="font-semibold leading-tight text-gray-600 dark:text-gray-400 text-[0.9375rem]">
            User Friend
          </p>
        </div>
      </div>

      <div className="flex gap-x-3 items-center">
        <div className="flex items-center gap-x-2 mt-2">
          {isOwnProfile ? (
            <>
              <button className="flex items-center gap-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-[0.9375rem] font-semibold transition-colors cursor-pointer">
                + Add to story
              </button>
              <Link
                href={"/User/Account"}
                className="flex items-center gap-x-1 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg text-[0.9375rem] font-semibold transition-colors"
              >
                ✏️ Edit profile
              </Link>
            </>
          ) : isPending ? (
            <>
              <button className="flex items-center gap-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-[0.9375rem] font-semibold transition-colors cursor-pointer">
                Cancel
              </button>
              <button
                onClick={handleChatClick}
                className="flex items-center gap-1.5 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg text-[0.9375rem] font-semibold transition-all cursor-pointer"
              >
                Chat
              </button>
            </>
          ) : (
            <>
              <button className="flex items-center gap-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-[0.9375rem] font-semibold transition-colors cursor-pointer">
                + Add Friend
              </button>
              <button
                onClick={handleChatClick}
                className="flex items-center gap-1.5 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg text-[0.9375rem] font-semibold transition-all cursor-pointer"
              >
                Chat
              </button>
            </>
          )}
          <button className="bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg transition-colors cursor-pointer">
            <ChevronDown size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;