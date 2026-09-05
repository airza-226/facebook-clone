import { useAuth } from '@/Context/AuthContext'
import React from 'react'
import { Message } from '@/types' 
import { formatMessageItem } from '@/utils/formatMessageTime'

interface BubbleChatProps {
  message: Message
}

const BubbleChat = ({ message }: BubbleChatProps) => {
  const { firebaseUser } = useAuth()
  const isMe = Boolean(message.senderId && message.senderId === firebaseUser?.uid)
  return (
    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} group mb-1`}>
      <div className={`
        max-w-[65%] px-3.5 py-2 rounded-2xl shadow-xs
        ${isMe
          ? 'bg-[#0084ff] text-white rounded-br-xs'
          : 'bg-black/5 dark:bg-[#3a3b3c] text-gray-900 dark:text-gray-100 rounded-bl-xs'
        }
      `}>
        <p className="text-[0.9375rem] leading-relaxed wrap-break-word">
          {message.content}
        </p>
      </div>
      <span className="text-[0.6875rem] text-gray-400 dark:text-gray-500 px-1 mt-0.5 select-none">
        {formatMessageItem(message.createdAt)}
      </span>
    </div>
  )
}

export default BubbleChat