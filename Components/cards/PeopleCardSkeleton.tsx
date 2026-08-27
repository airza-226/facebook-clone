import React from "react"
const styles = {
  profile: "w-36 md:w-40",
  friendsSection: "w-full",
}

interface PeopleCardSkeletonProps {
  variant: keyof typeof styles
  showTwoButtons?: boolean
}

const PeopleCardSkeleton = ({ variant, showTwoButtons }: PeopleCardSkeletonProps) => {
  return (
    <div
      className={`
        flex flex-col
        bg-[#242526] border border-[#3a3b3c]
        rounded-xl overflow-hidden
        ${styles[variant]}
      `}
    >
      {/* Image placeholder */}
      <div className="relative w-full aspect-square bg-[#3a3b3c] overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-linear-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div className="flex flex-col gap-2.5 p-3">
        <div className="flex flex-col gap-1.5">
          <div className="h-3.5 w-4/5 rounded-md bg-[#3a3b3c] overflow-hidden relative">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-linear-to-r from-transparent via-white/5 to-transparent" />
          </div>
          <div className="h-3 w-2/5 rounded-md bg-[#3a3b3c] overflow-hidden relative">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite_0.1s] bg-linear-to-r from-transparent via-white/5 to-transparent" />
          </div>
        </div>

        {showTwoButtons ? (
          <div className="flex flex-col gap-1.5">
            <div className="h-[30px] w-full rounded-lg bg-[#3a3b3c] overflow-hidden relative">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite_0.15s] bg-linear-to-r from-transparent via-white/5 to-transparent" />
            </div>
            <div className="h-[30px] w-full rounded-lg bg-[#3a3b3c] overflow-hidden relative">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite_0.2s] bg-linear-to-r from-transparent via-white/5 to-transparent" />
            </div>
          </div>
        ) : (
          <div className="h-[30px] w-full rounded-lg bg-[#3a3b3c] overflow-hidden relative">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite_0.15s] bg-linear-to-r from-transparent via-white/5 to-transparent" />
          </div>
        )}
      </div>
    </div>
  )
}

export default PeopleCardSkeleton