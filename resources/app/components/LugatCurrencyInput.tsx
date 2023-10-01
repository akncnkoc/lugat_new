import React, { forwardRef } from 'react'
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field'
import { motion } from 'framer-motion'

type LugatCurrencyInputProps = {
	label?: string
	required?: boolean
	error?: string | false | undefined
	value?: any
} & CurrencyInputProps

const LugatCurrencyInput = forwardRef<typeof CurrencyInput, LugatCurrencyInputProps>(
	(props, ref) => (
		<>
			{props.label && (
				<label className={'block mb-2 text-sm font-semibold text-gray-900 text-left'}>
					{props.label} {props.required && <span className={'text-[12px] text-red-700'}>*</span>}
				</label>
			)}
			<CurrencyInput
				className={`${
					props.error && 'focus:!ring-red-500 text-red-500 placeholder-red-500 !border-red-500'
				} text-sm font-semibold mt-2 rounded-lg block w-full p-2.5 outline-none bg-white border border-gray-100 placeholder-gray-400 text-gray-900`}
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
		</>
	),
)

export default LugatCurrencyInput
