"use client";
import { Star, Clapperboard, MapPinned, Music2, Trophy } from "lucide-react";

const moreItems = [
  { icon: <Star size={18} />, label: "Reviews given" },
  { icon: <Clapperboard size={18} />, label: "Videos" },
  { icon: <MapPinned size={18} />, label: "Check-ins" },
  { icon: <Trophy size={18} />, label: "Sports" },
  { icon: <Music2 size={18} />, label: "Music" },
];

const MorePanel = () => {
  return (
    <div className="bg-[#242526] rounded-xl px-2 py-2 flex flex-col divide-y divide-[#3a3b3c] max-w-md">
      {moreItems.map((item) => (
        <button
          key={item.label}
          disabled
          className="flex items-center gap-3 px-3 py-3.5 text-left text-gray-500 cursor-not-allowed"
        >
          <span className="w-9 h-9 rounded-full bg-[#3a3b3c] flex items-center justify-center shrink-0">
            {item.icon}
          </span>
          <span className="text-sm font-semibold flex-1">{item.label}</span>
          <span className="text-xs text-gray-600">Coming soon</span>
        </button>
      ))}
    </div>
  );
};

export default MorePanel;