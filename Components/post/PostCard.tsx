'use client'
import React, { useState } from "react";
import Image from "next/image";
import Profile from "@/public/download (1).jpg";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { Post, userData } from "@/types";
import Link from "next/link";
import { usePostActions } from "@/Hooks/usePostActions";
import CommentSection from "../comments/CommentSection";
type PostCardProps = {
  data: Post;
  user: userData | null;
};
const PostCard = ({ data,user }: PostCardProps) => {
  const {likes,handleLike} = usePostActions(data)
  const [showComments,setShowComments] = useState<boolean>(false)
  return (
    <article
      className="
      w-full flex flex-col
      bg-[#242526]
      rounded-xl overflow-hidden
      shadow-sm
      border border-[#3a3b3c]
      transition-all duration-200
    "
    >

      <header className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <Link href={`/User/UserProfile/${data.userId}`} className="relative w-10 h-10 shrink-0">
            <Image
              src={user?.profilePicture || Profile}
              alt={`${user?.firstName} ${user?.lastName}'s avatar`}
              fill
              sizes="40px"
              className="rounded-full object-cover ring-2 ring-[#3a3b3c]"
            />
          </Link>


          <div className="flex flex-col gap-0.5">
            <h3 className="font-semibold text-[0.9rem] leading-tight text-gray-100">
              {`${user?.firstName} ${user?.lastName}` || "Anonymous"}
            </h3>
            <div className="flex items-center gap-1.5">
              <time className="text-[0.75rem] text-gray-400">
                {data?.createdAt
                  ? new Date(data?.createdAt).toLocaleDateString()
                  : "Just now"}
              </time>
            </div>
          </div>
        </div>


        <div className="flex items-center gap-1">
          <button className="p-2 rounded-full text-gray-400 hover:text-gray-200 hover:bg-[#3a3b3c] transition-all duration-150 cursor-pointer">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </header>


      {data?.content && (
        <div className="flex flex-col gap-1.5 px-4 py-2">
          <p className="text-[0.9375rem] font-normal leading-snug text-gray-100">
            {data?.content}
          </p>
        </div>
      )}

      {data?.imageUrl && (
  <figure className="w-full mt-1 overflow-hidden bg-[#18191a]">
    <Image
      src={data.imageUrl}
      alt="Post image"
      width={0}
      height={0}
      sizes="100vw"
      className="w-full h-auto max-h-150 object-contain mx-auto"
    />
    
  </figure>
)}

      <div className="flex items-center justify-between px-4 py-2 border-b border-[#3a3b3c]">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center justify-center w-5 h-5 bg-[#1877f2] rounded-full">
            <Heart size={11} className="text-white fill-white" />
          </div>
          <span className="text-[0.8125rem] text-gray-400 leading-none">
            {Array.isArray(data?.likes) ? data.likes.length : 0}
          </span>
        </div>
        <button className="text-[0.8125rem] text-gray-400 hover:underline leading-none cursor-pointer">
          {data.commentsCount ?? 0} comments
        </button>
      </div>

      {/* ── Action buttons ── */}
      <footer className="flex items-center justify-around px-2 py-1">
        <button className="flex items-center gap-2 flex-1 justify-center py-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-[#3a3b3c] active:scale-95 transition-all duration-150 cursor-pointer" onClick={handleLike}>
          <Heart size={20} strokeWidth={1.75} />
          
          <span className="text-[0.8125rem] text-gray-400">{likes.length}</span>
        </button>

        <button className="flex items-center gap-2 flex-1 justify-center py-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-[#3a3b3c] active:scale-95 transition-all duration-150 cursor-pointer" onClick={()=>setShowComments((p)=> !p)}>
          <MessageCircle size={20} strokeWidth={1.75} />
          <span className="text-[0.875rem] font-semibold hidden sm:block">Comment</span>
        </button>

        <button className="flex items-center gap-2 flex-1 justify-center py-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-[#3a3b3c] active:scale-95 transition-all duration-150 cursor-pointer">
          <Share2 size={20} strokeWidth={1.75} />
          <span className="text-[0.875rem] font-semibold hidden sm:block">Share</span>
        </button>

        <button className="flex items-center gap-2 flex-1 justify-center py-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-[#3a3b3c] active:scale-95 transition-all duration-150 cursor-pointer">
          <Bookmark size={20} strokeWidth={1.75} />
          <span className="text-[0.875rem] font-semibold hidden sm:block">Save</span>
        </button>
      </footer>
      {showComments && <CommentSection postId={data.id} />}
    </article>
  );
};

export default PostCard;