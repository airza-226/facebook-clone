import React from "react";
import Image from "next/image";
import Profile from "@/public/download (1).jpg";
import { Plus } from "lucide-react";

interface StoryCardProps {
  variant?: "create" | "view";
  username?: string;
  imageSrc?: string;
}

const StoryCard = ({
  variant = "create",
  username = "Create story",
  imageSrc,
}: StoryCardProps) => {
  return (
    <article
      className="
        relative
        h-44 w-full
        rounded-2xl overflow-hidden
        cursor-pointer
        group
        flex-shrink-0
        shadow-md
        border border-[#3a3b3c]
      "
      aria-label={
        variant === "create" ? "Create a new story" : `${username}'s story`
      }
    >
      {/* ── Top image ── */}
      <div className="h-[70%] w-full overflow-hidden bg-[#3a3b3c]">
        <Image
          src={imageSrc ?? Profile}
          alt={variant === "create" ? "Create story" : `${username}'s story`}
          fill
          sizes="(max-width: 640px) 25vw, 112px"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* ── Bottom label ── */}
      <div
        className="
        absolute bottom-0 inset-x-0
        h-[30%]
        flex items-center justify-center
        bg-[#242526]
      "
      >
        <p
          className="
          text-[0.75rem] font-semibold
          text-gray-100
          text-center leading-tight
          px-2
          line-clamp-2
        "
        >
          {username}
        </p>
      </div>

      {/* ── Action button ── */}
      {variant === "create" ? (
        <button
          aria-label="Create story"
          className="
            absolute left-1/2 top-[70%]
            -translate-x-1/2 -translate-y-1/2
            w-9 h-9
            bg-[#1877f2] hover:bg-[#1a6ed4]
            active:scale-95
            border-4 border-[#242526]
            rounded-full
            flex items-center justify-center
            text-white
            transition-all duration-150
            z-10
            shadow-lg
            cursor-pointer
          "
        >
          <Plus size={18} strokeWidth={2.5} />
        </button>
      ) : (
        <div
          className="
            absolute top-3 left-3
            w-9 h-9
            rounded-full overflow-hidden
            ring-4 ring-[#1877f2]
            flex-shrink-0
          "
        >
          <Image
            src={imageSrc ?? Profile}
            alt={`${username}'s avatar`}
            fill
            sizes="36px"
            className="object-cover"
          />
        </div>
      )}

      {/* Hover overlay */}
      <div
        className="
        absolute inset-0
        bg-black/0 group-hover:bg-black/10
        transition-colors duration-200
        pointer-events-none
      "
      />
    </article>
  );
};

export default StoryCard;
