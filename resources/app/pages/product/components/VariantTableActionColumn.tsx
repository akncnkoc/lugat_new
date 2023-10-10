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
import { LugatTooltip, LugatTooltipContent, LugatTooltipTrigger } from '@/components/LugatTooltip'

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

	const handleDelete = async () => {
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
	}
	return (
		<>
			<div className={'flex justify-end space-x-1'}>
				<LugatTooltip placement={'left'}>
					<LugatTooltipTrigger>
						<LugatButton
							buttonClassNames={'!px-4'}
							onClick={() => navigate(`/product/${cell.row.original.id}/edit`)}
						>
							<BsPen />
						</LugatButton>
					</LugatTooltipTrigger>
					<LugatTooltipContent
						className={'bg-gray-800 text-white py-2 px-4 font-semibold rounded-lg'}
					>
						Edit
					</LugatTooltipContent>
				</LugatTooltip>

				<LugatTooltip placement={'right'}>
					<LugatTooltipTrigger>
						<LugatButton
							buttonClassNames={'!px-4 bg-red-500 hover:bg-red-600'}
							onClick={handleDelete}
						>
							<BsTrash />
						</LugatButton>
					</LugatTooltipTrigger>
					<LugatTooltipContent
						className={'bg-gray-800 text-white py-2 px-4 font-semibold rounded-lg'}
					>
						Delete
					</LugatTooltipContent>
				</LugatTooltip>
			</div>
		</>
	)
}

export default ProductTableActionColumn
