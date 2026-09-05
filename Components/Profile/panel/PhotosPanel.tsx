"use client";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import ProfileDefault from "@/public/download (1).jpg";

interface PhotosPanelProps {
  photos: string[];
  isOwnProfile: boolean;
}

const PhotosPanel = ({ photos, isOwnProfile }: PhotosPanelProps) => {
  if (photos.length === 0) {
    return (
      <div className="
        bg-white dark:bg-[#242526] 
        border border-black/5 dark:border-transparent 
        rounded-xl px-4 py-14 
        flex flex-col items-center text-center gap-2 
        shadow-sm
      ">
        <ImageIcon size={28} className="text-gray-400 dark:text-gray-500" />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {isOwnProfile ? "You haven't uploaded any photos yet" : "No photos to show"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
      {photos.map((photo, index) => (
        <div 
          key={`${photo}-${index}`} 
          className="
            relative aspect-square 
            rounded-lg overflow-hidden 
            bg-gray-100 dark:bg-[#3a3b3c] 
            cursor-pointer group 
            shadow-sm
          "
        >
          <Image
            src={photo || ProfileDefault}
            alt={`Photo ${index + 1}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ))}
    </div>
  );
};

export default PhotosPanel;