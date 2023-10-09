import React, { Fragment, useState } from 'react'
import LugatButton from '@/components/form/LugatButton'
import { Dialog, Transition } from '@headlessui/react'
import useLoadVariant from '@/hooks/useLoadVariant'
import Treeview from '@/components/treeview'

const ProductVariants: React.FC = () => {
	const [showVariantsModal, setShowVariantsModal] = useState(true)
	const closeModal = () => setShowVariantsModal(false)
	const { loadVariantTree } = useLoadVariant()

	return (
		<>
			<LugatButton
				buttonClassNames={'bg-green-500 hover:bg-green-600'}
				onClick={() => setShowVariantsModal((prev) => !prev)}
			>
				Variants
			</LugatButton>
			<Transition appear show={showVariantsModal} as={Fragment}>
				<Dialog as='div' className='relative z-[99]' onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='fixed w-screen h-screen inset-0 bg-black bg-opacity-25' />
					</Transition.Child>

					<div className='fixed inset-0 overflow-y-auto z-[999]'>
						<div className='flex min-h-full items-center justify-center z-[999] p-4 text-center'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 scale-95'
								enterTo='opacity-100 scale-100'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'
							>
								<Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all'>
									test
									<Treeview loadFn={loadVariantTree} />
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}

export default ProductVariants
