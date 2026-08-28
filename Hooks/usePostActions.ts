"use client";
import { toggleLike } from "@/services/Post/likePost";
import { useAuth } from "@/Context/AuthContext";
import { Post } from "@/types";
import React, { useState } from "react";

export const usePostActions = (post: Post) => {
  const { firebaseUser } = useAuth();
  const uid = firebaseUser?.uid;
  const [likes, setLikes] = useState<string[]>(post.likes);

  const isLiked = uid ? likes.includes(uid) : false;

  const handleLike = async () => {
    if (!uid) return;
    const currentlyLiked = isLiked;
    setLikes((prev) =>
      currentlyLiked ? prev.filter((id) => id !== uid) : [...prev, uid],
    );

    try {
      await toggleLike(post.id, uid, currentlyLiked);
    } catch (error) {
      console.error("Failed to toggle like:", error);
      setLikes((prev) =>
        currentlyLiked ? [...prev, uid] : prev.filter((id) => id !== uid),
      );
    }
  };

  return { likes, isLiked, handleLike };
};
