interface PageProps {
  params: Promise<{ uid: string }>;
}
import ProfilePageContainer from "@/Components/container/ProfilePageContainer";
import React from "react";

export function generateStaticParams() {
  return [];
}
const Page = ({ params }: PageProps) => {
  return <ProfilePageContainer params={params} />;
};

export default Page;
