import React from 'react'

const LoaderComponent: React.FC<{ children?: React.ReactElement }> = () => {
	return (
		<div className={'flex flex-1 w-full h-full items-center justify-center'}>
			<span className='loader loader-component'></span>
		</div>
	)
}
export default LoaderComponent
