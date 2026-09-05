'use client'
import { useState, KeyboardEvent } from 'react'
import Image from 'next/image'
import { Send } from 'lucide-react'
import Profile from '@/public/download (1).jpg'
import { useAuth } from '@/Context/AuthContext'

interface CommentInputProps {
  onSubmit: (content: string) => Promise<void>
  placeholder?: string
  autoFocus?: boolean
  compact?: boolean
}

const CommentInput = ({ onSubmit, placeholder = "Write a comment...", autoFocus, compact }: CommentInputProps) => {
  const { userProfile } = useAuth()
  const [value, setValue] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!value.trim() || submitting) return
    setSubmitting(true)
    try {
      await onSubmit(value.trim())
      setValue("")
    } finally {
      setSubmitting(false)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`relative shrink-0 ${compact ? "w-7 h-7" : "w-9 h-9"}`}>
        <Image
          src={userProfile?.profilePicture || Profile}
          alt="Your profile"
          fill
          sizes={compact ? "28px" : "36px"}
          className="rounded-full object-cover ring-2 ring-black/10 dark:ring-white/10"
        />
      </div>

      <div className="
        flex-1 flex items-center gap-2
        bg-black/5 dark:bg-white/5
        border border-black/10 dark:border-white/10
        rounded-full px-3 py-1.5
        focus-within:ring-1 focus-within:ring-[#1877f2]/40
        pl-3.5 pr-1.5
        transition-all duration-150
      ">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          placeholder={placeholder}
          aria-label="Write a comment"
          disabled={submitting}
          className="
            flex-1 bg-transparent outline-none
            text-[0.875rem] text-gray-100
            placeholder:text-gray-400
            disabled:opacity-50
          "
        />
        <button
          onClick={handleSubmit}
          disabled={!value.trim() || submitting}
          aria-label="Send comment"
          className="
            w-7 h-7 rounded-full shrink-0
            flex items-center justify-center
            text-[#4da3ff] hover:bg-[#4e4f50]
            disabled:text-gray-600 disabled:hover:bg-transparent
            transition-all duration-150
            cursor-pointer disabled:cursor-not-allowed
          "
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  )
}

export default CommentInput