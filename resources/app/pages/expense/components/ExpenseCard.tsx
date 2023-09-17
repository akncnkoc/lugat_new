import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ExpenseDataType } from '@/helpers/types.ts'

const ExpenseCard: React.FC<{ expense: ExpenseDataType }> = ({ expense }) => {
	const navigate = useNavigate()
	return (
		<div
			className='w-full bg-gray-800 text-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:bg-gray-900 transition-all relative'
			onClick={() => navigate('/expense/' + expense.id)}
		>
			{expense.receipt_date && (
				<div
					className={
						'absolute h-[50%] bg-yellow-400/90 text-white transform left-4 w-24 rounded-bl text-xs rounded-br flex items-center origin-center justify-center'
					}
				>
					Ödenmiş
				</div>
			)}
			<div className={'h-16 flex items-end justify-end flex-col p-2'}>
				<div className={'flex-1 flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2'}>{expense.expense_type.name}</div>
				<div className={'flex items-end justify-end'}>
					<span className='text-xs flex items-center justify-center font-medium mr-2 px-2.5 py-0.5 rounded bg-indigo-900 text-white'>
						{expense.amount} {expense.vault.currency.code}
					</span>
					<span className='text-xs flex items-center justify-center font-medium mr-2 px-2.5 py-0.5 rounded bg-indigo-900 text-white'>
						{expense.receipt_date}
					</span>
				</div>
			</div>
		</div>
	)
}

export default ExpenseCard
