"use client";
import { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import Profile from "@/public/download (1).jpg";
import { Play } from "lucide-react";
import CreatePost from "../post/CreatePost";
import { useAuth } from "@/Context/AuthContext";

const CreatePostSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { userProfile } = useAuth();

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setIsOpen(true); 
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedFile(null); 
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <section
      aria-label="Create a post"
      className="bg-[#242526] border border-[#3a3b3c] rounded-xl px-4 py-3 flex flex-col gap-3"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*,video/*"
        className="hidden"
      />

      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 shrink-0">
          <Image
            alt="Your profile picture"
            src={userProfile?.profilePicture || Profile}
            fill
            sizes="40px"
            className="rounded-full object-cover ring-2 ring-[#3a3b3c]"
            loading="eager"
          />
        </div>
        <button
          aria-label="Create a post"
          onClick={() => setIsOpen(true)}
          className="
            flex-1 bg-[#3a3b3c] hover:bg-[#4e4f50]
            rounded-full px-4 py-2.5 text-left
            text-[0.9375rem] text-gray-400
            transition-colors duration-150 cursor-pointer
          "
        >
          What&apos;s on your mind?
        </button>
      </div>
      {isOpen && (
        <CreatePost 
          OnClose={handleCloseModal} 
          initialFile={selectedFile} 
        />
      )}

      <div className="border-t border-[#3a3b3c]" />

      <div className="flex items-center justify-around">
        <button 
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-[#3a3b3c] transition-colors duration-150 cursor-pointer"
        >
          <Play size={20} className="text-red-400" />
          <span className="text-[0.875rem] font-semibold hidden sm:block">
            Live video
          </span>
        </button>

        <button
          type="button"
          onClick={handlePhotoClick}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-[#3a3b3c] transition-colors duration-150 cursor-pointer"
        >
          <span className="text-green-400 text-lg leading-none">🖼</span>
          <span className="text-[0.875rem] font-semibold hidden sm:block">
            Photo/video
          </span>
        </button>

        <button 
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-[#3a3b3c] transition-colors duration-150 cursor-pointer"
        >
          <span className="text-yellow-400 text-lg leading-none">😊</span>
          <span className="text-[0.875rem] font-semibold hidden sm:block">
            Feeling/activity
          </span>
        </button>
      </div>
    </section>
  );
};

export default CreatePostSection;