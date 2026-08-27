interface ToggleSwitchProps {
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
}

const ToggleSwitch = ({ defaultChecked, onChange }: ToggleSwitchProps) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 ml-4">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="sr-only peer"
      />
      <div className="
        w-10 h-6 rounded-full
        bg-[#3a3b3c] peer-checked:bg-[#1877f2]
        transition-colors duration-200
        after:content-[''] after:absolute after:top-[3px] after:left-[3px]
        after:w-[18px] after:h-[18px] after:rounded-full
        after:bg-white after:shadow-sm
        after:transition-transform after:duration-200
        peer-checked:after:translate-x-[16px]
      " />
    </label>
  )
}

export default ToggleSwitch