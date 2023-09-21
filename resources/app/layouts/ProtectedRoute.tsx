import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Aside from '@/components/aside'

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
				<div className={'p-4 bg-gray-50 flex-1'}>
					<Outlet />
				</div>
			</div>
		</>
	)
}

export default ProtectedRoute
