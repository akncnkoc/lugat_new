import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { storeDispatch } from '@/store'
import { setToken } from '@/store/slices/userSlice' // import {useAppSelector} from '@/store/hooks';
import { history } from '@/helpers'
import LugatButton from '@/components/form/LugatButton.tsx'
import NavigationItem from '@/components/NavigationItem.tsx'
import NavigationItems from '@/static/data/navigationItems.json'

const ProtectedRoute: React.FC = () => {
	const navigate = useNavigate()
	history.navigate = useNavigate()
	// const breadcumbSelector = useAppSelector((state) => state.breadcumbSlice);
	useEffect(() => {
		if (!localStorage.getItem('token')) navigate('/login');
	}, [])
	const handleNavigate = (route: string) => {
		navigate(route, {
			replace: true,
		})
	}

	return (
		<>
			<nav className='fixed top-0 z-50 w-full bg-gray-800'>
				<div className='px-3 py-3 lg:px-5 lg:pl-3'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center justify-start'>
							<Link to='/' className='flex justify-center ml-2'>
								<img
									src='/assets/companylogowatermark.png'
									className='h-8 mr-3'
									alt='Rabbit Logo'
								/>
							</Link>
						</div>
						<div className='flex items-center'>
							<div className='flex items-center ml-3'>
								<LugatButton
									onClick={() => {
										storeDispatch(setToken(null))
										navigate('/login')
									}}
								>
									Çıkış Yap
								</LugatButton>
							</div>
						</div>
					</div>
				</div>
			</nav>
			<aside
				id='logo-sidebar'
				className={`fixed top-0 left-0 z-40 w-52 h-screen pt-20 transition-transform -translate-x-full border-r border-gray-700 sm:translate-x-0 bg-gray-800`}
				aria-label='Sidebar'
			>
				<div className='h-full px-3 pb-4 overflow-y-auto bg-gray-800'>
					<ul className='space-y-2 font-medium'>
						{NavigationItems.map((item) => (
							<NavigationItem key={item.route} handleNavigate={handleNavigate} item={item} />
						))}
					</ul>
				</div>
			</aside>
			<div className='sm:ml-52'>
				<div className={'p-4'}>
					<Outlet />
				</div>
			</div>
		</>
	)
}

export default ProtectedRoute
