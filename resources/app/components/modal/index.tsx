import React, { createContext, Fragment, useContext, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

const LugatModalContext = createContext<{
	show: boolean
	setShow: React.Dispatch<React.SetStateAction<any>>
}>({
	show: false,
	setShow: () => {},
})

type LugatModalPropsTriggerProps = {
	children?: React.ReactNode | React.ReactNode[]
}
const LugatModalTrigger: React.FC<LugatModalPropsTriggerProps> = (props) => {
	const context = useContext(LugatModalContext)
	return <div onClick={() => context.setShow(true)}>{props.children}</div>
}

type LugatModalBodyTriggerProps = {
	children?:
		| React.ReactNode
		| React.ReactNode[]
		| ((setShow: Function) => React.ReactNode | React.ReactNode[])
}
const LugatModalBody: React.FC<LugatModalBodyTriggerProps> = (props) => {
	const context = useContext(LugatModalContext)
	return (
		<Transition show={context.show} as={Fragment}>
			<Dialog
				as='div'
				className='relative h-full w-full z-[99999]'
				onClose={() => context.setShow(false)}
			>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<Dialog.Overlay className='fixed w-screen h-screen top-0 left-0 z-[9999] bg-black bg-opacity-25' />
				</Transition.Child>
				<div className='fixed inset-0 overflow-y-auto z-[999999]'>
					<div className='flex min-h-full items-center justify-center p-4 text-center'>
						<Dialog.Panel className={'shadow'}>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 scale-95'
								enterTo='opacity-100 scale-100'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'
							>
								{(ref) => (
									<div ref={ref}>
										{typeof props.children === 'function'
											? props.children(context.setShow)
											: props.children}
									</div>
								)}
							</Transition.Child>
						</Dialog.Panel>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}

type LugatModalProps = {
	children?: React.ReactNode | React.ReactNode[]
}

type LugatModalComposition = {
	Trigger: React.FC<LugatModalPropsTriggerProps>
	Body: React.FC<LugatModalBodyTriggerProps>
}

const LugatModal: React.FC<LugatModalProps> & LugatModalComposition = (props) => {
	const [show, setShow] = useState(false)
	return (
		<LugatModalContext.Provider value={{ show, setShow }}>
			{props.children}
		</LugatModalContext.Provider>
	)
}
LugatModal.Trigger = LugatModalTrigger
LugatModal.Body = LugatModalBody

export default LugatModal
