import React from 'react'
import { SvgProps } from '@/helpers/types'

const NextIcon: React.FC<SvgProps> = (props) => {
	const { width = 24, height = 24, fillColor = '#000' } = props
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={'rotate-180'}
		>
			<path
				d='M16.875 10H3.125'
				stroke={fillColor}
				strokeWidth='1.25'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M8.75 4.375L3.125 10L8.75 15.625'
				stroke={fillColor}
				strokeWidth='1.25'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default NextIcon
