import { fetchPostsByUser } from "@/api/Post/fetchPost"
import { useQuery } from "@tanstack/react-query"

export const usePostByUser = (uid:string) => {
    return useQuery({
        queryKey:['posts','byUser',uid],
        queryFn:()=> fetchPostsByUser(uid),
        enabled:!!uid,
        staleTime: 1000 * 30,
    })
}