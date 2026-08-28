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
  { icon: <MessageCircle size={20} />, href: '/User/Chat', label: "Messenger", onClick: () => {} },
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
                  ? "text-[#1877f2] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.75 after:bg-[#1877f2] after:rounded-t-full"
                  : "text-gray-400 hover:bg-[#3a3b3c] hover:text-gray-200"
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
      {rightActions.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={item.onClick}
          aria-label={item.label}
          title={item.label}
          className="
            w-9 h-9
            rounded-full
            flex items-center justify-center
            bg-[#3a3b3c] hover:bg-[#4e4f50]
            text-gray-200 hover:text-white
            transition-all duration-150
            cursor-pointer
            shrink-0
          "
        >
          {item.icon}
        </Link>
      ))}
    </>
  )
}

export default NavIcon