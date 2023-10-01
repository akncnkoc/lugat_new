import { createApi } from '@reduxjs/toolkit/query/react'
import { DefaultResponseType } from '@/helpers/types'
import baseQueryConfigWithAuth from '@/store/config/baseQueryConfigWithAuth'
import { StaffResource, StaffSingleResource, StaffStoreType } from '@/types/staff-types'

export const staffApi = createApi({
	reducerPath: 'staffApi',
	baseQuery: baseQueryConfigWithAuth,
	tagTypes: ['Staff'],
	endpoints: (builder) => ({
		getStaffs: builder.mutation<StaffResource, { page: string; search: string }>({
			query({ page = '1', search }) {
				const url = new URL(window.location.toString())
				url.searchParams.set('page', page)
				if (search) {
					url.searchParams.set('search', search.toString())
				}
				return {
					method: 'GET',
					url: `v1/staff?${decodeURIComponent(url.searchParams.toString())}`,
				}
			},
		}),
		getStaff: builder.query<StaffSingleResource, string>({
			query: (id: string) => `v1/staff/${id}`,
			providesTags: ['Staff'],
		}),
		storeStaff: builder.mutation<DefaultResponseType, StaffStoreType>({
			query(body) {
				return {
					url: `v1/staff`,
					method: 'POST',
					body,
				}
			},
			invalidatesTags: ['Staff'],
		}),
		updateStaff: builder.mutation<DefaultResponseType, { body: StaffStoreType; id: string }>({
			query({ id, body }) {
				return {
					url: `v1/staff/${id}`,
					method: 'PUT',
					body,
				}
			},
			invalidatesTags: ['Staff'],
		}),
		deleteStaff: builder.mutation<DefaultResponseType, string>({
			query(id) {
				return {
					url: `v1/staff/${id}`,
					method: 'DELETE',
				}
			},
			invalidatesTags: ['Staff'],
		}),
	}),
})

export const {
	useGetStaffsMutation,
	useGetStaffQuery,
	useStoreStaffMutation,
	useUpdateStaffMutation,
	useDeleteStaffMutation,
} = staffApi
