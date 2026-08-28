"use client";
import { useState, useCallback } from "react";
import StoryCard from "@/Components/feed/StoryCard";
import PostCard from "./PostCard";
import SkeletonPostCard from "../cards/SkeletonCard";
import { fetchAllPosts } from "@/api/Post/fetchPost";
import { Post, userData } from "@/types";
import CreatePostSection from "../container/CreatePostContainer";
import { DataRender } from "../common/DataRender";

interface FeedSectionProps {
  initialPosts: Post[];
  user: Record<string, userData>;
}

const FeedSection = ({ initialPosts,user }: FeedSectionProps) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts || []);
  const [loading, setLoading] = useState<boolean>(!initialPosts || initialPosts.length === 0);

  const refreshPosts = useCallback(async () => {
    setLoading(true); 
    try {
      const data = await fetchAllPosts();
      setPosts(data);
    } catch (error) {
      console.error("Failed to refresh posts:", error);
    } finally {
      setLoading(false); 
    }
  }, []);

  return (
    <>
      <CreatePostSection />

      <section aria-label="Stories">
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 w-full">
          <StoryCard />
        </div>
      </section>

      <section aria-label="Posts" className="flex flex-col gap-y-4">
        <DataRender isLoading={loading} skeleton={<>
          {SkeletonPostCard}
          </>} data={posts} renderItem={(item) => { 
            const authorData = user[item.userId];
            return (
              <div className="relative" key={item.id}>
            <PostCard data={item} user={authorData} key={item.id}/>
            </div>)}} 
            />
      </section>
    </>
  );
};

export default FeedSection;