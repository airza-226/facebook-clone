interface SettingsCardProps {
  title?: string
  description?: string
  children: React.ReactNode
  danger?: boolean
}

const SettingsCard = ({ title, description, children, danger }: SettingsCardProps) => {
  return (
    <div className={`
      rounded-xl px-5 py-5 transition-colors duration-150
      ${danger
        ? 'bg-red-500/5 border border-red-500/20'
        : 'bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10'
      }
    `}>
      {title && (
        <h2 className={`font-semibold text-[0.9375rem] leading-tight ${
          danger ? 'text-red-500 dark:text-red-400' : 'text-gray-900 dark:text-gray-100'
        } ${description ? 'mb-1' : 'mb-4'}`}>
          {title}
        </h2>
      )}
      {description && (
        <p className="text-[0.8125rem] text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          {description}
        </p>
      )}
      {children}
    </div>
  )
}

export default SettingsCard