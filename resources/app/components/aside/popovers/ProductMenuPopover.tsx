import React from 'react'
import NavigationItem from '@/components/NavigationItem'
import { NavigationItemType } from '@/helpers/types'
import PopoverNavigationItem from '@/components/PopoverNavigationItem'
import { useNavigate } from 'react-router-dom'
import ProductsIcon from '@/components/icons/ProductsIcon'
import PlusCircleIcon from '@/components/icons/PlusCircleIcon'

const ProductMenuPopover: React.FC = ({ close, isMenuEnabled }: any) => {
	const navigate = useNavigate()

	const handleNavigate = (route: string) => {
		navigate(route, {
			replace: true,
		})
	}
	const navigationItems: NavigationItemType[] = [
		{
			text: 'Product List',
			route: '/product/list',
			icon: (
				<>
					<ProductsIcon fillColor={'currentColor'} />
				</>
			),
		},
		{
			text: 'Create',
			route: '/product/create',
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

export default ProductMenuPopover
