import React from 'react'
import { clsx } from 'clsx'

type SeperatedColumnProps = {
	children?: React.ReactNode | React.ReactNode[]
}

const SeperatedColumn: React.FC<SeperatedColumnProps> = ({ children }) => {
	return <div className={clsx('flex-1', 'flex', 'flex-col', 'space-y-4')}>{children}</div>
}
export default SeperatedColumn
