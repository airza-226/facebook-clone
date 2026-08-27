import { DataMessageRender } from "@/types"
import React from "react"
export function MessageRender<T>({data,skeleton,isLoading,renderItem}:DataMessageRender<T>){
    if(isLoading) {
        return <>
        {skeleton}
        {skeleton}
        {skeleton}
        {skeleton}
        {skeleton}
        {skeleton}
        </>
    }

    if(!data) {
        return (
            <p className="text-gray-400 text-[0.8125rem] leading-relaxed">No Message Yet</p>
        )
    }

    return <>
    {data.map(renderItem)}
    </>
}