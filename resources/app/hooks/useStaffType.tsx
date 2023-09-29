import { StaffTypeData } from '@/types/staff-types'

const useStaffType = () => {
	const loadStaffTypes = () => {
		return (Object.keys(StaffTypeData) as Array<keyof typeof StaffTypeData>).map((item) => ({
			label: StaffTypeData[item],
			value: item,
		}))
	}
	return { loadStaffTypes }
}

export default useStaffType
