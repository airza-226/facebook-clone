'use client'
import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  ChevronDown,
  Image as ImageIcon,
  Smile,
  MapPin,
  Tag,
  X,
} from "lucide-react";
import Profile from "@/public/download (1).jpg";
import { submitPost } from "@/services/Post/createPost";
import { useAuth } from "@/Context/AuthContext";

type CreatePostProps = {
  OnClose: (val: boolean) => void;
  initialFile?: File | null;
};

const CreatePost = ({ OnClose, initialFile }: CreatePostProps) => {
  const { userProfile } = useAuth();
  const [content, setContent] = useState<string>("");
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    if ((!content.trim() && !selectedFile) || !userProfile) return;
    setIsPosting(true);
    try {
      await submitPost({
        userId: userProfile?.uid,
        authorName: `${userProfile?.firstName} ${userProfile?.lastName || ""}`,
        authorPhoto: userProfile?.profilePicture || Profile,
        content,
        imageFile: selectedFile,
      });

      setContent("");
      handleRemoveImage();
      OnClose(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <article className="w-full max-w-142.5 bg-white dark:bg-[#242526] border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
        {/* Header */}
        <header className="relative flex items-center justify-center px-4 py-3.5 border-b border-black/10 dark:border-white/10">
          <h2 className="font-bold text-[1.0625rem] text-gray-900 dark:text-gray-100 leading-tight">
            Create Post
          </h2>
          <button
            type="button"
            onClick={() => OnClose(false)}
            aria-label="Close"
            className="absolute right-4 w-9 h-9 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-150 cursor-pointer"
          >
            <X size={18} />
          </button>
        </header>

        {/* User info */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-2">
          <div className="relative w-11 h-11 shrink-0">
            <Image
              src={userProfile?.profilePicture || Profile}
              alt="Your profile picture"
              fill
              sizes="44px"
              priority
              className="rounded-full object-cover ring-2 ring-black/10 dark:ring-white/10"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-[0.9375rem] font-semibold text-gray-900 dark:text-gray-100 leading-tight">
              {userProfile?.firstName} {userProfile?.lastName || ""}
            </h3>
            <button
              type="button"
              className="flex items-center gap-1 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-gray-700 dark:text-gray-200 rounded-md px-2 py-0.5 transition-colors duration-150 cursor-pointer"
            >
              <span className="text-[0.75rem] font-semibold leading-none">
                Friends
              </span>
              <ChevronDown size={13} />
            </button>
          </div>
        </div>

        <div className="px-4 py-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isPosting}
            placeholder="What's on your mind?"
            aria-label="Post content"
            className="w-full min-h-25 bg-transparent outline-none resize-none text-[1.1875rem] font-normal text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 leading-relaxed"
          />

          {previewUrl && (
            <div className="relative w-full rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-black/30 mb-3">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full max-h-62.5 object-contain"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-black/60 text-white p-1.5 rounded-full hover:bg-black/80 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {/* Add to post */}
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between px-3 py-2 border border-black/10 dark:border-white/10 rounded-xl bg-black/5 dark:bg-white/5">
            <span className="text-[0.875rem] font-semibold text-gray-700 dark:text-gray-300">
              Add to your post
            </span>
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-150 cursor-pointer text-green-500 dark:text-green-400"
              >
                <ImageIcon size={20} />
              </button>
              <button
                type="button"
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-150 cursor-pointer text-blue-500 dark:text-blue-400"
              >
                <Tag size={20} />
              </button>
              <button
                type="button"
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-150 cursor-pointer text-yellow-500 dark:text-yellow-400"
              >
                <Smile size={20} />
              </button>
              <button
                type="button"
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-150 cursor-pointer text-red-500 dark:text-red-400"
              >
                <MapPin size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="px-4 pb-4">
          <button
            type="button"
            disabled={isPosting}
            aria-label="Publish post"
            className="w-full bg-[#1877f2] hover:bg-[#1a6ed4] disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl text-[0.9375rem] transition-all duration-150 cursor-pointer"
            onClick={handleSubmit}
          >
            {isPosting ? "Posting..." : "Post"}
          </button>
        </div>
      </article>
    </div>
  );
};

export default CreatePost;