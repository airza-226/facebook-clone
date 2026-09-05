'use client'

import { Mail, Phone, AlertTriangle } from 'lucide-react'
import { useAuth } from '@/Context/AuthContext'
import SettingsCard from '../ui/SettingsCard'

const AccountPanel = () => {
  const { userProfile } = useAuth()

  const accountFields = [
    { id: 'email', icon: Mail, label: 'Email address', value: userProfile?.email },
    { id: 'phone', icon: Phone, label: 'Phone number', value: '' },
  ]

  return (
    <section aria-label="Account settings" className="flex flex-col gap-y-3">

      {accountFields.map((field) => (
        <SettingsCard key={field.id}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0">
                <field.icon size={16} className="text-gray-500 dark:text-gray-400" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-[0.75rem] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide leading-none">
                  {field.label}
                </p>
                <p className="text-[0.9375rem] text-gray-900 dark:text-gray-100 leading-tight mt-1">
                  {field.value || 'Not set'}
                </p>
              </div>
            </div>
            <button className="px-3 py-1.5 bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15 text-gray-800 dark:text-gray-200 text-[0.8125rem] font-semibold rounded-lg shrink-0 transition-all duration-150 cursor-pointer">
              Edit
            </button>
          </div>
        </SettingsCard>
      ))}

      <SettingsCard title="Change password">
        <div className="flex flex-col gap-3">
          {['Current password', 'New password', 'Confirm new password'].map((label) => (
            <div key={label} className="flex flex-col gap-1.5">
              <label className="text-[0.75rem] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {label}
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg text-[0.9375rem] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 outline-none focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2]/20 transition-all duration-150"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button className="px-6 py-2.5 bg-[#1877f2] hover:bg-[#1664d8] active:scale-[0.97] text-white text-[0.9375rem] font-semibold rounded-xl shadow-lg shadow-[#1877f2]/20 transition-all duration-150 cursor-pointer">
            Update password
          </button>
        </div>
      </SettingsCard>

      <SettingsCard danger>
        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle size={20} className="text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
          <div>
            <h2 className="font-semibold text-[0.9375rem] text-red-500 dark:text-red-400 leading-tight">
              Danger zone
            </h2>
            <p className="text-[0.8125rem] text-gray-500 dark:text-gray-400 leading-relaxed mt-0.5">
              Once you delete your account, there is no going back.
            </p>
          </div>
        </div>
        <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 active:scale-[0.97] text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 text-[0.875rem] font-semibold rounded-lg border border-red-500/20 transition-all duration-150 cursor-pointer">
          Delete account
        </button>
      </SettingsCard>

    </section>
  )
}

export default AccountPanel