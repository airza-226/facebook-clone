'use client'
import { useState, useEffect } from 'react'
import { fetchCommentsByPost } from '@/api/comment/fetchComments'
import { createComment } from '@/api/comment/createComment'
import { useAuth } from '@/Context/AuthContext'
import CommentItem from './CommentItem'
import CommentInput from './CommentInput'
import { Comment } from '@/types'
import { useRouter } from 'next/navigation'

interface CommentSectionProps {
  postId: string
}

const VISIBLE_STEP = 3

const CommentSection = ({ postId }: CommentSectionProps) => {
    const router = useRouter()
  const { userProfile } = useAuth()
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(VISIBLE_STEP)

  useEffect(() => {
    let isCancelled = false

    const load = async () => {
      try {
        const data = await fetchCommentsByPost(postId)
        if (!isCancelled) setComments(data)
      } catch (error) {
        console.error("Failed to load comments:", error)
      } finally {
        if (!isCancelled) setLoading(false)
      }
    }

    load()
    return () => { isCancelled = true }
  }, [postId])

  const handleNewComment = async (content: string) => {
    if (!userProfile) {
        router.push('/Login')
        return
    }
    const tempId = `temp-${Date.now()}`

    const optimisticComment: Comment = {
      id: tempId,
      postId,
      userId: userProfile.uid,
      authorName: `${userProfile.firstName} ${userProfile.lastName}`,
      authorPhoto: userProfile.profilePhoto,
      content,
      likes: [],
      createdAt: new Date().toISOString(),
    }

    setComments((prev) => [...prev, optimisticComment])

    try {
      const realId = await createComment({
        postId,
        userId: userProfile.uid,
        authorName: optimisticComment.authorName,
        authorPhoto: userProfile.profilePhoto,
        content,
      })
      setComments((prev) =>
        prev.map((c) => (c.id === tempId ? { ...c, id: realId } : c))
      )
    } catch (error) {
      console.error("Failed to post comment:", error)
      setComments((prev) => prev.filter((c) => c.id !== tempId))
    }
  }

  const handleLike = (commentId: string, isLiked: boolean) => {
    console.log("toggle like on comment", commentId, isLiked)
  }

  const visibleComments = comments.slice(-visibleCount)
  const hiddenCount = comments.length - visibleComments.length

  return (
    <div className="flex flex-col gap-y-3 px-4 pb-3 pt-2 border-t border-[#3a3b3c]">

      {loading ? (
        <div className="flex justify-center py-4">
          <div className="w-5 h-5 border-2 border-[#3a3b3c] border-t-[#1877f2] rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {hiddenCount > 0 && (
            <button
              onClick={() => setVisibleCount((v) => v + VISIBLE_STEP)}
              className="
                self-start
                text-[0.8125rem] font-semibold text-gray-400
                hover:text-gray-200 hover:underline
                transition-colors duration-150
                cursor-pointer
              "
            >
              View {hiddenCount} more comment{hiddenCount !== 1 ? "s" : ""}
            </button>
          )}

          <div className="flex flex-col gap-y-3">
            {visibleComments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onLike={handleLike}
                onReply={handleNewComment}
              />
            ))}
          </div>

          {comments.length === 0 && (
            <p className="text-[0.8125rem] text-gray-500 text-center py-2">
              No comments yet. Start the conversation.
            </p>
          )}
        </>
      )}

      <CommentInput onSubmit={handleNewComment} />
    </div>
  )
}

export default CommentSection