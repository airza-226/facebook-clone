import React, { ReactNode } from 'react'
import Image from 'next/image'
import LoginBanner from "@/public/download (2).jpg"

const AuthContainer = ({ children }: { children: ReactNode }) => {
  return (
    <main className="
      min-h-screen w-full
      bg-[#0f0f1a]
      flex items-center justify-center
      px-4 py-10 md:p-8
    ">
      <div className="
        w-full max-w-7xl
        min-h-150
        bg-white/5
        backdrop-blur-md
        rounded-3xl
        shadow-2xl
        border border-white/10
        flex flex-col md:flex-row
        overflow-hidden
        transition-all duration-300
      ">

        <figure className="
          hidden md:block
          md:w-1/2 lg:w-[60%]
          relative
          shrink-0
        ">
          <Image
            src={LoginBanner}
            alt="Welcome to our platform"
            fill
            sizes="(max-width: 768px) 0vw, (max-width: 1024px) 50vw, 60vw"
            className="object-cover"
            priority
          />
          <div className="
            absolute inset-0
            bg-linear-to-r from-transparent to-black/20
            pointer-events-none
          " />
        </figure>

        <section className="
          flex-1
          flex justify-center
          px-4 py-8 md:px-6 md:py-10
        ">
          {children}
        </section>

      </div>
    </main>
  )
}

export default AuthContainer