import SeperatedColumn from '@/components/SeperatedColumn'
import LoaderComponent from '@/components/anims/LoaderComponent'
import Card from '@/components/card'
import LugatAsyncSelect from '@/components/form/LugatAsyncSelect'
import LugatButton from '@/components/form/LugatButton'
import LugatInput from '@/components/form/LugatInput'
import SeperatedRow from '@/components/form/SeperatedRow'
import timezones from '@/config/timezones.json'
import { SettingStoreInitialValues, SettingStoreValidationSchema } from '@/helpers/schemas'
import useCurrencies from '@/hooks/useCurrencies'
import { settingApi, useStoreSettingMutation } from '@/services/api/setting-api'
import { storeDispatch } from '@/store'
import { SettingDataType, SettingFormDataType, dateFormats } from '@/types/setting-types'
import { TrackedPromise } from '@remix-run/router/utils'
import { getIn, useFormik } from 'formik'
import React, { useEffect } from 'react'
import toast, { LoaderIcon } from 'react-hot-toast'
import { Await, defer, useLoaderData } from 'react-router-dom'

export const settingLoader = async () => {
  const results = storeDispatch(settingApi.endpoints?.getSettings.initiate({})).then((res) => res.data?.data)
  return defer({
    results: results,
  })
}

const Setting: React.FC = () => {
  const data = useLoaderData() as {
    results: TrackedPromise
  }
  const [storeSetting, { isLoading }] = useStoreSettingMutation()
  const { loadCurrencies } = useCurrencies()

  const settingFormik = useFormik<SettingFormDataType>({
    initialValues: SettingStoreInitialValues,
    validationSchema: SettingStoreValidationSchema,
    onSubmit: (values) => {
      toast.promise(
        storeSetting({
          ...values,
          timezone: values.timezone.value,
          dateFormat: values.dateFormat.value,
          defaultCurrency: values.defaultCurrency.value,
        }).unwrap(),
        {
          loading: 'Loading...',
          success: 'Setting updated',
          error: 'Error while storing update',
        },
      )
    },
  })
  useEffect(() => {
    if (data) {
      data.results.then((res: SettingDataType) => {
        settingFormik.setValues({
          name: res.name,
          defaultCurrency: {
            value: res.defaultCurrency.id,
            label: res.defaultCurrency.name,
          },
          timezone: {
            value: res.timezone,
            label: res.timezone,
          },
          dateFormat: {
            label: res.dateFormat,
            value: res.dateFormat,
          },
          companyWebsite: res.companyWebsite,
          companyVatNumber: res.companyVatNumber,
          companyPostCode: res.companyPostCode,
          companyName: res.companyName,
          companyContactPhoneNumber: res.companyContactPhoneNumber,
          companyContactEmail: res.companyContactEmail,
          companyAddress: res.companyAddress,
        })
      })
    }
  }, [data])
  return (
    <React.Suspense fallback={<LoaderComponent loaderClassName={'after:bg-gray-200'} />}>
      <Await resolve={data.results}>
        <Card>
          <Card.Header>
            <h3 className={'text-lg font-semibold'}>
              Edit Settings{' '}
              <span className={'text-xs'}>
                (<span className={'text-red-700'}> *</span>
                required fields to be filled )
              </span>
            </h3>
          </Card.Header>
          <Card.Body>
            <SeperatedColumn>
              <LugatInput
                label={'Name'}
                required
                error={settingFormik.touched.name && settingFormik.errors.name}
                value={settingFormik.values.name}
                onChange={(e) => {
                  settingFormik.setFieldValue('name', e.target.value)
                }}
              />
              <LugatAsyncSelect
                error={getIn(settingFormik.touched, 'defaultCurrency.value') && getIn(settingFormik.errors, 'defaultCurrency.value')}
                value={settingFormik.values.defaultCurrency}
                label={'Currency'}
                additional={{
                  page: 1,
                }}
                placeholder={'Select'}
                defaultOptions
                loadOptions={loadCurrencies}
                onChange={(value: any) => {
                  settingFormik.setFieldValue('currency', value)
                }}
              />
              <LugatAsyncSelect
                error={getIn(settingFormik.touched, 'timezone.value') && getIn(settingFormik.errors, 'timezone.value')}
                value={settingFormik.values.timezone}
                label={'Timezone'}
                placeholder={'Select'}
                options={timezones.map((timezone) => ({ label: timezone, value: timezone }))}
                onChange={(value: any) => {
                  settingFormik.setFieldValue('timezone', value)
                }}
              />
              <LugatAsyncSelect
                error={getIn(settingFormik.touched, 'dateFormat.value') && getIn(settingFormik.errors, 'dateFormat.value')}
                value={settingFormik.values.dateFormat}
                label={'Date Format'}
                placeholder={'Select'}
                options={dateFormats.map((dateFormat) => ({ label: dateFormat, value: dateFormat }))}
                onChange={(value: any) => {
                  settingFormik.setFieldValue('dateFormat', value)
                }}
              />
              <SeperatedRow>
                <LugatInput
                  value={settingFormik.values.companyName}
                  label={'Company Name'}
                  error={settingFormik.errors.companyName}
                  required
                  onChange={(e) => settingFormik.setFieldValue('companyName', e.target.value)}
                />
                <LugatInput
                  value={settingFormik.values.companyVatNumber}
                  label={'Company Vat Number'}
                  error={settingFormik.errors.companyVatNumber}
                  required
                  onChange={(e) => settingFormik.setFieldValue('companyVatNumber', e.target.value)}
                />
              </SeperatedRow>
              <SeperatedRow>
                <LugatInput
                  value={settingFormik.values.companyAddress}
                  label={'Company Address'}
                  error={settingFormik.errors.companyAddress}
                  required
                  onChange={(e) => settingFormik.setFieldValue('companyAddress', e.target.value)}
                />
                <LugatInput
                  value={settingFormik.values.companyPostCode}
                  label={'Company Post Code'}
                  error={settingFormik.errors.companyPostCode}
                  required
                  onChange={(e) => settingFormik.setFieldValue('companyPostCode', e.target.value)}
                />
              </SeperatedRow>
              <SeperatedRow>
                <LugatInput
                  value={settingFormik.values.companyContactPhoneNumber}
                  label={'Company Contact Phone Number'}
                  error={settingFormik.errors.companyContactPhoneNumber}
                  required
                  onChange={(e) => settingFormik.setFieldValue('companyContactPhoneNumber', e.target.value)}
                />
                <LugatInput
                  value={settingFormik.values.companyContactEmail}
                  label={'Company Contact Email'}
                  error={settingFormik.errors.companyContactEmail}
                  required
                  onChange={(e) => settingFormik.setFieldValue('companyContactEmail', e.target.value)}
                />
                <LugatInput
                  value={settingFormik.values.companyWebsite}
                  label={'Company Website'}
                  error={settingFormik.errors.companyWebsite}
                  required
                  onChange={(e) => settingFormik.setFieldValue('companyWebsite', e.target.value)}
                />
              </SeperatedRow>
            </SeperatedColumn>
          </Card.Body>
          <Card.Footer>
            <LugatButton onClick={settingFormik.submitForm}>{!isLoading ? 'Save' : <LoaderIcon />}</LugatButton>
          </Card.Footer>
        </Card>
      </Await>
    </React.Suspense>
  )
}

export default Setting
