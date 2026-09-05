"use client";

import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Camera, Check, RefreshCw, Loader2 } from "lucide-react";
import DefaultProfile from "@/public/download (1).jpg"; 
import { useAuth } from "@/Context/AuthContext";
import { updateUserProfilePicture } from "@/services/User/updateProfilePicture";

const UploadProfilePicture = () => {
  const router = useRouter();
  const { userProfile, refreshProfile } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Cleanup URL object untuk mencegah memory leak
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleSelectFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Hapus URL sebelumnya jika ada untuk efisiensi memori
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleConfirm = async () => {
    if (!selectedFile || !userProfile?.uid) return;
    setIsUploading(true); 
    try {
      await updateUserProfilePicture(userProfile.uid, selectedFile);
      if (refreshProfile) {
        await refreshProfile();
      }
      router.push("/User/HomePage");
    } catch (error) {
      console.error("Cannot update profile picture", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleLater = () => {
    router.push("/User/HomePage");
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#18191a] text-gray-900 dark:text-gray-100 flex items-center justify-center p-4 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-[#242526] border border-black/10 dark:border-[#3a3b3c] rounded-2xl p-6 shadow-xl dark:shadow-2xl flex flex-col items-center gap-6">
        
        {/* Title */}
        <div className="text-center space-y-1">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Profile Picture</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">Select Your Photo</p>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {/* Avatar Container */}
        <div className="relative w-40 h-40 rounded-full overflow-hidden ring-4 ring-black/10 dark:ring-[#3a3b3c] bg-gray-100 dark:bg-[#18191a] flex items-center justify-center group">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              unoptimized // Wajib dipakai jika menggunakan Next.js Image dengan blob/object URL
              className="object-cover"
            />
          ) : (
            <Image
              src={userProfile?.profilePicture || DefaultProfile}
              alt="Profile"
              fill
              className="object-cover"
              sizes="160px"
              priority
            />
          )}

          <button
            type="button"
            onClick={handleSelectFileClick}
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-1 cursor-pointer"
          >
            <Camera size={24} />
            <span className="text-xs font-medium">Change Photo</span>
          </button>
        </div>

        {/* Dynamic Action Buttons */}
        <div className="w-full flex items-center gap-3 pt-2">
          {!selectedFile ? (
            <>
              <button
                type="button"
                onClick={handleLater}
                className="flex-1 py-2.5 px-4 rounded-xl bg-black/5 hover:bg-black/10 dark:bg-[#3a3b3c] dark:hover:bg-[#4e4f50] text-gray-700 dark:text-gray-200 text-sm font-semibold transition-all duration-150 cursor-pointer text-center"
              >
                Later
              </button>

              <button
                type="button"
                onClick={handleSelectFileClick}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#0084ff] hover:bg-[#006dd6] text-white text-sm font-semibold transition-all duration-150 cursor-pointer text-center flex items-center justify-center gap-2 shadow-md"
              >
                <Camera size={18} />
                Select Photo
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleSelectFileClick}
                disabled={isUploading}
                className="flex-1 py-2.5 px-4 rounded-xl bg-black/5 hover:bg-black/10 dark:bg-[#3a3b3c] dark:hover:bg-[#4e4f50] disabled:opacity-50 text-gray-700 dark:text-gray-200 text-sm font-semibold transition-all duration-150 cursor-pointer text-center flex items-center justify-center gap-2"
              >
                <RefreshCw size={16} />
                Change Photo
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                disabled={isUploading}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#0084ff] hover:bg-[#006dd6] disabled:opacity-50 text-white text-sm font-semibold transition-all duration-150 cursor-pointer text-center flex items-center justify-center gap-2 shadow-md"
              >
                {isUploading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Check size={18} />
                    Confirm
                  </>
                )}
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default UploadProfilePicture;