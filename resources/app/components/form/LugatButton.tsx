import React, { ComponentPropsWithRef, forwardRef } from 'react'
import { clsx } from 'clsx'

type RabbitButtonProps = {
	buttonClassNames?: string
	loading?: boolean
	className?: string
} & ComponentPropsWithRef<'button'>

const LugatButton: React.FC<RabbitButtonProps> = forwardRef<HTMLButtonElement, RabbitButtonProps>(
	(props, ref) => {
		const { buttonClassNames, loading, className, ...buttonProps } = props

		return (
			<button
				ref={ref}
				type='submit'
				className={clsx(
					'px-8',
					'h-10',
					'text-sm',
					'font-semibold',
					'text-center',
					'text-white',
					'rounded-md',
					'w-fit',
					'bg-blue-500',
					'text-center',
					'flex',
					'items-center',
					'justify-center',
					'hover:bg-blue-600',
					'transition-all',
					buttonClassNames,
					className
				)}
				{...buttonProps}
			>
				{buttonProps.children}
			</button>
		)
	},
)
export default LugatButton
