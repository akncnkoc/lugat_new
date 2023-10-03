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
import Card from '@/components/card'
import SeperatedColumn from '@/components/SeperatedColumn'

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
					navigate('/vault/list')
				})
				.catch((_) => {
					toast.error('Vault cant stored')
				})
		},
	})

	return (
		<Card>
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
						value={vaultCreateFormik.values.name}
						onChange={(e) => vaultCreateFormik.setFieldValue('name', e.target.value)}
						error={vaultCreateFormik.touched.name && vaultCreateFormik.errors.name}
					/>
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
				</SeperatedColumn>
			</Card.Body>
			<Card.Footer>
				<LugatButton onClick={vaultCreateFormik.submitForm}>
					{!isLoading ? 'Save' : <LoaderIcon />}
				</LugatButton>
			</Card.Footer>
		</Card>
	)
}

export default VaultCreate
