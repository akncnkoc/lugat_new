import React, { Fragment, ReactElement } from 'react'
import { Popover, Transition } from '@headlessui/react'
import NavigationItem from '@/components/NavigationItem'
import { NavigationItemProps } from '@/helpers/types'
import { useFloating } from '@floating-ui/react-dom'
import { clsx } from 'clsx'

type PopoverNavigationItemType = {
	popover: React.ReactElement | React.ReactNode
	isMenuEnabled?: boolean | 0 | null
} & NavigationItemProps
const PopoverNavigationItem: React.FC<PopoverNavigationItemType> = (props) => {
	const { x, y, refs } = useFloating({
		placement: 'right-start',
		strategy: 'absolute',
	})

	return (
		<Popover className={'relative'}>
			{({ open, close }) => (
				<>
					<Popover.Button ref={refs.setReference} className={'w-full focus:outline-0'}>
						<NavigationItem
							handleNavigate={() => {
								props.handleNavigate(props.item.route, props.item.state)
							}}
							isPopover
							item={props.item}
							close={close}
						/>
					</Popover.Button>
					<Transition
						as={Fragment}
						show={open}
						enter='transition duration-100 ease-out'
						enterFrom='transform scale-95 opacity-0'
						enterTo='transform scale-100 opacity-100'
						leave='transition duration-75 ease-out'
						leaveFrom='transform scale-100 opacity-100'
						leaveTo='transform scale-95 opacity-0'
					>
						<Popover.Panel>
							<div
								ref={refs.setFloating}
								className={clsx(
									'w-64',
									'z-[9999999]',
									'max-w-lg',
									'bg-white',
									'divide-y',
									'divide-gray-200',
									'rounded-md',
									'shadow-lg',
									'focus:outline-none',
								)}
								style={{ position: 'fixed', top: y, left: x }}
							>
								{React.cloneElement(props.popover as ReactElement, {
									close,
									isMenuEnabled: props.isMenuEnabled,
								})}
							</div>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	)
}

export default PopoverNavigationItem
