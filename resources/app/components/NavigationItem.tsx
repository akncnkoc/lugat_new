import React from 'react'
import { NavigationItemProps } from '@/helpers/types'
import { storeDispatch } from '@/store'
import { setSidebarClassNames } from '@/store/slices/appSlice'
import { clsx } from 'clsx'

const NavigationItem: React.FC<NavigationItemProps> = ({
	handleNavigate,
	item,
	isPopover,
	close,
	isMenuEnabled,
}) => {
	return (
		<li>
			<div
				onClick={() => {
					if (!isPopover) {
						handleNavigate(item.route, item.state)
						if (isMenuEnabled) {
							storeDispatch(
								setSidebarClassNames(clsx('-translate-x-full', 'absolute', 'z-5000', 'h-full')),
							)
						}
						close && close()
					}
				}}
				className={clsx(
					'flex',
					'items-center',
					'text-sm',
					'rounded-lg',
					'p-2',
					'text-gray-500',
					'hover:bg-blue-200',
					'hover:text-white',
					'group',
					'cursor-pointer',
					'transition-all',
				)}
			>
				<div
					className={clsx(
						'flex',
						'items-center',
						'space-x-2',
						'text-sm',
						'font-semibold',
						'group-hover:text-blue-600',
					)}
				>
					{item.icon}
					<span>{item.text}</span>
				</div>
			</div>
		</li>
	)
}

export default NavigationItem
