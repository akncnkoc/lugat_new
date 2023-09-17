import lugatAxios from '@/services/lugatAxios.ts';

export const rbbtOrderAll = async (page: string, search: any): Promise<any> => {
	const url = new URL(window.location.toString());

	if (localStorage.getItem('current_page')) {
		url.searchParams.set('page', page.toString());
		window.history.pushState(null, '', url.toString());
	} else if (page && page != '') {
		url.searchParams.set('page', page.toString());
		window.history.pushState(null, '', url.toString());
	}
	localStorage.setItem('current_page', page);
	return await lugatAxios.post(
		'/v1/rbbt-order?' + decodeURIComponent(url.searchParams.toString()),
		{
			search: search.searchText,
			status: search.status,
			vehicle_type: search.vehicle_type,
			date_value: search.date_value,
			location: search.location
		}
	);
};

export const rbbtOrderGet = async (orderId: string): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-order/' + orderId);
};

export const rbbtOrderCourierAssignment = async (
	orderId: string,
	courierId: string,
	isForced: boolean
): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-order/' + orderId + '/assignment/' + courierId, {
		isForced
	});
};

export const rbbtOrderSuspend = async (orderId: string): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-order/' + orderId + '/suspend');
};
export const rbbtOrderUnSuspend = async (orderId: string): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-order/' + orderId + '/unsuspend');
};

export const rbbtOrderApprove = async (orderId: string): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-order/' + orderId + '/approve');
};

export const rbbtOrderDepartureUpdate = async (orderId: string, values: any): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-order/' + orderId + '/departure-update', values);
};

export const rbbtOrderDestinationUpdate = async (orderId: string, values: any): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-order/' + orderId + '/destination-update', values);
};

export const rbbtOrderImageGet = async (
	userId: string,
	orderId: string,
	fileName: string
): Promise<any> => {
	return await lugatAxios.get(`/v1/storage/orders/${orderId}/images/${fileName}`, {
		responseType: 'arraybuffer'
	});
};

export const rbbtOrderCourierImageGet = async (
	imageType: string,
	orderId: string,
	fileName: string
): Promise<any> => {
	return await lugatAxios.get(`/v1/storage/orders/${orderId}/${imageType}/${fileName}`, {
		responseType: 'arraybuffer'
	});
};

export const rbbtTimeBasedOrderDownload = async (
	date: any,
	selectedStatus: string
): Promise<any> => {
	return await lugatAxios.post(
		'/v1/rbbt-order/report/time-based-orders-report',
		{
			date,
			status: selectedStatus
		},
		{
			headers: {
				'Content-Disposition': 'attachment; filename=template.xlsx',
				'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			},
			responseType: 'arraybuffer'
		}
	);
};

export const rbbtOrderImport = async (file: File): Promise<any> => {
	const formData = new FormData();
	formData.append('orders', file);
	return await lugatAxios.post('/v1/rbbt-order/import', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
};
