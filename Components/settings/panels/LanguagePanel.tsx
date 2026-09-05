'use client'
import SettingsCard from '../ui/SettingsCard'

const LanguagePanel = () => {
  return (
    <section aria-label="Language settings" className="flex flex-col gap-y-3">
      <SettingsCard title="Display language">
        <select className="w-full px-3 py-2.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg text-[0.9375rem] text-gray-900 dark:text-gray-100 outline-none focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2]/20 transition-all duration-150 cursor-pointer">
          <option value="en" className="bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100">
            English
          </option>
          <option value="id" className="bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100">
            Bahasa Indonesia
          </option>
          <option value="ja" className="bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100">
            日本語
          </option>
        </select>
      </SettingsCard>
    </section>
  )
}

export default LanguagePanel