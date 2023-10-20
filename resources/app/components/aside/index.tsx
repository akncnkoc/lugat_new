import NavigationItem from '@/components/NavigationItem'
import PopoverNavigationItem from '@/components/PopoverNavigationItem'
import CustomerMenuPopover from '@/components/aside/popovers/CustomerMenuPopover'
import ExpenseMenuPopover from '@/components/aside/popovers/ExpenseMenuPopover'
import ProductMenuPopover from '@/components/aside/popovers/ProductMenuPopover'
import StaffMenuPopover from '@/components/aside/popovers/StaffMenuPopover'
import VaultMenuPopover from '@/components/aside/popovers/VaultMenuPopover'
import CustomersIcon from '@/components/icons/CustomersIcon'
import DashboardIcon from '@/components/icons/DashboardIcon'
import ExpensesIcon from '@/components/icons/ExpensesIcon'
import InvoicesIcon from '@/components/icons/InvoicesIcon'
import ProductsIcon from '@/components/icons/ProductsIcon'
import SettingsIcon from '@/components/icons/SettingsIcon'
import StaffsIcon from '@/components/icons/StaffsIcon'
import VaultIcon from '@/components/icons/VaultIcon'
import type { NavigationItemType } from '@/helpers/types'
import { useAppSelector } from '@/store/hooks'
import { useWindowSize } from '@uidotdev/usehooks'
import { clsx } from 'clsx'
import React, { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CargoIcon from '../icons/CargoIcon'
import CargoMenuPopover from './popovers/CargoMenuPopover'

const Aside: React.FC = () => {
  const navigate = useNavigate()
  const handleNavigate = (route: string) => {
    navigate(route, {
      replace: true,
    })
  }
  const appSlice = useAppSelector((state) => state.appSlice)

  const windowSize = useWindowSize()
  const isMenuEnabled = useMemo(() => windowSize.width && windowSize.width < 1024, [windowSize.width])

  const navigationItems: NavigationItemType[] = [
    {
      text: 'Dashboard',
      route: '/',
      icon: <DashboardIcon fillColor={'currentColor'} />,
      isMenuEnabled,
    },
    {
      text: 'Product',
      route: '/product',
      icon: <ProductsIcon fillColor={'currentColor'} />,
      isPopover: true,
      popover: <ProductMenuPopover />,
      isMenuEnabled,
    },
    {
      text: 'Vault',
      route: '/vault',
      icon: <VaultIcon fillColor={'currentColor'} />,
      isPopover: true,
      popover: <VaultMenuPopover />,
      isMenuEnabled,
    },
    {
      text: 'Invoice',
      route: '/invoice',
      icon: <InvoicesIcon fillColor={'currentColor'} />,
    },
    {
      text: 'Customer',
      route: '/customer',
      icon: <CustomersIcon fillColor={'currentColor'} />,
      isPopover: true,
      popover: <CustomerMenuPopover />,
      isMenuEnabled,
    },
    {
      text: 'Staff',
      route: '/staff',
      icon: <StaffsIcon fillColor={'currentColor'} />,
      isPopover: true,
      popover: <StaffMenuPopover />,
      isMenuEnabled,
    },
    {
      text: 'Expense',
      route: '/expense',
      icon: <ExpensesIcon fillColor={'currentColor'} />,
      isPopover: true,
      popover: <ExpenseMenuPopover />,
      isMenuEnabled,
    },
    {
      text: 'Cargo',
      route: '/cargo',
      icon: <CargoIcon />,
      isPopover: true,
      popover: <CargoMenuPopover />,
      isMenuEnabled,
    },
    {
      text: 'Setting',
      route: '/setting',
      icon: <SettingsIcon fillColor={'currentColor'} />,
    },
  ]

  return (
    <aside
      id='logo-sidebar'
      className={clsx('z-40', 'max-w-[260px]', 'min-w-[260px]', 'flex-1', 'transition-transform', 'border-r', 'border-gray-200', 'bg-white', 'transform', appSlice.sidebarClassNames)}
    >
      <div className={clsx('h-full', 'flex', 'flex-col')}>
        <ul className={clsx('space-y-2', 'flex', 'flex-col', 'font-semibold', 'p-2')}>
          {navigationItems.map((item) => {
            return item.isPopover ? (
              <PopoverNavigationItem popover={item.popover} key={item.route} handleNavigate={handleNavigate} item={item} isMenuEnabled={isMenuEnabled} />
            ) : (
              <NavigationItem key={item.route} handleNavigate={handleNavigate} item={item} isMenuEnabled={isMenuEnabled} />
            )
          })}
        </ul>
        <div className={'flex-1'}></div>
        <div className={clsx('flex', 'items-center', 'justify-center', 'p-2', 'font-semibold', 'text-base')}>
          <Link to='/' className='flex justify-center ml-2'>
            <img src='/assets/logo.svg' className='h-24 mr-3' alt='Lügat Logo' />
          </Link>
        </div>
        <div className={clsx('flex', 'items-center', 'justify-center', 'p-2', 'font-semibold', 'text-base')}>
          Made by&nbsp;
          <Link to={'https://akincankoc.com'} target={'_blank'} className={'font-bold underline underline-offset-2'}>
            Akın Can Koç
          </Link>
        </div>
      </div>
    </aside>
  )
}
export default Aside
