// Components/comment/CommentItem.tsx
'use client'
import { useState } from 'react'
import Image from 'next/image'
import Profile from '@/public/download (1).jpg'
import { useAuth } from '@/Context/AuthContext'
import CommentInput from './CommentInput'
import { Comment } from '@/types'

interface CommentItemProps {
  comment: Comment
  onLike: (commentId: string, isLiked: boolean) => void
  onReply?: (parentId: string, content: string) => Promise<void>
}

const timeAgo = (dateStr: string | null) => {
  if (!dateStr) return "now"
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "now"
  if (mins < 60) return `${mins}m`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h`
  return `${Math.floor(hours / 24)}d`
}

const CommentItem = ({ comment, onLike, onReply }: CommentItemProps) => {
  const { firebaseUser } = useAuth()
  const [showReplyBox, setShowReplyBox] = useState(false)

  const uid = firebaseUser?.uid
  const isLiked = uid ? comment.likes.includes(uid) : false

  const authorPhoto = typeof comment.authorPhoto === "string" ? comment.authorPhoto : Profile

  return (
    <div className="flex gap-2">
      <div className="relative w-8 h-8 shrink-0 mt-0.5">
        <Image
          src={Profile}
          alt={comment.authorName}
          fill
          sizes="32px"
          className="rounded-full object-cover ring-2 ring-[#3a3b3c]"
        />
      </div>

      <div className="flex flex-col gap-1 min-w-0 flex-1">

        <div className="
          inline-block w-fit max-w-full
          bg-[#3a3b3c]
          rounded-2xl
          px-3.5 py-2
        ">
          <p className="text-[0.8125rem] font-semibold text-gray-100 leading-tight">
            {comment.authorName}
          </p>
          <p className="text-[0.875rem] text-gray-200 leading-snug break-words mt-0.5">
            {comment.content}
          </p>
        </div>

        <div className="flex items-center gap-3 px-3">
          <button
            onClick={() => onLike(comment.id, isLiked)}
            className={`
              text-[0.75rem] font-semibold
              transition-colors duration-150
              cursor-pointer
              ${isLiked ? "text-[#4da3ff]" : "text-gray-400 hover:underline"}
            `}
          >
            Like
          </button>
          {onReply && (
            <button
              onClick={() => setShowReplyBox((v) => !v)}
              className="text-[0.75rem] font-semibold text-gray-400 hover:underline transition-colors duration-150 cursor-pointer"
            >
              Reply
            </button>
          )}
          <span className="text-[0.75rem] text-gray-500">
            {timeAgo(comment.createdAt)}
          </span>
          {comment.likes.length > 0 && (
            <span className="flex items-center gap-1 ml-auto text-[0.75rem] text-gray-400">
              <span className="w-4 h-4 rounded-full bg-[#1877f2] flex items-center justify-center flex-shrink-0">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </span>
              {comment.likes.length}
            </span>
          )}
        </div>

        {showReplyBox && onReply && (
          <div className="pl-1 mt-1">
            <CommentInput
              compact
              autoFocus
              placeholder={`Reply to ${comment.authorName}...`}
              onSubmit={async (content) => {
                await onReply(comment.id, content)
                setShowReplyBox(false)
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentItem