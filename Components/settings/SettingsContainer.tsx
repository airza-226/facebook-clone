'use client'

import { useState } from 'react'
import SettingsSidebar from './SettingsSidebar'
import { sidebarNav, SettingsSection } from './settingsNav.config'
import ProfilePanel from './panels/ProfilePanel'
import AccountPanel from './panels/AccountPanel'
import PrivacyPanel from './panels/PrivacyPanel'
import NotificationPanel from './panels/NotificationPanel'
import AppearancePanel from './panels/AppearancePanel'
import LanguagePanel from './panels/LanguagePanel'
import HelpPanel from './panels/HelpPanel'

const panelMap: Record<SettingsSection, React.ComponentType> = {
  profile: ProfilePanel,
  account: AccountPanel,
  privacy: PrivacyPanel,
  notifications: NotificationPanel,
  appearance: AppearancePanel,
  language: LanguagePanel,
  help: HelpPanel,
}

const SettingsContainer = () => {
  const [activeSection, setActiveSection] = useState<SettingsSection>('profile')

  const activeItem = sidebarNav
    .flatMap(g => g.items)
    .find(i => i.id === activeSection)

  const ActivePanel = panelMap[activeSection]

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row gap-4 items-start">

        <SettingsSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        <main className="flex-1 min-w-0 flex flex-col gap-y-4 w-full">
          <div className="px-1">
            <h1 className="font-bold text-[1.25rem] text-gray-900 dark:text-gray-100 leading-tight">
              {activeItem?.label}
            </h1>
            <p className="text-[0.875rem] text-gray-500 dark:text-gray-400 leading-relaxed mt-0.5">
              {activeItem?.desc}
            </p>
          </div>

          <ActivePanel />
        </main>

      </div>
    </div>
  )
}

export default SettingsContainer