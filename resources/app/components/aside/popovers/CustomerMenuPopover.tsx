import React from 'react'
import NavigationItem from '@/components/NavigationItem'
import { NavigationItemType } from '@/helpers/types'
import PopoverNavigationItem from '@/components/PopoverNavigationItem'
import { useNavigate } from 'react-router-dom'
import { NavigateOptions } from 'react-router/dist/lib/context'
import PlusCircleIcon from '@/components/icons/PlusCircleIcon'
import CustomersIcon from '@/components/icons/CustomersIcon'

const CustomerMenuPopover: React.FC = ({ close, isMenuEnabled }: any) => {
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
			route: '/customer/list',
			icon: (
				<>
					<CustomersIcon width={18} height={18} fillColor={'currentColor'} />
				</>
			),
		},
		{
			text: 'Create',
			route: '/customer/create',
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
						isMenuEnabled={isMenuEnabled}
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

export default CustomerMenuPopover
