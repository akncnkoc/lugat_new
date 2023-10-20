import ConfirmationDialog from '@/components/ConfirmationDialog'
import { LugatTooltip, LugatTooltipContent, LugatTooltipTrigger } from '@/components/LugatTooltip'
import LugatModal from '@/components/modal'
import { useModal } from '@/components/modal/useModal'
import { ConfirmationDialogResponse } from '@/helpers/types'
import { useDeleteCargoCompanyMutation } from '@/services/api/cargo-company-api'
import { CargoCompanyDataType } from '@/types/cargo-types'
import { Cell } from '@tanstack/react-table'
import { clsx } from 'clsx'
import React from 'react'
import toast from 'react-hot-toast'
import { BsPen, BsTrash } from 'react-icons/bs'
import CargoCompanyEditModal from '../modal/CargoCompanyEditModal'

const CargoCompanyTableActionColumn: React.FC<{
  cell: Cell<CargoCompanyDataType, unknown>
  refetch: Function
}> = ({ cell, refetch }) => {
  const showConfirmDialog = useModal({
    Component: ConfirmationDialog,
    closeOnEsc: true,
    closeOnOverlayClick: true,
    defaultResolved: ConfirmationDialogResponse.NO,
  })
  const [deleteCargoCompany, { isLoading: deleteIsLoading }] = useDeleteCargoCompanyMutation()

  const handleDelete = async () => {
    const confirmResponse = await showConfirmDialog()
    if (confirmResponse === ConfirmationDialogResponse.NO) {
      return
    }
    if (!deleteIsLoading) {
      await toast.promise(deleteCargoCompany(cell.row.original.id), {
        loading: 'Cargo Company deleting...',
        error: 'Cargo Company cannot deleted',
        success: () => {
          refetch()
          return 'Cargo Company Deleted'
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
        <LugatModal>
          <LugatModal.Trigger>
            <LugatTooltip placement={'left'}>
              <LugatTooltipTrigger className={clsx('tooltip_base_button', 'bg-blue-500', 'hover:bg-blue-600')}>
                <BsPen />
              </LugatTooltipTrigger>
              <LugatTooltipContent className={'bg-gray-800 text-white py-2 px-4 font-semibold rounded-lg'}>Edit</LugatTooltipContent>
            </LugatTooltip>
          </LugatModal.Trigger>
          <LugatModal.Body>{(setShow) => <CargoCompanyEditModal setShow={setShow} id={cell.row.original.id} />}</LugatModal.Body>
        </LugatModal>

        <LugatTooltip placement={'right'}>
          <LugatTooltipTrigger onClick={handleDelete} className={clsx('tooltip_base_button', 'bg-red-500', 'hover:bg-red-600')}>
            <BsTrash />
          </LugatTooltipTrigger>
          <LugatTooltipContent className={'bg-gray-800 text-white py-2 px-4 font-semibold rounded-lg'}>Delete</LugatTooltipContent>
        </LugatTooltip>
      </div>
    </>
  )
}

export default CargoCompanyTableActionColumn
