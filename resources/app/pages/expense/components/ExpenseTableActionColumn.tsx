import React from 'react'
import LugatButton from '@/components/form/LugatButton'
import ConfirmationDialog from '@/components/ConfirmationDialog'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Cell } from '@tanstack/react-table'
import { useModal } from '@/components/modal/useModal'
import { useDeleteExpenseMutation } from '@/services/api/expense-api'
import { ExpenseDataType } from '@/types/expense-types'
import { ConfirmationDialogResponse } from '@/helpers/types'

const ExpenseTableActionColumn: React.FC<{
	cell: Cell<ExpenseDataType, unknown>
	refetch: Function
}> = ({ cell, refetch }) => {
	const navigate = useNavigate()
	const showConfirmDialog = useModal({
		Component: ConfirmationDialog,
		closeOnEsc: true,
		closeOnOverlayClick: true,
		defaultResolved: ConfirmationDialogResponse.NO,
	})
	const [deleteExpense, { isLoading: deleteIsLoading }] = useDeleteExpenseMutation()

	return (
		<>
			<div className={'flex justify-end space-x-1'}>
				<LugatButton
					buttonClassNames={'!w-fit'}
					onClick={() => navigate(`/expense/${cell.row.original.id}/edit`)}
				>
					Edit
				</LugatButton>
				<LugatButton
					buttonClassNames={'!w-fit bg-red-500 hover:bg-red-600'}
					onClick={async () => {
						const confirmResponse = await showConfirmDialog()
						if (confirmResponse === ConfirmationDialogResponse.NO) {
							return
						}
						if (!deleteIsLoading) {
							await toast.promise(deleteExpense(cell.row.original.id), {
								loading: 'Expense deleting...',
								error: 'Expense cannot deleted',
								success: () => {
									refetch()
									return 'Expense Deleted'
								},
							})
						} else {
							toast.error('You must wait before loading...', {
								position: 'top-right',
								duration: 1250,
							})
						}
					}}
				>
					Delete
				</LugatButton>
			</div>
		</>
	)
}

export default ExpenseTableActionColumn
