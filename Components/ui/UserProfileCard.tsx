import React from "react";
import Image from "next/image";
import { ChevronDown, Fish } from "lucide-react";
import DefaultProfile from "@/public/download (1).jpg";
import { userData } from "@/types";
import { useAuth } from "@/Context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
const UserProfileCard = ({ data }: { data: userData }) => {
  const hasProfilePhoto = Boolean(
    data?.profilePicture && data.profilePicture.trim() !== "",
  );
  const avatarSrc = hasProfilePhoto ? data.profilePicture : DefaultProfile;
  const { firebaseUser } = useAuth();
  const isPending = data.isPending?.includes(firebaseUser?.uid) ?? false;
  const router = useRouter();
  const isOwnProfile = firebaseUser?.uid === data.uid;
  const handleChatClick = () => {
  if (!firebaseUser) {
    router.push('/Login');
    return;
  }
  router.push(`/User/HomePage/Chat/${data?.uid}`);
};
  return (
    <div className="md:flex justify-between items-center px-4 hidden">
      <div className="flex items-center gap-x-4">
        {/* Container Image */}
        <div className="relative md:w-40 md:h-40 rounded-full overflow-hidden shrink-0">
          <Image
            src={avatarSrc}
            alt={data?.profilePicture || "User Profile"}
            fill
            className="object-cover rounded-full"
            sizes="(max-width: 768px) 100vw, 160px"
            priority
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <h1 className="font-semibold leading-tight text-gray-300 text-md">
            {data?.firstName} {data?.lastName || ""}
          </h1>
          <p className="font-normal leading-tight text-gray-300 text-sm">
            User Friend
          </p>
        </div>
      </div>

      <div className="flex gap-x-3 items-center">
        <div className="md:flex items-center gap-x-2 mt-2 sm:hidden ">
          {isOwnProfile ? (
            <>
              <button className="flex items-center gap-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                + Add to story
              </button>
              <Link
                href={"/User/Account"}
                className="flex items-center gap-x-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                ✏️ Edit profile
              </Link>
            </>
          ) : isPending ? (
            <>
              <button className="flex items-center gap-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                Cancel
              </button>
              <button
                onClick={handleChatClick}
                className="cursor-pointer flex items-center gap-1.5 bg-[#3a3b3c] hover:bg-[#4e4f50] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              >
                Chat
              </button>
            </>
          ): <>
              <button className="flex items-center gap-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                + Add Friend
              </button>
              <button
                onClick={handleChatClick}
                className="cursor-pointer flex items-center gap-1.5 bg-[#3a3b3c] hover:bg-[#4e4f50] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              >
                Chat
              </button>
            </>}
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg transition-colors">
            <ChevronDown size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
