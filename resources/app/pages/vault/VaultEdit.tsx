import React, { useEffect } from 'react'
import { Await, defer, useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { getIn, useFormik } from 'formik'
import LugatButton from '@/components/form/LugatButton'
import toast, { LoaderIcon } from 'react-hot-toast'
import LugatAsyncSelect from '@/components/form/LugatAsyncSelect'
import { storeDispatch } from '@/store'
import LoaderComponent from '@/components/LoaderComponent'
import { TrackedPromise } from '@remix-run/router/utils'
import { useUpdateVaultMutation, vaultApi } from '@/services/api/vault-api'
import LugatInput from '@/components/form/LugatInput'
import { VaultStoreFormType, VaultStoreInitialValues } from '@/types/vault-types'
import { VaultEditValidationSchema } from '@/helpers/schemas'
import useCurrencies from '@/hooks/useCurrencies'

export const vaultLoader = async ({ params }: any) => {
	const results = storeDispatch(vaultApi.endpoints?.getVault.initiate(params.id ?? '')).then(
		(res) => res.data?.data,
	)
	return defer({
		results: results,
	})
}

const VaultEdit: React.FC = () => {
	const navigate = useNavigate()
	const { id } = useParams<'id'>()
	const data = useLoaderData() as {
		results: TrackedPromise
	}
	const { loadCurrencies } = useCurrencies()
	const [updateVault, { isLoading }] = useUpdateVaultMutation()
	const vaultUpdateFormik = useFormik<VaultStoreFormType>({
		initialValues: VaultStoreInitialValues,
		validateOnBlur: false,
		validationSchema: VaultEditValidationSchema,
		onSubmit: (values) => {
			updateVault({ body: { ...values, currency_id: values.currency.id }, id: id ?? '' })
				.unwrap()
				.then((_) => {
					toast.success('Vault updated')
					vaultUpdateFormik.resetForm()
					navigate(-1)
				})
				.catch((_) => {
					toast.error('Vault cant stored')
				})
		},
	})

	useEffect(() => {
		if (data) {
			data.results.then((vault) => {
				vaultUpdateFormik.setValues({
					name: vault.name,
					currency: {
						id: vault.currency.id,
						name: vault.currency.name,
					},
				})
			})
		}
	}, [data])

	return (
		<div className='relative transform rounded-lg bg-white text-left shadow-2xl shadow-gray-100 transition-all pb-4'>
			<React.Suspense
				fallback={
					<div className={'h-96 w-full flex items-center justify-center'}>
						<LoaderComponent loaderClassName={'after:bg-gray-100'} />
					</div>
				}
			>
				<Await resolve={data.results}>
					{() => {
						return (
							<>
								<div
									className={'h-16 px-6 border-b border-gray-100 flex items-center justify-between'}
								>
									<h3 className={'text-lg font-semibold'}>Update Vault</h3>
								</div>
								<div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
									<div className='sm:flex sm:items-start'>
										<div className='mt-3 text-center sm:mt-0 sm:text-left w-full'>
											<div className='flex flex-1 grow'>
												<div className={'flex-1 flex flex-col space--2'}>
													<div className={'flex-1'}>
														<LugatInput
															label={'Name'}
															value={vaultUpdateFormik.values.name}
															onChange={(e) =>
																vaultUpdateFormik.setFieldValue('name', e.target.value)
															}
															error={
																vaultUpdateFormik.touched.name && vaultUpdateFormik.errors.name
															}
														/>
													</div>
													<div className={'flex-1'}>
														<LugatAsyncSelect
															error={
																getIn(vaultUpdateFormik.touched, 'currency.id') &&
																getIn(vaultUpdateFormik.errors, 'currency.id')
															}
															value={vaultUpdateFormik.values.currency}
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
																vaultUpdateFormik.setFieldValue('currency', value)
															}}
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className='bg-white px-4 py-3 sm:flex sm:px-6 justify-end'>
									<LugatButton buttonClassNames={'!w-fit'} onClick={vaultUpdateFormik.submitForm}>
										{!isLoading ? 'Save' : <LoaderIcon />}
									</LugatButton>
								</div>
							</>
						)
					}}
				</Await>
			</React.Suspense>
		</div>
	)
}

export default VaultEdit
