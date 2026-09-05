"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import Link from "next/link";
import NavIcon from "@/Components/ui/NavIcon";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Context/AuthContext";
import icon from "@/public/icon.png";

const Navbar = () => {
  const { firebaseUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      router.push(`/User/Search/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <nav
        aria-label="Main navigation"
        className="
          h-14 px-4
          bg-white dark:bg-[#242526]
          border-b border-black/10 dark:border-[#3a3b3c]
          flex items-center justify-between
          shadow-sm dark:shadow-md
          transition-colors
        "
      >
        <div className="flex items-center gap-x-2">
          <Link
            href={firebaseUser ? '/User/HomePage' : '/Login'}
            aria-label="Go to home"
            className="shrink-0 rounded-full overflow-hidden ring-2 ring-black/10 dark:ring-[#3a3b3c] hover:ring-black/20 dark:hover:ring-[#4e4f50] transition-all"
          >
            <Image
              alt="Home"
              src={icon}
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
          </Link>

          {/* Expandable Search Input */}
          <div
            className={`
              relative flex items-center gap-x-2 px-3 h-10
              bg-black/5 hover:bg-black/10 dark:bg-[#3a3b3c] dark:hover:bg-[#4e4f50]
              rounded-full
              ${isSearchOpen ? "w-44 sm:w-52 md:w-60" : "w-10"}
              transition-all duration-200
            `}
          >
            <button 
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)} 
              className="cursor-pointer shrink-0"
              aria-label="Toggle search"
            >
              <Search size={16} className="text-gray-500 dark:text-gray-400" />
            </button>

            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search query"
              onKeyDown={handleSearchSubmit}
              className={`
                ${isSearchOpen ? "block" : "hidden"}
                outline-none w-full
                bg-transparent
                text-[0.875rem] text-gray-900 dark:text-gray-200
                placeholder:text-gray-400
              `}
            />
          </div>
        </div>

        {/* Bagian Tengah: Navigasi Utama (Desktop) */}
        <div className="hidden md:flex items-center h-14">
          <NavIcon mode="center" />
        </div>

        {/* Bagian Kanan: Ikon Profil / Menu Lainnya */}
        <div className="flex items-center gap-x-2">
          <NavIcon mode="right" />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;