import lugatAxios from '@/services/lugatAxios.ts'
import { AxiosResponse } from 'axios'
import { ExpenseResource } from '@/helpers/types.ts'

export const lugatExpenseAll = async (page: string): Promise<AxiosResponse<ExpenseResource>> => {
	const url = new URL(window.location.toString())
	url.searchParams.set('page', page.toString())
	return await lugatAxios.get('/v1/expense?' + decodeURIComponent(url.searchParams.toString()))
}

export const rbbtCouponGet = async (couponId: string): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-coupon/' + couponId)
}

export const rbbtCouponExportToExcel = async (): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-coupon/export-to-excel', null, {
		headers: {
			'Content-Disposition': 'attachment; filename=template.xlsx',
			'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		},
		responseType: 'arraybuffer',
	})
}

export const rbbtCouponDelete = async (couponId: string): Promise<any> => {
	return await lugatAxios.delete('/v1/rbbt-coupon/' + couponId)
}

export const rbbtCouponOrders = async (clientId: string, page: string): Promise<any> => {
	const url = new URL(window.location.toString())

	if (page && page != '') {
		url.searchParams.set('page', page.toString())
		window.history.pushState(null, '', url.toString())
	}
	return await lugatAxios.post(
		'/v1/rbbt-coupon/' + clientId + '/orders?' + decodeURIComponent(url.searchParams.toString()),
		{},
	)
}

export const rbbtCouponCreatePreview = async (values: any): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-coupon/create-preview', values)
}

export const rbbtCouponStore = async (values: any): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-coupon/store', values)
}
