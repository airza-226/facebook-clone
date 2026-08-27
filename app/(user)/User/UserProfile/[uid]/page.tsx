interface PageProps {
  params: Promise<{ uid: string }>;
}
import ProfilePageContainer from "@/Components/container/ProfilePageContainer";
import React from "react";
const Page = ({ params }: PageProps) => {
  
  return <ProfilePageContainer params={params} />;
};

export default Page;
