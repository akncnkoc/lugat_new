import ConfirmationDialog from '@/components/ConfirmationDialog'
import LugatButton from '@/components/form/LugatButton'
import { useModal } from '@/components/modal/useModal'
import { ConfirmationDialogResponse } from '@/helpers/types'
import { useDeleteExpenseMutation } from '@/services/api/expense-api'
import { ExpenseDataType } from '@/types/expense-types'
import { Cell } from '@tanstack/react-table'
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

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

  const handleDelete = async () => {
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
  }
  return (
    <>
      <div className={'flex justify-end space-x-1'}>
        <LugatButton onClick={() => navigate(`/expense/${cell.row.original.id}/edit`)}>Edit</LugatButton>
        <LugatButton variant='danger' onClick={handleDelete}>
          Delete
        </LugatButton>
      </div>
    </>
  )
}

export default ExpenseTableActionColumn
