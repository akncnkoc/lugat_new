import React, { ComponentPropsWithRef, forwardRef } from 'react'

type RabbitButtonProps = {
	buttonClassNames?: string
	loading?: boolean
} & ComponentPropsWithRef<'button'>

const LugatButton: React.FC<RabbitButtonProps> = forwardRef<HTMLButtonElement, RabbitButtonProps>(
	(props, ref) => {
		const { buttonClassNames, loading, ...buttonProps } = props

		return (
			<button
				ref={ref}
				type='submit'
				className={`px-8 h-10 text-sm font-semibold text-center text-white rounded-md w-full bg-blue-500 hover:bg-blue-600 transition-all ${buttonClassNames}`}
				{...buttonProps}
			>
				{buttonProps.children}
			</button>
		)
	},
)
LugatButton.displayName = 'LugatButton'
export default LugatButton
