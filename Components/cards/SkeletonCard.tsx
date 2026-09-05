import React from "react";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";

const SkeletonPostCard = () => {
  return (
    <article
      className="
        w-full flex flex-col
        bg-white dark:bg-white/5
        rounded-xl overflow-hidden
        shadow-sm
        border border-black/10 dark:border-white/10
        animate-pulse
        transition-colors
      "
    >
      <header className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-black/10 dark:bg-white/10 shrink-0" />
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 rounded-md bg-black/10 dark:bg-white/10" />
            <div className="h-3 w-20 rounded-md bg-black/5 dark:bg-white/5" />
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5" />
      </header>

      <div className="flex flex-col gap-2 px-4 py-2">
        <div className="h-4 w-full rounded-md bg-black/10 dark:bg-white/10" />
        <div className="h-4 w-3/4 rounded-md bg-black/10 dark:bg-white/10" />
      </div>

      <figure className="w-full h-0 pb-[56.25%] mt-1 bg-black/5 dark:bg-white/2" />

      <div className="flex items-center justify-between px-4 py-3 border-b border-black/10 dark:border-white/10">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-blue-500/20" />
          <div className="h-3 w-10 rounded-md bg-black/5 dark:bg-white/5" />
        </div>
        <div className="h-3 w-24 rounded-md bg-black/5 dark:bg-white/5" />
      </div>

      <footer className="flex items-center justify-around px-2 py-2">
        <div className="flex items-center gap-2 flex-1 justify-center py-2 rounded-lg text-black/20 dark:text-white/20">
          <Heart size={20} />
        </div>
        <div className="flex items-center gap-2 flex-1 justify-center py-2 rounded-lg text-black/20 dark:text-white/20">
          <MessageCircle size={20} />
        </div>
        <div className="flex items-center gap-2 flex-1 justify-center py-2 rounded-lg text-black/20 dark:text-white/20">
          <Share2 size={20} />
        </div>
        <div className="flex items-center gap-2 flex-1 justify-center py-2 rounded-lg text-black/20 dark:text-white/20">
          <Bookmark size={20} />
        </div>
      </footer>
    </article>
  );
};

export default SkeletonPostCard;