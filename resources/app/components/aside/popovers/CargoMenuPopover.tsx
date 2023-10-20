import NavigationItem from '@/components/NavigationItem'
import PopoverNavigationItem from '@/components/PopoverNavigationItem'
import CargoIcon from '@/components/icons/CargoIcon'
import PlusCircleIcon from '@/components/icons/PlusCircleIcon'
import { NavigationItemType } from '@/helpers/types'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { NavigateOptions } from 'react-router/dist/lib/context'

const CargoMenuPopover: React.FC = ({ close, isMenuEnabled }: any) => {
  const navigate = useNavigate()

  const handleNavigate = (route: string, state?: NavigateOptions['state']) => {
    navigate(route, {
      replace: true,
      state: state,
    })
  }

  const navigationItems: NavigationItemType[] = [
    {
      text: 'List',
      route: '/cargo/list',
      icon: (
        <>
          <CargoIcon width={18} height={18} fillColor={'currentColor'} />
        </>
      ),
    },
    {
      text: 'Create',
      route: '/cargo/create',
      icon: (
        <>
          <PlusCircleIcon width={18} height={18} fillColor={'currentColor'} />
        </>
      ),
    },
  ]
  return (
    <div className={'p-2'}>
      {navigationItems.map((item) => {
        return item.isPopover ? (
          <PopoverNavigationItem popover={item.popover} key={item.route} handleNavigate={handleNavigate} item={item} />
        ) : (
          <NavigationItem key={item.route} handleNavigate={handleNavigate} item={item} close={close} isMenuEnabled={isMenuEnabled} />
        )
      })}
    </div>
  )
}

export default CargoMenuPopover
