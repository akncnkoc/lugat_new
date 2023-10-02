import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import { storeDispatch } from '@/store'
import { setToken } from '@/store/slices/userSlice'

const NavbarMenu: React.FC = () => {
	const navigate = useNavigate()

	return (
		<Menu as={'div'} className={'relative inline-block text-left pr-4'}>
			<div>
				<Menu.Button
					className={'inline-flex w-full justify-center rounded-full ring-4 ring-blue-500'}
				>
					<img
						className='inline-block h-10 w-10 rounded-full'
						src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
						alt=''
					/>
				</Menu.Button>
				<Transition
					as={Fragment}
					enter='transition ease-out duration-100'
					enterFrom='transform opacity-0 scale-95'
					enterTo='transform opacity-100 scale-100'
					leave='transition ease-in duration-75'
					leaveFrom='transform opacity-100 scale-100'
					leaveTo='transform opacity-0 scale-95'
				>
					<Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
						<div className='px-1 py-1 '>
							<Menu.Item>
								{({ active }) => (
									<button
										className={`${
											active ? 'bg-blue-500 text-white' : 'text-gray-900'
										} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
									>
										Profile
									</button>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<button
										className={`${
											active ? 'bg-blue-500 text-white' : 'text-gray-900'
										} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
									>
										Duplicate
									</button>
								)}
							</Menu.Item>
						</div>
						<div className='px-1 py-1'>
							<Menu.Item>
								{({ active }) => (
									<button
										className={`${
											active ? 'bg-blue-500 text-white' : 'text-gray-900'
										} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
									>
										Archive
									</button>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<button
										className={`${
											active ? 'bg-blue-500 text-white' : 'text-gray-900'
										} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
									>
										Move
									</button>
								)}
							</Menu.Item>
						</div>
						<div className='px-1 py-1'>
							<Menu.Item>
								{({ active }) => (
									<button
										onClick={() => {
											storeDispatch(setToken(null))
											navigate('/login')
										}}
										className={`${
											active ? 'bg-red-500 text-white' : 'text-gray-900'
										} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
									>
										Sign Out
									</button>
								)}
							</Menu.Item>
						</div>
					</Menu.Items>
				</Transition>
			</div>
		</Menu>
	)
}

export default NavbarMenu
