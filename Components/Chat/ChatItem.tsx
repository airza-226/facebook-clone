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
    <li className='px-2 pt-2'>
      <button
        onClick={() => onSelect(conversation, otherUid)}
        aria-current={isActive ? 'true' : undefined}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer ${
          isActive ? 'bg-[#1877f2]/10' : 'hover:bg-[#3a3b3c]'
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
          <p className="text-[0.9375rem] font-medium text-gray-200 leading-tight truncate">
            {name}
          </p>
          <p className="text-[0.8125rem] text-gray-500 leading-tight truncate">
            {conversation.lastMessage}
          </p>
        </div>
      </button>
    </li>
  )
}