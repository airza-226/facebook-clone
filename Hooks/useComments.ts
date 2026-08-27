import { fetchCommentsByPost } from "@/api/comment/fetchComments"
import { useQuery } from "@tanstack/react-query"

export const useComments = (id:string) => {
    return useQuery({
        queryKey:['comments',id],
        queryFn:()=>fetchCommentsByPost(id),
        enabled:!!id
    })
}