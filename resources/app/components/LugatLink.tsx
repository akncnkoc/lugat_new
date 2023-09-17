import React from 'react'
import { Link } from 'react-router-dom'

const LugatLink: React.FC<any> = (props) => {
	const { linkClassNames, ...restProps } = props
	return (
		<Link
			className={`text-blue-500 hover:underline hover:underline-offset-2 cursor-pointer  ${linkClassNames}`}
			{...restProps}
		>
			{restProps.children}
		</Link>
	)
}
export default LugatLink
