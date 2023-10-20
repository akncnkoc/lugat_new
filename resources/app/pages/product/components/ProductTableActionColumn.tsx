import ConfirmationDialog from '@/components/ConfirmationDialog'
import LugatButton from '@/components/form/LugatButton'
import { useModal } from '@/components/modal/useModal'
import { ConfirmationDialogResponse } from '@/helpers/types'
import { useDeleteProductMutation } from '@/services/api/product-api'
import { ProductDataType } from '@/types/product-types'
import { Cell } from '@tanstack/react-table'
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const ProductTableActionColumn: React.FC<{
  cell: Cell<ProductDataType, unknown>
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
        <LugatButton onClick={() => navigate(`/product/${cell.row.original.id}/edit`)}>Edit</LugatButton>
        <LugatButton variant='danger' onClick={handleDelete}>
          Delete
        </LugatButton>
      </div>
    </>
  )
}

export default ProductTableActionColumn
