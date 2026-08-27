import React from 'react'
import Profile from "@/public/download (1).jpg"
import Image from 'next/image'
import ToggleFilter from "@/Components/ui/ToggleFilter"
import { ChevronDown, Users2, Hash, MapPin, Newspaper } from 'lucide-react'

const categories = [
  { icon: <Users2 size={18} />, label: "People", href: "#" },
  { icon: <Newspaper size={18} />, label: "Posts", href: "#" },
  { icon: <Hash size={18} />, label: "Groups", href: "#" },
  { icon: <MapPin size={18} />, label: "Places", href: "#" },
]

const toggleFilters = [
  { label: "Recent Post" },
  { label: "Post you've ever seen" },
]

const SideBarMenuSearch = () => {
  return (
    <aside
      aria-label="Search filters"
      className="
        hidden md:flex flex-col gap-y-4
        w-[280px] lg:w-[320px]
        px-4 py-5
        bg-[#242526]
        border-r border-y border-[#3a3b3c]
        rounded-br-2xl rounded-tr-2xl
        fixed left-0 top-14
        h-fit max-h-[calc(100vh-3.5rem)]
        overflow-y-auto scrollbar-hide
        z-20
        shadow-2xl
        transition-all
      "
    >
      <header>
        <h1 className="text-[1.25rem] font-bold leading-tight text-gray-100">
          Search Results
        </h1>
      </header>

      <div className="border-b border-[#3a3b3c] w-full" />

      <div className="flex flex-col gap-y-5">

        {/* ── Active Filter ── */}
        <section aria-label="Active filter">
          <h2 className="
            text-[0.6875rem] font-bold
            text-gray-500
            uppercase tracking-widest
            mb-2 px-1
          ">
            Filters
          </h2>

          <button
            aria-label="Filter: All"
            className="
              w-full flex items-center gap-3
              p-2.5 rounded-xl
              bg-[#3a3b3c] hover:bg-[#4e4f50]
              transition-colors duration-150
              cursor-pointer
              group
            "
          >
            <div className="relative w-9 h-9 flex-shrink-0">
              <Image
                src={Profile}
                alt="All results"
                fill
                sizes="36px"
                className="rounded-full object-cover"
              />
            </div>
            <span className="text-[0.9375rem] font-semibold text-gray-100 group-hover:text-white leading-tight">
              All
            </span>
          </button>
        </section>

        {/* ── Toggle Filters ── */}
        <section aria-label="Toggle filters">
          <div className="flex flex-col gap-y-3 px-1">
            {toggleFilters.map((filter) => (
              <div
                key={filter.label}
                className="flex items-center justify-between gap-x-3"
              >
                <label className="text-[0.875rem] font-normal text-gray-300 leading-tight cursor-pointer">
                  {filter.label}
                </label>
                <ToggleFilter />
              </div>
            ))}

            {/* Date Posted dropdown */}
            <div className="flex flex-col gap-y-1.5">
              <button
                aria-label="Filter by date posted"
                className="
                  w-full flex items-center justify-between
                  py-1 px-1
                  text-[0.875rem] font-normal text-gray-300
                  hover:text-white
                  transition-colors duration-150
                  cursor-pointer
                  group
                "
              >
                <span>Date Posted</span>
                <ChevronDown
                  size={16}
                  className="text-gray-400 group-hover:text-white transition-all duration-200"
                />
              </button>
            </div>
          </div>
        </section>

        <div className="border-b border-[#3a3b3c] w-full" />

        {/* ── Categories ── */}
        <nav aria-label="Search categories">
          <ul className="flex flex-col gap-y-0.5">
            {categories.map((cat) => (
              <li key={cat.label}>
                <a
                  href={cat.href}
                  aria-label={`Search in ${cat.label}`}
                  className="
                    flex items-center gap-3
                    px-2.5 py-2.5
                    rounded-xl
                    text-gray-300 hover:text-white
                    hover:bg-[#3a3b3c]
                    transition-colors duration-150
                    group
                  "
                >
                  <span className="text-gray-400 group-hover:text-white transition-colors duration-150 flex-shrink-0">
                    {cat.icon}
                  </span>
                  <span className="text-[0.9375rem] font-semibold leading-tight">
                    {cat.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

      </div>
    </aside>
  )
}

export default SideBarMenuSearch