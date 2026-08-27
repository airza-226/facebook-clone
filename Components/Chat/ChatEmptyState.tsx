import { MessageCircle } from 'lucide-react'

const ChatEmptyState = () => {
  return (
    <section
      aria-label="No conversation selected"
      className="flex-1 h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center gap-3 bg-[#18191a]"
    >
      <div className="w-16 h-16 rounded-full bg-[#242526] border border-[#3a3b3c] flex items-center justify-center">
        <MessageCircle size={28} className="text-gray-500" />
      </div>
      <div className="text-center">
        <p className="font-semibold text-[1rem] text-gray-200 leading-tight">
          Your messages
        </p>
        <p className="text-[0.875rem] text-gray-500 leading-relaxed mt-1">
          Select a conversation to start chatting
        </p>
      </div>
    </section>
  )
}

export default ChatEmptyState