import clsx from 'clsx'
import { motion } from 'framer-motion'
import CurrencyInput from 'react-currency-input-field'
import { CurrencyInputOnChangeValues } from 'react-currency-input-field/dist/components/CurrencyInputProps'
import { CreatableAsyncPaginate, controlStyles, optionStyles } from './LugatAsyncSelect'
import LugatInputLabel from './LugatInputLabel'

type LugatCurrencyInputWithAsyncSelectProps = {
  input: {
    error?: string | null | boolean
    label?: React.ReactNode[] | string
    inputClassnames?: string
    required?: boolean
    value?: string | number
    onValueChange: (value: string | undefined, name?: string, values?: CurrencyInputOnChangeValues) => void
  }
  select: {
    label?: React.ReactNode[] | string
    required?: boolean
    error?: string | null | boolean
    loadOptions: any
    value: any
    other: any
  }
}
const LugatCurrencyInputWithAsyncSelect: React.FC<LugatCurrencyInputWithAsyncSelectProps> = (props) => {
  const { input, select } = props
  return (
    <div className={'flex-1'}>
      {input.label && <LugatInputLabel label={input.label} required={input.required} />}
      <div className='flex'>
        <CurrencyInput
          value={input.value ?? ''}
          autoComplete={'off'}
          onValueChange={input.onValueChange}
          onChange={() => {}}
          className={clsx(
            'text-sm',
            'font-semibold',
            'mt-2',
            'rounded-bl',
            'rounded-tl',
            'border-r-0',
            'block',
            'flex-1',
            'p-2.5',
            'outline-none',
            'bg-white',
            'border',
            'border-gray-100',
            'placeholder-gray-400',
            'text-gray-900',
            [(input.error || select.error) && ['focus:!ring-red-500', 'text-red-500', 'placeholder-red-500', '!border-red-500']],
            input.inputClassnames,
          )}
        />
        <CreatableAsyncPaginate
          loadOptions={select.loadOptions}
          hideSelectedOptions={false}
          menuPortalTarget={document.body}
          unstyled
          value={select.value}
          styles={{
            input: (base) => ({
              ...base,
              'input:focus': {
                boxShadow: 'none',
              },
            }),
            multiValueLabel: (base) => ({
              ...base,
              whiteSpace: 'normal',
              overflow: 'visible',
            }),
            control: (base) => ({
              ...base,
              transition: 'none',
            }),
            menuPortal: (base) => ({ ...base, zIndex: 9999999, width: '8rem' }),
          }}
          classNames={{
            control: () =>
              clsx(
                controlStyles.base + ' w-max mt-2 border-l border-gray-100 rounded-tl-none rounded-bl-none text-right focus:!outline-none',
                (input.error || select.error) && 'focus:!ring-red-500 text-red-500 placeholder-red-500 !border-red-500',
              ),
            placeholder: () => 'text-gray-500 pl-1 py-0.5 text-right',
            input: () => 'pl-1 py-0.5 text-right caret-transparent',
            valueContainer: () => 'p-1 gap-1 border-gray-100',
            singleValue: () => 'leading-7 ml-1',
            multiValue: () => 'bg-gray-100 rounded items-center py-0.5 pl-2 pr-1 gap-1.5',
            multiValueLabel: () => 'leading-6 py-0.5',
            multiValueRemove: () =>
              'border border-gray-50 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md',
            indicatorsContainer: () => 'p-1 gap-1 !border-none',
            clearIndicator: () => 'text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800',
            dropdownIndicator: () => 'p-1 hover:bg-gray-100 text-gray-500 rounded-md hover:text-black',
            menu: () => 'p-1 mt-2 border border-gray-50 bg-white rounded-lg w-32',
            groupHeading: () => 'ml-3 mt-2 mb-1 text-gray-500 text-sm',
            option: ({ isFocused, isSelected }) =>
              clsx(isFocused && optionStyles.focus, isSelected && optionStyles.selected, optionStyles.base),
            noOptionsMessage: () => 'text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-50 rounded-sm',
          }}
          {...select.other}
        />
      </div>
      {(input.error || select.error) && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={clsx('mt-2', 'text-sm', 'text-red-600', 'font-semibold', 'flex', [
            input.error && select.error ? 'justify-between' : select.error ? 'justify-end' : 'justify-start',
          ])}
        >
          {input.error} {select.error && <span className='block justify-self-end'>{select.error}</span>}
        </motion.p>
      )}
    </div>
  )
}

export default LugatCurrencyInputWithAsyncSelect
