import React from 'react'
import LugatButton from '@/components/form/LugatButton'
import ConfirmationDialog, { Response } from '@/components/ConfirmationDialog'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Cell } from '@tanstack/react-table'
import { useModal } from '@/components/modal/useModal'
import { CustomerDataType } from '@/types/customer'
import { useDeleteCustomerMutation } from '@/services/api/customer-api'

const CustomerTableActionColumn: React.FC<{
	cell: Cell<CustomerDataType, unknown>
	refetch: Function
}> = ({ cell, refetch }) => {
	const navigate = useNavigate()
	const showConfirmDialog = useModal({
		Component: ConfirmationDialog,
		closeOnEsc: true,
		closeOnOverlayClick: true,
		defaultResolved: Response.NO,
	})
	const [deleteCustomer, { isLoading: deleteIsLoading }] = useDeleteCustomerMutation()

	return (
		<>
			<div className={'text-right space-x-1'}>
				<LugatButton
					buttonClassNames={'!w-fit'}
					onClick={() => navigate(`/customer/${cell.row.original.id}/edit`)}
				>
					Edit
				</LugatButton>
				<LugatButton
					buttonClassNames={'!w-fit bg-red-500 hover:bg-red-600'}
					onClick={async () => {
						const confirmResponse = await showConfirmDialog()
						if (confirmResponse === Response.NO) {
							return
						}
						if (!deleteIsLoading) {
							await toast.promise(deleteCustomer(cell.row.original.id), {
								loading: 'Customer deleting...',
								error: 'Customer cannot deleted',
								success: () => {
									refetch()
									return 'Customer Deleted'
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

export default CustomerTableActionColumn
