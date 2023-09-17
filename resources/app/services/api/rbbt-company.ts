import lugatAxios from '@/services/lugatAxios.ts';

export const rbbtCompanyAll = async (page: string, search: any): Promise<any> => {
	const url = new URL(window.location.toString());

	url.searchParams.forEach((a, b) => url.searchParams.delete(b));
	if (page && page != '') {
		url.searchParams.set('page', page.toString());
		window.history.pushState(null, '', url.toString());
	}
	return await lugatAxios.post(
		'/v1/rbbt-company?' + decodeURIComponent(url.searchParams.toString()),
		{
			search: search.searchText
		}
	);
};

export const rbbtCompanyGet = async (companyId: string): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-company/' + companyId);
};


export const rbbtCompanyOrders = async (companyId: string, page: string): Promise<any> => {
	const url = new URL(window.location.toString());

	if (page && page != '') {
		url.searchParams.set('page', page.toString());
		window.history.pushState(null, '', url.toString());
	}
	return await lugatAxios.post(
		'/v1/rbbt-company/' + companyId + '/orders?' + decodeURIComponent(url.searchParams.toString()),
		{}
	);
};
