import React from "react";
import Image from "next/image";
import Profile from "@/public/download (1).jpg";
import { Plus } from "lucide-react";

interface StoryCardProps {
  variant?: "create" | "view";
  username?: string;
  imageSrc?: string;
  avatarSrc?: string; 
}

const StoryCard = ({
  variant = "create",
  username = "Create story",
  imageSrc,
  avatarSrc,
}: StoryCardProps) => {
  const isCreate = variant === "create";

  return (
    <article
      className="
        relative
        h-44 w-full
        rounded-2xl overflow-hidden
        cursor-pointer
        group
        shrink-0
        shadow-sm hover:shadow-md
        border border-black/10 dark:border-white/10
        transition-all duration-200
      "
      aria-label={isCreate ? "Create a new story" : `${username}'s story`}
    >
      {isCreate ? (
        <>
          <div className="h-[70%] w-full overflow-hidden bg-black/5 dark:bg-white/10 relative">
            <Image
              src={imageSrc ?? Profile}
              alt="Create story preview"
              fill
              sizes="(max-width: 640px) 25vw, 112px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="absolute bottom-0 inset-x-0 h-[30%] flex items-center justify-center bg-white dark:bg-[#242526] transition-colors">
            <p className="text-[0.75rem] font-semibold text-gray-900 dark:text-gray-100 text-center leading-tight px-2 line-clamp-2">
              {username}
            </p>
          </div>
          <button
            aria-label="Create story"
            className="
              absolute left-1/2 top-[70%]
              -translate-x-1/2 -translate-y-1/2
              w-9 h-9
              bg-blue-600 hover:bg-blue-700 dark:bg-[#1877f2] dark:hover:bg-[#1a6ed4]
              active:scale-95
              border-4 border-white dark:border-[#242526]
              rounded-full
              flex items-center justify-center
              text-white
              transition-all duration-150
              z-10
              shadow-md
              cursor-pointer
            "
          >
            <Plus size={18} strokeWidth={2.5} />
          </button>
        </>
      ) : (
        <>
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-black/10">
            <Image
              src={imageSrc ?? Profile}
              alt={`${username}'s story`}
              fill
              sizes="(max-width: 640px) 25vw, 112px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />
          </div>
          <div className="absolute top-3 left-3 w-9 h-9 rounded-full overflow-hidden ring-4 ring-blue-600 dark:ring-[#1877f2] shrink-0 shadow-sm z-10">
            <Image
              src={avatarSrc ?? imageSrc ?? Profile}
              alt={`${username}'s avatar`}
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-2 inset-x-2 z-10">
            <p className="text-[0.75rem] font-semibold text-white text-left leading-tight drop-shadow-sm line-clamp-2">
              {username}
            </p>
          </div>
        </>
      )}
      <div
        className="
          absolute inset-0
          bg-black/0 group-hover:bg-black/10
          transition-colors duration-200
          pointer-events-none
          z-20
        "
      />
    </article>
  );
};

export default StoryCard;