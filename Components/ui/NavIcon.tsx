import React from "react"
import {
  HomeIcon,
  PlaySquare,
  Users,
  Store,
  Gamepad2,
  LayoutGrid,
  MessageCircle,
  Bell,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavIconProps {
  mode: "center" | "right"
}

const centerLinks = [
  { icon: <HomeIcon size={24} />, href: "/User/HomePage", label: "Home" },
  { icon: <PlaySquare size={24} />, href: "/User/Watch", label: "Watch" },
  { icon: <Users size={24} />, href: "/User/Friends", label: "Friends" },
  { icon: <Store size={24} />, href: "/User/Marketplace", label: "Marketplace" },
  { icon: <Gamepad2 size={24} />, href: "/User/Gaming", label: "Gaming" },
]

const rightActions = [
  { icon: <LayoutGrid size={20} />, href: '#', label: "Menu", onClick: () => {} },
  { icon: <MessageCircle size={20} />, href: '/User/HomePage/Chat', label: "Messenger", onClick: () => {} },
  { icon: <Bell size={20} />, href: '#', label: "Notifications", onClick: () => {} },
]

const NavIcon = ({ mode }: NavIconProps) => {
  const pathname = usePathname()

  if (mode === "center") {
    return (
      <>
        {centerLinks.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              title={item.label}
              className={`
                relative
                flex items-center justify-center
                px-6 lg:px-10
                h-full
                rounded-lg
                transition-colors duration-150
                group
                ${isActive
                  ? "text-blue-600 dark:text-[#1877f2] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-blue-600 dark:after:bg-[#1877f2] after:rounded-t-full"
                  : "text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-[#3a3b3c] hover:text-gray-800 dark:hover:text-gray-200"
                }
              `}
            >
              {item.icon}
            </Link>
          )
        })}
      </>
    )
  }

  return (
    <>
      {rightActions.map((item) => {
        const isButtonAction = item.href === '#'

        const className = `
          w-9 h-9
          rounded-full
          flex items-center justify-center
          bg-black/5 hover:bg-black/10 dark:bg-[#3a3b3c] dark:hover:bg-[#4e4f50]
          text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white
          transition-all duration-150
          cursor-pointer
          shrink-0
        `

        if (isButtonAction) {
          return (
            <button
              key={item.label}
              type="button"
              onClick={item.onClick}
              aria-label={item.label}
              title={item.label}
              className={className}
            >
              {item.icon}
            </button>
          )
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={item.onClick}
            aria-label={item.label}
            title={item.label}
            className={className}
          >
            {item.icon}
          </Link>
        )
      })}
    </>
  )
}

export default NavIcon