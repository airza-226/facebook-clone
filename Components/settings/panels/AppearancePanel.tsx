'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import SettingsCard from '../ui/SettingsCard'

const themes = [
  { id: 'dark', label: 'Dark', bg: '#18191a' },
  { id: 'dim', label: 'Dim', bg: '#2d3748' },
  { id: 'light', label: 'Light', bg: '#ffffff' },
]

const AppearancePanel = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section aria-label="Appearance settings" className="flex flex-col gap-y-3">
      <SettingsCard title="Theme">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {themes.map((item) => {
            const isActive = theme === item.id

            return (
              <button
                key={item.id}
                onClick={() => setTheme(item.id)}
                className={`flex flex-col items-center gap-2 px-4 py-4 rounded-xl border-2 transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'border-[#1877f2] bg-[#1877f2]/10'
                    : 'border-[#3a3b3c] hover:border-[#4e4f50]'
                }`}
              >
                <div
                  className="w-10 h-10 rounded-lg border border-[#3a3b3c]"
                  style={{ background: item.bg }}
                />
                <span className={`text-[0.875rem] font-semibold ${isActive ? 'text-[#4da3ff]' : 'text-gray-300'}`}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </SettingsCard>
    </section>
  )
}

export default AppearancePanel