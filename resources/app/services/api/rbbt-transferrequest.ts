import lugatAxios from '@/services/lugatAxios.ts';

export const rbbtTransferRequestAll = async (page: string, search: any): Promise<any> => {
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
		'/v1/rbbt-transfer-request?' + decodeURIComponent(url.searchParams.toString()),
		{
			search: search.searchText,
			status: search.status,
			is_bill_payer: search.is_bill_payer,
			date_value: search.date_value
		}
	);
};

export const rbbtTransferRequestGet = async (transferRequestId: string): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-transfer-request/' + transferRequestId);
};

export const rbbtTransferRequestConfirm = async (transferRequestId: string, confirmDate: Date): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-transfer-request/' + transferRequestId + '/confirm', {
		date: confirmDate
	});
};

export const rbbtTransferRequestCancel = async (
	transferRequestId: string,
	reason: any
): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-transfer-request/' + transferRequestId + '/cancel', {
		reason
	});
};
