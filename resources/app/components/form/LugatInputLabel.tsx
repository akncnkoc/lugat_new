import { clsx } from 'clsx'
import React from 'react'

type LugatInputLabelProps = {
  label?: React.ReactNode[] | string
  required?: boolean
}

const LugatInputLabel: React.FC<LugatInputLabelProps> = ({ label, required }) => {
  return (
    <label className={clsx('block', 'mb-2', 'text-sm', 'font-semibold', 'text-gray-900', 'text-left')}>
      {label} {required && <span className={clsx('text-[12px]', 'text-red-700')}>*</span>}
    </label>
  )
}

export default LugatInputLabel
