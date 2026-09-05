'use client'

import Image from 'next/image'
import { Camera, Loader2 } from 'lucide-react'
import Profile from '@/public/download (1).jpg'
import { useAuth } from '@/Context/AuthContext'
import SettingsCard from '../ui/SettingsCard'
import { useState, useRef } from 'react'
import { updateUserProfile } from '@/services/User/updateUserProfile'
import { uploadImage } from '@/services/upload/uploadImage'

interface ProfileFormData {
  firstName: string
  lastName: string
  bio: string
}

const ProfilePanel = () => {
  const { userProfile, firebaseUser, refreshProfile } = useAuth()

  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: userProfile?.firstName ?? "",
    lastName: userProfile?.lastName ?? "",
    bio: userProfile?.bio ?? "",
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePickPhoto = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const objectUrl = URL.createObjectURL(file)
      setPreviewImage(objectUrl)
    }
  }

  const handleRemovePhoto = () => {
    setSelectedFile(null)
    setPreviewImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmitted = async () => {
    if (!firebaseUser) return
    setIsSaving(true)
    setSaved(false)
    try {
      let profilePictureUrl = userProfile?.profilePicture || ""
      if (selectedFile) {
        profilePictureUrl = await uploadImage(selectedFile)
      }
      await updateUserProfile({
        uid: firebaseUser.uid,
        firstName: formData.firstName,
        lastName: formData.lastName,
        profilePicture: profilePictureUrl,
      })

      await refreshProfile()
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (error) {
      console.error("Failed to update profile:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section aria-label="Profile settings" className="flex flex-col gap-y-3">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <SettingsCard title="Profile photo">
        <div className="flex items-center gap-4">
          <div 
            onClick={handlePickPhoto}
            className="relative w-20 h-20 shrink-0 group cursor-pointer"
          >
            <Image
              src={previewImage || userProfile?.profilePicture || Profile}
              alt="Profile photo"
              fill
              sizes="80px"
              className="rounded-full object-cover ring-4 ring-black/10 dark:ring-white/10"
            />
            <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
              <Camera size={20} className="text-white" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button 
              type="button"
              onClick={handlePickPhoto}
              className="px-4 py-2 bg-[#1877f2] hover:bg-[#1664d8] active:scale-[0.97] text-white text-[0.875rem] font-semibold rounded-lg transition-all duration-150 cursor-pointer"
            >
              Upload photo
            </button>
            
            {(previewImage || userProfile?.profilePicture) && (
              <button 
                type="button"
                onClick={handleRemovePhoto}
                className="px-4 py-2 bg-transparent hover:bg-black/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 text-[0.875rem] font-medium rounded-lg border border-black/10 dark:border-white/10 transition-all duration-150 cursor-pointer"
              >
                Remove photo
              </button>
            )}
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Display name">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="firstName" className="text-[0.75rem] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              First name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleOnChange}
              className="w-full px-3 py-2.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg text-[0.9375rem] text-gray-900 dark:text-gray-100 outline-none focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2]/20 transition-all duration-150"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="lastName" className="text-[0.75rem] font-semibold text-gray-400 uppercase tracking-wide">
              Last name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleOnChange}
              className="w-full px-3 py-2.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg text-[0.9375rem] text-gray-900 dark:text-gray-100 outline-none focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2]/20 transition-all duration-150"
            />
          </div>
        </div>
      </SettingsCard>

      <div className="flex items-center justify-end gap-3">
        {saved && (
          <span className="text-[0.8125rem] text-green-600 dark:text-green-400 font-medium">
            Saved
          </span>
        )}
        <button
          type="button"
          onClick={onSubmitted}
          disabled={isSaving}
          className="
            flex items-center gap-2
            px-6 py-2.5
            bg-[#1877f2] hover:bg-[#1664d8]
            disabled:bg-black/10 dark:disabled:bg-white/10 disabled:text-gray-400 dark:disabled:text-gray-500
            active:scale-[0.97]
            text-white text-[0.9375rem] font-semibold
            rounded-xl
            shadow-lg shadow-[#1877f2]/20
            transition-all duration-150
            cursor-pointer disabled:cursor-not-allowed
          "
        >
          {isSaving && <Loader2 size={16} className="animate-spin" />}
          {isSaving ? "Saving..." : "Save changes"}
        </button>
      </div>
    </section>
  )
}

export default ProfilePanel