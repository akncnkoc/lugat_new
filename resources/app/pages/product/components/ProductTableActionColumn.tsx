import React from 'react'
import LugatButton from '@/components/form/LugatButton'
import ConfirmationDialog, { Response } from '@/components/ConfirmationDialog'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Cell } from '@tanstack/react-table'
import { useModal } from '@/components/modal/useModal'
import { useDeleteStaffMutation } from '@/services/api/staff-api'
import { ProductDataType } from '@/types/product-types'

const StaffTableActionColumn: React.FC<{
	cell: Cell<ProductDataType, unknown>
	refetch: Function
}> = ({ cell, refetch }) => {
	const navigate = useNavigate()
	const showConfirmDialog = useModal({
		Component: ConfirmationDialog,
		closeOnEsc: true,
		closeOnOverlayClick: true,
		defaultResolved: Response.NO,
	})
	const [deleteStaff, { isLoading: deleteIsLoading }] = useDeleteStaffMutation()

	return (
		<>
			<div className={'text-right space-x-1'}>
				<LugatButton
					buttonClassNames={'!w-fit'}
					onClick={() => navigate(`/staff/${cell.row.original.id}/edit`)}
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
							await toast.promise(deleteStaff(cell.row.original.id), {
								loading: 'Staff deleting...',
								error: 'Staff cannot deleted',
								success: () => {
									refetch()
									return 'Staff Deleted'
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

export default StaffTableActionColumn
