"use client";
import { use, useEffect } from "react";
import UserProfileLayout from "@/layouts/UserProfileLayout";
import { useRouter } from "next/navigation";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useAuth } from "@/Context/AuthContext";
import { useUserProfile } from "@/Hooks/useUserProfile";
import { usePostByUser } from "@/Hooks/usePostByUser";

interface PageProps {
  params: Promise<{ uid: string }>;
}

const ProfilePageContainer = ({ params }: PageProps) => {
  const { uid } = use(params);
  const {
    userProfile: currentUserProfile,
    firebaseUser,
    loading: authLoading,
  } = useAuth();
  const router = useRouter();
  const isOwnProfile = !authLoading && firebaseUser?.uid === uid;

  useEffect(() => {
    if (authLoading) return;
    if (!firebaseUser) {
      router.push("/Login");
    }
  }, [authLoading, firebaseUser, router]);

  const {
    data: fetchedProfile,
    isLoading: profileLoading,
    isError: profileError,
    refetch: refetchProfile,
  } = useUserProfile(authLoading || isOwnProfile ? "" : uid);

  const {
    data: posts = [],
    isLoading: postsLoading,
    refetch: refetchPosts,
  } = usePostByUser(uid);

  const viewedProfile = isOwnProfile ? currentUserProfile : fetchedProfile;

  const isHeaderLoading = authLoading || (!isOwnProfile && profileLoading);

  const handleRetry = () => {
    refetchProfile();
    refetchPosts();
  };

  if (isHeaderLoading || (!viewedProfile && !profileError)) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 animate-pulse space-y-4">
        <div className="w-full h-36 sm:h-52 bg-[#242526] rounded-xl relative">
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-[#3a3b3c] border-4 border-[#18191a] absolute -bottom-6 left-4" />
        </div>
        <div className="pt-6 space-y-2 px-2">
          <div className="h-5 w-40 bg-[#3a3b3c] rounded-md" />
          <div className="h-3.5 w-24 bg-[#3a3b3c]/60 rounded-md" />
        </div>
        <div className="pt-4 space-y-3">
          <div className="h-32 w-full bg-[#242526] rounded-xl border border-[#3a3b3c]" />
        </div>
      </div>
    );
  }
  if (!isOwnProfile && profileError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#18191a] gap-y-4 px-4">
        <div className="flex flex-col items-center gap-y-3 bg-[#242526] border border-[#3a3b3c] rounded-2xl px-8 py-10 max-w-sm w-full text-center shadow-xl">
          <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <AlertCircle size={24} className="text-red-400" />
          </div>
          <div className="flex flex-col gap-y-1">
            <h2 className="font-bold text-[1rem] text-gray-100 leading-tight">
              Something went wrong
            </h2>
            <p className="text-[0.8125rem] text-gray-400 leading-relaxed">
              We couldn&apos;t load this profile. Please try again.
            </p>
          </div>
          <button
            onClick={handleRetry}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#1877f2] hover:bg-[#1664d8] active:scale-[0.97] text-white text-[0.875rem] font-semibold rounded-xl transition-all duration-150 cursor-pointer mt-1"
          >
            <RefreshCw size={15} />
            Try again
          </button>
          <button
            onClick={() => router.push("/User/HomePage")}
            className="text-[0.8125rem] text-gray-400 hover:text-gray-200 transition-colors duration-150 cursor-pointer"
          >
            Go back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <UserProfileLayout
      data={viewedProfile}
      post={posts}
      isLoading={postsLoading}
    />
  );
};

export default ProfilePageContainer;