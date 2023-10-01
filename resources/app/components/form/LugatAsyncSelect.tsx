import { AsyncPaginate, withAsyncPaginate, WithAsyncPaginateType } from 'react-select-async-paginate'
import { clsx } from 'clsx'
import React from 'react'
import { motion } from 'framer-motion'
import Select from 'react-select'

const controlStyles = {
	base: 'border rounded-lg bg-white hover:cursor-pointer text-left',
	focus: 'border-gray-200 ring-1 ring-gray-200',
	nonFocus: 'border-gray-100 hover:border-gray-400',
}
const optionStyles = {
	base: 'hover:cursor-pointer px-3 py-2 rounded text-left',
	focus: 'bg-gray-100 active:bg-gray-200',
	selected: "after:content-['✔'] after:ml-2 after:text-green-500 text-gray-500",
}



const LugatAsyncSelect: React.FC<any> = (props) => {
	return (
		<>
			{props.label && (
				<label className={'block mb-2 text-sm font-semibold text-gray-900 text-left'}>
					{props.label}
					{props.required && <span className={'text-[12px] text-red-700'}>*</span>}
				</label>
			)}
			<AsyncPaginate
				hideSelectedOptions={false}
				unstyled
				styles={{
					input: (base) => ({
						...base,
						'input:focus': {
							boxShadow: 'none',
						},
					}),
					// On mobile, the label will truncate automatically, so we want to
					// override that behaviour.
					multiValueLabel: (base) => ({
						...base,
						whiteSpace: 'normal',
						overflow: 'visible',
					}),
					control: (base) => ({
						...base,
						transition: 'none',
					}),
				}}
				classNames={{
					control: ({ isFocused }) =>
						clsx(
							isFocused ? controlStyles.focus : controlStyles.nonFocus,
							controlStyles.base,
							props.error && 'focus:!ring-red-500 text-red-500 placeholder-red-500 !border-red-500',
						),
					placeholder: () => 'text-gray-500 pl-1 py-0.5 text-left',
					input: () => 'pl-1 py-0.5',
					valueContainer: () => 'p-1 gap-1 border-gray-50',
					singleValue: () => 'leading-7 ml-1 ',
					multiValue: () => 'bg-gray-100 rounded items-center py-0.5 pl-2 pr-1 gap-1.5',
					multiValueLabel: () => 'leading-6 py-0.5',
					multiValueRemove: () =>
						'border border-gray-50 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md',
					indicatorsContainer: () => 'p-1 gap-1',
					clearIndicator: () => 'text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800',
					indicatorSeparator: () => 'bg-gray-300',
					dropdownIndicator: () =>
						'p-1 hover:bg-gray-100 text-gray-500 rounded-md hover:text-black',
					menu: () => 'p-1 mt-2 border border-gray-50 bg-white rounded-lg',
					groupHeading: () => 'ml-3 mt-2 mb-1 text-gray-500 text-sm',
					option: ({ isFocused, isSelected }) =>
						clsx(
							isFocused && optionStyles.focus,
							isSelected && optionStyles.selected,
							optionStyles.base,
						),
					noOptionsMessage: () =>
						'text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-50 rounded-sm',
				}}
				{...props}
			/>
			{props.error && (
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='mt-2 text-sm text-red-600'
				>
					{props.error}
				</motion.p>
			)}
		</>
	)
}

export default LugatAsyncSelect
