import { useAuth } from "@/Context/AuthContext";
import { DataRenderProps } from "@/types";
import React from "react";

export function DataRender<T>({
  isLoading,
  data,
  skeleton,
  emptyText = "Empty",
  renderItem,
}: DataRenderProps<T>) {
  
  if (isLoading) {
    return <>{skeleton}</>;
  }

  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <p className="text-center text-gray-500 text-sm py-10 w-full col-span-full">
        {emptyText}
      </p>
    );
  }


  return <>{data.map((item, index) => renderItem(item, index))}</>;
}
