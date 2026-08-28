import AuthContainer from "@/layouts/auth/AuthContainer";
import SignUp from "@/layouts/auth/SignUp";
import React from "react";
export const dynamic = 'force-static';
const page = () => {
  return (
    <>
      <AuthContainer>
        <SignUp />
      </AuthContainer>
    </>
  );
};

export default page;
