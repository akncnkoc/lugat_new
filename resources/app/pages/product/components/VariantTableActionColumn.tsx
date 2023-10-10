import React from 'react'
import LugatButton from '@/components/form/LugatButton'
import ConfirmationDialog from '@/components/ConfirmationDialog'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Cell } from '@tanstack/react-table'
import { useModal } from '@/components/modal/useModal'
import { useDeleteProductMutation } from '@/services/api/product-api'
import { ConfirmationDialogResponse } from '@/helpers/types'
import { VariantDataType } from '@/types/variant-types'
import { BsPen, BsTrash } from 'react-icons/bs'

const ProductTableActionColumn: React.FC<{
	cell: Cell<VariantDataType, unknown>
	refetch: Function
}> = ({ cell, refetch }) => {
	const navigate = useNavigate()
	const showConfirmDialog = useModal({
		Component: ConfirmationDialog,
		closeOnEsc: true,
		closeOnOverlayClick: true,
		defaultResolved: ConfirmationDialogResponse.NO,
	})
	const [deleteProduct, { isLoading: deleteIsLoading }] = useDeleteProductMutation()

	return (
		<>
			<div className={'flex justify-end space-x-1'}>
				<LugatButton
					buttonClassNames={'!px-3'}
					onClick={() => navigate(`/product/${cell.row.original.id}/edit`)}
				>
					<BsPen />
				</LugatButton>
				<LugatButton
					buttonClassNames={'!px-3 bg-red-500 hover:bg-red-600'}
					onClick={async () => {
						const confirmResponse = await showConfirmDialog()
						if (confirmResponse === ConfirmationDialogResponse.NO) {
							return
						}
						if (!deleteIsLoading) {
							await toast.promise(deleteProduct(cell.row.original.id), {
								loading: 'Product deleting...',
								error: 'Product cannot deleted',
								success: () => {
									refetch()
									return 'Product Deleted'
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
					<BsTrash />
				</LugatButton>
			</div>
		</>
	)
}

export default ProductTableActionColumn
