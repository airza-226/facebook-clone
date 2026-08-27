export const formatMessageItem = (dateStr:string | null):string => {
    if(!dateStr) return ""
    const date = new Date(dateStr)
    return date.toLocaleTimeString([],{hour:'2-digit', minute:'2-digit'})
}