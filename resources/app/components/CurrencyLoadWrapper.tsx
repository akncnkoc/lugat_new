import { useGetCurrenciesQuery } from '@/services/api/currency-api'
import clsx from 'clsx'
import React from 'react'
import { LoaderIcon } from 'react-hot-toast'

const CurrencyLoadWrapper: React.FC<{ children: React.ReactNode }> = (props) => {
  const { isFetching, isLoading } = useGetCurrenciesQuery({ search: '', page: '1' })

  if (isFetching || isLoading) {
    return (
      <div className={clsx('flex', 'space-x-2', 'items-center', 'bg-zinc-200', 'px-4', 'py-2', 'rounded-lg')}>
        <LoaderIcon />
      </div>
    )
  }
  return <>{props.children}</>
}

export default CurrencyLoadWrapper
