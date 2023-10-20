import { clsx } from 'clsx'
import React, { ComponentPropsWithRef, forwardRef } from 'react'

type ButtonSize = 'small' | 'medium' | 'large'
type ButtonVariant = 'primary' | 'secondary' | 'info' | 'danger'

type RabbitButtonProps = ComponentPropsWithRef<'button'> & {
  buttonClassNames?: string
  loading?: boolean
  className?: string
  size?: ButtonSize
  variant?: ButtonVariant
}

const buttonSizeClasses: Record<ButtonSize, string> = {
  small: 'px-4 h-10',
  medium: 'px-6 h-12',
  large: 'px-8 h-14',
}
const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  secondary: 'bg-indigo-500 text-white hover:bg-indigo-600',
  danger: 'bg-red-500 text-white hover:bg-red-600',
  info: 'bg-warning-500 text-white hover:bg-warning-600',
}

const LugatButton: React.FC<RabbitButtonProps> = forwardRef<HTMLButtonElement, RabbitButtonProps>((props, ref) => {
  const { buttonClassNames, loading, size = 'small', variant = 'primary', className, ...buttonProps } = props

  return (
    <button
      ref={ref}
      type='submit'
      className={clsx('base_button', buttonSizeClasses[size], buttonVariantClasses[variant], buttonClassNames, className)}
      {...buttonProps}
    >
      {buttonProps.children}
    </button>
  )
})
export default LugatButton
