import React from 'react'

type NavigationItemType = {
	route: string
	text: string
}
type NavigationItemProps = {
	handleNavigate: Function
	item: NavigationItemType
}

const NavigationItem: React.FC<NavigationItemProps> = ({ handleNavigate, item }) => {
	return (
		<li>
			<div
				onClick={() => handleNavigate(item.route)}
				className='flex items-center p-2 text-sm rounded-lg text-white hover:bg-gray-700 cursor-pointer transition-all'
			>
				<span className='ml-3'>{item.text}</span>
			</div>
		</li>
	)
}

export default NavigationItem
