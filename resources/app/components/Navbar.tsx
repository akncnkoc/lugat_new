import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LugatButton from '@/components/form/LugatButton'
import { storeDispatch } from '@/store'
import { setToken } from '@/store/slices/userSlice'

const Navbar: React.FC = () => {
	const navigate = useNavigate()
	return (
		<nav className='z-50 w-full bg-white h-16 border border-b-gray-200'>
		<div className='px-3 py-3 lg:px-5 lg:pl-3 w-full'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center justify-start'>
					<Link to='/' className='flex justify-center ml-2'>
						<img src='/assets/companylogowatermark.png' className='h-8 mr-3' alt='Rabbit Logo' />
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
	)
}

export default Navbar
