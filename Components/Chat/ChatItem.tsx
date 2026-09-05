import Image from 'next/image'
import Profile from "@/public/download (1).jpg"
import { Conversation } from '@/types'

interface ChatItemProps {
  conv: Conversation
  currentUid?: string
  isActive: boolean
  onSelect: (conv: Conversation, otherUid: string) => void
}

export function ChatItem({ conv: conversation, currentUid, isActive, onSelect }: ChatItemProps) {
  const otherUid = conversation.participants.find((p) => p !== currentUid)
  if (!otherUid) return null

  const name = conversation.participantNames[otherUid]
  const photo = conversation.participantPhotos[otherUid]

  return (
    <li className="px-2">
      <button
        onClick={() => onSelect(conversation, otherUid)}
        aria-current={isActive ? 'true' : undefined}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors duration-150 cursor-pointer ${
          isActive 
            ? 'bg-blue-500/10 dark:bg-blue-500/20' 
            : 'hover:bg-black/5 dark:hover:bg-white/10'
        }`}
      >
        <div className="relative w-12 h-12 shrink-0">
          <Image
            src={photo || Profile}
            alt={name || 'User'}
            fill
            sizes="48px"
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
          <p className="text-[0.9375rem] font-medium text-gray-900 dark:text-gray-100 leading-tight truncate">
            {name}
          </p>
          <p className={`text-[0.8125rem] leading-tight truncate ${
            isActive 
              ? 'text-blue-600 dark:text-[#4da3ff]' 
              : 'text-gray-500 dark:text-gray-400'
          }`}>
            {conversation.lastMessage}
          </p>
        </div>
      </button>
    </li>
  )
}