import React, { ComponentPropsWithRef, forwardRef } from 'react'

type RabbitButtonProps = {
	buttonClassNames?: string
} & ComponentPropsWithRef<'button'>

const LugatButton: React.FC<RabbitButtonProps> = forwardRef<HTMLButtonElement, RabbitButtonProps>(
	(props, ref) => {
		const { buttonClassNames, ...buttonProps } = props
		return (
			<button
				ref={ref}
				type='submit'
				className={`px-3 py-1.5 text-xs font-medium text-center text-white rounded-lg focus:ring-4 w-full bg-blue-600 hover:bg-blue-700 ring-blue-800 transition-all ${buttonClassNames}`}
				{...buttonProps}
			>
				{buttonProps.children}
			</button>
		)
	},
)
LugatButton.displayName = 'LugatButton'
export default LugatButton
