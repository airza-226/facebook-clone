import { DataChatProps } from "@/types";
import React from "react";
export function ChatRender<T>({
  isLoading,
  skeleton,
  conv,
  renderItem,
}: DataChatProps<T>) {
  if (isLoading) {
    {Array.from({ length: 4 }).map((_, i) => (
      <>{skeleton}</>
    ))}
  }
  if (conv.length === 0) {
    return (
      <p className="text-center text-gray-500 text-[0.8125rem] py-8">
        No Conversation Yet
      </p>
    );
  }

  return <>{conv.map(renderItem)}</>;
}
