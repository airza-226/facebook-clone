import Image from "next/image";
import Link from "next/link";
interface FriendListItemProps {
  name: string;
  photoURL?: string | null;
  uid:string
}
import Profile from '@/public/download (1).jpg'
const FriendListItem = ({ name, photoURL,uid }: FriendListItemProps) => {
  return (
    <Link href={`/User/UserProfile/${uid}`} className="flex flex-col bg-[#242526] border border-[#3a3b3c] rounded-xl overflow-hidden hover:border-[#4e4f50] hover:bg-[#2d2e2f] transition-all duration-200">
      <div className="relative w-full aspect-square bg-[#3a3b3c]">
        <Image src={photoURL || Profile} alt={`${name}'s profile picture`} fill className="object-cover" />
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-[0.875rem] leading-snug text-gray-100 line-clamp-1">{name}</h3>
      </div>
    </Link>
  );
};

export default FriendListItem