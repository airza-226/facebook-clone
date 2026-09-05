"use client";
import { HelpCircle, Shield, Globe, ChevronRight } from "lucide-react";

const helpItems = [
  {
    icon: HelpCircle,
    label: "Help Center",
    desc: "Browse articles and guides",
  },
  {
    icon: Shield,
    label: "Report a problem",
    desc: "Let us know if something is wrong",
  },
  { icon: Globe, label: "Privacy Policy", desc: "How we handle your data" },
];

const HelpPanel = () => {
  return (
    <section aria-label="Help and support" className="flex flex-col gap-y-3">
      {helpItems.map((item) => (
        <button
          key={item.label}
          className="w-full flex items-center justify-between gap-4 px-5 py-4 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 rounded-xl text-left transition-all duration-150 cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-black/5 dark:bg-white/10 group-hover:bg-black/10 dark:group-hover:bg-white/15 flex items-center justify-center shrink-0 transition-colors duration-150">
              <item.icon
                size={16}
                className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-150"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-[0.9375rem] font-semibold text-gray-900 dark:text-gray-100 leading-tight transition-colors duration-150">
                {item.label}
              </p>
              <p className="text-[0.8125rem] text-gray-500 dark:text-gray-400 leading-tight">
                {item.desc}
              </p>
            </div>
          </div>
          <ChevronRight
            size={18}
            className="text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 shrink-0 transition-colors duration-150"
          />
        </button>
      ))}
    </section>
  );
};

export default HelpPanel;