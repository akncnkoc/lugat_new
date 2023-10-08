import React from 'react'
import { clsx } from 'clsx'

type SeperatedRowProps = {
	children?: React.ReactNode | React.ReactNode[]
}

const SeperatedRow: React.FC<SeperatedRowProps> = ({ children }) => {
	return (
		<div
			className={clsx(
				'flex-1',
				'flex',
				'flex-col',
				'laptop:flex-row',
				'laptop:space-x-2',
				'laptop:space-y-0',
			)}
		>
			{children}
		</div>
	)
}
export default SeperatedRow
