import { Phone, Video, Info, Image as ImageIcon, Smile, ThumbsUp } from "lucide-react";

const ChatWindowSkeleton = () => {
  return (
    <section
      aria-label="Loading conversation"
     className="flex-1 h-[calc(100vh-3.5rem)] flex flex-col bg-white dark:bg-white/5 min-w-0 transition-colors"
    >
      <header className="flex items-center justify-between px-4 py-2.5 border-b border-black/10 dark:border-white/10 shrink-0 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-black/10 dark:bg-white/10 animate-pulse shrink-0" />
          <div className="h-4 w-28 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
        </div>

        <div className="flex items-center gap-1 opacity-40">
          <button disabled className="w-9 h-9 rounded-full flex items-center justify-center text-blue-600 dark:text-[#4da3ff] cursor-not-allowed">
            <Phone size={18} />
          </button>
          <button disabled className="w-9 h-9 rounded-full flex items-center justify-center text-blue-600 dark:text-[#4da3ff] cursor-not-allowed">
            <Video size={18} />
          </button>
          <button disabled className="w-9 h-9 rounded-full flex items-center justify-center text-blue-600 dark:text-[#4da3ff] cursor-not-allowed">
            <Info size={18} />
          </button>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4 flex flex-col gap-3">
        <div className="flex justify-start">
          <div className="h-9 w-40 rounded-2xl bg-black/10 dark:bg-white/10 animate-pulse" />
        </div>
        <div className="flex justify-end">
          <div className="h-9 w-52 rounded-2xl bg-black/10 dark:bg-white/10 animate-pulse" />
        </div>
        <div className="flex justify-end">
          <div className="h-9 w-32 rounded-2xl bg-black/10 dark:bg-white/10 animate-pulse" />
        </div>
        <div className="flex justify-start">
          <div className="h-9 w-44 rounded-2xl bg-black/10 dark:bg-white/10 animate-pulse" />
        </div>
      </div>
      <div className="px-4 py-3 border-t border-black/10 dark:border-white/10 shrink-0 transition-colors opacity-40">
        <div className="flex items-center gap-2">
          <button disabled className="w-9 h-9 rounded-full flex items-center justify-center text-blue-600 dark:text-[#4da3ff] cursor-not-allowed shrink-0">
            <ImageIcon size={20} />
          </button>

          <div className="flex-1 flex items-center gap-2 bg-black/5 dark:bg-white/10 rounded-full pl-4 pr-1.5 py-1.5">
            <span className="flex-1 text-[0.875rem] text-gray-500 dark:text-gray-400">Aa</span>
            <button disabled className="w-7 h-7 rounded-full flex items-center justify-center text-blue-600 dark:text-[#4da3ff] cursor-not-allowed shrink-0">
              <Smile size={16} />
            </button>
          </div>

          <button disabled className="w-9 h-9 rounded-full flex items-center justify-center text-blue-600 dark:text-[#4da3ff] cursor-not-allowed shrink-0">
            <ThumbsUp size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChatWindowSkeleton;