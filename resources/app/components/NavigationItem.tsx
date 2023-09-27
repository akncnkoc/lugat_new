import React from 'react'
import { NavigationItemProps } from '@/helpers/types'

const NavigationItem: React.FC<NavigationItemProps> = ({
	handleNavigate,
	item,
	isPopover,
}) => {
	return (
		<li>
			<div
				onClick={() => {
					if (!isPopover) {
						handleNavigate(item.route, item.state)
					}
					close && close()
				}}
				className='flex items-center text-sm rounded-lg p-2 text-gray-500 hover:bg-blue-200 hover:text-white group cursor-pointer transition-all'
			>
				<div
					className={'flex items-center space-x-2 text-sm font-semibold group-hover:text-blue-600'}
				>
					{item.icon}
					<span>{item.text}</span>
				</div>
			</div>
		</li>
	)
}

export default NavigationItem
