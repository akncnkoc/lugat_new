import React, { useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { storeDispatch } from '@/store'
import { setSidebarClassNames } from '@/store/slices/appSlice'
import { useToggle, useWindowSize } from '@uidotdev/usehooks'
import { RxHamburgerMenu } from 'react-icons/rx'
import NavbarMenu from '@/components/NavbarMenu'

const Navbar: React.FC = () => {
	const windowSize = useWindowSize()
	const [toggled, toggle] = useToggle(false)

	const isMenuEnabled = useMemo(
		() => windowSize.width && windowSize.width < 1024,
		[windowSize.width],
	)
	useEffect(() => {
		if (isMenuEnabled) {
			storeDispatch(setSidebarClassNames('-translate-x-full absolute z-5000 h-full'))
			toggle(false)
		} else {
			storeDispatch(setSidebarClassNames(''))
			toggle(true)
		}
	}, [isMenuEnabled])

	const handleAsideVisibility = () => {
		if (toggled) {
			storeDispatch(setSidebarClassNames('-translate-x-full absolute z-5000 h-full'))
			toggle(false)
		} else {
			storeDispatch(setSidebarClassNames('absolute left-0 flex-1 h-[-webkit-fill-available]'))
			toggle(true)
		}
	}
	return (
		<nav className='z-50 w-full bg-white h-16 border border-b-gray-200'>
			<div className='w-full h-16'>
				<div className='flex items-center justify-between h-16'>
					<div className='flex items-center justify-between flex-1'>
						{isMenuEnabled && (
							<div onClick={handleAsideVisibility}>
								<RxHamburgerMenu size={24} />
							</div>
						)}
						<div
							className={`${isMenuEnabled ? 'flex-1 flex justify-center transition-all' : 'w-72'}`}
						>
							<Link to='/' className='flex justify-center'>
								<img src='/assets/logo.svg' className='h-12' alt='Lügat Logo' />
							</Link>
						</div>
					</div>
					<div className='flex items-center pr-2'>
						<div className='flex items-center'>
							<NavbarMenu />
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
