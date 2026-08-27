import { doc, updateDoc } from "firebase/firestore"
import { uploadProfilePicture } from "../upload/uploadImage"
import { db } from "@/lib/firebase"

export const updateUserProfilePicture = async(id:string,file:File):Promise<string>=> {
    let imageUrl = ""
    if(file) {
        imageUrl = await uploadProfilePicture(file)
    }
    const userRef = doc(db,"users",id)
    await updateDoc(userRef,{
        profilePicture:imageUrl,
        updateAt:new Date().toISOString(),
    })
    return imageUrl
}