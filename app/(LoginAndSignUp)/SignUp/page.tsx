export const dynamic = 'force-static';
import AuthContainer from "@/Components/layouts/auth/AuthContainer";
import SignUp from "@/Components/layouts/auth/SignUp";
import React from "react";
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
