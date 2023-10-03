import React from 'react'
import { clsx } from 'clsx'

const LoaderComponent: React.FC<{
	children?: React.ReactElement
	loaderClassName?: string
}> = ({ loaderClassName }) => {
	return (
		<div className={clsx('flex', 'flex-1', 'w-full', 'h-full', 'items-center', 'justify-center')}>
			<span className={clsx('loader', 'loader-component', loaderClassName)}></span>
		</div>
	)
}
export default LoaderComponent
