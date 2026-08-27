'use client'
import SettingsCard from '../ui/SettingsCard'

const LanguagePanel = () => {
  return (
    <section aria-label="Language settings" className="flex flex-col gap-y-3">
      <SettingsCard title="Display language">
        <select className="w-full px-3 py-2.5 bg-[#18191a] border border-[#3a3b3c] rounded-lg text-[0.9375rem] text-gray-100 outline-none focus:border-[#1877f2] transition-all duration-150 cursor-pointer">
          <option value="en">English</option>
          <option value="id">Bahasa Indonesia</option>
          <option value="ja">日本語</option>
        </select>
      </SettingsCard>
    </section>
  )
}

export default LanguagePanel