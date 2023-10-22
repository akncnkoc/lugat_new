import clsx from 'clsx'
import { ComponentPropsWithRef } from 'react'

type BadgeSize = 'small' | 'medium' | 'large'
type BadgeVariant = 'primary' | 'secondary' | 'info' | 'danger' | 'success'

const badgeSizeClasses: Record<BadgeSize, string> = {
  small: 'p-2 text-xs',
  medium: 'p-3 text-sm',
  large: 'p-4 text-base',
}
const badgeVariantClasses: Record<BadgeVariant, string> = {
  primary: 'bg-blue-500 text-white',
  secondary: 'bg-indigo-500 text-white',
  danger: 'bg-red-500 text-white',
  info: 'bg-yellow-500 text-white',
  success: 'bg-green-500 text-white',
}

type LugatBadgeProps = ComponentPropsWithRef<'span'> & {
  size?: BadgeSize
  variant?: BadgeVariant
}

const LugatBadge: React.FC<LugatBadgeProps> = ({ variant = 'primary', size = 'small', children, ...rest }) => {
  return (
    <span className={clsx('rounded-md', badgeSizeClasses[size], badgeVariantClasses[variant])} {...rest}>
      {children}
    </span>
  )
}

export default LugatBadge
