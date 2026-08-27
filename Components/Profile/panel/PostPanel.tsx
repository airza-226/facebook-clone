"use client";
import { Post, userData } from "@/types";
import PostCard from "@/Components/post/PostCard";
import SkeletonPostCard from "@/Components/cards/SkeletonCard";
import { DataRender } from "@/Components/common/DataRender";


interface PostsPanelProps {
  isOwnProfile: boolean;
  userAvatar: string | any;
  posts: Post[];
  isLoading: boolean;
  data:userData[]
}

const PostsPanel = ({ isOwnProfile,  posts, isLoading,data }: PostsPanelProps) => {
  return (
    <div className="flex flex-col gap-4">


      <DataRender
        isLoading={isLoading}
        data={posts}
        skeleton={
          <>
            <SkeletonPostCard />
            <SkeletonPostCard />
          </>
        }
        emptyText={isOwnProfile ? "You haven't posted anything yet" : "No posts yet"}
        renderItem={(item) => <PostCard key={item.id} data={item} user={data}/>}
      />
    </div>
  );
};

export default PostsPanel;