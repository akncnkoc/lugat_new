import React, { ComponentPropsWithRef, forwardRef } from 'react'
import { motion } from 'framer-motion'
import LugatInputLabel from '@/components/form/LugatInputLabel'
import { clsx } from 'clsx'

type RabbitInputProps = {
	error?: string | null | boolean
	label?: React.ReactNode[] | string
	inputClassnames?: string
	required?: boolean
	value?: string | number
} & ComponentPropsWithRef<'input'>

const LugatInput: React.FC<RabbitInputProps> = forwardRef<HTMLInputElement, RabbitInputProps>(
	(props, ref) => {
		const { label, error, inputClassnames, value, required, ...inputProps } = props
		return (
			<div className={'flex-1'}>
				{props.label && <LugatInputLabel label={props.label} required={props.required} />}
				<input
					value={value ?? ''}
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
						inputClassnames,
					)}
					{...inputProps}
				/>
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
export default LugatInput
