import Aside from '@/components/aside'
import Navbar from '@/components/Navbar'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoute: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login')
  }, [])
  return (
    <>
      <Navbar />
      <div className={'flex flex-1'}>
        <Aside />
        <div className={'p-4 flex-1'}>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default ProtectedRoute
