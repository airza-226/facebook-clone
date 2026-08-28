"use client";
import { useState } from "react";
import {
  Briefcase, GraduationCap, MapPin, Home, Heart,
  Mail, Phone, Link as LinkIcon, Cake, Pen, X, Loader2,
} from "lucide-react";
import { userData } from "@/types";
import { useUpdateBio } from "@/Hooks/useUpdateBio"
import { useAuth } from "@/Context/AuthContext";

interface AboutPanelProps {
  data: userData | null;
  isOwnProfile: boolean;
}

interface AboutRow {
  icon: React.ReactNode;
  label: string;
  value?: string | null;
}

const AboutRowItem = ({ icon, label, value }: AboutRow) => {
  return (
    <div className="flex items-center gap-3 px-2 py-2.5 hover:bg-[#3a3b3c] rounded-lg transition-colors duration-150 group">
      <span className="text-gray-400 group-hover:text-gray-200 shrink-0 transition-colors">{icon}</span>
      {value ? (
        <span className="text-sm text-gray-200 leading-snug">
          {value} <span className="text-gray-500">· {label}</span>
        </span>
      ) : (
        <button className="text-sm text-[#4da3ff] hover:underline font-medium cursor-pointer">
          Add {label.toLowerCase()}
        </button>
      )}
    </div>
  );
};

const AboutPanel = ({ data, isOwnProfile }: AboutPanelProps) => {
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [draftBio, setDraftBio] = useState(data?.bio ?? "");
  const updateBio = useUpdateBio(data?.uid ?? "");
  const {firebaseUser} = useAuth()
  const startEditing = () => {
    setDraftBio(data?.bio ?? "");
    setIsEditingBio(true);
  };

  const cancelEditing = () => {
    setDraftBio(data?.bio ?? "");
    setIsEditingBio(false);
  };

  const handleSaveBio = () => {
    const trimmed = draftBio.trim();
    updateBio.mutate(trimmed, {
      onSuccess: () => setIsEditingBio(false),
    });
  };

  const overview: AboutRow[] = [
    { icon: <Briefcase size={18} />, label: "Workplace", value: data?.work },
    { icon: <GraduationCap size={18} />, label: "Education", value: data?.education },
    { icon: <Home size={18} />, label: "Hometown", value: data?.hometown },
    { icon: <MapPin size={18} />, label: "Current city", value: data?.location },
    { icon: <Heart size={18} />, label: "Relationship status", value: data?.relationshipStatus },
    { icon: <Cake size={18} />, label: "Birthday", value: data?.birthDay },
  ];

  const contact: AboutRow[] = [
    { icon: <Mail size={18} />, label: "Email", value: data?.email },
    { icon: <Phone size={18} />, label: "Phone", value: data?.phoneNumber },
    { icon: <LinkIcon size={18} />, label: "Website", value: data?.website },
  ];

  const visibleOverview = overview.filter((r) => r.value || isOwnProfile);
  const visibleContact = contact.filter((r) => r.value || isOwnProfile);
  const hasNothing = visibleOverview.length === 0 && visibleContact.length === 0 && !data?.bio;

  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      {/* Bio section */}
      {isEditingBio ? (
        <div className="bg-[#242526] rounded-xl px-4 py-4 flex flex-col gap-3">
          <textarea
            value={draftBio}
            onChange={(e) => setDraftBio(e.target.value)}
            placeholder="Tell people a bit about yourself"
            maxLength={150}
            rows={3}
            autoFocus
            className="w-full bg-[#3a3b3c] rounded-lg px-3 py-2.5 text-sm text-gray-100 placeholder:text-gray-500 outline-none resize-none focus:ring-1 focus:ring-[#4da3ff]/40 transition-all duration-150"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">{draftBio.length}/150</span>
            <div className="flex items-center gap-2">
              <button
                onClick={cancelEditing}
                disabled={updateBio.isPending}
                className="flex items-center gap-1.5 text-gray-400 hover:text-gray-200 hover:bg-[#3a3b3c] text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors duration-150 cursor-pointer disabled:opacity-50"
              >
                <X size={14} /> Cancel
              </button>
              <button
                onClick={handleSaveBio}
                disabled={updateBio.isPending}
                className="flex items-center gap-1.5 bg-[#1877f2] hover:bg-[#1664d8] text-white text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors duration-150 cursor-pointer disabled:opacity-50"
              >
                {updateBio.isPending && <Loader2 size={14} className="animate-spin" />}
                Save
              </button>
            </div>
          </div>
        </div>
      ) : data?.bio ? (
        <div className="bg-[#242526] rounded-xl px-4 py-4 flex items-start justify-between gap-3">
          <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-line flex-1">{data.bio}</p>
          {isOwnProfile && (
            <button
              onClick={startEditing}
              aria-label="Edit bio"
              className="shrink-0 text-gray-400 hover:text-white p-1.5 hover:bg-[#3a3b3c] rounded-lg transition-colors duration-150 cursor-pointer"
            >
              <Pen size={14} />
            </button>
          )}
        </div>
      ) : isOwnProfile ? (
        <div className="bg-[#242526] rounded-xl px-4 py-4 flex items-center justify-between gap-3">
          <p className="text-sm text-gray-400">Tell people a bit about yourself</p>
          <button
            onClick={startEditing}
            className="shrink-0 flex items-center gap-1.5 bg-[#3a3b3c] hover:bg-[#4e4f50] text-gray-100 text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors duration-150 cursor-pointer"
          >
            <Pen size={14} /> Add bio
          </button>
        </div>
      ) : null}

      {visibleOverview.length > 0 && (
        <div className="bg-[#242526] rounded-xl px-4 py-4 flex flex-col gap-1">
          <h3 className="font-bold text-base text-gray-100 mb-1 px-2">Overview</h3>
          {visibleOverview.map((row) => (
            <AboutRowItem key={row.label} {...row} />
          ))}
        </div>
      )}

      {visibleContact.length > 0 && (
        <div className="bg-[#242526] rounded-xl px-4 py-4 flex flex-col gap-1">
          <h3 className="font-bold text-base text-gray-100 mb-1 px-2">Contact info</h3>
          {visibleContact.map((row) => (
            <AboutRowItem key={row.label} {...row} />
          ))}
        </div>
      )}

      {hasNothing && !isEditingBio && (
        <div className="bg-[#242526] rounded-xl px-4 py-14 flex flex-col items-center text-center gap-1">
          <p className="text-sm text-gray-400">No info to show</p>
        </div>
      )}
    </div>
  );
};

export default AboutPanel;