import { MessageCircle } from 'lucide-react'

const ChatEmptyState = () => {
  return (
    <section
      aria-label="No conversation selected"
      className="flex-1 h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center gap-5 bg-white dark:bg-[#18191a] transition-colors"
    >
      {/* Wrapper Ikon dengan efek kedalaman & proporsi lebih besar */}
      <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-sm">
        {/* Dekorasi cincin (ring) halus biar ruangannya nggak terasa terlalu kosong */}
        <div className="absolute inset-2 rounded-full border-2 border-black/5 dark:border-white/5" />
        
        <MessageCircle 
          size={40} 
          strokeWidth={1.5} 
          className="text-gray-400 dark:text-gray-500 relative z-10" 
        />
      </div>

      <div className="text-center max-w-sm px-6">
        <h2 className="font-semibold text-xl text-gray-900 dark:text-gray-100 leading-tight">
          Your Messages
        </h2>
        <p className="text-[0.9375rem] text-gray-500 dark:text-gray-400 leading-relaxed mt-1.5">
          Select a conversation from the sidebar to start chatting, or start a new message.
        </p>
      </div>
    </section>
  )
}

export default ChatEmptyState