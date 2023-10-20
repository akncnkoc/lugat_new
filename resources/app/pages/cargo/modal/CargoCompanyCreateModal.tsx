import SeperatedColumn from '@/components/SeperatedColumn'
import Card from '@/components/card'
import LugatButton from '@/components/form/LugatButton'
import LugatInput from '@/components/form/LugatInput'
import { useStoreCargoCompanyMutation } from '@/services/api/cargo-company-api'
import { CargoCompanyFormType } from '@/types/cargo-types'
import { useFormik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'

const CargoCompanyCreateModal: React.FC<{ setShow?: Function }> = (props) => {
  const [storeCargoCompany] = useStoreCargoCompanyMutation()

  const cargoCompanyCreateFormik = useFormik<CargoCompanyFormType>({
    initialValues: {
      name: '',
    },
    onSubmit: (values) => {
      toast.promise(storeCargoCompany(values).unwrap(), {
        loading: 'Loading',
        success: () => {
          props.setShow && props.setShow(false)
          return 'Saved'
        },
        error: 'Error saving cargo company',
      })
    },
  })

  return (
    <Card className={'w-[400px] !shadow-none'}>
      <Card.Header>
        <div className={'flex items-center justify-between flex-1'}>
          <h3 className={'text-lg block font-semibold'}>Create Cargo Company</h3>
        </div>
      </Card.Header>
      <Card.Body>
        <SeperatedColumn>
          <LugatInput
            label={'Name'}
            placeholder={'Name'}
            value={cargoCompanyCreateFormik.values.name}
            onChange={(e) => cargoCompanyCreateFormik.setFieldValue('name', e.target.value)}
          />
        </SeperatedColumn>
      </Card.Body>
      <Card.Footer>
        <LugatButton onClick={cargoCompanyCreateFormik.submitForm}>Save</LugatButton>
      </Card.Footer>
    </Card>
  )
}

export default CargoCompanyCreateModal
