import React from 'react'
import { Await, useLoaderData } from 'react-router-dom'

const LoaderComponent: React.FC<{ children: React.ReactElement }> = (props) => {
	const data = useLoaderData() as any
	return (
		<React.Suspense fallback={<p>loading... should not see me!</p>}>
			<Await resolve={data.data}>{React.cloneElement(props.children, { data })}</Await>
		</React.Suspense>
	)
}
export default LoaderComponent
