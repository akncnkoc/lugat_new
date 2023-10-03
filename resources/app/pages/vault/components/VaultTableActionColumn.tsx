import React from 'react'
import LugatButton from '@/components/form/LugatButton'
import ConfirmationDialog from '@/components/ConfirmationDialog'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Cell } from '@tanstack/react-table'
import { useModal } from '@/components/modal/useModal'
import { useDeleteVaultMutation } from '@/services/api/vault-api'
import { VaultDataType } from '@/types/vault-types'
import { ConfirmationDialogResponse } from '@/helpers/types'

const VaultTableActionColumn: React.FC<{
	cell: Cell<VaultDataType, unknown>
	refetch: Function
}> = ({ cell, refetch }) => {
	const navigate = useNavigate()
	const showConfirmDialog = useModal({
		Component: ConfirmationDialog,
		closeOnEsc: true,
		closeOnOverlayClick: true,
		defaultResolved: ConfirmationDialogResponse.NO,
	})
	const [deleteVault, { isLoading: deleteIsLoading }] = useDeleteVaultMutation()

	return (
		<>
			<div className={'flex justify-end space-x-1'}>
				<LugatButton
					buttonClassNames={'!w-fit'}
					onClick={() => navigate(`/vault/${cell.row.original.id}/edit`)}
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
							await toast.promise(deleteVault(cell.row.original.id), {
								loading: 'Vault deleting...',
								error: 'Vault cannot deleted',
								success: () => {
									refetch()
									return 'Vault Deleted'
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

export default VaultTableActionColumn
