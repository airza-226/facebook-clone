// Components/settings/ui/SettingsCard.tsx
interface SettingsCardProps {
  title?: string
  description?: string
  children: React.ReactNode
  danger?: boolean
}

const SettingsCard = ({ title, description, children, danger }: SettingsCardProps) => {
  return (
    <div className={`
      rounded-xl px-5 py-5
      ${danger
        ? 'bg-red-500/5 border border-red-500/20'
        : 'bg-[#242526] border border-[#3a3b3c]'
      }
    `}>
      {title && (
        <h2 className={`font-semibold text-[0.9375rem] leading-tight ${danger ? 'text-red-400' : 'text-gray-100'} ${description ? 'mb-1' : 'mb-4'}`}>
          {title}
        </h2>
      )}
      {description && (
        <p className="text-[0.8125rem] text-gray-400 mb-4 leading-relaxed">
          {description}
        </p>
      )}
      {children}
    </div>
  )
}

export default SettingsCard