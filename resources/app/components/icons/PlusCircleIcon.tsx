import React from 'react'
import { SvgProps } from '@/helpers/types'

const CustomersIcon: React.FC<SvgProps> = (props) => {
	const { width = 24, height = 24, fillColor = '#000' } = props
	return (
		<svg viewBox='0 0 24 24' width={width} height={height} fill='none' xmlns='http://www.w3.org/2000/svg'>
			<g>
				<path
					id='Vector'
					d='M8 12H12M12 12H16M12 12V16M12 12V8M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z'
					stroke={fillColor}
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				></path>
			</g>
		</svg>
	)
}

export default CustomersIcon
