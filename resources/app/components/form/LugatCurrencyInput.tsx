import React, { forwardRef } from 'react'
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field'
import { motion } from 'framer-motion'
import LugatInputLabel from '@/components/form/LugatInputLabel'
import { clsx } from 'clsx'

type LugatCurrencyInputProps = {
	label?: React.ReactNode[] | string
	required?: boolean
	error?: string | false | undefined
	value?: any
} & CurrencyInputProps

const LugatCurrencyInput = forwardRef<typeof CurrencyInput, LugatCurrencyInputProps>(
	(props, _) => (
		<div className={'flex-1'}>
			{props.label && <LugatInputLabel label={props.label} required={props.required} />}
			<CurrencyInput
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
				)}
				{...props}
				onChange={() => {}}
			/>
			{props.error && (
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='mt-2 text-sm text-red-600 font-semibold'
				>
					{props.error}
				</motion.p>
			)}
		</div>
	),
)

export default LugatCurrencyInput
