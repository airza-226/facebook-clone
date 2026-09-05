interface ToggleSwitchProps {
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
}

const ToggleSwitch = ({ defaultChecked, onChange }: ToggleSwitchProps) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
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
        after:content-[''] after:absolute after:top-0.75 after:left-0.75
        after:w-4.5 after:h-4.5 after:rounded-full
        after:bg-white after:shadow-sm
        after:transition-transform after:duration-200
        peer-checked:after:translate-x-4
      " />
    </label>
  )
}

export default ToggleSwitch