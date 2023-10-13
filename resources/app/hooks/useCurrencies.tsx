import { storeDispatch } from '@/store'
import { currencyApi } from '@/services/api/currency-api'
import { CurrencyResource } from '@/helpers/types'

const useCurrencies = () => {
	const loadCurrencies = async (search: string, _: any, { page }: any) => {
		const response = (await storeDispatch(
			currencyApi.endpoints?.getCurrencies.initiate({ page, search }),
		).then((res) => res.data)) as CurrencyResource
		const responseJSON = response.data.map((currency) => ({
			value: currency.id,
			label: currency.name,
		}))

		return {
			options: responseJSON,
			hasMore: response.meta.last_page > response.meta.current_page,
			additional: {
				page: page + 1,
			},
		}
	}
	const loadCurrenciesWithoutParams = async (search = '', page = '1') => {
		const response = (await storeDispatch(
			currencyApi.endpoints?.getCurrencies.initiate({ page, search }),
		).then((res) => res.data)) as CurrencyResource
		const responseJSON = response.data.map((currency) => ({
			value: currency.id,
			label: currency.name,
		}))

		return {
			options: responseJSON,
			hasMore: response.meta.last_page > response.meta.current_page,
			additional: {
				page: page + 1,
			},
		}
	}
	return { loadCurrencies, loadCurrenciesWithoutParams }
}

export default useCurrencies
