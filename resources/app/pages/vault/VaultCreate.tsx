import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getIn, useFormik } from 'formik'
import LugatButton from '@/components/form/LugatButton'
import toast, { LoaderIcon } from 'react-hot-toast'
import LugatAsyncSelect from '@/components/form/LugatAsyncSelect'
import { useStoreVaultMutation } from '@/services/api/vault-api'
import LugatInput from '@/components/form/LugatInput'
import { VaultStoreFormType, VaultStoreInitialValues } from '@/types/vault-types'
import { VaultCreateValidationSchema } from '@/helpers/schemas'
import useCurrencies from '@/hooks/useCurrencies'

const VaultCreate: React.FC = () => {
	const navigate = useNavigate()
	const [storeVault, { isLoading }] = useStoreVaultMutation()
	const { loadCurrencies } = useCurrencies()
	const vaultCreateFormik = useFormik<VaultStoreFormType>({
		initialValues: VaultStoreInitialValues,
		validateOnBlur: false,
		validationSchema: VaultCreateValidationSchema,
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

	return (
		<div className='relative transform rounded-lg bg-white text-left shadow-2xl shadow-gray-100 transition-all overflow-hidden tablet:max-w-7xl tablet:mx-auto'>
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
			<div className='bg-white p-4 flex justify-end border-t border-gray-100'>
				<LugatButton onClick={vaultCreateFormik.submitForm}>
					{!isLoading ? 'Save' : <LoaderIcon />}
				</LugatButton>
			</div>
		</div>
	)
}

export default VaultCreate
