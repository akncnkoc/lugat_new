import React from 'react'
import NavigationItem from '@/components/NavigationItem'
import { NavigationItemType } from '@/helpers/types'
import PopoverNavigationItem from '@/components/PopoverNavigationItem'
import { useNavigate } from 'react-router-dom'
import { NavigateOptions } from 'react-router/dist/lib/context'
import PlusCircleIcon from '@/components/icons/PlusCircleIcon'
import VaultIcon from '@/components/icons/VaultIcon'

const VaultMenuPopover: React.FC = () => {
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
			route: '/vault/list',
			icon: (
				<>
					<VaultIcon width={18} height={18} fillColor={'currentColor'} />
				</>
			),
		},
		{
			text: 'Create',
			route: '/vault/create',
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
					<NavigationItem key={item.route} handleNavigate={handleNavigate} item={item} />
				)
			})}
		</div>
	)
}

export default VaultMenuPopover