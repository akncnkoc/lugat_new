import React, { ComponentPropsWithRef, forwardRef } from 'react'
import { motion } from 'framer-motion'

type RabbitTextareaProps = {
	error?: string | null | boolean
	label?: React.ReactNode[] | string
	textareaClassnames?: string
	textarea?: boolean
} & ComponentPropsWithRef<'textarea'>

const LugatTextarea: React.FC<RabbitTextareaProps> = forwardRef<
	HTMLTextAreaElement,
	RabbitTextareaProps
>((props, ref) => {
	const { label, error, textareaClassnames, textarea = false, ...inputProps } = props
	return (
		<div>
			<label htmlFor={props.name} className='block mb-2 text-sm font-medium text-white'>
				{label}
			</label>
			<textarea
				ref={ref}
				id={props.name}
				autoComplete={'off'}
				rows={5}
				cols={5}
				className={`sm:text-sm rounded-lg block w-full p-2.5 outline-none bg-gray-800 ${
					!error
						? `${
								inputProps.disabled && 'cursor-not-allowed'
						  } placeholder-gray-400 text-white ring-blue-500 border-blue-500`
						: `focus:!ring-red-500 bg-gray-700 text-red-500 placeholder-red-500 !border-red-500`
				}
					 ${textareaClassnames}
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
})
export default LugatTextarea
