import lugatAxios from '@/services/lugatAxios.ts';

export const rbbtUserAll = async (): Promise<any> => {
	return await lugatAxios.post('/v1/rbbt-user', {});
};
