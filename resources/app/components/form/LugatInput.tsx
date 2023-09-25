import React, { ComponentPropsWithRef, forwardRef } from 'react'
import { motion } from 'framer-motion'

type RabbitInputProps = {
	error?: string | null | boolean
	label?: React.ReactNode[] | string
	inputClassnames?: string
} & ComponentPropsWithRef<'input'>

const LugatInput: React.FC<RabbitInputProps> = forwardRef<HTMLInputElement, RabbitInputProps>(
	(props, ref) => {
		const { label, error, inputClassnames, ...inputProps } = props
		return (
			<div>
				<label htmlFor={props.name} className='block mb-2 text-sm font-medium text-gray-800'>
					{label}
				</label>
				<input
					ref={ref}
					id={props.name}
					autoComplete={'off'}
					className={`rounded-lg block w-full p-2.5 outline-none border border-gray-50 ${
						!error
							? `placeholder-gray-400 text-gray-900 ring-blue-500 border-blue-500`
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
