import { DataChatProps } from "@/types";
import React from "react";
export function ChatRender<T>({
  isLoading,
  skeleton,
  conversation,
  renderItem,
}: DataChatProps<T>) {
  if (isLoading) {
    {Array.from({ length: 4 }).map(() => (
      <>{skeleton}</>
    ))}
  }
  if (conversation.length === 0) {
    return (
      <p className="text-center text-gray-500 text-[0.8125rem] py-8">
        No Conversation Yet
      </p>
    );
  }

  return <>{conversation.map(renderItem)}</>;
}
