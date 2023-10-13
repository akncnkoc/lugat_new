import React, { useEffect } from 'react'
import { storeDispatch } from '@/store'
import { Await, defer, useLoaderData } from 'react-router-dom'
import { settingApi, useStoreSettingMutation } from '@/services/api/setting-api'
import LoaderComponent from '@/components/anims/LoaderComponent'
import { TrackedPromise } from '@remix-run/router/utils'
import { useFormik } from 'formik'
import { SettingDataType } from '@/types/setting-types'
import Card from '@/components/card'
import SeperatedColumn from '@/components/SeperatedColumn'
import LugatButton from '@/components/form/LugatButton'
import toast, { LoaderIcon } from 'react-hot-toast'
import LugatInput from '@/components/form/LugatInput'

export const settingLoader = async () => {
	const results = storeDispatch(settingApi.endpoints?.getSettings.initiate({})).then(
		(res) => res.data?.data,
	)
	return defer({
		results: results,
	})
}

const Setting: React.FC = () => {
	const data = useLoaderData() as {
		results: TrackedPromise
	}
	const [storeSetting, {isLoading}] = useStoreSettingMutation()
	const settingFormik = useFormik<SettingDataType>({
		initialValues: {
			name: '',
			timezone: '',
			defaultCurrency: '',
			dateFormat: '',
			companyVatNumber: '',
			companyPostCode: '',
			companyName: '',
			companyContactPhoneNumber: '',
			companyAddress: '',
			companyContactEmail: '',
			companyWebsite: '',
		},
		onSubmit: (values) => {
			toast.promise(storeSetting(values), {
				loading: 'Loading...',
				success: 'Setting updated',
				error: 'Error while storing update',
			})
		},
	})
	useEffect(() => {
		if (data) {
			data.results.then((res: SettingDataType) => {
				console.log(res)
				settingFormik.setValues({
					name: res.name,
					defaultCurrency: res.defaultCurrency,
					timezone: res.timezone,
					dateFormat: res.dateFormat,
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
						</SeperatedColumn>
					</Card.Body>
					<Card.Footer>
						<LugatButton onClick={settingFormik.submitForm}>
							{!isLoading ? 'Save' : <LoaderIcon />}
						</LugatButton>
					</Card.Footer>
				</Card>
			</Await>
		</React.Suspense>
	)
}

export default Setting
