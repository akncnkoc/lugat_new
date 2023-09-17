import lugatAxios from '@/services/lugatAxios.ts';

export const rbbtClientAll = async (page: string, search: any): Promise<any> => {
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
		'/v1/rbbt-client?' + decodeURIComponent(url.searchParams.toString()),
		{
			search: search.searchText,
			onboarding_state: search.onboarding_state
		}
	);
};

export const rbbtClientGet = async (clientId: string): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-client/' + clientId);
};

export const rbbtClientOrders = async (clientId: string, page: string): Promise<any> => {
	const url = new URL(window.location.toString());

	if (page && page != '') {
		url.searchParams.set('page', page.toString());
		window.history.pushState(null, '', url.toString());
	}
	return await lugatAxios.post(
		'/v1/rbbt-client/' + clientId + '/orders?' + decodeURIComponent(url.searchParams.toString()),
		{}
	);
};


export const rbbtClientUpdateProfile = async (clientId: string, values: any): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-client/' + clientId + '/update-profile', values);
};

export const rbbtClientProfileImageGet = async (userId: string, fileName: string): Promise<any> => {
	return await lugatAxios.get(`/v1/storage/${userId}/avatars/${fileName}`, {
		responseType: 'arraybuffer'
	});
};

export const rbbtClientFinancialActivities = async (clientId: string): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-client/' + clientId + '/financial-activities');
};
