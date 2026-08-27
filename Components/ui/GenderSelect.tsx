'use client'

import { ChevronDown } from "lucide-react"
import React, { useState, useRef, useEffect, useId } from "react"

interface GenderProps {
  value: string
  onChange: (val: string) => void
}

const GENDERS = ["Male", "Female", "Custom"] as const

const GenderSelect = ({ value, onChange }: GenderProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const listboxId = useId()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label="Select your gender"
        className={`
          w-full h-[52px] px-3
          flex items-center justify-between
          border rounded-xl
          bg-gray-50 hover:bg-gray-100
          transition-all duration-150
          cursor-pointer text-left
          ${isOpen
            ? 'border-blue-500 bg-white ring-2 ring-blue-500/10'
            : 'border-gray-200'
          }
        `}
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-[0.6875rem] font-medium text-gray-400 leading-none select-none">
            Select your gender
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
          aria-label="Gender options"
          className="
            absolute left-0 top-full mt-1.5
            w-full max-h-40
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
          {GENDERS.map((gender) => (
            <li
              key={gender}
              role="option"
              aria-selected={value === gender}
              onClick={(e) => {
                e.stopPropagation()
                onChange(gender)
                setIsOpen(false)
              }}
              className={`
                px-3 py-2
                text-[0.875rem] font-medium
                rounded-lg
                cursor-pointer
                transition-colors duration-100
                text-left
                ${value === gender
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              {gender}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default GenderSelect