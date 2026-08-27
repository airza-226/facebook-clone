"use client";

import React, { useState } from "react";

interface ToggleFilterProps {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

const ToggleFilter = ({
  defaultChecked = false,
  onChange,
  label,
  disabled = false,
}: ToggleFilterProps) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.checked;
    setChecked(val);
    onChange?.(val);
  };

  return (
    <label
      className={`
        inline-flex items-center gap-2
        cursor-pointer select-none
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {label && (
        <span className="text-[0.875rem] font-normal text-gray-300 leading-tight">
          {label}
        </span>
      )}

      <div className="relative">
        <input
          type="checkbox"
          role="switch"
          aria-checked={checked}
          aria-label={label ?? "Toggle filter"}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only peer"
        />

        {/* Track */}
        <div
          className={`
            w-11 h-6
            rounded-full
            transition-colors duration-200 ease-in-out
            ${checked ? "bg-[#1877f2]" : "bg-[#3a3b3c]"}
            peer-focus-visible:ring-2
            peer-focus-visible:ring-[#1877f2]/50
            peer-focus-visible:ring-offset-2
            peer-focus-visible:ring-offset-[#242526]
          `}
        />

        {/* Thumb */}
        <div
          className={`
            absolute top-0.75 left-0.75
            w-4.5 h-4.5
            bg-white
            rounded-full
            shadow-md
            transition-transform duration-200 ease-in-out
            ${checked ? "translate-x-5" : "translate-x-0"}
          `}
        />
      </div>
    </label>
  );
};

export default ToggleFilter;
