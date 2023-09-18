import React, { ComponentPropsWithRef, forwardRef } from 'react'
import { motion } from 'framer-motion'

type RabbitSelectProps = {
	error?: string | null | boolean
	label?: React.ReactNode[] | string
	selectClassNames?: string
} & ComponentPropsWithRef<'select'>

const LugatSelect: React.FC<RabbitSelectProps> = forwardRef<HTMLSelectElement, RabbitSelectProps>(
	(props, ref) => {
		const { label, error, selectClassNames, ...inputProps } = props
		return (
			<div>
				<label htmlFor={props.name} className='block mb-2 text-sm font-medium text-white'>
					{props.label}
				</label>
				<select
					ref={ref}
					id={props.name}
					autoComplete={'off'}
					className={`sm:text-sm rounded-lg block w-full p-2.5 outline-none bg-gray-50 text-black ${
						!error
							? `${
									inputProps.disabled && 'cursor-not-allowed'
							  } placeholder-gray-400 ring-blue-500 border-blue-500`
							: ` focus:!ring-red-500 text-red-500 placeholder-red-500 !border-red-500`
					} ${selectClassNames}
					`}
					{...inputProps}
				>
					{props.children}
				</select>
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
LugatSelect.displayName = 'LugatSelect'
export default LugatSelect
