import React, { useEffect } from 'react'
import { Await, defer, useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { getIn, useFormik } from 'formik'
import LugatButton from '@/components/form/LugatButton'
import toast, { LoaderIcon } from 'react-hot-toast'
import LugatAsyncSelect from '@/components/form/LugatAsyncSelect'
import { storeDispatch } from '@/store'
import LoaderComponent from '@/components/anims/LoaderComponent'
import { TrackedPromise } from '@remix-run/router/utils'
import { useUpdateVaultMutation, vaultApi } from '@/services/api/vault-api'
import LugatInput from '@/components/form/LugatInput'
import { VaultStoreFormType, VaultStoreInitialValues } from '@/types/vault-types'
import { VaultEditValidationSchema } from '@/helpers/schemas'
import useCurrencies from '@/hooks/useCurrencies'
import Card from '@/components/card'
import SeperatedColumn from '@/components/SeperatedColumn'

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
			updateVault({ body: { ...values, currency_id: values.currency.value }, id: id ?? '' })
				.unwrap()
				.then((_) => {
					toast.success('Vault updated')
					vaultUpdateFormik.resetForm()
					navigate('/vault/list')
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
						value: vault.currency.id,
						label: vault.currency.name,
					},
				})
			})
		}
	}, [data])

	return (
		<Card>
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
								<Card.Header>
									<h3 className={'text-lg font-semibold'}>
										Create New Vault{' '}
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
											value={vaultUpdateFormik.values.name}
											onChange={(e) => vaultUpdateFormik.setFieldValue('name', e.target.value)}
											error={vaultUpdateFormik.touched.name && vaultUpdateFormik.errors.name}
										/>
										<LugatAsyncSelect
											error={
												getIn(vaultUpdateFormik.touched, 'currency.value') &&
												getIn(vaultUpdateFormik.errors, 'currency.value')
											}
											value={vaultUpdateFormik.values.currency}
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
									</SeperatedColumn>
								</Card.Body>
								<Card.Footer>
									<LugatButton onClick={vaultUpdateFormik.submitForm}>
										{!isLoading ? 'Save' : <LoaderIcon />}
									</LugatButton>
								</Card.Footer>
							</>
						)
					}}
				</Await>
			</React.Suspense>
		</Card>
	)
}

export default VaultEdit
