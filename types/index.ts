import { User } from "firebase/auth";

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  authorName: string;
  authorPhoto: string;
  content: string;
  likes: string[];
  createdAt: string | null;
}

export interface UpdateProfileInput {
  uid: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
}

export interface AuthContextType {
  firebaseUser: User | null;
  userProfile: userData | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  imageUrl?: string;
  likes: string[];
  commentsCount: number;
  createdAt: string | null;
}

export interface PostCardProps {
  username?: string;
  userDescription?: string;
  timePosted?: string;
  title?: string;
  subtitle?: string;
  likes?: number;
  comments?: number;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onSave?: () => void;
  onDismiss?: () => void;
}

export type LoginData = {
  email: string;
  password: string;
};

export type Register = {
  firstName: string;
  lastName: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  gender: string;
  email: string;
  password: string;
};

export type userData = {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDay: string;
  gender: string;
  bio:string
  profilePicture: string;
  bannerPhoto: string;
  friends: string[];
  isPending:string[]
  createdAt: any;
};

export interface Message {
  id: string;
  conversationId: string;
  participants: string[];
  senderId: string;
  content: string;
  createdAt: string | null;
}

export interface Conversation {
  id: string;
  participants: string[];
  participantNames: Record<string, string>;
  participantPhotos: Record<string, string>;
  lastMessage: string;
  lastMessageAt: string | null;
}

export interface SendMessageInput {
  senderId: string;
  receiverId: string;
  content: string;
  senderName: string;
  senderPhoto: string;
  receiverName: string;
  receiverPhoto: string;
}

export interface DataRenderProps<T> {
  isLoading:boolean
  data:T[]
  skeleton:React.ReactNode
  emptyText?:string
  renderItem:(item:T,index?:number) => React.ReactNode
}

export interface userDataChat {
  uid:string
  firstName:string
  lastName:string
  profilePicture:string
}

export interface DataChatProps<T> {
  skeleton:React.ReactNode
  renderItem:(item:T,) => React.ReactNode
  isLoading:boolean
  conv:T[]
}

export interface DataMessageRender<T> {
  skeleton:React.ReactNode
  renderItem:(item:T, i?:number) => React.ReactNode
  isLoading:boolean
  data:T[]
}