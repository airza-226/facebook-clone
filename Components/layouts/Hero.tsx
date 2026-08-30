'use client'
import FeedCard from '@/Components/feed/FeedCard'
import FeedSection from '@/Components/post/FeedSection'
import SidebarNav from '@/Components/ui/SidebarNav'
import { Post, userData } from '@/types'

interface HeroProps {
  initialPosts: Post[]
user: Record<string, userData>;
}

const Hero = ({ initialPosts,user }:HeroProps) => {
  return (
    <div className="w-full min-h-screen bg-[#18191a] text-gray-100 overflow-x-hidden">
      <div className="w-full pt-3">

        <SidebarNav />

        <aside
          aria-label="Right sidebar"
          className="
            hidden xl:flex flex-col gap-y-4
            w-75
            px-3 py-4
            fixed right-0 top-14
            h-[calc(100vh-3.5rem)]
            overflow-y-auto
            scrollbar-hide
            z-20
          "
        >
          <FeedCard />
        </aside>

        <main
          id="main-content"
          aria-label="News feed"
          className="
            w-full min-w-0
            flex justify-center
            py-3 px-4
            md:pl-68 lg:pl-74 xl:pl-79
            xl:pr-79
          "
        >
          <div className="w-full max-w-147.5 mx-auto flex flex-col gap-y-4 min-w-0">
            <FeedSection initialPosts={initialPosts} user={user}/>
          </div>
        </main>

      </div>
    </div>
  )
}

export default Hero