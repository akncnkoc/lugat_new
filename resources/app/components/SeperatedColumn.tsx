import React from 'react'
import { clsx } from 'clsx'

type SeperatedColumnProps = {
	className?: string
	children?: React.ReactNode | React.ReactNode[]
}

const SeperatedColumn: React.FC<SeperatedColumnProps> = ({ children, className }) => {
	return (
		<div className={clsx('flex-1', 'flex', 'flex-col', 'space-y-4', className)}>{children}</div>
	)
}
export default SeperatedColumn
