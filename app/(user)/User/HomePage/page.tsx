import Hero from "@/layouts/Hero"
import React from 'react'
import { fetchAllPosts } from "@/services/Post/fetchPost"
import { Post, userData } from "@/types"
import { fetchUserProfile } from "@/services/User/fetchUserProfile"

const page = async() => {
  let initialPosts: Post[] = []
  let initialUserMap: Record<string, userData> = {}
  
  try {
    const rawPosts = await fetchAllPosts()
    const uniqueUserIds = Array.from(new Set(rawPosts.map((post) => post.userId)))
    const userPromises = uniqueUserIds.map((id) => fetchUserProfile(id))
    const settledResults = await Promise.allSettled(userPromises)
    
    const fetchedUsers = settledResults
      .filter((result) => result.status === "fulfilled")
      .map((result) => (result as PromiseFulfilledResult<userData>).value)
      .filter(Boolean);
    const rawUserMap = fetchedUsers.reduce((acc, user) => {
      acc[user.uid] = user; 
      return acc;
    }, {} as Record<string, userData>);
    initialPosts = JSON.parse(JSON.stringify(rawPosts));
    initialUserMap = JSON.parse(JSON.stringify(rawUserMap));
    console.log("Fetched initial data successfully", { initialPosts, initialUserMap });
  } catch (error) {
    console.error("Failed to fetch initial data", error);
    throw new Error(`Firebase Fetch Error: ${error}`);
  }
  
  return (
    <Hero initialPosts={initialPosts} user={initialUserMap}/>
  )
}

export default page