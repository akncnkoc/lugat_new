import React from 'react'
import { clsx } from 'clsx'

type LugatToggleProps = {
	selected?: boolean
	onChange?: (value: boolean) => void
	prefix?: React.ReactNode | React.ReactNode[]
	suffix?: React.ReactNode | React.ReactNode[]
}

const LugatToggle: React.FC<LugatToggleProps> = ({ selected, onChange, prefix, suffix }) => {
	const handleToggle = () => {
		onChange && onChange(!selected)
	}
	return (
		<div className={clsx('flex','items-center', 'select-none')} onClick={() => handleToggle()}>
			{prefix && prefix}
			<div
				className={clsx(
					'w-14',
					'h-7',
					'flex',
					'items-center',
					'bg-gray-300',
					'rounded-full',
					[suffix && 'mr-2'],
					[prefix && 'ml-2'],
					'px-1',
					'cursor-pointer',
					[selected && 'bg-blue-700'],
				)}
			>
				<div
					className={clsx(
						'bg-white',
						'w-5',
						'h-5',
						'rounded-full',
						'shadow-md',
						'transform',
						'transition-transform',
						[selected && 'translate-x-7'],
					)}
				/>
			</div>
			{suffix && suffix}
		</div>
	)
}

export default LugatToggle
