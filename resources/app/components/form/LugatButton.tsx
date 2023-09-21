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
				className={`px-6 h-[40px] text-sm font-medium text-center text-white rounded-lg focus:ring-4 w-full bg-blue-500 hover:bg-blue-600 transition-all ${buttonClassNames}`}
				{...buttonProps}
			>
				{buttonProps.children}
			</button>
		)
	},
)
LugatButton.displayName = 'LugatButton'
export default LugatButton
