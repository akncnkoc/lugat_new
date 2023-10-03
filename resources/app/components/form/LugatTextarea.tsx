import React, { ComponentPropsWithRef, forwardRef } from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import LugatInputLabel from '@/components/form/LugatInputLabel'

type RabbitTextareaProps = {
	error?: string | null | boolean
	label?: React.ReactNode[] | string
	textareaClassnames?: string
	textarea?: boolean
	value?: string | number
} & ComponentPropsWithRef<'textarea'>

const LugatTextarea: React.FC<RabbitTextareaProps> = forwardRef<
	HTMLTextAreaElement,
	RabbitTextareaProps
>((props, ref) => {
	const { label, error, textareaClassnames, value, textarea = false, ...textareProps } = props
	return (
		<div className={'flex-1'}>
			{props.label && <LugatInputLabel label={props.label} required={props.required} />}
			<textarea
				ref={ref}
				id={props.name}
				value={value ?? ''}
				autoComplete={'off'}
				rows={5}
				cols={5}
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
					textareaClassnames,
				)}
				{...textareProps}
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
