'use client'
import Image from 'next/image'
import Profile from '@/public/download (1).jpg'
import { LogOut } from 'lucide-react'
import { useAuth } from '@/Context/AuthContext'
import { auth } from '@/lib/firebase'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { sidebarNav, SettingsSection } from './settingsNav.config'

interface SettingsSidebarProps {
  activeSection: SettingsSection
  onSectionChange: (section: SettingsSection) => void
}

const SettingsSidebar = ({ activeSection, onSectionChange }: SettingsSidebarProps) => {
  const { userProfile } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut(auth)
    router.push('/Login')
  }

  return (
    <aside
      aria-label="Settings navigation"
      className="w-full md:w-70 lg:w-75 shrink-0 md:sticky md:top-20 flex flex-col gap-y-1"
    >
      <div className="flex items-center gap-3 px-3 py-3 bg-[#242526] border border-[#3a3b3c] rounded-xl mb-2">
        <div className="relative w-11 h-11 shrink-0">
          <Image
            src={userProfile?.profilePicture || Profile}
            alt="Your profile"
            fill
            sizes="44px"
            className="rounded-full object-cover ring-2 ring-[#3a3b3c]"
          />
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="font-semibold text-[0.9375rem] text-gray-100 leading-tight truncate">
            {userProfile?.firstName} {userProfile?.lastName}
          </p>
          <p className="text-[0.75rem] text-gray-400 leading-tight truncate">
            {userProfile?.email}
          </p>
        </div>
      </div>

      <nav className="flex flex-col gap-y-4">
        {sidebarNav.map((group) => (
          <div key={group.group} className="flex flex-col gap-y-0.5">
            <p className="px-3 mb-1 text-[0.6875rem] font-semibold text-gray-500 uppercase tracking-wider leading-none">
              {group.group}
            </p>
            {group.items.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left
                    transition-all duration-150 group cursor-pointer
                    ${isActive
                      ? 'bg-[#1877f2]/10 border border-[#1877f2]/20'
                      : 'hover:bg-[#3a3b3c] border border-transparent'
                    }
                  `}
                >
                  <span className={`
                    w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                    transition-colors duration-150
                    ${isActive ? 'bg-[#1877f2]/20 text-[#4da3ff]' : 'bg-[#3a3b3c] text-gray-400 group-hover:text-gray-200'}
                  `}>
                    <Icon size={16} />
                  </span>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className={`text-[0.875rem] font-semibold leading-tight ${isActive ? 'text-[#4da3ff]' : 'text-gray-200 group-hover:text-white'}`}>
                      {item.label}
                    </span>
                    <span className="text-[0.6875rem] text-gray-500 leading-tight truncate">
                      {item.desc}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="mt-4 pt-4 border-t border-[#3a3b3c]">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-red-500/10 border border-transparent hover:border-red-500/20 text-gray-400 hover:text-red-400 transition-all duration-150 cursor-pointer group"
        >
          <span className="w-8 h-8 rounded-lg bg-[#3a3b3c] group-hover:bg-red-500/10 flex items-center justify-center shrink-0 transition-colors duration-150">
            <LogOut size={16} />
          </span>
          <span className="text-[0.875rem] font-semibold leading-tight">Sign out</span>
        </button>
      </div>
    </aside>
  )
}

export default SettingsSidebar