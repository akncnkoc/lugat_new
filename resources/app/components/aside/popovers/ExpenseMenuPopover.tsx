import React from 'react'
import NavigationItem from '@/components/NavigationItem'
import { NavigationItemType } from '@/helpers/types'
import PopoverNavigationItem from '@/components/PopoverNavigationItem'
import { useNavigate } from 'react-router-dom'
import ProductsIcon from '@/components/icons/ProductsIcon'
import PlusCircleIcon from '@/components/icons/PlusCircleIcon'

const ExpenseMenuPopover: React.FC = () => {
	const navigate = useNavigate()

	const handleNavigate = (route: string) => {
		navigate(route, {
			replace: true,
		})
	}
	const navigationItems: NavigationItemType[] = [
		{
			text: 'Expense List',
			route: '/expense/list',
			icon: (
				<>
					<ProductsIcon fillColor={'currentColor'} />
				</>
			),
		},
		{
			text: 'Create',
			route: '/expense/create',
			icon: (
				<>
					<PlusCircleIcon fillColor={'currentColor'} />
				</>
			),
		},
	]
	return (
		<div className={'p-2'}>
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
		</div>
	)
}

export default ExpenseMenuPopover
