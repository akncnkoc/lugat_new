import React, { ComponentPropsWithRef, forwardRef } from 'react'
import { motion } from 'framer-motion'

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
			<div>
				<label htmlFor={props.name} className='block mb-2 text-sm font-semibold text-gray-900 text-left'>
					{label}
					{required && <span className={'text-[12px] text-red-700'}>&nbsp;*</span>}
				</label>
				<input
					value={value ?? ''}
					ref={ref}
					id={props.name}
					autoComplete={'off'}
					className={`rounded-lg block w-full p-2.5 outline-none  border border-gray-100 transition-all ${
						!error
							? `placeholder-gray-400 focus:ring-2 text-gray-900 ring-gray-200 border-blue-500`
							: `focus:!ring-red-500 text-red-500 placeholder-red-500 !border-red-500`
					}
					 ${inputClassnames}
					`}
					{...inputProps}
				/>
				{error && (
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='mt-2 text-sm text-red-600'
					>
						{error}
					</motion.p>
				)}
			</div>
		)
	},
)
export default LugatInput
