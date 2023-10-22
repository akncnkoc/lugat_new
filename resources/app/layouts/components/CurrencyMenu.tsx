import { useUpdateDefaultCurrencyMutation } from '@/services/api/currency-api'
import { useAppSelector } from '@/store/hooks'
import { Menu, Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import React, { Fragment } from 'react'
import toast from 'react-hot-toast'
import { BiFlag } from 'react-icons/bi'

export const CurrencyMenu: React.FC = () => {
  const currencySelector = useAppSelector((state) => state.currencySlice)
  const [updateDefaultCurrency] = useUpdateDefaultCurrencyMutation()
  const handleDefaultCurrency = (id: string, close: Function) => {
    toast
      .promise(
        updateDefaultCurrency(id).unwrap(),
        {
          loading: 'Loading',
          success: () => {
            return 'Default currency updated'
          },
          error: 'Error while updating default currency',
        },
        {
          position: 'bottom-right',
        },
      )
      .finally(() => close())
  }
  return (
    <Menu as={'div'} className={clsx('relative', 'inline-block', 'text-left', 'pr-4')}>
      <Menu.Button className={clsx('inline-flex', 'w-full', 'justify-center', 'rounded-lg')}>
        <div className={clsx('flex', 'space-x-2', 'items-center', 'bg-zinc-200', 'px-4', 'py-2', 'rounded-lg')}>
          <BiFlag />
          <span className={'block'}>
            Default Currency <b className='text-xs'>({currencySelector.defaultCurrency?.code})</b>
          </span>
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className={'menu-items'}>
          {currencySelector.currencies.data.map((currency, index) => (
            <div className='px-1 py-1' key={index}>
              <Menu.Item>
                {({ active, close }) => (
                  <button
                    onClick={() => handleDefaultCurrency(currency.id, close)}
                    className={clsx(
                      'menu-item',
                      'text-left',
                      'group',
                      'transition-all',
                      active ? ['bg-green-500', 'text-white'] : 'text-gray-900',
                    )}
                  >
                    {currency.name}
                  </button>
                )}
              </Menu.Item>
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
export default CurrencyMenu
