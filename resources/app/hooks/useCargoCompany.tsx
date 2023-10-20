import { cargoCompanyApi } from '@/services/api/cargo-company-api'
import { storeDispatch } from '@/store'
import { CargoCompanyDataType } from '@/types/cargo-types'

const useCargoCompany = () => {
  const loadCargoCompanies = async (search: string, _: any, { page }: any) => {
    const response = await storeDispatch(cargoCompanyApi.endpoints?.getCargoCompanies.initiate({ page, search }))
      .unwrap()
      .then((res) => {
        return res
      })

    const responseJSON = response.data.map((cargoCompany: CargoCompanyDataType) => ({
      label: cargoCompany.name,
      value: cargoCompany.id,
    }))

    return {
      options: responseJSON,
      hasMore: response.meta.last_page > response.meta.current_page,
      additional: {
        page: page + 1,
      },
    }
  }
  return { loadCargoCompanies }
}

export default useCargoCompany
