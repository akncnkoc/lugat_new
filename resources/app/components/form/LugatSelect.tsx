import React, { ComponentPropsWithRef, forwardRef } from 'react'
import { motion } from 'framer-motion'
import LugatInputLabel from '@/components/form/LugatInputLabel'
import { clsx } from 'clsx'

type RabbitSelectProps = {
	error?: string | null | boolean
	label?: React.ReactNode[] | string
	selectClassNames?: string
} & ComponentPropsWithRef<'select'>

const LugatSelect: React.FC<RabbitSelectProps> = forwardRef<HTMLSelectElement, RabbitSelectProps>(
	(props, ref) => {
		const { label, error, selectClassNames, ...selectProps } = props
		return (
			<div>
				{props.label && <LugatInputLabel label={props.label} required={props.required} />}
				<select
					ref={ref}
					id={props.name}
					autoComplete={'off'}
					className={clsx(
						'text-sm',
						'font-semibold',
						'mt-2',
						'rounded-lg',
						'block',
						'w-full',
						'p-2.5',
						'outline-none',
						'bg-white',
						'border',
						'border-gray-100',
						'placeholder-gray-400',
						'text-gray-900',
						[
							props.error && [
								'focus:!ring-red-500',
								'text-red-500',
								'placeholder-red-500',
								'!border-red-500',
							],
						],
						selectClassNames,
					)}
					{...selectProps}
				>
					{props.children}
				</select>
				{error && (
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='mt-2 text-sm text-red-600 font-semibold'
					>
						{error}
					</motion.p>
				)}
			</div>
		)
	},
)
LugatSelect.displayName = 'LugatSelect'
export default LugatSelect
