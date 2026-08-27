import React from "react";
import Profile from "@/public/download (1).jpg";
import Image from "next/image";
import { UserPlus, X, Loader2, Check } from "lucide-react";
import Link from "next/link";
const styles = {
  profile: "w-36 md:w-40",
  friendsSection: "w-full",
};

interface PeopleCardProps {
  variant: keyof typeof styles;
  uid:string
  name?: string;
  photoURL?: string | null;
  mutualFriends?: number;
  isPending?: boolean;
  isProcessing?: boolean;
  onDismiss?: () => void;
  onAddFriend?: () => void;
  onCancelRequest?: () => void;
  onConfirm?: () => void;
  onReject?: () => void;
}

const PeopleCard = ({
  variant,
  uid,
  name = "User Name",
  photoURL,
  mutualFriends,
  isPending = false,
  isProcessing = false,
  onDismiss,
  onAddFriend,
  onCancelRequest,
  onConfirm,
  onReject,
}: PeopleCardProps) => {
  return (
    <article
      className={`
        flex flex-col
        bg-[#242526] border border-[#3a3b3c]
        rounded-xl overflow-hidden
        hover:border-[#4e4f50] hover:bg-[#2d2e2f]
        transition-all duration-200
        ${styles[variant]}
      `}
    >
      <div className="relative w-full aspect-square bg-[#3a3b3c]">
        <Link href={`/User/UserProfile/${uid}`} >
        <Image
          src={photoURL || Profile}
          alt={`${name}'s profile picture`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
          className="object-cover"
          priority
        />
        </Link>
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/40 to-transparent pointer-events-none" />
        {variant !== "friendsSection" && (
          <button
            onClick={onDismiss}
            aria-label="Dismiss suggestion"
            className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-1.5 text-white/80 hover:text-white hover:bg-black/70 hover:scale-110 active:scale-95 transition-all duration-150 z-10"
          >
            <X size={13} strokeWidth={2.5} />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2.5 p-3">
        <div className="flex flex-col">
          <h3 className="font-semibold text-[0.875rem] leading-snug text-gray-100 line-clamp-1">
            {name}
          </h3>
          {mutualFriends !== undefined && (
            <p className="text-[0.75rem] leading-tight text-gray-400 font-normal">
              {mutualFriends} mutual friend{mutualFriends !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {variant === "friendsSection" ? (
          <div className="flex flex-col gap-1.5">
            <button
              onClick={onConfirm}
              disabled={isProcessing}
              aria-label={`Confirm ${name}'s friend request`}
              className="w-full flex items-center justify-center gap-2 bg-[#1877f2] hover:bg-[#1664d8] active:scale-[0.97] text-white rounded-lg py-1.5 px-3 transition-all duration-150 cursor-pointer select-none disabled:opacity-50"
            >
              {isProcessing ? (
                <Loader2 size={15} className="shrink-0 animate-spin" />
              ) : (
                <Check size={15} strokeWidth={2.5} className="shrink-0" />
              )}
              <span className="text-[0.8125rem] font-semibold leading-none">Confirm</span>
            </button>
            <button
              onClick={onReject}
              disabled={isProcessing}
              aria-label={`Reject ${name}'s friend request`}
              className="w-full flex items-center justify-center gap-2 bg-[#3a3b3c] hover:bg-[#4e4f50] active:scale-[0.97] text-gray-300 hover:text-gray-100 rounded-lg py-1.5 px-3 transition-all duration-150 cursor-pointer select-none disabled:opacity-50"
            >
              <span className="text-[0.8125rem] font-semibold leading-none">Reject</span>
            </button>
          </div>
        ) : isPending ? (
          <button
            onClick={onCancelRequest}
            disabled={isProcessing}
            aria-label={`Cancel friend request to ${name}`}
            className="w-full flex items-center justify-center gap-2 bg-[#3a3b3c] hover:bg-[#4e4f50] active:scale-[0.97] border border-[#4e4f50] text-gray-300 hover:text-gray-100 rounded-lg py-1.5 px-3 transition-all duration-150 cursor-pointer select-none disabled:opacity-50"
          >
            {isProcessing ? (
              <Loader2 size={15} className="shrink-0 animate-spin" />
            ) : (
              <X size={15} strokeWidth={2} className="shrink-0" />
            )}
            <span className="text-[0.8125rem] font-semibold leading-none">Cancel</span>
          </button>
        ) : (
          <button
            onClick={onAddFriend}
            disabled={isProcessing}
            aria-label={`Add ${name} as friend`}
            className="w-full flex items-center justify-center gap-2 bg-[#1877f2]/10 hover:bg-[#1877f2]/20 active:bg-[#1877f2]/30 active:scale-[0.97] border border-[#1877f2]/25 hover:border-[#1877f2]/40 text-[#4da3ff] hover:text-[#6ab4ff] rounded-lg py-1.5 px-3 transition-all duration-150 cursor-pointer select-none disabled:opacity-50"
          >
            {isProcessing ? (
              <Loader2 size={15} className="shrink-0 animate-spin" />
            ) : (
              <UserPlus size={15} strokeWidth={2} className="shrink-0" />
            )}
            <span className="text-[0.8125rem] font-semibold leading-none">Add friend</span>
          </button>
        )}
      </div>
    </article>
  );
};

export default PeopleCard;