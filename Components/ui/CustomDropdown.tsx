'use client'

import React, { useState, useRef, useEffect, useId } from 'react'
import { ChevronDown } from 'lucide-react'

interface CustomDropdownProps {
  label: 'Day' | 'Month' | 'Year'
  value: string
  onChange: (val: string) => void
}

const MONTHS = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
]

const getOptions = (label: CustomDropdownProps['label']): string[] => {
  if (label === 'Day') return Array.from({ length: 31 }, (_, i) => String(i + 1))
  if (label === 'Month') return MONTHS
  const currentYear = new Date().getFullYear()
  return Array.from({ length: 100 }, (_, i) => String(currentYear - i))
}

const CustomDropdown = ({ label, value, onChange }: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const listboxId = useId()
  const options = getOptions(label)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div ref={dropdownRef} className="relative w-1/3">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={`Select ${label}`}
        className={`
          w-full h-[52px] px-3
          flex items-center justify-between
          border rounded-xl
          bg-gray-50 hover:bg-gray-100
          transition-all duration-150
          cursor-pointer
          ${isOpen
            ? 'border-blue-500 bg-white ring-2 ring-blue-500/10'
            : 'border-gray-200'
          }
        `}
      >
        <div className="flex flex-col items-start gap-0.5">
          <span className="text-[0.6875rem] font-medium text-gray-400 leading-none select-none">
            {label}
          </span>
          <span className="text-[0.875rem] font-semibold text-gray-800 leading-none">
            {value || ''}
          </span>
        </div>
        <ChevronDown
          size={15}
          className={`
            text-gray-400 flex-shrink-0
            transition-transform duration-200
            ${isOpen ? 'rotate-180' : ''}
          `}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={`${label} options`}
          className="
            absolute left-0 top-full mt-1.5
            w-full max-h-48
            overflow-y-auto
            bg-white
            border border-gray-100
            rounded-xl
            shadow-xl
            z-50
            p-1.5
            scrollbar-thin scrollbar-thumb-gray-200
          "
        >
          {options.map((option) => (
            <li
              key={option}
              role="option"
              aria-selected={value === option}
              onClick={() => {
                onChange(option)
                setIsOpen(false)
              }}
              className={`
                px-3 py-2
                text-[0.875rem] font-medium
                rounded-lg
                cursor-pointer
                transition-colors duration-100
                text-left
                ${value === option
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CustomDropdown