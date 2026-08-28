

import React, { Suspense } from 'react';
import SearchResult from '../SearchResult';
export function generateStaticParams() {
  return [];
}
const Page = () => {
  return (
    <main className="mt-14 flex justify-center px-4 w-full">
      <Suspense fallback={<div className="text-gray-400 py-10">Loading search page...</div>}>
        <SearchResult />
      </Suspense>
    </main>
  );
};

export default Page;