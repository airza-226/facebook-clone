'use client'
import SettingsCard from '../ui/SettingsCard'

const themes = [
  { label: 'Dark', bg: '#18191a', active: true },
  { label: 'Dim', bg: '#2d3748', active: false },
  { label: 'Light', bg: '#ffffff', active: false },
]

const AppearancePanel = () => {
  return (
    <section aria-label="Appearance settings" className="flex flex-col gap-y-3">
      <SettingsCard title="Theme">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {themes.map((theme) => (
            <button
              key={theme.label}
              className={`flex flex-col items-center gap-2 px-4 py-4 rounded-xl border-2 transition-all duration-150 cursor-pointer ${
                theme.active
                  ? 'border-[#1877f2] bg-[#1877f2]/10'
                  : 'border-[#3a3b3c] hover:border-[#4e4f50]'
              }`}
            >
              <div
                className="w-10 h-10 rounded-lg border border-[#3a3b3c]"
                style={{ background: theme.bg }}
              />
              <span className={`text-[0.875rem] font-semibold ${theme.active ? 'text-[#4da3ff]' : 'text-gray-300'}`}>
                {theme.label}
              </span>
            </button>
          ))}
        </div>
      </SettingsCard>
    </section>
  )
}

export default AppearancePanel