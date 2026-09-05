import React from "react";

const SkeletonChat = () => {
  return (
    <li className="px-2 list-none">
      <div
        className="
          w-full flex items-center gap-3 
          px-3 py-2.5 rounded-xl 
          bg-white dark:bg-white/5 
          border border-black/10 dark:border-white/10
          shadow-sm
          transition-colors
        "
      >
        <div className="shrink-0 w-12 h-12 rounded-full bg-black/10 dark:bg-white/10 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-linear-to-r from-transparent via-black/5 dark:via-white/10 to-transparent" />
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          <div className="w-24 h-4 rounded-md bg-black/10 dark:bg-white/10 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-linear-to-r from-transparent via-black/5 dark:via-white/10 to-transparent" />
          </div>
          <div className="w-16 h-3 rounded-md bg-black/5 dark:bg-white/5 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite_0.1s] bg-linear-to-r from-transparent via-black/5 dark:via-white/10 to-transparent" />
          </div>
        </div>
      </div>
    </li>
  );
};

export default SkeletonChat;