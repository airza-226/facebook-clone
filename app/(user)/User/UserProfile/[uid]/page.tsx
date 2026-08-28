interface PageProps {
  params: Promise<{ uid: string }>;
}
import ProfilePageContainer from "@/Components/container/ProfilePageContainer";
import React from "react";

export function generateStaticParams() {
  return [{ uid: 'default' }];
}
const Page = ({ params }: PageProps) => {
  return <ProfilePageContainer params={params} />;
};

export default Page;
