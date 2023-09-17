import lugatAxios from '@/services/lugatAxios.ts';

export const rbbtCourierAll = async (page: string, search: any): Promise<any> => {
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
		'/v1/rbbt-courier?' + decodeURIComponent(url.searchParams.toString()),
		{
			search: search.searchText,
			onboarding_state: search.onboarding_state,
			vehicle_type: search.vehicle_type,
			type: search.type
		}
	);
};

export const rbbtCourierGet = async (courierId: string): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-courier/' + courierId);
};

export const rbbtCourierSearch = (searchValue: string): Promise<any> => {
	return lugatAxios.post('/v1/rbbt-courier/search', { search: searchValue });
};

export const rbbtCourierGetDocuments = async (courierId: string): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-courier/' + courierId + '/documents');
};

export const rbbtCourierGetVehicles = async (courierId: string): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-courier/' + courierId + '/vehicles');
};

export const rbbtCourierOrders = async (courierId: string, page: string): Promise<any> => {
	const url = new URL(window.location.toString());

	if (page && page != '') {
		url.searchParams.set('page', page.toString());
		window.history.pushState(null, '', url.toString());
	}
	return await lugatAxios.post(
		'/v1/rbbt-courier/' + courierId + '/orders?' + decodeURIComponent(url.searchParams.toString()),
		{}
	);
};

export const rbbtCourierConfirmDoc = async (
	courierId: string,
	documentId: string
): Promise<any> => {
	return await lugatAxios.post(
		'/v1/rbbt-courier/' + courierId + '/confirm-document/' + documentId
	);
};

export const rbbtCourierRefuseDoc = async (courierId: string, documentId: string): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-courier/' + courierId + '/refuse-document/' + documentId);
};

export const rbbtCourierConfirmVehicle = async (
	courierId: string,
	vehicleId: string
): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-courier/' + courierId + '/confirm-vehicle/' + vehicleId);
};

export const rbbtCourierRefuseVehicle = async (
	courierId: string,
	vehicleId: string
): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-courier/' + courierId + '/refuse-vehicle/' + vehicleId);
};

export const rbbtCourierActiveVehicle = async (
	courierId: string,
	vehicleId: string
): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-courier/' + courierId + '/active-vehicle/' + vehicleId);
};

export const rbbtCourierConfirm = async (courierId: string): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-courier/' + courierId + '/confirm');
};

export const rbbtCourierSuspend = async (courierId: string): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-courier/' + courierId + '/suspend');
};
export const rbbtCourierUnsuspend = async (courierId: string): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-courier/' + courierId + '/unsuspend');
};

export const rbbtCourierTypeUpdate = async (
	courierId: string,
	type: 'organic' | 'inorganic'
): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-courier/' + courierId + '/change-type', { type });
};

export const rbbtCourierUpdateProfile = async (courierId: string, values: any): Promise<any> => {
	const formData = new FormData();
	Object.keys(values).forEach((key) => {
		formData.append(key, values[key]);
	});
	return await lugatAxios.post('/v1/rbbt-courier/' + courierId + '/update-profile', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
};

export const rbbtCourierAccounts = async (courierId: string): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-courier/' + courierId + '/accounts');
};

export const rbbtCourierFinancialActivities = async (courierId: string): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-courier/' + courierId + '/financial-activities');
};

export const rbbtCourierTransferRequestAll = async (
	courierId: string,
	page: string,
	search: any
): Promise<any> => {
	const url = new URL(window.location.toString());

	url.searchParams.forEach((a, b) => url.searchParams.delete(b));
	if (page && page != '') {
		url.searchParams.set('page', page.toString());
		window.history.pushState(null, '', url.toString());
	}
	return await lugatAxios.post(
		'/v1/rbbt-courier/' +
			courierId +
			'/transfer-requests?' +
			decodeURIComponent(url.searchParams.toString()),
		{
			search: search.searchText
		}
	);
};

export const rbbtCourierProfileImageGet = async (
	userId: string,
	fileName: string
): Promise<any> => {
	return await lugatAxios.get(`/v1/storage/${userId}/avatars/${fileName}`, {
		responseType: 'arraybuffer'
	});
};

export const rbbtCourierDocumentGet = async (courierId: string, fileName: string): Promise<any> => {
	return await lugatAxios.get(`/v1/storage/courier/${courierId}/docs/${fileName}`, {
		responseType: 'arraybuffer'
	});
};
export const rbbtCourierTransferRequestInvoiceGet = async (
	courierId: string,
	fileName: string
): Promise<any> => {
	return await lugatAxios.get(`/v1/storage/transfer-request-pdf/${courierId}/${fileName}`, {
		responseType: 'arraybuffer'
	});
};

export const rbbtCourierDocumentAdd = async (courierId: string, values: any): Promise<any> => {
	const formData = new FormData();
	Object.keys(values).forEach((key) => {
		formData.append(key, values[key]);
	});
	return await lugatAxios.post('/v1/rbbt-courier/' + courierId + '/add-document', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
};
