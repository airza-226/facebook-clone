"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/Context/AuthContext";
import { updateUserBio } from "@/services/User/updateUserBio";

interface BioEditorProps {
  initialBio?: string;
  onClose?: () => void;
}

const BioEditor = ({ initialBio = "", onClose }: BioEditorProps) => {
  const { userProfile, refreshProfile } = useAuth();
  const [bio, setBio] = useState(initialBio);
  const [charCount, setCharCount] = useState(101 - initialBio.length);

  const mutation = useMutation({
    mutationFn: async (newBio: string) => {
      if (!userProfile?.uid) throw new Error("Unauthorized");
      await updateUserBio(userProfile.uid, newBio);
    },
    onSuccess: async () => {
      if (refreshProfile) {
        await refreshProfile();
      }
      if (onClose) {
        onClose();
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= 101) {
      setBio(val);
      setCharCount(101 - val.length);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(bio);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
      <textarea
        value={bio}
        onChange={handleChange}
        placeholder="Describe who you are..."
        rows={3}
        className="w-full p-3 bg-gray-100 dark:bg-[#3a3b3c] text-gray-900 dark:text-gray-100 rounded-xl resize-none outline-none border border-black/10 dark:border-transparent focus:border-blue-500 text-sm transition-colors"
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {charCount} characters left
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-black/5 hover:bg-black/10 dark:bg-[#3a3b3c] dark:hover:bg-[#4e4f50] text-gray-700 dark:text-gray-200 text-sm font-semibold transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-[#1877f2] dark:hover:bg-[#1a6ed4] disabled:opacity-50 text-white text-sm font-semibold transition-all cursor-pointer shadow-md"
          >
            {mutation.isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default BioEditor;