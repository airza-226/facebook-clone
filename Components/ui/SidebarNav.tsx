'use client'
import React from 'react'
import Image from 'next/image'
import Profile from "@/public/download (1).jpg"
import { useAuth } from '@/Context/AuthContext'
import Link from 'next/link'

const navLinks = [
  { label: "News Feed", href: "#" },
  { label: "Friends", href: "/User/Friends" },
  { label: "Groups", href: "#" },
  { label: "Marketplace", href: "#" },
  { label: "Watch", href: "#" },
  { label: "Memories", href: "#" },
  { label: "Settings", href: '/User/Account' }
]

const SidebarNav = () => {
  const { userProfile, firebaseUser } = useAuth()
  return (
    <aside
      aria-label="Left sidebar navigation"
      className="
        hidden md:flex flex-col gap-y-1
        w-65 lg:w-70 xl:w-75
        px-3 py-4
        fixed left-0 top-14
        h-[calc(100vh-3.5rem)]
        overflow-y-auto
        scrollbar-hide
        z-20
        bg-black/5 dark:bg-white/5
        border-r border-y border-black/10 dark:border-white/10
        rounded-br-2xl rounded-tr-2xl
        shadow-xl
        transition-all
      "
    >
      <Link
        href={firebaseUser ? `/User/UserProfile/${firebaseUser.uid}` : "/Login"}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 active:bg-black/10 dark:active:bg-white/15 transition-colors duration-150 group"
      >
        <div className="relative w-9 h-9 shrink-0">
          <Image
            src={userProfile?.profilePicture || Profile}
            alt="Your profile"
            fill
            sizes="36px"
            className="rounded-full object-cover ring-2 ring-black/10 dark:ring-white/10"
            loading="eager"
          />
        </div>
        <span className="text-[0.9375rem] font-semibold text-gray-900 dark:text-gray-100 group-hover:text-gray-900 dark:group-hover:text-white leading-tight">
          {userProfile?.firstName} {userProfile?.lastName}
        </span>
      </Link>

      <nav aria-label="Main navigation">
        <ul className="flex flex-col gap-y-0.5">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="flex items-center gap-3 px-2 py-2 rounded-lg text-[0.9375rem] font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 active:bg-black/10 dark:active:bg-white/15 transition-colors duration-150"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <footer className="mt-auto pt-4 border-t border-black/10 dark:border-white/10">
        <p className="text-[0.6875rem] text-gray-500 dark:text-gray-400 leading-relaxed px-2">
          Privacy · Terms · Advertising · Cookies · More ·{" "}
        </p>
      </footer>
    </aside>
  )
}

export default SidebarNav