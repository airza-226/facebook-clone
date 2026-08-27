import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Profile from "@/public/download (1).jpg"

interface FeedCardProps {
  title?: string
  description?: string
  href?: string
  sponsor?: string
}

const FeedCard = ({
  title = "Sponsored Title",
  description = "Sponsored description goes here",
  href = "#",
  sponsor = "Sponsor Name",
}: FeedCardProps) => {
  return (
    <section aria-label="Sponsored content">
      <h2 className="
        text-[0.8125rem] font-semibold
        text-gray-500
        leading-tight mb-3 px-1
      ">
        Sponsored
      </h2>

      <Link
        href={href}
        aria-label={`Sponsored: ${title}`}
        className="
          flex gap-3 items-start
          p-2 rounded-xl
          hover:bg-[#3a3b3c]
          transition-colors duration-150
          group
        "
      >
        <div className="
          relative
          w-30 h-30
          shrink-0
          rounded-xl overflow-hidden
          bg-[#3a3b3c]
        ">
          <Image
            src={Profile}
            alt={title}
            fill
            sizes="120px"
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>

        <div className="flex flex-col gap-1.5 pt-1 min-w-0">
          <p className="
            text-[0.9375rem] font-semibold
            text-gray-100 group-hover:text-white
            leading-snug
            line-clamp-2
            transition-colors duration-150
          ">
            {title}
          </p>
          <p className="
            text-[0.75rem] font-normal
            text-gray-400
            leading-relaxed
            line-clamp-2
          ">
            {description}
          </p>
          <span className="
            text-[0.6875rem] font-medium
            text-gray-500
            leading-none mt-0.5
          ">
            {sponsor}
          </span>
        </div>
      </Link>
    </section>
  )
}

export default FeedCard