import ConfirmationDialog from '@/components/ConfirmationDialog'
import SeperatedColumn from '@/components/SeperatedColumn'
import LoaderComponent from '@/components/anims/LoaderComponent'
import LugatButton from '@/components/form/LugatButton'
import LugatCurrencyInputWithAsyncSelect from '@/components/form/LugatCurrencyInputWithAsyncSelect'
import LugatInput from '@/components/form/LugatInput'
import SeperatedRow from '@/components/form/SeperatedRow'
import { useModal } from '@/components/modal/useModal'
import { ConfirmationDialogResponse } from '@/helpers/types'
import { useDeleteSubProductMutation } from '@/services/api/sub-product-api'
import { ProductVariantFormType } from '@/types/variant-types'
import { FormikErrors, FormikTouched, getIn } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'
import { BsTrash } from 'react-icons/bs'

type ProductVariantsProps = {
  values: ProductVariantFormType
  touched: FormikTouched<ProductVariantFormType>
  errors: FormikErrors<ProductVariantFormType>
  setFieldValue: Function
  setFieldTouched: Function
  loadCurrencies: Function
}

const StoreableProductVariants: React.FC<ProductVariantsProps> = (props) => {
  const showConfirmDialog = useModal({
    Component: ConfirmationDialog,
    closeOnEsc: true,
    closeOnOverlayClick: true,
    defaultResolved: ConfirmationDialogResponse.NO,
  })

  const [subProductDelete, { isLoading }] = useDeleteSubProductMutation()
  const handleVariantDelete = async (id: string | number | undefined) => {
    if (props.values.data.length === 1) {
      toast.error('You need to at least one variant for product listing')
      return
    }
    const confirmResponse = await showConfirmDialog()
    if (confirmResponse === ConfirmationDialogResponse.NO) {
      return
    } else {
      if (typeof id == 'string') {
        subProductDelete(id)
          .then((_) => {
            toast.success('Variant removed')
            props.setFieldValue(
              'data',
              props.values.data.filter((item) => item.id !== id),
            )
          })
          .catch((_) => toast.error('Something went wrong cannot remove variant try again'))
      } else {
        props.setFieldValue(
          'data',
          props.values.data.filter((_, index) => index !== id),
        )
      }
    }
  }
  if (isLoading) return <LoaderComponent loaderClassName={'after:bg-gray-100'} />
  return props.values.data.map((value, index) => (
    <SeperatedColumn key={index} className={'!flex-nowrap !flex-grow-0 !max-w-full'}>
      <SeperatedRow>
        <LugatInput
          label={'Name'}
          name={'name'}
          inputClassnames={'min-w-[300px]'}
          value={value.name}
          onChange={(e) => {
            props.setFieldValue(`data.${index}.name`, e.target.value)
          }}
        />
        <LugatInput
          label={'SKU'}
          name={'sku'}
          value={value.sku}
          onChange={(e) => {
            props.setFieldValue(`data.${index}.sku`, e.target.value)
          }}
        />
        <LugatInput
          label={'Barcode'}
          value={value.barcode}
          onChange={(e) => {
            props.setFieldValue(`data.${index}.barcode`, e.target.value)
          }}
        />
        <LugatCurrencyInputWithAsyncSelect
          input={{
            label: 'Buy Price',
            required: true,
            error: getIn(props.touched, `data.${index}.buy_price`) && getIn(props.errors, `data.${index}.buy_price`),
            value: props.values.data[index].buy_price,
            onValueChange: (_, __, values) => {
              props.setFieldTouched(`data.${index}.buy_price`, true)
              props.setFieldValue(`data.${index}.buy_price`, values?.value ?? 0)
            },
          }}
          select={{
            error: getIn(props.touched, `data.${index}.buy_currency.value`) && getIn(props.errors, `data.${index}.buy_currency.value`),
            value: props.values.data[index].buy_currency,
            other: {
              additional: {
                page: 1,
              },
              onChange: (value: any) => {
                props.setFieldValue(`data.${index}.buy_currency`, value)
              },
            },
            loadOptions: props.loadCurrencies,
          }}
        />
        <LugatCurrencyInputWithAsyncSelect
          input={{
            label: 'Sell Price',
            required: true,
            error: getIn(props.touched, `data.${index}.sell_price`) && getIn(props.errors, `data.${index}.sell_price`),
            value: props.values.data[index].sell_price,
            onValueChange: (_, __, values) => {
              props.setFieldTouched(`data.${index}.sell_price`, true)
              props.setFieldValue(`data.${index}.sell_price`, values?.value ?? 0)
            },
          }}
          select={{
            error: getIn(props.touched, `data.${index}.sell_currency.value`) && getIn(props.errors, `data.${index}.sell_currency.value`),
            value: props.values.data[index].sell_currency,
            other: {
              additional: {
                page: 1,
              },
              onChange: (value: any) => {
                props.setFieldValue(`data.${index}.sell_currency`, value)
              },
            },
            loadOptions: props.loadCurrencies,
          }}
        />
        <LugatInput
          label={'Stock'}
          value={value.stock}
          onChange={(e) => {
            props.setFieldValue(`data.${index}.stock`, e.target.value)
          }}
        />
        <div className={'h-[60px] flex items-end'}>
          <LugatButton buttonClassNames={'!w-fit !px-4 bg-red-500 hover:bg-red-600'} onClick={() => handleVariantDelete(value.id ?? index)}>
            <BsTrash />
          </LugatButton>
        </div>
      </SeperatedRow>
    </SeperatedColumn>
  ))
}

export default StoreableProductVariants
