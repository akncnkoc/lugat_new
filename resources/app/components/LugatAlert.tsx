import React, { ComponentPropsWithoutRef } from 'react'
import WarningLinkBrokeIcon from '@/components/icons/WarningLinkBrokeIcon'
import { clsx } from 'clsx'

type RabbitAlertProps = {
	alertClassNames?: string
} & ComponentPropsWithoutRef<'div'>
const RabbitAlert: React.FC<RabbitAlertProps> = (props) => {
	const { alertClassNames, ...divProps } = props
	return (
		<div
			className={clsx(
				'p-4',
				'text-sm',
				'flex',
				'flex-col',
				'items-center',
				'rounded-lg',
				'bg-green-800',
				'text-green-400',
				'w-full',
				alertClassNames,
			)}
			role='alert'
			{...divProps}
		>
			<WarningLinkBrokeIcon fillColor={'currentColor'} />
			<div className={'text-center'}>{divProps.children}</div>
		</div>
	)
}
export default RabbitAlert
