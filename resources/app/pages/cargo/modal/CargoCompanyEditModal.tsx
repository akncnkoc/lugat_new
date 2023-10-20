import LoaderComponent from '@/components/anims/LoaderComponent'
import Card from '@/components/card'
import LugatButton from '@/components/form/LugatButton'
import LugatInput from '@/components/form/LugatInput'
import { useLazyGetCargoCompanyQuery, useUpdateCargoCompanyMutation } from '@/services/api/cargo-company-api'
import { CargoCompanyFormType, CargoCompanySingleResource } from '@/types/cargo-types'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'

const CargoCompanyEditModal: React.FC<{ setShow?: Function; id: string }> = (props) => {
  const [getCargoCompany, { isFetching }] = useLazyGetCargoCompanyQuery()
  const [updateCargoCompany] = useUpdateCargoCompanyMutation()

  const cargoCompanyUpdateFormik = useFormik<CargoCompanyFormType>({
    initialValues: {
      name: '',
    },
    onSubmit: (values) => {
      toast.promise(updateCargoCompany({ body: values, id: props.id }).unwrap(), {
        loading: 'Loading',
        success: () => {
          props.setShow && props.setShow(false)
          return 'Saved'
        },
        error: 'Error saving variant',
      })
    },
  })

  useEffect(() => {
    ;(async () => {
      const data = (await getCargoCompany(props.id, true).then((res) => res.data)) as unknown as CargoCompanySingleResource
      await cargoCompanyUpdateFormik.setValues({
        name: data.data.name,
      })
    })()
  }, [])
  return (
    <Card className={'w-[400px] !shadow-none'}>
      {isFetching ? (
        <div className={'h-80 w-full flex items-center justify-center'}>
          <LoaderComponent loaderClassName={'after:bg-gray-100'} />
        </div>
      ) : (
        <>
          <Card.Header>
            <div className={'flex items-center justify-between flex-1'}>
              <h3 className={'text-lg block font-semibold'}>Update Cargo Company</h3>
            </div>
          </Card.Header>
          <Card.Body>
            <LugatInput
              label={'Name'}
              placeholder={'Name'}
              value={cargoCompanyUpdateFormik.values.name}
              onChange={(e) => cargoCompanyUpdateFormik.setFieldValue('name', e.target.value)}
            />
          </Card.Body>
          <Card.Footer>
            <LugatButton onClick={cargoCompanyUpdateFormik.submitForm}>Save</LugatButton>
          </Card.Footer>
        </>
      )}
    </Card>
  )
}

export default CargoCompanyEditModal
