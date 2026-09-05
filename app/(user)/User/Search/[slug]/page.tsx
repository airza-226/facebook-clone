import React, { Suspense } from "react";
import SearchResult from "../SearchResult";

const Page = () => {
  return (
    <main className="mt-14 flex justify-center px-4 w-full">
      <Suspense
        fallback={Array.from({ length: 5 }, (_, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-3 rounded-2xl bg-[#242526] border border-[#3a3b3c] animate-pulse"
          >
            <div className="flex items-center gap-x-3.5 min-w-0">
              <div className="w-12 h-12 shrink-0 rounded-full bg-[#3a3b3c]" />
              <div className="flex flex-col gap-2 min-w-0">
                <div className="h-4 bg-[#3a3b3c] rounded w-32" />
                <div className="h-3 bg-[#3a3b3c] rounded w-24" />
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#3a3b3c]" />
          </li>
        ))}
      >
        <SearchResult />
      </Suspense>
    </main>
  );
};

export default Page;
