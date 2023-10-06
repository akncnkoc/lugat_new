import React from 'react'
import { clsx } from 'clsx'

const CardContext = React.createContext<undefined>(undefined)

export type CardHeaderProps = {
	children?: React.ReactNode | React.ReactNode[]
}
const CardHeader: React.FC<CardHeaderProps> = (props) => {
	return (
		<div
			className={clsx(
				'h-16',
				'px-6',
				'border-b',
				'border-gray-100',
				'flex',
				'items-center',
				'justify-between',
			)}
		>
			{props.children}
		</div>
	)
}
export type CardBodyProps = {
	children?: React.ReactNode | React.ReactNode[]
	className?: string
}
const CardBody: React.FC<CardBodyProps> = (props) => {
	return (
		<div className={clsx('bg-white', 'px-4', 'pb-4', 'pt-5', 'sm:p-6', 'sm:pb-4', props.className)}>
			<div className={clsx('flex', 'w-full')}>
				<div className={clsx('flex', 'flex-1', 'grow')}>{props.children}</div>
			</div>
		</div>
	)
}
export type CardFooterProps = {
	children?: React.ReactNode | React.ReactNode[]
}

const CardFooter: React.FC<CardFooterProps> = (props) => {
	return (
		<div
			className={clsx(
				'bg-white',
				'p-4',
				'flex',
				'justify-end',
				'border-t',
				'border-gray-50',
				'rounded-bl-2xl',
				'rounded-br-2xl',
			)}
		>
			{props.children}
		</div>
	)
}

type ICardComposition = {
	Header: React.FC<CardHeaderProps>
	Body: React.FC<CardBodyProps>
	Footer: React.FC<CardFooterProps>
}
const Card: React.FC<{ children: React.ReactNode[] }> & ICardComposition = (props) => {
	return (
		<CardContext.Provider value={undefined}>
			<div
				className={clsx(
					'relative',
					'transform',
					'rounded-lg',
					'bg-white',
					'text-left',
					'shadow-2xl',
					'shadow-gray-100',
					'transition-all',
					'tablet:max-w-7xl',
					'tablet:mx-auto',
				)}
			>
				{props.children}
			</div>
		</CardContext.Provider>
	)
}
Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter
export default Card
