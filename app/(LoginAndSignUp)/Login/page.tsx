export const dynamic = 'force-static';
import AuthContainer from '@/Components/layouts/auth/AuthContainer'
import Login from '@/Components/layouts/auth/Login'
import React from 'react'
const page = () => {
  return (
    <>
    <AuthContainer>
      <Login/>
    </AuthContainer>
    </>
  )
}

export default page