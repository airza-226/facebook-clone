'use client'
import { Eye } from 'lucide-react'

const privacyItems = [
  { label: 'Who can see your posts', desc: 'Control who sees what you share', value: 'Friends' },
  { label: 'Who can send you friend requests', desc: 'Manage incoming requests', value: 'Everyone' },
  { label: 'Who can see your friends list', desc: 'Show or hide your connections', value: 'Friends' },
]

const PrivacyPanel = () => {
  return (
    <section aria-label="Privacy settings" className="flex flex-col gap-y-3">
      {privacyItems.map((item) => (
        <div key={item.label} className="bg-[#242526] border border-[#3a3b3c] rounded-xl px-5 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <p className="text-[0.9375rem] font-semibold text-gray-100 leading-tight">
                {item.label}
              </p>
              <p className="text-[0.8125rem] text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3a3b3c] hover:bg-[#4e4f50] text-gray-200 text-[0.8125rem] font-semibold rounded-lg flex-shrink-0 transition-all duration-150 cursor-pointer">
              <Eye size={13} />
              {item.value}
            </button>
          </div>
        </div>
      ))}
    </section>
  )
}

export default PrivacyPanel