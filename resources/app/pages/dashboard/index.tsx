import { Tab } from '@headlessui/react'
import { clsx } from 'clsx'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

const SelectedTab: React.FC<{ selected: boolean; text: string }> = ({ selected, text }) => {
  return (
    <a
      className={clsx(
        ['flex', 'justify-center', 'py-4'],
        [selected && ['flex', 'justify-center', 'bg-white', 'rounded-full', 'shadow', 'text-blue-900', 'py-4']],
      )}
    >
      {text}
    </a>
  )
}
export default function Dashboard() {
  const { t } = useTranslation()
  return (
    <div className={'shadow rounded-lg p-4 bg-white'}>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Tab.Group>
        <Tab.List className={'grid grid-flow-col text-center text-gray-500 bg-gray-100 rounded-full p-1'}>
          <Tab>{({ selected }) => <SelectedTab selected={selected} text={'Pilot Training'} />}</Tab>
          <Tab>{({ selected }) => <SelectedTab selected={selected} text={'Car Training'} />}</Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            {t('ts:amount')} {t('ts:receipt_date')}
          </Tab.Panel>
          <Tab.Panel>test 2</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
