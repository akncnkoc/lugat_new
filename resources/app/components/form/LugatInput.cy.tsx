import React from 'react'
import LugatInput from './LugatInput'
import 'tailwindcss/tailwind.css'
import '@/styles/index.scss'

describe('<LugatInput />', () => {
  it('renders', () => {
    cy.mount(<div className={'p-2'}><LugatInput label={'Film'} /></div>);
		cy.get('input').type('Hello World')
  })
})
