import ToggleSwitch from '../ui/ToggleSwitch'

const notificationItems = [
  { id: 'friend-requests', label: 'Friend requests', desc: 'When someone sends you a request' },
  { id: 'post-likes', label: 'Post likes', desc: 'When someone likes your post' },
  { id: 'comments', label: 'Comments', desc: 'When someone comments on your post' },
  { id: 'mentions', label: 'Mentions', desc: 'When someone mentions you' },
]

const NotificationPanel = () => {
  return (
    <section aria-label="Notification settings" className="flex flex-col gap-y-3">
      <div className="bg-black/5 dark:bg-white/5 border border-[#3a3b3c] rounded-xl overflow-hidden">
        {notificationItems.map((item, i) => (
          <div
            key={item.id}
            className={`flex items-center justify-between px-5 py-4 ${i !== notificationItems.length - 1 ? 'border-b border-[#3a3b3c]' : ''}`}
          >
            <div className="flex flex-col gap-0.5">
              <p className="text-[0.9375rem] font-semibold text-gray-900 dark:text-gray-100 leading-tight">{item.label}</p>
              <p className="text-[0.8125rem] text-gray-400 dark:text-gray-300 leading-relaxed">{item.desc}</p>
            </div>
            <ToggleSwitch defaultChecked />
          </div>
        ))}
      </div>
    </section>
  )
}

export default NotificationPanel