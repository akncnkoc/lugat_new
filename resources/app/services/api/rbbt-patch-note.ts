import lugatAxios from '@/services/lugatAxios.ts';

export const rbbtPatchNoteAll = async (page: string, search: any): Promise<any> => {
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
		'/v1/rbbt-patch-note?' + decodeURIComponent(url.searchParams.toString()),
		{
			search: search.searchText
		}
	);
};

export const rbbtPatchNoteGet = async (patchNoteId: string): Promise<any> => {
	return await lugatAxios.get('/v1/rbbt-patch-note/' + patchNoteId);
};


export const rbbtPatchNoteStore = async (values: any): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-patch-note/store', values);
};
export const rbbtPatchNoteDelete = async (patchNoteId: string): Promise<any> => {
	return await lugatAxios.delete('/v1/rbbt-patch-note/' + patchNoteId);
};
