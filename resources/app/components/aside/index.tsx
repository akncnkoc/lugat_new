import React from 'react'
import NavigationItem from '@/components/NavigationItem'
import { Link, useNavigate } from 'react-router-dom'
import DashboardIcon from '@/components/icons/DashboardIcon'
import type { NavigationItemType } from '@/helpers/types'
import ProductsIcon from '@/components/icons/ProductsIcon'
import InvoicesIcon from '@/components/icons/InvoicesIcon'
import CustomersIcon from '@/components/icons/CustomersIcon'
import StaffsIcon from '@/components/icons/StaffsIcon'
import ExpensesIcon from '@/components/icons/ExpensesIcon'
import VaultIcon from '@/components/icons/VaultIcon'
import PopoverNavigationItem from '@/components/PopoverNavigationItem'
import ProductMenuPopover from '@/components/aside/popovers/ProductMenuPopover'
import ExpenseMenuPopover from '@/components/aside/popovers/ExpenseMenuPopover'
import VaultMenuPopover from '@/components/aside/popovers/VaultMenuPopover'

const Aside: React.FC = () => {
	const navigate = useNavigate()
	const handleNavigate = (route: string) => {
		navigate(route, {
			replace: true,
		})
	}
	const navigationItems: NavigationItemType[] = [
		{
			text: 'Dashboard',
			route: '/',
			icon: <DashboardIcon fillColor={'currentColor'} />,
		},
		{
			text: 'Product',
			route: '/product',
			icon: <ProductsIcon fillColor={'currentColor'} />,
			isPopover: true,
			popover: <ProductMenuPopover />,
		},
		{
			text: 'Vault',
			route: '/vault',
			icon: <VaultIcon fillColor={'currentColor'} />,
			isPopover: true,
			popover: <VaultMenuPopover />,
		},
		{
			text: 'Invoice',
			route: '/invoice',
			icon: <InvoicesIcon fillColor={'currentColor'} />,
		},
		{
			text: 'Customer',
			route: '/customer',
			icon: <CustomersIcon fillColor={'currentColor'} />,
		},
		{
			text: 'Staff',
			route: '/staff',
			icon: <StaffsIcon fillColor={'currentColor'} />,
		},
		{
			text: 'Expense',
			route: '/expense',
			icon: <ExpensesIcon fillColor={'currentColor'} />,
			isPopover: true,
			popover: <ExpenseMenuPopover />,
		},
	]

	return (
		<aside
			id='logo-sidebar'
			className={`z-40 max-w-[260px] min-w-[260px] flex-1 transition-transform border-r border-gray-200 bg-white`}
			aria-label='Sidebar'
		>
			<div className='h-full flex flex-col'>
				<ul className='space-y-2 flex flex-col font-semibold p-2'>
					{navigationItems.map((item) => {
						return item.isPopover ? (
							<PopoverNavigationItem
								popover={item.popover}
								key={item.route}
								handleNavigate={handleNavigate}
								item={item}
							/>
						) : (
							<NavigationItem key={item.route} handleNavigate={handleNavigate} item={item} />
						)
					})}
				</ul>
				<div className={'flex-1'}></div>
				<div className={'flex items-center justify-center p-2 font-semibold text-base'}>
					Made by&nbsp;
					<Link
						to={'https://akincankoc.com'}
						target={'_blank'}
						className={'font-bold underline underline-offset-2'}
					>
						Akın Can Koç
					</Link>
				</div>
			</div>
		</aside>
	)
}
export default Aside
