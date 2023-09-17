import lugatAxios from '@/services/lugatAxios.ts';

export const dashboardOrderMarkers = async (values:any): Promise<any> => {
	return await lugatAxios.post('/v1/dashboard/order-markers', values);
};

export const dashboardCourierMarkers = async (values: any): Promise<any> => {
	return await lugatAxios.post('/v1/dashboard/courier-markers', values);
};

export const dashboardGeneralInformation = async (): Promise<any> => {
	return await lugatAxios.post('/v1/dashboard/general-information');
};
