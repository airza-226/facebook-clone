import { useRouter } from "next/navigation"

export const HandleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>,Result:string,targetPath = "/User/Search") => { 
    const router = useRouter()
    if(e.key === "Enter" && Result !== "") router.push(`${targetPath}q?=${encodeURIComponent(Result.trim())}`)
}