import React from "react";

const SkeletonChat = () => {
  return (
    <li className="px-2 ">
      <button
        className={`animate-pulse w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer bg-[#3a3b3c]`}
      >
        <div className=" shrink-0 w-12 h-12 bg-gray-500 animate-pulse rounded-full"></div>
        <div className="flex-1 min-w-0 flex flex-col gap-1 animate-pulse  ">
            <div className="w-20 rounded-md bg-gray-600 h-5" />
            <div className="w-15 h-5 rounded-md bg-gray-600" />
        </div>
      </button>
    </li>
  );
};

export default SkeletonChat;
