import { useAuth } from '@/Context/AuthContext'
import React from 'react'
import { Message } from '@/types' 
import { formatMessageItem } from '@/utils/formatMessageTime'
interface BubbleChatProps {
  message: Message
}

const BubbleChat = ({ message }: BubbleChatProps) => {
  const { firebaseUser } = useAuth()
  const isMe = message.senderId === firebaseUser?.uid

  return (
    <div className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div className={`
        max-w-[65%] px-3.5 py-2 rounded-2xl
        ${isMe
          ? 'bg-[#1877f2] text-white rounded-br-md'
          : 'bg-[#3a3b3c] text-gray-100 rounded-bl-md'
        }
      `}>
        <p className="text-[0.875rem] leading-snug wrap-break-word">
          {message.content}
        </p>
        <span className={`
          text-[0.6875rem] block mt-0.5
          ${isMe ? 'text-blue-100/70 text-right' : 'text-gray-400'}
        `}>
          {formatMessageItem(message.createdAt)}
        </span>
      </div>
    </div>
  )
}

export default BubbleChat