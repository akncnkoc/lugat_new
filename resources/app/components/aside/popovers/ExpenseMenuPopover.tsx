import React from 'react'
import NavigationItem from '@/components/NavigationItem'
import { NavigationItemType } from '@/helpers/types'
import PopoverNavigationItem from '@/components/PopoverNavigationItem'
import { useNavigate } from 'react-router-dom'
import { NavigateOptions } from 'react-router/dist/lib/context'
import ExpensesIcon from '@/components/icons/ExpensesIcon'
import PlusCircleIcon from '@/components/icons/PlusCircleIcon'

const ExpenseMenuPopover: React.FC = ({ close, isMenuEnabled }: any) => {
	const navigate = useNavigate()

	const handleNavigate = (route: string, state?: NavigateOptions['state']) => {
		navigate(route, {
			replace: true,
			state: state,
		})
	}

	const navigationItems: NavigationItemType[] = [
		{
			text: 'List',
			route: '/expense/list',
			icon: (
				<>
					<ExpensesIcon width={18} height={18} fillColor={'currentColor'} />
				</>
			),
		},
		{
			text: 'Create',
			route: '/expense/create',
			icon: (
				<>
					<PlusCircleIcon width={18} height={18} fillColor={'currentColor'} />
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
					<NavigationItem
						key={item.route}
						handleNavigate={handleNavigate}
						item={item}
						close={close}
						isMenuEnabled={isMenuEnabled}
					/>
				)
			})}
		</div>
	)
}

export default ExpenseMenuPopover
