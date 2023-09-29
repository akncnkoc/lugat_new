import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getIn, useFormik } from 'formik'
import { CurrencyResource, Shape } from '@/helpers/types'
import { object, string } from 'yup'
import LugatButton from '@/components/form/LugatButton'
import toast, { LoaderIcon } from 'react-hot-toast'
import LugatAsyncSelect from '@/components/form/LugatAsyncSelect'
import { useStoreVaultMutation } from '@/services/api/vault-api'
import { storeDispatch } from '@/store'
import { currencyApi } from '@/services/api/currency-api'
import LugatInput from '@/components/form/LugatInput'
import { VaultStoreFormType } from '@/types/vault-types'

const VaultCreate: React.FC = () => {
	const navigate = useNavigate()
	const [storeVault, { isLoading }] = useStoreVaultMutation()

	const vaultCreateFormik = useFormik<VaultStoreFormType>({
		initialValues: {
			name: '',
			currency: {
				id: '-1',
				name: 'Select',
			},
		},
		validateOnBlur: false,
		validationSchema: object().shape<Shape<VaultStoreFormType>>({
			name: string().label('Name').required().max(255),
			currency: object()
				.label('Currency')
				.shape({
					id: string().required().notOneOf(['-1'], 'Currency must be selected'),
				}),
		}),
		onSubmit: (values) => {
			storeVault({ ...values, currency_id: values.currency.id })
				.unwrap()
				.then((_) => {
					toast.success('Vault stored')
					vaultCreateFormik.resetForm()
					navigate(-1)
				})
				.catch((_) => {
					toast.error('Vault cant stored')
				})
		},
	})

	const goBack = () => {
		navigate(-1)
	}

	const loadCurrencies = async (search: string, _: any, { page }: any) => {
		const response = (await storeDispatch(
			currencyApi.endpoints?.getCurrencies.initiate({ page, search }),
		).then((res) => res.data)) as CurrencyResource
		const responseJSON = response.data.map((currency) => ({ id: currency.id, name: currency.name }))

		return {
			options: responseJSON,
			hasMore: response.meta.last_page > response.meta.current_page,
			additional: {
				page: page + 1,
			},
		}
	}

	return (
		<div className='relative transform rounded-lg bg-white text-left shadow-2xl shadow-gray-100 transition-all pb-4'>
			<div className={'h-16 px-6 border-b border-gray-100 flex items-center justify-between'}>
				<h3 className={'text-lg font-semibold'}>Create New Vault</h3>
			</div>
			<div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
				<div className='sm:flex sm:items-start'>
					<div className='mt-3 text-center sm:mt-0 sm:text-left w-full'>
						<div className='flex flex-1 grow'>
							<div className='flex flex-col flex-1 space-y-2'>
								<div className={'flex-1 flex flex-col space--2'}>
									<div className={'flex-1'}>
										<LugatInput
											label={'Name'}
											value={vaultCreateFormik.values.name}
											onChange={(e) => vaultCreateFormik.setFieldValue('name', e.target.value)}
											error={vaultCreateFormik.touched.name && vaultCreateFormik.errors.name}
										/>
									</div>
									<div className={'flex-1'}>
										<LugatAsyncSelect
											error={
												getIn(vaultCreateFormik.touched, 'currency.id') &&
												getIn(vaultCreateFormik.errors, 'currency.id')
											}
											value={vaultCreateFormik.values.currency}
											getOptionLabel={(e: any) => e.name}
											getOptionValue={(e: any) => e.id}
											label={'Currency'}
											additional={{
												page: 1,
											}}
											placeholder={'Select'}
											defaultOptions
											loadOptions={loadCurrencies}
											onChange={(value: any) => {
												vaultCreateFormik.setFieldValue('currency', value)
											}}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='bg-white px-4 py-3 sm:flex sm:px-6 justify-between'>
				<LugatButton
					onClick={goBack}
					buttonClassNames={'bg-gray-50 !text-gray-900 hover:!bg-gray-100 !w-fit text-base'}
				>
					Cancel
				</LugatButton>
				<LugatButton buttonClassNames={'!w-fit'} onClick={vaultCreateFormik.submitForm}>
					{!isLoading ? 'Save' : <LoaderIcon />}
				</LugatButton>
			</div>
		</div>
	)
}

export default VaultCreate
