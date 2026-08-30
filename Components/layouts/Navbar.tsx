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
  const { firebaseUser,} = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [search, setSearch] = useState<boolean>(false);
  const router = useRouter();
  const handleSearchSubmit = (
    e: React.KeyboardEvent<HTMLInputElement>,
    value: string
  ) => {
    if (e.key === "Enter" && value.trim() !== "") {
      router.push(`/User/Search/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <nav
        aria-label="Main navigation"
        className="
          h-14 px-4
          bg-[#242526]
          border-b border-[#3a3b3c]
          flex items-center justify-between
          shadow-md
        "
      >
        <div className="flex items-center gap-x-2">
          <Link
            href={`${firebaseUser ? '/User/HomePage' : 'Login'}`}
            aria-label="Go to home"
            className="shrink-0 rounded-full overflow-hidden ring-2 ring-[#3a3b3c] hover:ring-[#4e4f50] transition-all"
          >
            <Image
              alt="Home"
              src={icon}
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
          </Link>

          <div
            className={`relative
            flex items-center gap-x-2
            px-3 h-10
            bg-[#3a3b3c] hover:bg-[#4e4f50]
            rounded-full
            ${search ? "w-40 md:w-50 lg:w-60" : "w-10"}
            cursor-pointer
            transition-all duration-200`}
          >
            <button onClick={() => setSearch(!search)} className="cursor-pointer">
              <Search size={16} className="text-gray-400 shrink-0" />
            </button>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search"
              onKeyDown={(e) => handleSearchSubmit(e, searchQuery)}
              className={`${search ? "block" : "hidden"}
                outline-none w-full
                bg-transparent
                text-[0.875rem] text-gray-200
                placeholder:text-gray-400`}
            />
          </div>
        </div>

        <div className="hidden md:flex items-center h-14">
          <NavIcon mode="center" />
        </div>

        <div className="flex items-center gap-x-2">
          <NavIcon mode="right" />

        </div>
      </nav>
    </header>
  );
};

export default Navbar;