"use client";
import { Star, Clapperboard, MapPinned, Music2, Trophy } from "lucide-react";
import React from "react";

interface MoreItem {
  icon: React.ReactNode;
  label: string;
}

const moreItems: MoreItem[] = [
  { icon: <Star size={18} />, label: "Reviews given" },
  { icon: <Clapperboard size={18} />, label: "Videos" },
  { icon: <MapPinned size={18} />, label: "Check-ins" },
  { icon: <Trophy size={18} />, label: "Sports" },
  { icon: <Music2 size={18} />, label: "Music" },
];

const MorePanel = () => {
  return (
    <div className="
      bg-white dark:bg-[#242526] 
      border border-black/5 dark:border-transparent 
      rounded-xl px-2 py-2 
      flex flex-col 
      divide-y divide-black/5 dark:divide-[#3a3b3c] 
      max-w-md shadow-sm
      transition-colors
    ">
      {moreItems.map((item) => (
        <button
          key={item.label}
          disabled
          aria-disabled="true"
          className="
            flex items-center gap-3 
            px-3 py-3.5 
            text-left 
            text-gray-400 dark:text-gray-500 
            cursor-not-allowed
            group
          "
        >
          <span className="
            w-9 h-9 rounded-full 
            bg-black/5 dark:bg-[#3a3b3c] 
            text-gray-500 dark:text-gray-400
            flex items-center justify-center shrink-0
            transition-colors
          ">
            {item.icon}
          </span>
          <span className="text-sm font-semibold flex-1 text-gray-500 dark:text-gray-400">
            {item.label}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-600">
            Coming soon
          </span>
        </button>
      ))}
    </div>
  );
};

export default MorePanel;