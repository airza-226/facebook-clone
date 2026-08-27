import AuthContainer from '@/layouts/auth/AuthContainer'
import Login from '@/layouts/auth/Login'
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