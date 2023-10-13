import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import { BiFlag } from 'react-icons/bi'
import { useAppSelector } from '@/store/hooks'

const CurrencyMenu: React.FC = () => {
	const currencySelector = useAppSelector((state) => state.currencySlice)
	return (
		<Menu as={'div'} className={clsx('relative', 'inline-block', 'text-left', 'pr-4')}>
			<Menu.Button className={clsx('inline-flex', 'w-full', 'justify-center', 'rounded-full')}>
				<div className={'flex space-x-2 items-center'}>
					<BiFlag />
					<span className={'block'}>Default Currency</span>
				</div>
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
				<Menu.Items className={'menu-items'}>
					{currencySelector.currencies.map((currency, index) => (
						<div className='px-1 py-1' key={index}>
							<Menu.Item>
								{({ active }) => (
									<button
										className={clsx(
											'menu-item',
											'group',
											active ? ['bg-green-500', 'text-white'] : 'text-gray-900',
										)}
									>
										{currency.name}
									</button>
								)}
							</Menu.Item>
						</div>
					))}
				</Menu.Items>
			</Transition>
		</Menu>
	)
}

export default CurrencyMenu
