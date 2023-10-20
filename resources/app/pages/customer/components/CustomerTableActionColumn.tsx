import ConfirmationDialog from '@/components/ConfirmationDialog'
import LugatButton from '@/components/form/LugatButton'
import { useModal } from '@/components/modal/useModal'
import { ConfirmationDialogResponse } from '@/helpers/types'
import { useDeleteCustomerMutation } from '@/services/api/customer-api'
import { CustomerDataType } from '@/types/customer-types'
import { Cell } from '@tanstack/react-table'
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const CustomerTableActionColumn: React.FC<{
  cell: Cell<CustomerDataType, unknown>
  refetch: Function
}> = ({ cell, refetch }) => {
  const navigate = useNavigate()
  const showConfirmDialog = useModal({
    Component: ConfirmationDialog,
    closeOnEsc: true,
    closeOnOverlayClick: true,
    defaultResolved: ConfirmationDialogResponse.NO,
  })
  const [deleteCustomer, { isLoading: deleteIsLoading }] = useDeleteCustomerMutation()

  const handleDelete = async () => {
    const confirmResponse = await showConfirmDialog()
    if (confirmResponse === ConfirmationDialogResponse.NO) {
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
  }
  return (
    <>
      <div className={'flex justify-end space-x-1'}>
        <LugatButton onClick={() => navigate(`/customer/${cell.row.original.id}/edit`)}>Edit</LugatButton>
        <LugatButton variant='danger' onClick={handleDelete}>
          Delete
        </LugatButton>
      </div>
    </>
  )
}

export default CustomerTableActionColumn
