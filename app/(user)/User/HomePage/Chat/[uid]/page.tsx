import ChatContainer from '@/Components/Chat/ChatContainer'
import React from 'react'

interface PageProps {
  params: Promise<{ uid: string }>;
}

const page = ({ params }: PageProps) => {
  return <ChatContainer params={params} />;
};

export default page