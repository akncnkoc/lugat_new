import ConfirmationDialog from '@/components/ConfirmationDialog'
import LugatButton from '@/components/form/LugatButton'
import { useModal } from '@/components/modal/useModal'
import { ConfirmationDialogResponse } from '@/helpers/types'
import { useDeleteCargoMutation } from '@/services/api/cargo-api'
import { CargoDataType } from '@/types/cargo-types'
import { Cell } from '@tanstack/react-table'
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const CargoTableActionColumn: React.FC<{
  cell: Cell<CargoDataType, unknown>
  refetch: Function
}> = ({ cell, refetch }) => {
  const navigate = useNavigate()
  const showConfirmDialog = useModal({
    Component: ConfirmationDialog,
    closeOnEsc: true,
    closeOnOverlayClick: true,
    defaultResolved: ConfirmationDialogResponse.NO,
  })
  const [deleteStaff, { isLoading: deleteIsLoading }] = useDeleteCargoMutation()

  const handleDelete = async () => {
    const confirmResponse = await showConfirmDialog()
    if (confirmResponse === ConfirmationDialogResponse.NO) {
      return
    }
    if (!deleteIsLoading) {
      await toast.promise(deleteStaff(cell.row.original.id), {
        loading: 'Cargo deleting...',
        error: 'Cargo cannot deleted',
        success: () => {
          refetch()
          return 'Cargo Deleted'
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
        <LugatButton onClick={() => navigate(`/cargo/${cell.row.original.id}/edit`)}>Edit</LugatButton>
        <LugatButton variant='danger' onClick={handleDelete}>
          Delete
        </LugatButton>
      </div>
    </>
  )
}

export default CargoTableActionColumn
